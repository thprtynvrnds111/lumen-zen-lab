import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await fetch(
      'https://zentialpure.myshopify.com/admin/api/2024-01/customers.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': token,
        },
        body: JSON.stringify({
          customer: {
            email: email.trim(),
            tags: 'founding-customer',
            email_marketing_consent: {
              state: 'subscribed',
              opt_in_level: 'single_opt_in',
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMsg =
        data?.errors?.email?.[0] ||
        (typeof data?.errors === 'string' ? data.errors : JSON.stringify(data?.errors)) ||
        'Shopify API error';
      return res.status(500).json({ error: errorMsg });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
