# Pinterest launch notes — editorial pages (Phase 1)

## Account activation (operator, once)
1. Pinterest business account → Settings → Claimed accounts → claim zentialpure.com.
2. Validate Rich Pins: https://developers.pinterest.com/tools/url-debugger/ with
   https://zentialpure.com/editorial/the-science (Article markup is live on all 3 pages).
3. Create boards: Skin Science · The Ritual · Recovery · Mechanism · The Journal.

## Pages
| Page | URL | Pin headline | Pin description (SEO keywords bolded) |
|---|---|---|---|
| The Ritual | /editorial/the-ritual | Ten quiet minutes. | A slow-living **morning ritual** for **skin recovery**: warmth, red light, attention. The 12-minute protocol, explained without hype. **red light therapy** · **wellness routine** · **self care ritual** |
| The Science | /editorial/the-science | What 660nm actually does. | An annotated, footnoted read on **red light therapy** and skin tissue — **photobiomodulation** explained mechanism-first. **660nm** · **skin science** · **at-home skin tech** |
| The Diagnosis | /editorial/the-diagnosis | Why your skin stopped listening. | Skin is electrical before it is chemical. Why **microcurrent**, EMS, thermal and LED belong in one **skincare ritual**. **facial device** · **skin biohacking** |
| The Journal (hub) | /journal | Skin science you can pin. | Pin board of **skin science** facts, rituals and expert notes from the Zential journal. **red light therapy** · **skincare science** · **wellness rituals** |

All pin destination URLs get `?utm_source=pinterest&utm_medium=pin&utm_campaign={slug}&utm_content={pin-id}`.

## og:image status
The 1000×1500 og:images in `public/og/` are designed pin cards (editorial tokens,
Lora/DM Sans, cream + dark clinical styles) rendered at launch — not raw photo crops.
Pin-system Phase 2 renders already exist at `~/zential-agent-engine/pin-system/renders/`
(30 renders) — ready to swap in, same filenames, drop-in, after operator review.

## Pixel hygiene (verified at build)
Editorial pages fire PageView (global) + ViewContent only.
