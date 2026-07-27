/**
 * ATC beacon relay — measures browser AddToCart loss.
 *
 * The Meta pixel delivers AddToCart as an image beacon with no unload-survival
 * guarantee; clicks before fbevents.js loads (stub queue) or before hydration
 * (prerendered anchor) die silently. The inline listener in index.html POSTs
 * here on every buy-CTA click with fetch keepalive, which DOES survive unload
 * by spec. This function forwards the record server-to-server to the engine
 * box, which appends it to substrate/data/atc_beacon.jsonl. Beacon count vs
 * pixel-stats AddToCart over the same window = the loss rate
 * (scripts/engine/atc_loss_readout.py in zential-agent-engine).
 *
 * Best-effort by design: always answers 204 fast, never blocks the shopper.
 *
 * Required Vercel env:
 *   ZENTIAL_INTERNAL_API_KEY — auth for the box's /capi/beacon/atc route
 */

const BOX_SINK = "https://zential-hermes.tail2b454e.ts.net/capi/beacon/atc";

/** Crude per-instance throttle — same speed bump api/track.ts uses. */
const hits = new Map<string, { n: number; reset: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { n: 1, reset: now + 60_000 });
    return false;
  }
  rec.n += 1;
  return rec.n > 30;
}

function readCookie(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const m = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const fwd = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd || "").split(",")[0].trim() || "unknown";
  if (throttled(ip)) return res.status(204).end();

  const key = process.env.ZENTIAL_INTERNAL_API_KEY;
  if (!key) {
    // Tracking is non-essential — succeed quietly, but leave a trace in logs.
    console.error("[atc-beacon] ZENTIAL_INTERNAL_API_KEY missing in env");
    return res.status(204).end();
  }

  try {
    const body = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}) as {
      event_id?: string;
      slug?: string;
      placement?: string;
    };
    const s = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
    const eventId = s(body.event_id, 64);
    if (!eventId) return res.status(204).end();

    const cookie = req.headers["cookie"]?.toString();
    const record = {
      event_id: eventId,
      slug: s(body.slug, 64),
      placement: s(body.placement, 64),
      ua: s(req.headers["user-agent"]?.toString(), 256),
      referer: s(req.headers["referer"]?.toString(), 256),
      fbp_present: Boolean(readCookie(cookie, "_fbp")),
      fbc_present: Boolean(readCookie(cookie, "_fbc")),
    };

    // Await with a short timeout: a serverless invocation may be frozen the
    // moment the response is sent, so fire-and-forget can silently drop.
    await fetch(BOX_SINK, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-zential-api-key": key },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(3000),
    }).catch((err) => console.error("[atc-beacon] forward failed:", err?.message ?? err));
  } catch (err: any) {
    console.error("[atc-beacon] error:", err?.message ?? err);
  }
  return res.status(204).end();
}
