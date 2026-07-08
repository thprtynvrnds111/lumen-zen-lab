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
| The Journal (hub) | /journal | Skin science you can pin, verify, and practice. | The Zential Pure pin board: **mechanism** notes, **ritual** essays and expert voices on **red light therapy**, **microcurrent** and **skin recovery**. |

All pin destination URLs get `?utm_source=pinterest&utm_medium=pin&utm_campaign={slug}&utm_content={pin-id}`.

## og:image status
The 1000×1500 og:images in `public/og/` are designed pin cards (editorial tokens,
Lora/DM Sans, cream + dark clinical styles) rendered at launch — not raw photo crops.
When pin-system (Phase 2) ships its template engine, regenerate through it with the
same filenames; they are drop-in.

## Pixel hygiene (verified at build)
Editorial pages fire PageView (global) + ViewContent only.
