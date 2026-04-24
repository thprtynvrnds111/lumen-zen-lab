/**
 * Newsletter signup endpoint.
 *
 * Creates (or updates) a Shopify customer with marketing consent + a tag
 * derived from the signup source. The actual welcome email is sent by a
 * Shopify Marketing Automation triggered by the marketing-consent change
 * or the `newsletter` tag — this endpoint only registers the subscriber.
 *
 * Required Vercel env vars:
 *   - SHOPIFY_ADMIN_TOKEN  (Admin API token with write_customers + read_customers)
 */
export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const email = (body?.email ?? '').toString().trim().toLowerCase();
    const source = (body?.source ?? '').toString().trim().toLowerCase();

    // Server-side validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const token = process.env.SHOPIFY_ADMIN_TOKEN;
    if (!token) {
      console.error('[newsletter] SHOPIFY_ADMIN_TOKEN env var is missing');
      return res.status(500).json({ error: 'Server is not configured' });
    }

    const shopBase = 'https://0d1m9a-w7.myshopify.com/admin/api/2024-01';
    const tags = source ? `newsletter, source-${source.replace(/[^a-z0-9-]/g, '-')}` : 'newsletter';

    console.log(`[newsletter] signup attempt email=${email} source=${source || 'unknown'}`);

    // 1. Try to create the customer
    const createRes = await fetch(`${shopBase}/customers.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
      body: JSON.stringify({
        customer: {
          email,
          tags,
          email_marketing_consent: {
            state: 'subscribed',
            opt_in_level: 'single_opt_in',
          },
        },
      }),
    });

    const createData = await createRes.json().catch(() => ({}));

    if (createRes.ok) {
      console.log(`[newsletter] created customer email=${email}`);
      return res.status(200).json({ success: true, status: 'created' });
    }

    // 2. If the customer already exists (422), look them up + update consent + merge tags
    const alreadyExists =
      createRes.status === 422 &&
      JSON.stringify(createData).toLowerCase().includes('has already been taken');

    if (alreadyExists) {
      const searchRes = await fetch(
        `${shopBase}/customers/search.json?query=${encodeURIComponent('email:' + email)}`,
        { headers: { 'X-Shopify-Access-Token': token } }
      );
      const searchData = await searchRes.json().catch(() => ({}));
      const existing = searchData?.customers?.[0];

      if (existing?.id) {
        const mergedTags = Array.from(
          new Set(
            ((existing.tags || '') + ',' + tags)
              .split(',')
              .map((t: string) => t.trim())
              .filter(Boolean)
          )
        ).join(', ');

        const updateRes = await fetch(`${shopBase}/customers/${existing.id}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': token,
          },
          body: JSON.stringify({
            customer: {
              id: existing.id,
              tags: mergedTags,
              email_marketing_consent: {
                state: 'subscribed',
                opt_in_level: 'single_opt_in',
              },
            },
          }),
        });

        const updateData = await updateRes.json().catch(() => ({}));
        if (!updateRes.ok) {
          console.error(`[newsletter] update failed status=${updateRes.status}`, updateData);
          return res.status(200).json({ success: true, status: 'exists', warning: 'consent_update_failed' });
        }

        console.log(`[newsletter] re-subscribed existing customer email=${email}`);
        return res.status(200).json({ success: true, status: 'updated' });
      }

      // Existed but not findable — still treat as success so the UI doesn't block
      return res.status(200).json({ success: true, status: 'exists' });
    }

    console.error(`[newsletter] shopify create failed status=${createRes.status}`, createData);
    return res.status(502).json({ error: 'Shopify error', status: createRes.status, details: createData });
  } catch (err: any) {
    console.error('[newsletter] unhandled error', err);
    return res.status(500).json({ error: 'Server error', message: err?.message ?? String(err) });
  }
}
