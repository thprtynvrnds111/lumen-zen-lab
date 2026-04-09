import { VercelRequest, VercelResponse } from '@vercel/node';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method not allowed');
  }

  const code = Array.isArray(req.query.code) ? req.query.code[0] : req.query.code;

  if (!code) {
    return res.status(400).send('Missing code');
  }

  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_API_KEY || !SHOPIFY_API_SECRET) {
    return res.status(500).send('Shopify environment variables are not configured');
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

    // Log token to Vercel logs so it can be captured for SHOPIFY_ADMIN_TOKEN env var
    console.log('NEW_ACCESS_TOKEN:', d.access_token);

    return res.status(200).send('App authorized successfully. Check Vercel logs for token.');
  } catch (error: any) {
    console.error('Unexpected error:', error.message);
    return res.status(500).send('Internal server error');
  }
}
