import { VercelRequest, VercelResponse } from '@vercel/node';
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');
  const r = await fetch('https://0d1m9a-w7.myshopify.com/admin/oauth/access_token', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: '706b010d671589ea1a53c4f38786c98d', client_secret: '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', code }),
  });
  const d = await r.json() as any;
  return res.status(200).send(`<html><body style="font:18px monospace;padding:32px;background:#000;color:#fff"><h2 style="color:#4ade80">Your Token:</h2><div id="t" style="background:#111;padding:16px;border-radius:8px;word-break:break-all">${d.access_token||JSON.stringify(d)}</div></body></html>`);
}
