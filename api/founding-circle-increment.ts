/**
 * Founding Circle webhook endpoint + public status reader.
 *
 * Routes (single file, dispatched by req.url):
 *   POST /api/founding-circle-increment   → Shopify orders/create webhook
 *   GET  /api/founding-circle-status      → public slot count (banner reads this)
 *
 * Env vars required:
 *   SHOPIFY_ACCESS_TOKEN        Admin API token (scope: write_customers, write_metaobjects, read_orders)
 *   SHOPIFY_WEBHOOK_SECRET      HMAC secret for orders/create
 *   SHOPIFY_STORE_DOMAIN        0d1m9a-w7.myshopify.com
 *   KLAVIYO_API_KEY             pk_*  (server-side Klaviyo private key)
 *
 * Idempotency: order id is appended to infra/logs/founding-orders-processed.jsonl
 * Note: Vercel /tmp is ephemeral. For multi-instance idempotency, rely on the
 * Shopify customer-tag check (a tagged customer cannot be re-counted) and treat
 * the JSONL as best-effort local audit log only.
 */

import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const SHOPIFY_API_VERSION = "2024-10";
const TOTAL_SLOTS = 100; // Founding 100 (matches the offer + wall)
const METAFIELD_NAMESPACE = "zential";
const METAFIELD_KEY = "founding_orders_count";
const LOG_PATH =
  process.env.FOUNDING_LOG_PATH ||
  path.join(process.cwd(), "infra", "logs", "founding-orders-processed.jsonl");

type ShopifyGraphQLResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
  extensions?: unknown;
};

// ──────────────────────────────────────────────────────────────────────────
// Entry — Vercel handler
// ──────────────────────────────────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  const url: string = req.url || "";

  // Public read endpoint for the banner.
  if (req.method === "GET" && url.includes("founding-circle-status")) {
    return handleStatus(req, res);
  }

  // Webhook ingest.
  if (req.method === "POST") {
    return handleWebhook(req, res);
  }

  res.setHeader("Allow", "POST, GET");
  return res.status(405).json({ error: "Method not allowed" });
}

// ──────────────────────────────────────────────────────────────────────────
// GET /api/founding-circle-status
// ──────────────────────────────────────────────────────────────────────────

async function handleStatus(_req: any, res: any) {
  try {
    const count = await readFoundingCount();
    const slotsRemaining = Math.max(0, TOTAL_SLOTS - count);
    // Edge cache 5 min, stale-while-revalidate for smooth refreshes.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=60",
    );
    return res.status(200).json({
      total: TOTAL_SLOTS,
      ordersCount: count,
      slotsRemaining,
      closed: slotsRemaining === 0,
    });
  } catch (err: any) {
    console.error("[founding-status] read failed:", err?.message);
    return res.status(500).json({ error: "status_read_failed" });
  }
}

// ──────────────────────────────────────────────────────────────────────────
// POST /api/founding-circle-increment  (Shopify orders/create webhook)
// ──────────────────────────────────────────────────────────────────────────

async function handleWebhook(req: any, res: any) {
  // 1) HMAC verification — must happen on raw body bytes.
  const rawBody = await readRawBody(req);
  const hmacHeader =
    req.headers["x-shopify-hmac-sha256"] ||
    req.headers["X-Shopify-Hmac-Sha256"];
  if (!verifyHmac(rawBody, String(hmacHeader || ""))) {
    return res.status(401).json({ error: "invalid_hmac" });
  }

  let order: any;
  try {
    order = JSON.parse(rawBody.toString("utf8"));
  } catch {
    return res.status(400).json({ error: "invalid_json" });
  }

  // 2) Qualifying-order filter.
  if (!isQualifying(order)) {
    return res.status(200).json({ ok: true, skipped: "non_qualifying" });
  }

  // 3) Idempotency — log file (best-effort) + customer-tag (authoritative).
  const orderId = String(order.id);
  if (await wasProcessed(orderId)) {
    return res.status(200).json({ ok: true, skipped: "already_processed" });
  }

  const customer = order.customer;
  const customerGid = customer?.admin_graphql_api_id; // gid://shopify/Customer/123
  const customerEmail: string | undefined = customer?.email;

  try {
    // 4) Per-customer dedupe: already a founding member? Skip.
    if (customerGid && (await customerAlreadyFounding(customerGid))) {
      await appendLog({
        orderId,
        email: customerEmail,
        skipped: "customer_already_founding",
        at: new Date().toISOString(),
      });
      return res.status(200).json({ ok: true, skipped: "duplicate_customer" });
    }

    // 5) Read → check cap → write (optimistic lock).
    const { count, ownerId } = await readShopMetafield();
    if (count >= TOTAL_SLOTS) {
      await appendLog({
        orderId,
        email: customerEmail,
        skipped: "cohort_closed",
        at: new Date().toISOString(),
      });
      return res.status(200).json({ ok: true, skipped: "cohort_closed" });
    }

    const nextCount = count + 1;
    await writeShopMetafield(ownerId, nextCount);

    // 6) Tag the customer in Shopify.
    if (customerGid) {
      await tagShopifyCustomer(customerGid, [
        "founding-circle-member",
        `founding-member-${nextCount}`,
      ]);
    }

    // 7) Klaviyo profile tag + event.
    if (customerEmail) {
      await klaviyoTagAndEvent({
        email: customerEmail,
        memberNumber: nextCount,
        firstName: customer?.first_name,
      });
    }

    // 8) Cohort-closed ops alert.
    if (nextCount >= TOTAL_SLOTS) {
      await klaviyoOpsClosedAlert(nextCount);
    }

    await appendLog({
      orderId,
      email: customerEmail,
      memberNumber: nextCount,
      ok: true,
      at: new Date().toISOString(),
    });

    return res.status(200).json({
      ok: true,
      memberNumber: nextCount,
      slotsRemaining: TOTAL_SLOTS - nextCount,
    });
  } catch (err: any) {
    console.error("[founding-circle-increment] error:", err?.message, err);
    await appendLog({
      orderId,
      email: customerEmail,
      error: err?.message || "unknown",
      at: new Date().toISOString(),
    }).catch(() => {});
    return res.status(500).json({ error: "internal", message: err?.message });
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers — Shopify
// ──────────────────────────────────────────────────────────────────────────

function shopifyEndpoint(): string {
  const domain = process.env.SHOPIFY_STORE_DOMAIN || "0d1m9a-w7.myshopify.com";
  return `https://${domain}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;
}

async function shopifyGraphQL<T = any>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const token = process.env.SHOPIFY_ACCESS_TOKEN;
  if (!token) throw new Error("SHOPIFY_ACCESS_TOKEN missing");
  const r = await fetch(shopifyEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await r.json()) as ShopifyGraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error("Shopify GraphQL: " + JSON.stringify(json.errors));
  }
  return json.data as T;
}

async function readShopMetafield(): Promise<{ count: number; ownerId: string }> {
  const data = await shopifyGraphQL<any>(`
    query {
      shop {
        id
        metafield(namespace: "${METAFIELD_NAMESPACE}", key: "${METAFIELD_KEY}") {
          value
        }
      }
    }
  `);
  const raw = data?.shop?.metafield?.value;
  const count = raw ? parseInt(raw, 10) || 0 : 0;
  return { count, ownerId: data.shop.id };
}

async function readFoundingCount(): Promise<number> {
  const { count } = await readShopMetafield();
  return count;
}

async function writeShopMetafield(ownerId: string, value: number) {
  const data = await shopifyGraphQL<any>(
    `
    mutation SetCount($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields { id value }
        userErrors { field message }
      }
    }
  `,
    {
      metafields: [
        {
          ownerId,
          namespace: METAFIELD_NAMESPACE,
          key: METAFIELD_KEY,
          type: "number_integer",
          value: String(value),
        },
      ],
    },
  );
  const errs = data?.metafieldsSet?.userErrors;
  if (errs?.length) throw new Error("metafieldsSet: " + JSON.stringify(errs));
}

async function customerAlreadyFounding(customerGid: string): Promise<boolean> {
  const data = await shopifyGraphQL<any>(
    `
    query($id: ID!) {
      customer(id: $id) { tags }
    }
  `,
    { id: customerGid },
  );
  const tags: string[] = data?.customer?.tags || [];
  return tags.includes("founding-circle-member");
}

async function tagShopifyCustomer(customerGid: string, tags: string[]) {
  const data = await shopifyGraphQL<any>(
    `
    mutation Tag($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node { id }
        userErrors { field message }
      }
    }
  `,
    { id: customerGid, tags },
  );
  const errs = data?.tagsAdd?.userErrors;
  if (errs?.length) throw new Error("tagsAdd: " + JSON.stringify(errs));
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers — Klaviyo
// ──────────────────────────────────────────────────────────────────────────

const KLAVIYO_API_VERSION = "2024-10-15";

async function klaviyoTagAndEvent(args: {
  email: string;
  memberNumber: number;
  firstName?: string;
}) {
  const key = process.env.KLAVIYO_API_KEY;
  if (!key) {
    console.warn("[klaviyo] KLAVIYO_API_KEY missing — skipping");
    return;
  }

  // Track event — also upserts the profile.
  await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      "Content-Type": "application/json",
      revision: KLAVIYO_API_VERSION,
      accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: {
            member_number: args.memberNumber,
            tag: "founding-circle-member",
          },
          metric: { data: { type: "metric", attributes: { name: "Founding Circle Joined" } } },
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: args.email,
                first_name: args.firstName,
                properties: {
                  founding_member_number: args.memberNumber,
                  founding_circle_member: true,
                },
              },
            },
          },
        },
      },
    }),
  }).catch((e) => console.error("[klaviyo event] failed:", e?.message));
}

async function klaviyoOpsClosedAlert(memberNumber: number) {
  const key = process.env.KLAVIYO_API_KEY;
  const opsEmail = process.env.OPS_ALERT_EMAIL || "miguelyoung123@gmail.com";
  if (!key) return;
  await fetch("https://a.klaviyo.com/api/events/", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      "Content-Type": "application/json",
      revision: KLAVIYO_API_VERSION,
      accept: "application/json",
    },
    body: JSON.stringify({
      data: {
        type: "event",
        attributes: {
          properties: { final_member: memberNumber },
          metric: { data: { type: "metric", attributes: { name: "founding-circle-closed" } } },
          profile: { data: { type: "profile", attributes: { email: opsEmail } } },
        },
      },
    }),
  }).catch((e) => console.error("[klaviyo closed-alert] failed:", e?.message));
}

// ──────────────────────────────────────────────────────────────────────────
// Helpers — HMAC, body parsing, qualification, idempotency log
// ──────────────────────────────────────────────────────────────────────────

function verifyHmac(rawBody: Buffer, hmacHeader: string): boolean {
  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("SHOPIFY_WEBHOOK_SECRET missing — rejecting");
    return false;
  }
  const digest = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");
  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(hmacHeader || ""),
    );
  } catch {
    return false;
  }
}

async function readRawBody(req: any): Promise<Buffer> {
  // Vercel may parse body already. Prefer rawBody if present.
  if (req.rawBody) return Buffer.isBuffer(req.rawBody) ? req.rawBody : Buffer.from(req.rawBody);
  if (typeof req.body === "string") return Buffer.from(req.body, "utf8");
  if (Buffer.isBuffer(req.body)) return req.body;
  if (req.body && typeof req.body === "object") {
    return Buffer.from(JSON.stringify(req.body), "utf8");
  }
  // Fallback: read stream.
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  return Buffer.concat(chunks);
}

function isQualifying(order: any): boolean {
  if (!order) return false;
  if (order.test === true) return false;                       // test order
  if (order.source_name && order.source_name !== "web") return false; // exclude POS/draft/staff
  const fs_ = String(order.financial_status || "").toLowerCase();
  if (!["paid", "authorized", "partially_paid"].includes(fs_)) return false;
  if (!order.customer?.email) return false;                    // need an email
  return true;
}

async function wasProcessed(orderId: string): Promise<boolean> {
  try {
    const txt = await fs.readFile(LOG_PATH, "utf8");
    return txt.split("\n").some((line) => {
      if (!line.trim()) return false;
      try {
        const j = JSON.parse(line);
        return j.orderId === orderId && j.ok === true;
      } catch {
        return false;
      }
    });
  } catch {
    return false; // log doesn't exist yet
  }
}

async function appendLog(entry: Record<string, unknown>) {
  try {
    await fs.mkdir(path.dirname(LOG_PATH), { recursive: true });
    await fs.appendFile(LOG_PATH, JSON.stringify(entry) + "\n", "utf8");
  } catch (e: any) {
    // On Vercel /tmp is ephemeral, on local infra/logs/ is persistent — both OK to fail soft.
    console.warn("[founding-log] append failed:", e?.message);
  }
}
