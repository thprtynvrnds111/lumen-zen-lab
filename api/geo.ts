// Returns the visitor's country for storefront market/currency localization.
// Derived from Vercel's edge geo header; falls back to "NL" (home market).
export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', 'https://zentialpure.com');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const country = (req.headers['x-vercel-ip-country'] || '').toString().toUpperCase() || 'NL';
  return res.status(200).json({ country });
}
