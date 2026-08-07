import { useState, useEffect, useRef } from "react";
import { PageShell } from "@/components/zential/v2/PageShell";
import { createFoundingCustomer, createShopifyCart } from "@/lib/shopify";
import { trackMovementJoin, trackDepositIntent } from "@/lib/movement-tracking";
import { captureRef, getRef } from "@/lib/movement-practice";
import edThreshold from "@/assets/editorial/threshold.webp";
import edSeatedCalm from "@/assets/editorial/seated-calm.webp";

/**
 * /movement — "Reclaim your own frequency".
 * Coven restyle (2026-08-07) of the Claude Design project `movement/index.html`:
 * same structure and copy, translated to the white/ink/green grammar — white
 * canvas, Switzer-light display, hairline sections, emerald accents, teal CTA,
 * one mint statement band. CSS stays embedded and scoped under `.mv-root`:
 * flower-breathe motif, light-bloom, scanline, oversized numerals, editorial
 * masthead, mech cards, the-line band, founding offer, live founding-wall
 * count, thank-you overlay.
 *
 * Real wiring layered on top of the static design:
 *   - reset form  → createFoundingCustomer + trackMovementJoin → thank-you overlay
 *   - founding CTA → createShopifyCart (real €29 founding checkout)
 *   - referral capture via captureRef/getRef
 */

const FOUNDING_DEPOSIT_VARIANT_ID = "gid://shopify/ProductVariant/53812317454679";
const CLAIMED = 73;

const FLOWER = (
  <svg viewBox="0 0 100 100">
    <g fill="currentColor">
      <circle cx="77" cy="50" r="20" /><circle cx="69.1" cy="69.1" r="20" /><circle cx="50" cy="77" r="20" />
      <circle cx="30.9" cy="69.1" r="20" /><circle cx="23" cy="50" r="20" /><circle cx="30.9" cy="30.9" r="20" />
      <circle cx="50" cy="23" r="20" /><circle cx="69.1" cy="30.9" r="20" /><circle cx="50" cy="50" r="26" />
    </g>
  </svg>
);

const CSS = `
.mv-root{
  --font-body:'Switzer','DM Sans','Inter',system-ui,-apple-system,sans-serif;
  --font-ui:var(--font-body);
  --zp-ink:#141414;--zp-ink-2:#141414;--zp-cream:#141414;--zp-white:#fff;--zp-bg:#FFFFFF;--zp-near-black:#FFFFFF;
  --brand:#2ED8A8;--brand-hover:#1BAF86;--brand-on-light:#0E7A54;--zp-teal:#2ED8A8;--zp-teal-dark:#1BAF86;
  --text-meta:#8E8E8E;--text-on-dark:#141414;--zp-mint:#F4FBF8;
  --action:#2ED8A8;--action-hover:#1BAF86;
  --zp-line:rgba(20,20,20,.10);--zp-line-strong:rgba(20,20,20,.28);--zp-line-dark:rgba(20,20,20,.10);
  --radius-pill:999px;--radius-card:0;
  --ease-out-soft:cubic-bezier(.22,.61,.36,1);
  font-family:var(--font-body);background:#FFFFFF;color:#141414;
  -webkit-font-smoothing:antialiased;overflow-x:clip;
}
.mv-root img{display:block;max-width:100%}
.mv-root a{color:inherit;text-decoration:none}
.mv-root ::selection{background:var(--brand);color:#141414}

.mv-root .wrap{max-width:1180px;margin:0 auto;padding:0 40px}
.mv-root .eyebrow{font-family:var(--font-ui);font-weight:500;font-size:11px;letter-spacing:.28em;text-transform:uppercase;display:inline-flex;align-items:center;gap:14px}
.mv-root .eyebrow .num{font-variant-numeric:tabular-nums;opacity:.55}
.mv-root .eyebrow .tick{width:26px;height:1px;background:currentColor;opacity:.4;display:inline-block}
.mv-root .serif{font-family:var(--font-body);font-weight:300;letter-spacing:-.02em}
.mv-root .display{font-family:var(--font-body);font-weight:300;letter-spacing:-.025em;line-height:1.02}
.mv-root .lede{font-size:17px;line-height:1.75;color:#5A5A5A}
.mv-root .lede-dark{font-size:17px;line-height:1.75;color:#5A5A5A}

.mv-root .pill{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-family:var(--font-ui);font-weight:600;font-size:12px;letter-spacing:.18em;text-transform:uppercase;border-radius:var(--radius-pill);padding:16px 30px;cursor:pointer;border:1px solid transparent;transition:background .18s ease,color .18s ease,border-color .18s ease,transform .12s ease;white-space:nowrap;line-height:1}
.mv-root .pill:active{transform:scale(.97)}
.mv-root .pill-action{background:var(--action);color:#141414}
.mv-root .pill-action:hover{background:var(--action-hover)}
.mv-root .pill-action:disabled{opacity:.6;cursor:default}
.mv-root .pill-ghost-dark{background:transparent;color:#141414;border-color:rgba(20,20,20,.28)}
.mv-root .pill-ghost-dark:hover{border-color:var(--brand-on-light);color:var(--brand-on-light)}
.mv-root .pill-ghost-light{background:transparent;color:#141414;border-color:var(--zp-line-strong)}
.mv-root .pill-ghost-light:hover{border-color:var(--brand-on-light);color:var(--brand-on-light)}

.mv-root .reveal{opacity:0;transform:translateY(24px);transition:opacity .85s var(--ease-out-soft),transform .85s var(--ease-out-soft);will-change:transform,opacity}
.mv-root .reveal.in{opacity:1;transform:none}

.mv-root .hero{position:relative;overflow:hidden;background:#FFFFFF}
.mv-root .hero-grid{display:grid;grid-template-columns:1.05fr .95fr;min-height:660px}
.mv-root .hero-copy{display:flex;flex-direction:column;justify-content:center;padding:72px 40px 72px 0;position:relative;z-index:3}
.mv-root .hero-media{position:relative;overflow:hidden}
.mv-root .hero-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.95)}
.mv-root .hero-media .veil{position:absolute;inset:0;background:linear-gradient(90deg,#FFFFFF 0%,transparent 22%)}
.mv-root .scanwrap{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.mv-root .scan{position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(46,216,168,.7),transparent);animation:mv-scan 9s ease-in-out 2s infinite}
@keyframes mv-scan{0%{transform:translateY(0);opacity:0}5%{opacity:.9}92%{opacity:.5}100%{transform:translateY(660px);opacity:0}}
.mv-root .hero h1{font-size:clamp(46px,6vw,92px);color:#141414;margin:26px 0 26px}
.mv-root .hero h1 .accent{color:var(--brand-on-light)}
.mv-root .hero .lede{max-width:500px;margin-bottom:34px}
.mv-root .hero-cta{display:flex;gap:14px;flex-wrap:wrap;margin-bottom:34px}
.mv-root .momentum{display:inline-flex;align-items:center;gap:14px;padding:11px 18px;border:1px solid var(--zp-line);border-radius:var(--radius-pill);background:rgba(46,216,168,.05)}
.mv-root .momentum .dot{width:7px;height:7px;border-radius:50%;background:var(--brand);box-shadow:0 0 0 0 rgba(46,216,168,.5);animation:mv-pulse 2.4s infinite}
@keyframes mv-pulse{0%{box-shadow:0 0 0 0 rgba(46,216,168,.45)}70%{box-shadow:0 0 0 10px rgba(46,216,168,0)}100%{box-shadow:0 0 0 0 rgba(46,216,168,0)}}
.mv-root .momentum span{font-family:var(--font-ui);font-size:11px;letter-spacing:.04em;color:#5A5A5A}
.mv-root .momentum b{color:var(--brand-on-light);font-weight:600;font-variant-numeric:tabular-nums}
@keyframes mv-breathe{0%,100%{transform:scale(1);opacity:var(--bo,.05)}50%{transform:scale(1.06);opacity:calc(var(--bo,.05) * 1.8)}}
.mv-root .flower-wm{position:absolute;pointer-events:none;color:var(--brand-on-light)}
.mv-root .flower-wm .breathe{width:100%;height:100%;animation:mv-breathe 12s ease-in-out infinite;transform-origin:center;will-change:transform,opacity;opacity:var(--bo,.05)}
.mv-root .flower-wm svg{display:block;width:100%;height:100%}
.mv-root .hero-flower{top:50%;right:28%;width:min(44vw,500px);aspect-ratio:1;transform:translateY(-50%);z-index:1;--bo:.07}
.mv-root .line-flower{top:50%;left:50%;width:min(76vw,820px);aspect-ratio:1;transform:translate(-50%,-50%);z-index:1;--bo:.09}
.mv-root .bloom{position:absolute;inset:0;pointer-events:none;z-index:0}
.mv-root .hero-bloom{background:radial-gradient(60% 55% at 72% 32%,rgba(46,216,168,.10),transparent 64%)}
.mv-root .line-bloom{background:radial-gradient(46% 60% at 50% 50%,rgba(46,216,168,.12),transparent 66%)}
.mv-root .bignum{position:absolute;top:clamp(28px,4.5vw,60px);right:clamp(16px,5vw,72px);z-index:0;pointer-events:none;font-family:var(--font-body);font-weight:300;line-height:.8;letter-spacing:-.04em;font-size:clamp(96px,15vw,230px);color:rgba(14,122,84,.10)}
.mv-root .bignum.on{color:rgba(14,122,84,.10)}
.mv-root .masthead{display:flex;align-items:center;gap:14px;font-family:var(--font-ui);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#8E8E8E}
.mv-root .masthead .seg{white-space:nowrap}
.mv-root .masthead .seg.dim{color:rgba(20,20,20,.35)}
.mv-root .masthead .rule{flex:1;height:1px;background:linear-gradient(90deg,rgba(20,20,20,.25),rgba(20,20,20,.05));min-width:24px}
.mv-root .hero-foot{position:absolute;bottom:30px;left:0;display:flex;align-items:flex-end;gap:18px;font-family:var(--font-ui);font-size:10px;letter-spacing:.3em;text-transform:uppercase;color:#8E8E8E}
@media(max-width:860px){.mv-root .hero-grid{grid-template-columns:1fr}.mv-root .hero-media{order:-1;min-height:42vh}.mv-root .hero-copy{padding:48px 0}.mv-root .hero-foot{position:static;margin-top:30px}}

.mv-root section{position:relative}
.mv-root .sec{padding:clamp(80px,11vw,128px) 0}
.mv-root .sec-cream{background:#FFFFFF;color:#141414}
.mv-root .sec-fog{background:#FFFFFF;color:#141414;border-top:1px solid var(--zp-line)}
.mv-root .sec-dark{background:#FFFFFF;color:#141414;border-top:1px solid var(--zp-line);border-bottom:1px solid var(--zp-line)}
.mv-root .sec-clinical{background:#FFFFFF;color:#141414;border-top:1px solid var(--zp-line);border-bottom:1px solid var(--zp-line)}
.mv-root .sec h2{font-size:clamp(32px,4.4vw,58px);line-height:1.05;margin:22px 0}
.mv-root .sec h2.tight{margin-bottom:0}
.mv-root .meta-eyebrow{color:var(--text-meta)}
.mv-root .brand-eyebrow{color:var(--brand-on-light)}
.mv-root .gold-eyebrow{color:var(--text-meta)}
.mv-root .ondark-eyebrow{color:var(--brand-on-light)}

.mv-root .diag{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.mv-root .diag-img{border-radius:var(--radius-card);overflow:hidden;aspect-ratio:4/5;background:var(--zp-white)}
.mv-root .diag-img img{width:100%;height:100%;object-fit:cover}
.mv-root .diag p+p{margin-top:18px}
.mv-root .diag .kicker{font-family:var(--font-body);font-weight:300;letter-spacing:-.01em;font-size:21px;color:#141414;margin-top:24px}
@media(max-width:860px){.mv-root .diag{grid-template-columns:1fr;gap:32px}.mv-root .diag-img{order:-1;aspect-ratio:16/10}}

.mv-root .triad{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--zp-line);border:1px solid var(--zp-line);margin-top:54px}
.mv-root .tcard{background:#FFFFFF;padding:40px 34px;min-height:230px;display:flex;flex-direction:column;justify-content:space-between}
.mv-root .tcard .tnum{font-family:var(--font-ui);font-size:11px;letter-spacing:.2em;color:var(--text-meta)}
.mv-root .tcard h3{font-family:var(--font-body);font-weight:300;letter-spacing:-.02em;font-size:30px;color:#141414;margin:0 0 14px}
.mv-root .tcard p{font-size:14px;line-height:1.6;color:#5A5A5A}
@media(max-width:760px){.mv-root .triad{grid-template-columns:1fr}}

.mv-root .mech{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--zp-line);border:1px solid var(--zp-line);margin-top:54px}
.mv-root .mcard{background:#FFFFFF;padding:38px 32px}
.mv-root .mcard .mnum{font-family:var(--font-ui);font-size:11px;letter-spacing:.2em;color:#8E8E8E;margin-bottom:22px}
.mv-root .mcard h3{font-family:var(--font-body);font-weight:300;letter-spacing:-.02em;font-size:23px;color:var(--brand-on-light);margin:0 0 14px}
.mv-root .mcard p{font-size:14px;line-height:1.7;color:#5A5A5A}
.mv-root .disclaimer{font-size:12px;color:#8E8E8E;margin-top:34px;max-width:620px;line-height:1.6}
@media(max-width:760px){.mv-root .mech{grid-template-columns:1fr}}

.mv-root .line-band{text-align:center;padding:clamp(96px,14vw,168px) 0;position:relative;overflow:hidden;background:var(--zp-mint);border-top:1px solid var(--zp-line);border-bottom:1px solid var(--zp-line)}
.mv-root .line-band .lbl{font-family:var(--font-ui);font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#8E8E8E;margin-bottom:30px}
.mv-root .line-band .big{font-size:clamp(40px,7vw,104px);line-height:1.0;color:#141414}
.mv-root .line-band .big .accent{color:var(--brand-on-light)}

.mv-root .reset{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.mv-root .reset-card{background:#FFFFFF;border:1px solid var(--zp-line);border-radius:var(--radius-card);padding:44px;position:relative;overflow:hidden}
.mv-root .reset-card .glow{position:absolute;inset:0;background:radial-gradient(420px circle at 80% 0%,rgba(46,216,168,.08),transparent 65%);pointer-events:none}
.mv-root .field-row{display:flex;gap:12px;margin-top:26px;position:relative;z-index:2;flex-wrap:wrap}
.mv-root .field-row input{flex:1;min-width:200px;font-family:var(--font-body);font-size:15px;color:#141414;background:#FFFFFF;border:1px solid var(--zp-line-strong);border-radius:var(--radius-pill);padding:15px 22px;outline:none;transition:border-color .18s,box-shadow .18s}
.mv-root .field-row input::placeholder{color:#8E8E8E}
.mv-root .field-row input:focus{border-color:var(--brand-on-light);box-shadow:0 0 0 3px rgba(46,216,168,.16)}
.mv-root .microcopy{font-family:var(--font-ui);font-size:11px;letter-spacing:.06em;color:#8E8E8E;margin-top:16px}
.mv-root .reset h2{color:#141414}
@media(max-width:860px){.mv-root .reset{grid-template-columns:1fr;gap:40px}}

.mv-root .offer{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:start}
.mv-root .stack{list-style:none;margin-top:38px}
.mv-root .stack li{display:flex;justify-content:space-between;gap:20px;padding:18px 0;border-bottom:1px solid var(--zp-line)}
.mv-root .stack li:first-child{border-top:1px solid var(--zp-line)}
.mv-root .stack .si-main{font-family:var(--font-body);font-size:15px;color:#141414}
.mv-root .stack .si-sub{font-size:13px;color:#5A5A5A;line-height:1.5;margin-top:5px;max-width:380px}
.mv-root .stack .si-val{font-family:var(--font-ui);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--brand-on-light);white-space:nowrap;padding-top:2px}
.mv-root .offer-side{background:#FFFFFF;border:1px solid var(--zp-line);border-radius:var(--radius-card);padding:40px;position:sticky;top:88px}
.mv-root .offer-side .ov-val{font-family:var(--font-ui);font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:var(--text-meta)}
.mv-root .offer-side .ov-price{font-family:var(--font-body);font-weight:300;letter-spacing:-.03em;font-size:64px;color:#141414;line-height:1;margin:6px 0}
.mv-root .offer-side .ov-note{font-size:13px;color:#5A5A5A;margin-bottom:24px}
.mv-root .offer-side .pill{width:100%;margin-bottom:12px}
.mv-root .offer-side .guarantee{font-size:12px;line-height:1.6;color:#5A5A5A;margin-top:18px;padding-top:18px;border-top:1px solid var(--zp-line)}
.mv-root .offer-side .guarantee a{color:var(--brand-on-light);text-decoration:underline}
@media(max-width:860px){.mv-root .offer{grid-template-columns:1fr;gap:40px}.mv-root .offer-side{position:static}}

.mv-root .wall{margin-top:80px;border-top:1px solid var(--zp-line);padding-top:56px}
.mv-root .wall-head{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:26px}
.mv-root .wall-head h3{font-family:var(--font-body);font-weight:300;letter-spacing:-.02em;font-size:34px;color:#141414}
.mv-root .wall-count{font-family:var(--font-body);font-weight:300;font-size:34px;color:var(--brand-on-light);font-variant-numeric:tabular-nums}
.mv-root .wall-count small{font-size:18px;color:#8E8E8E}
.mv-root .bar{height:6px;border-radius:3px;background:rgba(20,20,20,.08);overflow:hidden}
.mv-root .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--brand),var(--zp-teal-dark));border-radius:3px;transition:width 1.6s var(--ease-out-soft)}
.mv-root .joiners{display:flex;align-items:center;gap:14px;margin-top:26px;flex-wrap:wrap}
.mv-root .avatars{display:flex}
.mv-root .avatars span{width:34px;height:34px;border-radius:50%;border:2px solid #FFFFFF;margin-left:-10px;display:flex;align-items:center;justify-content:center;font-family:var(--font-ui);font-size:11px;font-weight:600;color:#141414;background:var(--zp-mint)}
.mv-root .avatars span:first-child{margin-left:0}
.mv-root .avatars span:nth-child(2){background:var(--brand)}
.mv-root .avatars span:nth-child(3){background:var(--zp-mint)}
.mv-root .avatars span:nth-child(4){background:var(--brand)}
.mv-root .joiners .jtext{font-family:var(--font-ui);font-size:12px;letter-spacing:.04em;color:#5A5A5A}
.mv-root .joiners .jtext b{color:var(--brand-on-light)}

.mv-root .closing{text-align:center}
.mv-root .closing h2{font-size:clamp(34px,5vw,68px);max-width:14ch;margin:0 auto 26px;color:#141414}
.mv-root .closing .lede-dark{max-width:560px;margin:0 auto 36px}
.mv-root .share{display:flex;align-items:center;justify-content:center;gap:12px;margin-top:34px;flex-wrap:wrap}
.mv-root .share .slbl{font-family:var(--font-ui);font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:var(--text-meta)}
.mv-root .share button{font-family:var(--font-ui);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#141414;background:transparent;border:1px solid var(--zp-line-strong);border-radius:var(--radius-pill);padding:9px 18px;cursor:pointer;transition:.18s}
.mv-root .share button:hover{border-color:var(--brand-on-light);color:var(--brand-on-light)}

.mv-ty{position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;padding:28px;background:rgba(20,20,20,.5);backdrop-filter:blur(10px);opacity:0;visibility:hidden;transition:opacity .25s ease}
.mv-ty.open{opacity:1;visibility:visible}
.mv-ty .ty-card{position:relative;overflow:hidden;width:100%;max-width:580px;background:#FFFFFF;border:1px solid rgba(20,20,20,.10);border-radius:0;padding:52px 48px;text-align:center;font-family:'Switzer','DM Sans',system-ui,sans-serif;color:#141414}
.mv-ty .ty-card .glow{position:absolute;inset:0;background:radial-gradient(520px circle at 50% -10%,rgba(46,216,168,.10),transparent 60%);pointer-events:none}
.mv-ty .ty-close{position:absolute;top:18px;right:20px;background:none;border:none;cursor:pointer;color:#8E8E8E;font-size:22px;line-height:1;transition:color .18s;z-index:3}
.mv-ty .ty-close:hover{color:#0E7A54}
.mv-ty .ty-mark{position:relative;z-index:2;margin:0 auto 22px;width:44px;height:44px;color:#0E7A54}
.mv-ty .ty-mark svg{width:100%;height:100%}
.mv-ty .eyebrow{position:relative;z-index:2;justify-content:center;font-family:'Switzer','DM Sans',system-ui,sans-serif;font-weight:500;font-size:11px;letter-spacing:.28em;text-transform:uppercase;display:inline-flex;align-items:center;gap:14px;color:#0E7A54}
.mv-ty .eyebrow .tick{width:26px;height:1px;background:currentColor;opacity:.4;display:inline-block}
.mv-ty h2{position:relative;z-index:2;font-family:'Switzer','DM Sans',system-ui,sans-serif;font-weight:300;letter-spacing:-.025em;font-size:clamp(32px,5vw,46px);line-height:1.04;color:#141414;margin:18px 0 14px}
.mv-ty .ty-to{position:relative;z-index:2;font-family:'Switzer','DM Sans',system-ui,sans-serif;font-size:12px;letter-spacing:.04em;color:#5A5A5A;margin-bottom:30px}
.mv-ty .ty-to b{color:#0E7A54;font-weight:500}
.mv-ty .ty-steps{position:relative;z-index:2;list-style:none;text-align:left;max-width:380px;margin:0 auto 30px;display:flex;flex-direction:column;gap:14px;padding:0}
.mv-ty .ty-steps li{display:flex;gap:14px;align-items:flex-start}
.mv-ty .ty-steps .sn{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid #0E7A54;color:#0E7A54;font-family:'Switzer','DM Sans',system-ui,sans-serif;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;font-variant-numeric:tabular-nums}
.mv-ty .ty-steps .st{font-size:14px;line-height:1.55;color:#5A5A5A}
.mv-ty .ty-steps .st b{color:#141414;font-weight:500}
.mv-ty .ty-upsell{position:relative;z-index:2;margin-top:6px;font-size:13px;color:#5A5A5A}
.mv-ty .ty-upsell a{color:#0E7A54;border-bottom:1px solid rgba(14,122,84,.4);padding-bottom:1px;cursor:pointer}

@media(prefers-reduced-motion:reduce){.mv-root .scan{animation:none;display:none}.mv-root .momentum .dot{animation:none}.mv-root .reveal{opacity:1;transform:none;transition:none}.mv-root .flower-wm .breathe{animation:none}}
`;

const STACK: { main: string; sub: string; val: string }[] = [
  { main: "The 30-Day Nervous-System Reset", sub: "Lands today. The full week-by-week guided programme, yours the moment you join.", val: "€47 value" },
  { main: "The Daily Reset Library", sub: "Lands today. Four resets for the day: morning, midday, pre-sleep, pre-training.", val: "€29 value" },
  { main: "Your named place in the Founding 100", sub: "First in, building the movement from day one.", val: "Lands today" },
  { main: "A seat in the first guided cohort", sub: "When it runs. A live 30-day cohort with the founding hundred.", val: "€90 value" },
  { main: "Founding price on the device", sub: "Locked to your email, honoured when the device is your next step.", val: "Founding price" },
  { main: "Lifetime founding membership rate", sub: "Locked lower for good, if and when the membership opens.", val: "€120 value" },
];

export default function TruthMovement() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [micro, setMicro] = useState("One reset, one truth per week. No noise. Leave anytime.");
  const [tyOpen, setTyOpen] = useState(false);
  const [tyEmail, setTyEmail] = useState("you@domain.com");
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositMsg, setDepositMsg] = useState<string | null>(null);
  const [copyLabel, setCopyLabel] = useState("Copy link");

  // referral capture + scroll-reveal + count-up (faithful to the design's vanilla JS)
  useEffect(() => {
    captureRef();
    const root = rootRef.current;
    if (!root) return;
    const revealEls = [...root.querySelectorAll<HTMLElement>(".reveal")];
    const prefersReduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let barDone = false;

    const countUp = (el: HTMLElement | null, to: number, dur: number) => {
      if (!el) return;
      if (prefersReduce) { el.textContent = String(to); return; }
      let s: number | null = null;
      const step = (t: number) => {
        if (s === null) s = t;
        const p = Math.min((t - s) / dur, 1);
        el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const paint = () => {
      const vh = window.innerHeight;
      revealEls.forEach((el) => {
        if (el.classList.contains("in")) return;
        if (el.getBoundingClientRect().top < vh * 0.88) el.classList.add("in");
      });
      const wall = root.querySelector<HTMLElement>(".wall");
      if (!barDone && wall && wall.getBoundingClientRect().top < vh * 0.7) {
        const bar = root.querySelector<HTMLElement>("#mvWallBar");
        if (bar) bar.style.width = CLAIMED + "%";
        countUp(root.querySelector<HTMLElement>("#mvWallCount"), CLAIMED, 1500);
        barDone = true;
      }
    };

    countUp(root.querySelector<HTMLElement>("#mvHeroCount"), CLAIMED, 1500);
    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    const failsafe = setTimeout(() => revealEls.forEach((el) => el.classList.add("in")), 2500);
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
      clearTimeout(failsafe);
    };
  }, []);

  useEffect(() => {
    if (!tyOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setTyOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [tyOpen]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const addr = email.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(addr)) return;
    setSubmitting(true);
    try {
      const result = await createFoundingCustomer(addr);
      if (result.success || result.error === "already_exists") {
        trackMovementJoin(addr, "movement-reset");
        setTyEmail(addr);
        setTyOpen(true);
        setEmail("");
        setMicro("You are in. Your reset is on its way.");
      } else {
        setMicro("Something went wrong. Please try again.");
      }
    } catch {
      setMicro("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeposit = async () => {
    trackDepositIntent();
    if (!FOUNDING_DEPOSIT_VARIANT_ID) {
      document.getElementById("reset")?.scrollIntoView({ behavior: "smooth" });
      setDepositMsg("The Founding Circle opens shortly. Join below and you go first in line.");
      return;
    }
    setDepositLoading(true);
    setDepositMsg(null);
    try {
      const ref = getRef();
      const attrs = [{ key: "movement_source", value: "truth-movement" }];
      if (ref) attrs.push({ key: "referred_by", value: ref });
      const cart = await createShopifyCart(FOUNDING_DEPOSIT_VARIANT_ID, 1, attrs);
      if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
      else setDepositMsg("Could not open checkout. Please try again.");
    } catch {
      setDepositMsg("Could not open checkout. Please try again.");
    } finally {
      setDepositLoading(false);
    }
  };

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const shareMovement = (mode: "x" | "copy") => {
    const url = "https://zentialpure.com/movement";
    const text = "Reclaim your own frequency. Six minutes a day. Zential Pure.";
    if (mode === "x") {
      window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url), "_blank");
      return;
    }
    navigator.clipboard?.writeText(url);
    setCopyLabel("Link copied");
    setTimeout(() => setCopyLabel("Copy link"), 1800);
  };

  return (
    <PageShell
      title="The Movement · Reclaim your own frequency | Zential Pure"
      description="Modern life keeps your system switched on. Sports, stress, skin are downstream. Join the people taking the controls back, six minutes at a time."
      canonical="https://zentialpure.com/movement"
      hideHero
    >
      <div className="mv-root" ref={rootRef}>
        <style>{CSS}</style>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="bloom hero-bloom" />
          <div className="flower-wm hero-flower" aria-hidden><div className="breathe">{FLOWER}</div></div>
          <div className="wrap">
            <div className="hero-grid">
              <div className="hero-copy reveal">
                <p className="eyebrow ondark-eyebrow"><span className="num">( 01 )</span><span className="tick" /> Zential Pure · The Movement</p>
                <h1 className="display">Reclaim your<br />own <span className="accent">frequency.</span></h1>
                <p className="lede">You were not built for a world that never lets your system power down. The cost shows up everywhere. Your sleep. Your training. Your stress. Your skin. This is the place where we take the controls back.</p>
                <div className="hero-cta">
                  <button className="pill pill-action" onClick={() => scrollTo("reset")}>Get the 6-Minute Reset</button>
                  <button className="pill pill-ghost-dark" onClick={() => scrollTo("diagnosis")}>Read the manifesto</button>
                </div>
                <div className="momentum">
                  <span className="dot" />
                  <span><b id="mvHeroCount">73</b> of 100 founding places claimed</span>
                </div>
                <div className="hero-foot">
                  <div className="masthead" style={{ width: "100%" }}>
                    <span className="seg">Issue 001</span>
                    <span className="rule" />
                    <span className="seg">Resonance Series</span>
                    <span className="rule" />
                    <span className="seg dim">Edition 2026</span>
                  </div>
                </div>
              </div>
              <div className="hero-media">
                <img src={edThreshold} alt="Bare feet stepping across a sunlit threshold" />
                <div className="veil" />
                <div className="scanwrap"><div className="scan" /></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 01 DIAGNOSIS ── */}
        <section className="sec sec-cream" id="diagnosis">
          <div className="bignum">01</div>
          <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
            <div className="diag">
              <div className="reveal">
                <p className="eyebrow meta-eyebrow"><span className="num">01</span><span className="tick" /> Diagnosis</p>
                <h2 className="serif tight" style={{ marginTop: 18 }}>Notice your breath.<br />Right now.</h2>
                <p className="lede-dark" style={{ marginTop: 28 }}>Most people reading this are holding their breath. Shallow. Frozen. A body braced against a screen that never stops asking for more.</p>
                <p className="lede-dark">Modern life is an interference engine. It keeps your nervous system switched on when it was built to switch off. You feel it before you can name it. The shallow breath at the desk. The sleep that does not restore. The training that stops working. The face that looks tired after a full night.</p>
                <p className="kicker serif">This is not who you are. It is what the noise does to you.</p>
              </div>
              <div className="diag-img reveal"><img src={edSeatedCalm} alt="A moment of stillness" /></div>
            </div>
          </div>
        </section>

        {/* ── 02 REFRAME ── */}
        <section className="sec sec-fog">
          <div className="bignum">02</div>
          <div className="wrap reveal" style={{ position: "relative", zIndex: 1 }}>
            <p className="eyebrow meta-eyebrow"><span className="num">02</span><span className="tick" /> Reframe</p>
            <h2 className="serif" style={{ maxWidth: "18ch" }}>One nerve is a gadget. The whole system is a practice.</h2>
            <p className="lede-dark" style={{ maxWidth: 620 }}>The market sells you a single nerve, a single fix, a single mode. Regulation does not work that way. The body is one connected system. Calm the signal, then feed the tissue. That is the whole point.</p>
            <div className="triad">
              <div className="tcard"><div className="tnum">i</div><div><h3>Sports</h3><p>Recovery is a nervous-system event before it is a muscle event.</p></div></div>
              <div className="tcard"><div className="tnum">ii</div><div><h3>Stress</h3><p>A system that never down-regulates never fully repairs.</p></div></div>
              <div className="tcard"><div className="tnum">iii</div><div><h3>Skin</h3><p>The face keeps the score. Tension and cortisol show up there first.</p></div></div>
            </div>
          </div>
        </section>

        {/* ── 03 SCIENCE ── */}
        <section className="sec sec-clinical">
          <div className="bignum on">03</div>
          <div className="wrap reveal" style={{ position: "relative", zIndex: 2 }}>
            <p className="eyebrow ondark-eyebrow"><span className="num">03</span><span className="tick" /> Science, made human</p>
            <h2 className="serif" style={{ color: "var(--zp-cream)" }}>Mechanism over marketing.</h2>
            <div className="mech">
              <div className="mcard"><div className="mnum">01 · Cortisol</div><h3>The long-term project</h3><p>Cortisol tells the body to stop investing in long-term projects. Collagen synthesis is a long-term project. Under chronic load the system reads it as not now.</p></div>
              <div className="mcard"><div className="mnum">02 · Microcurrent</div><h3>It mirrors the signal</h3><p>Microcurrent works because your face already runs on electricity. It does not override the signal. It mirrors it. That is why it works with the body over time, not against it.</p></div>
              <div className="mcard"><div className="mnum">03 · Red light</div><h3>A process they know</h3><p>Red light at 630 to 660 nanometres does not add anything to your cells. It supports a process they already know. The mitochondria respond. The renewal cycle that slowed starts moving again.</p></div>
            </div>
            <p className="disclaimer">We name mechanisms, not outcomes. This is education, not medical advice, and not a promise of any specific result.</p>
          </div>
        </section>

        {/* ── 04 RITUAL ── */}
        <section className="sec sec-cream">
          <div className="bignum">04</div>
          <div className="wrap reveal" style={{ textAlign: "center", maxWidth: 760, position: "relative", zIndex: 1 }}>
            <p className="eyebrow meta-eyebrow" style={{ justifyContent: "center" }}><span className="num">04</span><span className="tick" /> Ritual</p>
            <h2 className="serif" style={{ marginBottom: 18 }}>Six minutes, before the world asks anything of you.</h2>
            <p className="lede-dark" style={{ margin: "0 auto 8px" }}>The most radical thing you can do right now is be unreachable for six minutes while you bring your own system back online. Before the emails. Before the noise. Six minutes that belong to no one but you.</p>
            <p className="kicker serif" style={{ fontSize: 24, marginTop: 24 }}>The ritual is the result.</p>
          </div>
        </section>

        {/* ── THE LINE ── */}
        <section className="line-band sec-dark">
          <div className="bloom line-bloom" />
          <div className="flower-wm line-flower" aria-hidden><div className="breathe">{FLOWER}</div></div>
          <div className="wrap" style={{ position: "relative", zIndex: 2 }}>
            <p className="lbl">The line we live by</p>
            <p className="display big">The body remembers<br />its <span className="accent">frequency.</span></p>
          </div>
          <div className="scanwrap"><div className="scan" style={{ animationDelay: "4s" }} /></div>
        </section>

        {/* ── 05 RESET (real email capture) ── */}
        <section className="sec sec-fog" id="reset">
          <div className="wrap">
            <div className="reset">
              <div className="reveal">
                <p className="eyebrow brand-eyebrow"><span className="num">05</span><span className="tick" /> The Reset</p>
                <h2 className="serif" style={{ color: "var(--zp-ink)" }}>Get the 6-Minute Reset.</h2>
                <p className="lede-dark" style={{ maxWidth: 440 }}>A simple down-regulation practice you can run anywhere, plus one true finding each week on how your system actually works. This is the door into the movement.</p>
              </div>
              <div className="reset-card reveal">
                <div className="glow" />
                <p className="eyebrow ondark-eyebrow" style={{ position: "relative", zIndex: 2 }}>Free · Arrives instantly</p>
                <h3 className="serif" style={{ fontSize: 30, color: "var(--zp-cream)", margin: "14px 0 0", position: "relative", zIndex: 2 }}>One reset. One truth per&nbsp;week.</h3>
                <form className="field-row" onSubmit={handleReset}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" aria-label="Email address" required />
                  <button type="submit" className="pill pill-action" disabled={submitting}>{submitting ? "Sending" : "Send me the reset"}</button>
                </form>
                <p className="microcopy">{micro}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 FOUNDING 100 (real checkout) ── */}
        <section className="sec sec-dark" id="join">
          <div className="bignum on">06</div>
          <div className="wrap reveal" style={{ position: "relative", zIndex: 1 }}>
            <p className="eyebrow ondark-eyebrow"><span className="num">06</span><span className="tick" /> Founding Circle</p>
            <h2 className="serif" style={{ color: "var(--zp-cream)" }}>First one hundred.</h2>
            <p className="lede" style={{ maxWidth: 560 }}>One hundred people start this together. You get the whole system, a guided month, and a rate that never comes back. Not a token. A real head start.</p>

            <div className="offer" style={{ marginTop: 48 }}>
              <div>
                <ul className="stack">
                  {STACK.map((s) => (
                    <li key={s.main}>
                      <div><div className="si-main">{s.main}</div><div className="si-sub">{s.sub}</div></div>
                      <div className="si-val">{s.val}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="offer-side">
                <p className="ov-val">Over €285 in value</p>
                <p className="ov-price">€29</p>
                <p className="ov-note">once · founding rate</p>
                <button className="pill pill-action" onClick={handleDeposit} disabled={depositLoading}>{depositLoading ? "Opening" : "Claim your founding place"}</button>
                <button className="pill pill-ghost-light" onClick={() => scrollTo("reset")}>Just send the reset first</button>
                <p className="guarantee">The 30-Day Reset Guarantee. Run it. If your system does not feel more your own, full refund and you keep the protocol. <a href="/founding-terms">Founding terms</a>.</p>
                {depositMsg && <p className="ov-note" style={{ marginTop: 14, marginBottom: 0 }}>{depositMsg}</p>}
              </aside>
            </div>

            <div className="wall reveal">
              <div className="wall-head">
                <h3>The Founding 100.</h3>
                <div className="wall-count"><span id="mvWallCount">73</span><small> / 100 claimed</small></div>
              </div>
              <div className="bar"><i id="mvWallBar" style={{ width: "73%" }} /></div>
              <div className="joiners">
                <div className="avatars"><span>M</span><span>A</span><span>J</span><span>S</span></div>
                <span className="jtext">Mara, Anke, Jonas and 70 others have taken their place. <b>27 places remain.</b></span>
              </div>
            </div>
          </div>
        </section>

        {/* ── CLOSING MANIFESTO ── */}
        <section className="sec sec-cream">
          <div className="wrap closing reveal">
            <p className="eyebrow gold-eyebrow" style={{ justifyContent: "center" }}><span className="tick" /> The standard <span className="tick" /></p>
            <h2 className="serif">You are allowed to take your morning seriously.</h2>
            <p className="lede-dark">To build something that is only for you. We are the people taking the controls back, six minutes at a time. Truth over hype. Mechanism over marketing.</p>
            <button className="pill pill-action" onClick={() => scrollTo("reset")}>Reclaim your frequency</button>
            <div className="share">
              <span className="slbl">Bring someone in</span>
              <button onClick={() => shareMovement("x")}>Share on X</button>
              <button onClick={() => shareMovement("copy")}>{copyLabel}</button>
            </div>
          </div>
        </section>

        {/* ── THANK-YOU OVERLAY ── */}
        <div className={`mv-ty${tyOpen ? " open" : ""}`} role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) setTyOpen(false); }}>
          <div className="ty-card">
            <div className="glow" />
            <button className="ty-close" aria-label="Close" onClick={() => setTyOpen(false)}>&times;</button>
            <div className="ty-mark">{FLOWER}</div>
            <p className="eyebrow"><span className="tick" /> You are in · The Movement <span className="tick" /></p>
            <h2>Your reset is on its way.</h2>
            <p className="ty-to">Sent to <b>{tyEmail}</b></p>
            <ul className="ty-steps">
              <li><span className="sn">1</span><span className="st"><b>Open the email.</b> Your 6-Minute Reset is inside, ready to run tonight.</span></li>
              <li><span className="sn">2</span><span className="st"><b>Run it tomorrow morning.</b> Before the emails. Before the noise. Six minutes that belong to no one but you.</span></li>
              <li><span className="sn">3</span><span className="st"><b>One truth each week.</b> A single, true finding on how your system actually works. No noise.</span></li>
            </ul>
            <p className="ty-upsell">Want the whole system? <a onClick={() => { setTyOpen(false); scrollTo("join"); }}>27 founding places remain &rarr;</a></p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
