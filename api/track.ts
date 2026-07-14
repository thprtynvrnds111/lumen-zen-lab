/**
 * Branded order tracking endpoint.
 *
 * Backs /track. The customer gives an order number + the email they ordered with;
 * we return a sanitised shipping status. This exists so the customer's tracking
 * experience lives on zentialpure.com instead of on a third-party carrier portal.
 *
 * Required Vercel env vars:
 *   - SHOPIFY_ADMIN_TOKEN or SHOPIFY_ACCESS_TOKEN (Admin API token; needs only `read_orders`)
 *     Both exist in the Vercel project and only one is known to carry read_orders, so we
 *     accept either rather than betting on the wrong one.
 *
 * WHAT THIS DELIBERATELY NEVER RETURNS
 *   - Supplier or fulfilment-partner names, SKUs, internal tags, costs.
 *   - The shipping address, the customer's surname, or line-item prices.
 *   - Internal "split" orders (tagged no-revenue) — those are routing vehicles,
 *     not the customer's order, and showing them causes exactly the "am I being
 *     charged twice?" panic we already triggered once.
 *
 * WHAT IT DOES NOT HIDE
 *   The real tracking number and the real carrier URL are returned. The customer
 *   can always click through to the carrier. We control the presentation, not the
 *   facts — we never claim an origin that isn't true.
 */

// ── Parcel-split knowledge ───────────────────────────────────────────────────
// Mirrors knowledge/products/fulfillment-sku-map.json in zential-agent-engine,
// which is the SINGLE SOURCE OF TRUTH. Duplicated here only because that repo is
// not deployed with the storefront. Keep in sync when the map changes.
//
// Items dispatch from two different stock locations, so an order containing both
// arrives as TWO parcels. Telling the customer this up front is the entire point.
const DISPATCH_GROUP: Record<string, string> = {
  QSFU26506980001: 'A', // Restoration Belt
  CJFU26506980001: 'A',
  QSJT170974104DW: 'B', // Face Introducer
  CJJT170974104DW: 'B',
  QSYD278543902BY: 'B', // Restoration Mat
  CJYD278543902BY: 'B',
};
const BUNDLE_GROUPS: Record<string, string[]> = {
  'ZP-SYSTEM-BUNDLE': ['A', 'B'],
};

// Orders that exist purely to route stock, never to be shown to a customer.
const INTERNAL_TAGS = ['internal-fulfillment-split', 'no-revenue', 'qs-sourcing'];

const SHOPIFY_STORE = '0d1m9a-w7.myshopify.com';
const API_VERSION = '2024-10';

interface ShopifyLineItem {
  sku?: string | null;
  title?: string;
  quantity?: number;
}

interface ShopifyFulfillment {
  id: number;
  created_at?: string;
  status?: string;
  shipment_status?: string | null;
  tracking_number?: string | null;
  tracking_company?: string | null;
  tracking_url?: string | null;
  line_items?: ShopifyLineItem[];
}

interface ShopifyOrder {
  name: string;
  created_at: string;
  tags?: string;
  email?: string;
  financial_status?: string;
  fulfillment_status?: string | null;
  customer?: { first_name?: string; email?: string };
  line_items?: ShopifyLineItem[];
  fulfillments?: ShopifyFulfillment[];
}

/**
 * Map Shopify's shipment_status onto our own vocabulary.
 *
 * We say what is true and no more. A parcel with a tracking number but no carrier
 * scan yet is "dispatched", not "in transit" — overstating it is how you get an
 * angry email on day four.
 */
function parcelStage(f: ShopifyFulfillment): string {
  const s = (f.shipment_status || '').toLowerCase();
  if (s === 'delivered') return 'delivered';
  if (s === 'out_for_delivery') return 'out_for_delivery';
  if (s === 'in_transit' || s === 'attempted_delivery') return 'in_transit';
  if (s === 'failure') return 'attention';
  // label_printed / label_purchased / confirmed / null → it has left us, nothing more.
  return 'dispatched';
}

/**
 * Only name a carrier when it is a carrier the customer can actually recognise
 * and look up. Anything else is reported as generic tracked shipping rather than
 * invented — we do not print a name we cannot stand behind.
 */
const KNOWN_CARRIERS = ['ups', 'usps', 'fedex', 'dhl', 'postnl', 'royal mail', 'dpd', 'gls'];
function publicCarrier(company?: string | null): string {
  const c = (company || '').trim().toLowerCase();
  const hit = KNOWN_CARRIERS.find((k) => c.includes(k));
  return hit ? hit.toUpperCase() : 'Tracked shipping';
}

function expectedParcels(items: ShopifyLineItem[]): number {
  const groups = new Set<string>();
  for (const li of items) {
    const sku = (li.sku || '').trim();
    if (BUNDLE_GROUPS[sku]) BUNDLE_GROUPS[sku].forEach((g) => groups.add(g));
    else if (DISPATCH_GROUP[sku]) groups.add(DISPATCH_GROUP[sku]);
  }
  return Math.max(groups.size, 1);
}

/** Crude per-instance throttle. Not a real rate limiter — a speed bump against
 *  someone walking order numbers. Serverless instances are not shared, so this
 *  bounds a single attacker's throughput per instance, nothing more. */
const hits = new Map<string, { n: number; reset: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { n: 1, reset: now + 60_000 });
    return false;
  }
  rec.n += 1;
  return rec.n > 10;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (throttled(ip)) {
    return json({ error: 'Too many attempts. Wait a minute and try again.' }, 429);
  }

  const token = process.env.SHOPIFY_ADMIN_TOKEN || process.env.SHOPIFY_ACCESS_TOKEN;
  if (!token) {
    console.error('[track] no Shopify admin token in env');
    return json({ error: 'Tracking is temporarily unavailable.' }, 500);
  }

  let body: { order?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  const orderInput = (body.order || '').trim().replace(/^#/, '');
  const emailInput = (body.email || '').trim().toLowerCase();
  if (!orderInput || !emailInput) {
    return json({ error: 'Enter your order number and the email you ordered with.' }, 400);
  }

  // A single generic failure for "no such order" AND "email doesn't match", so the
  // endpoint cannot be used to discover which order numbers exist.
  const notFound = () =>
    json({ error: "We couldn't find an order with that number and email." }, 404);

  let order: ShopifyOrder | undefined;
  try {
    const url =
      `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/orders.json` +
      `?status=any&name=${encodeURIComponent('#' + orderInput)}` +
      `&fields=name,created_at,tags,email,customer,financial_status,fulfillment_status,line_items,fulfillments`;
    const res = await fetch(url, { headers: { 'X-Shopify-Access-Token': token } });
    if (!res.ok) throw new Error(`Shopify ${res.status}`);
    const data = (await res.json()) as { orders?: ShopifyOrder[] };
    order = (data.orders || [])[0];
  } catch (err) {
    console.error('[track] Shopify lookup failed:', err);
    return json({ error: 'Tracking is temporarily unavailable.' }, 500);
  }

  if (!order) return notFound();

  const onOrder = (order.email || order.customer?.email || '').trim().toLowerCase();
  if (!onOrder || onOrder !== emailInput) return notFound();

  // Internal routing orders are not the customer's order. Never surface them.
  const tags = (order.tags || '').split(',').map((t) => t.trim().toLowerCase());
  if (INTERNAL_TAGS.some((t) => tags.includes(t))) return notFound();

  const items = order.line_items || [];
  const fulfillments = order.fulfillments || [];
  const expected = expectedParcels(items);

  const parcels = fulfillments.map((f, i) => ({
    label: `Parcel ${i + 1} of ${Math.max(expected, fulfillments.length)}`,
    stage: parcelStage(f),
    dispatchedAt: f.created_at || null,
    trackingNumber: f.tracking_number || null,
    carrier: publicCarrier(f.tracking_company),
    carrierUrl: f.tracking_url || null,
    items: (f.line_items || []).map((li) => li.title).filter(Boolean),
  }));

  // Items we've been paid for but haven't dispatched yet.
  const dispatchedTitles = new Set(parcels.flatMap((p) => p.items));
  const awaiting = items
    .map((li) => li.title)
    .filter((t): t is string => Boolean(t) && !dispatchedTitles.has(t));

  const allDelivered = parcels.length > 0 && parcels.every((p) => p.stage === 'delivered');
  const anyDispatched = parcels.length > 0;

  const stage = allDelivered
    ? 'delivered'
    : anyDispatched
      ? 'shipped'
      : order.financial_status === 'paid'
        ? 'preparing'
        : 'received';

  return json({
    order: order.name,
    firstName: order.customer?.first_name || null,
    placedAt: order.created_at,
    stage,
    expectedParcels: expected,
    // The single most important line on the page. It is why we built this.
    splitShipment: expected > 1,
    parcels,
    awaiting,
  });
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json',
      // An order status page must never be cached or indexed.
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
