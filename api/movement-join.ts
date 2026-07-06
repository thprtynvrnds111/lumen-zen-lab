/**
 * Movement join — server-side Meta CAPI "Lead" event.
 *
 * The browser fires the pixel Lead; this mirrors it server-side (deduped by the
 * shared event_id) so the conversion survives ad-blockers and feeds attribution
 * for the movement campaign. Best-effort: always returns 200 so the client flow
 * is never blocked by tracking.
 *
 * Required Vercel env:
 *   META_PIXEL_ID      Meta pixel / dataset id (915864761310220)
 *   META_ACCESS_TOKEN  CAPI access token
 */
import crypto from "node:crypto";

const GRAPH_VERSION = "v19.0";

function sha256(v: string): string {
  return crypto.createHash("sha256").update(v).digest("hex");
}

function readCookie(cookieHeader: string | undefined, name: string): string | undefined {
  if (!cookieHeader) return undefined;
  const m = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "https://zentialpure.com");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const email = (body?.email ?? "").toString().trim().toLowerCase();
    const source = (body?.source ?? "movement").toString();
    const eventId = (body?.event_id ?? "").toString();
    const eventSourceUrl = (body?.event_source_url ?? "").toString();

    const pixelId = process.env.META_PIXEL_ID;
    const token = process.env.META_ACCESS_TOKEN;
    // Tracking is non-essential — if unconfigured, succeed quietly.
    if (!pixelId || !token || !email) {
      return res.status(200).json({ ok: true, tracked: false });
    }

    const ip =
      (req.headers["x-forwarded-for"]?.toString().split(",")[0] || "").trim() || undefined;
    const ua = req.headers["user-agent"]?.toString();
    const cookie = req.headers["cookie"]?.toString();

    const userData: Record<string, unknown> = { em: [sha256(email)] };
    const fbc = readCookie(cookie, "_fbc");
    const fbp = readCookie(cookie, "_fbp");
    if (fbc) userData.fbc = fbc;
    if (fbp) userData.fbp = fbp;
    if (ip) userData.client_ip_address = ip;
    if (ua) userData.client_user_agent = ua;

    const payload = {
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || undefined,
          action_source: "website",
          event_source_url: eventSourceUrl || undefined,
          user_data: userData,
          custom_data: { content_name: "movement", source },
        },
      ],
    };

    const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) {
      const detail = await r.json().catch(() => ({}));
      console.error("[movement-join] CAPI error", r.status, JSON.stringify(detail).slice(0, 300));
      return res.status(200).json({ ok: true, tracked: false });
    }
    return res.status(200).json({ ok: true, tracked: true });
  } catch (err: any) {
    console.error("[movement-join] error", err?.message ?? err);
    return res.status(200).json({ ok: true, tracked: false });
  }
}
