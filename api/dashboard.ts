const SHOPIFY_STORE = '0d1m9a-w7.myshopify.com';
const ADMIN_API_VERSION = '2025-07';

async function shopifyAdmin(query: string, variables: Record<string, unknown> = {}) {
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!token) throw new Error('SHOPIFY_ADMIN_TOKEN not set');

  const res = await fetch(
    `https://${SHOPIFY_STORE}/admin/api/${ADMIN_API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  if (!res.ok) throw new Error(`Shopify Admin API error: ${res.status}`);
  const data = await res.json();
  if (data.errors) throw new Error(data.errors.map((e: { message: string }) => e.message).join(', '));
  return data.data;
}

const ORDERS_QUERY = `
  query DashboardOrders($query: String!, $first: Int!) {
    orders(first: $first, query: $query, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          name
          createdAt
          totalPriceSet { shopMoney { amount currencyCode } }
          lineItems(first: 10) {
            edges {
              node {
                title
                quantity
                originalTotalSet { shopMoney { amount } }
              }
            }
          }
        }
      }
    }
  }
`;

function dateRangeQuery(days: number) {
  const from = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  return `financial_status:paid created_at:>=${from}`;
}

import crypto from 'node:crypto';

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

export default async function handler(req: any, res: any) {
  // First-party only — no cross-origin reads of live financials.
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Authorization');

  if (req.method === 'OPTIONS') return res.status(405).end();

  // Auth gate: this endpoint returns live revenue/orders — require an operator token.
  const expected = process.env.DASHBOARD_TOKEN;
  if (!expected) {
    return res.status(500).json({ error: 'Dashboard auth not configured' });
  }
  const auth = (req.headers['authorization'] || '').toString();
  const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  const provided = bearer || (req.headers['x-dashboard-token'] || '').toString();
  if (!provided || !safeEqual(provided, expected)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [today, week] = await Promise.all([
      shopifyAdmin(ORDERS_QUERY, { query: dateRangeQuery(1), first: 250 }),
      shopifyAdmin(ORDERS_QUERY, { query: dateRangeQuery(7), first: 250 }),
    ]);

    const todayOrders = today.orders.edges.map((e: any) => e.node);
    const weekOrders = week.orders.edges.map((e: any) => e.node);

    const sum = (orders: any[]) =>
      orders.reduce((s: number, o: any) => s + parseFloat(o.totalPriceSet.shopMoney.amount), 0);

    const todayRevenue = sum(todayOrders);
    const weekRevenue = sum(weekOrders);
    const aov = weekOrders.length > 0 ? weekRevenue / weekOrders.length : 0;
    const target = 1000;
    const ordersNeeded = aov > 0 ? Math.ceil(target / aov) : 0;

    // Top SKU by revenue (last 7d)
    const skuMap: Record<string, { revenue: number; qty: number }> = {};
    for (const order of weekOrders) {
      for (const edge of order.lineItems.edges) {
        const item = edge.node;
        if (!skuMap[item.title]) skuMap[item.title] = { revenue: 0, qty: 0 };
        skuMap[item.title].revenue += parseFloat(item.originalTotalSet.shopMoney.amount);
        skuMap[item.title].qty += item.quantity;
      }
    }
    const topSku = Object.entries(skuMap).sort((a, b) => b[1].revenue - a[1].revenue)[0];

    res.status(200).json({
      today: {
        orders: todayOrders.length,
        revenue: todayRevenue,
      },
      week: {
        orders: weekOrders.length,
        revenue: weekRevenue,
        aov: Math.round(aov * 100) / 100,
      },
      target: {
        daily: target,
        ordersNeeded,
        progressPct: Math.min(Math.round((todayRevenue / target) * 100), 100),
      },
      topSku: topSku ? { name: topSku[0], revenue: topSku[1].revenue, qty: topSku[1].qty } : null,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
