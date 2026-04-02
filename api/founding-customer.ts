export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const email = body?.email;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!token) {
      return res.status(500).json({ error: 'Missing Shopify token' });
    }

    const shopifyRes = await fetch(
      'https://0d1m9a-w7.myshopify.com/admin/api/2024-01/customers.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': token,
        },
        body: JSON.stringify({
          customer: {
            email,
            tags: 'founding-customer',
            email_marketing_consent: {
              state: 'subscribed',
              opt_in_level: 'single_opt_in',
            },
          },
        }),
      }
    );

    const data = await shopifyRes.json();

    if (!shopifyRes.ok) {
      return res.status(500).json({ error: 'Shopify error', details: data });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Server error', message: err.message });
  }
}
