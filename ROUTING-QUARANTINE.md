# Routing quarantine — why three prerendered pages are rewritten to the SPA shell

`vercel.json` deliberately rewrites three routes to `/index.html` *before* the
`handle: filesystem` step, which means Vercel never serves their prerendered
HTML. That is not a bug. It is a hold.

| Route | Rendered "Frequency Wand" mentions | GSC impressions (90d to 2026-07-23) |
|---|---|---|
| `/compare/foreo-bear-vs-zential-pure` | 30 | 64 (2 clicks, 3.12% CTR — best on the site) |
| `/technology/electroporation` | 6 | 519 |
| `/facial-muscle-training` | 3 | 0 |

All three are written around **Frequency Wand at €147**. That name is listed as
DISCONTINUED in `~/zential-agent-engine/knowledge/products/LIVE-CATALOG-TRUTH.md`
("must never appear in customer copy"), and €147 is not a live price. Serving
these pages would put dead-SKU copy in front of customers and into Google's index.

Every other route in `scripts/prerender.mjs` is served from the filesystem as
intended, including `/technology/iontophoresis` — the site's highest-impression
page (2,024 impressions), which is clean and correctly sells the Face Introducer
at €88.

## To lift the quarantine

A page comes out of quarantine when its copy is rebuilt on the live catalog. That
needs two inputs that were not available when the hold went in:

1. **A verified FOREO BEAR price.** `foreo.com/bear` serves no price to fetchers.
   Read it in a real browser (kimi-webbridge) or from the regional store, and cite
   the source and date in the page, the way the NuFACE/CurrentBody/Solawave
   comparison block does.
2. **A decision on which live instrument each page sells.** The Face Introducer's
   four modalities (EMS · microcurrent · thermal · cosmetic LED) are not the five
   this copy claims. Do not find-and-replace the product name — the claims move
   with it, and inventing specs is the failure mode this repo's authenticity floor
   exists to prevent.

Once a page is rewritten and compliance-gated, delete its entry from the
`vercel.json` routes array and redeploy. Confirm with:

```sh
curl -s https://zentialpure.com/<route> | grep -oE '<title[^>]*>[^<]*'
```

A page-specific title means the filesystem handler is serving the prerendered
file. The homepage title means the rewrite is still in front of it.

*Raised 2026-07-24 from the GSC export `Performance-on-Search-2026-07-24`.*
