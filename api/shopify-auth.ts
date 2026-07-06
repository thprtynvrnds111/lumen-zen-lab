import { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

function first(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) || '';
}

// Verify Shopify's HMAC over the callback query string (constant-time).
// Blocks forged / injected authorization-code callbacks.
function verifyShopifyHmac(query: Record<string, string | string[] | undefined>, secret: string): boolean {
  const hmac = first(query.hmac);
  if (!hmac) return false;
  const message = Object.keys(query)
    .filter((k) => k !== 'hmac' && k !== 'signature')
    .sort()
    .map((k) => `${k}=${first(query[k])}`)
    .join('&');
  const digest = crypto.createHmac('sha256', secret).update(message).digest('hex');
  const a = Buffer.from(digest, 'utf8');
  const b = Buffer.from(hmac, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  const code = first(req.query.code);

  if (!code) {
    return res.status(400).send('Missing code');
  }

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_KEY || !SHOPIFY_API_SECRET) {
    return res.status(500).send('Shopify environment variables are not configured');
  }

  // Reject any callback whose HMAC does not verify against our app secret.
  if (!verifyShopifyHmac(req.query as Record<string, string | string[] | undefined>, SHOPIFY_API_SECRET)) {
    return res.status(401).send('Invalid HMAC');
  }

  // The shop that just authorized must be our own store — reject foreign shops.
  const shop = first(req.query.shop);
  if (shop !== SHOPIFY_STORE_DOMAIN) {
    return res.status(401).send('Unexpected shop');
  }

  try {
    const r = await fetch(`https://${SHOPIFY_STORE_DOMAIN}/admin/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: SHOPIFY_API_KEY,
        client_secret: SHOPIFY_API_SECRET,
        code,
      }),
    });

    if (!r.ok) {
      console.error('OAuth exchange failed:', await r.text());
      return res.status(502).send('OAuth exchange failed');
    }

    const d = (await r.json()) as { access_token?: string };

    if (!d.access_token) {
      return res.status(502).send('OAuth exchange failed - no token');
    }

    // Never log the token (persists in Vercel logs / any log forwarder).
    // Show it once, over HTTPS, to the operator who completed this HMAC-verified
    // install flow, so it can be copied into the SHOPIFY_ADMIN_TOKEN env var.
    return res
      .status(200)
      .setHeader('Content-Type', 'text/plain; charset=utf-8')
      .send(
        'App authorized. Copy this token into SHOPIFY_ADMIN_TOKEN now — it is shown once and not logged:\n\n' +
          d.access_token +
          '\n'
      );
  } catch (error: any) {
    console.error('Unexpected error:', error.message);
    return res.status(500).send('Internal server error');
  }
}
