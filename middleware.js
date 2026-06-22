const BOT_PATTERN = /googlebot|google-inspectiontool|bingbot|yandexbot|baiduspider|duckduckbot|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|applebot|pinterestbot|redditbot|gptbot|chatgpt-user|claude-web|anthropic-ai|perplexitybot|cohere-ai|ia_archiver|semrushbot|ahrefsbot/i

// handle → { title, description, image }
// image paths reference files already deployed in /public/images/
const PRODUCT_OG = {
  'color-light-import-micro-current-vibration-massager': {
    title: 'Frequency Wand | At-Home Microcurrent &amp; Light Therapy | Zential Pure',
    description: 'The Zential Pure Frequency Wand combines microcurrent, colour light therapy, and vibration massage for professional-grade facial rejuvenation — in 10 minutes a day.',
    image: 'https://zentialpure.com/images/frequency-wand-hero.png',
  },
  'facial-beauty-tools-and-ems-beauty-equipment': {
    title: 'Sculpt Wand | EMS + Microcurrent + Blue Light | Zential Pure',
    description: 'The Zential Pure Sculpt Wand — EMS + Microcurrent + Blue Light. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/sculpt-wand-hero.png',
  },
  'eye-massage': {
    title: 'Eye Activator | Microcurrent + Red Light + Thermal | Zential Pure',
    description: 'The Zential Pure Eye Activator — Microcurrent + Red Light + Thermal. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/eye-activator-hero.png',
  },
  '3d-eye-beauty-instrument-micro-current-pulse-eye-relax-reduce-wrinkles-and-dark-circle-remove-eye-bags-massager-beauty-tool': {
    title: 'Frame Pulse | Microcurrent + Pulse + Thermal | Zential Pure',
    description: 'The Zential Pure Frame Pulse — Microcurrent + Pulse + Thermal. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/frame-pulse-hero.png',
  },
  'electric-guasha-massager': {
    title: 'Gua Sha Frequency | Microcurrent + Red Light + Gua Sha | Zential Pure',
    description: 'The Zential Pure Gua Sha Frequency — Microcurrent + Red Light + Gua Sha. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/gua-sha-frequency-hero.png',
  },
  'electric-micro-current': {
    title: 'Skin Pulse | Pure Microcurrent | Zential Pure',
    description: 'The Zential Pure Skin Pulse — Pure Microcurrent. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/skin-pulse-hero.png',
  },
  'red-light-blu-ray-cosmetic-instrument-face-lifting-and-tightening': {
    title: 'Microcurrent Sculpt Wand | Advanced Dual-Wave | Zential Pure',
    description: 'The Zential Pure Microcurrent Sculpt Wand — advanced dual-wave microcurrent with LED integration. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/microcurrent-hero.png',
  },
  'portable-ems-microcurrent-facial-beauty-device': {
    title: 'Frequency Wand Pro | RF + LED + EMS + Thermal | Zential Pure',
    description: 'The Zential Pure Frequency Wand Pro — RF + LED + EMS + Thermal. Clinical precision for your daily ritual.',
    image: 'https://zentialpure.com/images/frequency-wand-pro-hero.png',
  },
  'body-lift': {
    title: 'Body Lift | Microcurrent Facial Lift | Zential Pure',
    description: 'The Zential Pure Body Lift — microcurrent facial lift built for daily structural support.',
    image: 'https://zentialpure.com/og-image.jpg',
  },
  'lifting-and-tightening-face-introducer': {
    title: 'Face Introducer | Multi-Frequency Facial Sculptor | Zential Pure',
    description: 'The Zential Pure Face Introducer — multi-frequency facial sculptor combining EMS, LED, and ion infusion for visible definition.',
    image: 'https://zentialpure.com/og-image.jpg',
  },
  'medicube-collagen-elastic-jelly-moisturizing-cream': {
    title: 'Collagen Face Gel | Device-Optimized Conductive Gel | Zential Pure',
    description: 'Zential Pure Collagen Face Gel — device-optimized conductive gel with collagen complex for enhanced device performance.',
    image: 'https://zentialpure.com/og-image.jpg',
  },
  'collagen-eye-mask': {
    title: 'Collagen PDRN Eye Pads | Concentrated Eye Patches | Zential Pure',
    description: 'Zential Pure Collagen PDRN Eye Pads — concentrated under-eye patches with PDRN technology.',
    image: 'https://zentialpure.com/og-image.jpg',
  },
}

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  const url = new URL(request.url)

  // Homepage: redirect crawlers to static SEO snapshot
  if (url.pathname === '/' && BOT_PATTERN.test(ua)) {
    const snapshot = new URL('/seo-snapshot.html', request.url)
    return Response.redirect(snapshot, 302)
  }

  // Product pages: inject product-specific OG tags for crawlers
  const productMatch = url.pathname.match(/^\/product\/(.+)$/)
  if (productMatch && BOT_PATTERN.test(ua)) {
    const handle = productMatch[1]
    const og = PRODUCT_OG[handle]

    if (og) {
      // Fetch the SPA shell (goes directly to origin, does not re-trigger middleware)
      const indexResponse = await fetch(new URL('/', request.url).toString(), {
        headers: { 'user-agent': 'Zential-OG-Bot/1.0' },
      })
      let html = await indexResponse.text()
      const productUrl = `https://zentialpure.com${url.pathname}`

      // Replace all variable OG values in one pass
      html = html
        .replace(
          /(<meta property="og:type" content=")[^"]*(")/,
          `$1product$2`
        )
        .replace(
          /(<meta property="og:url" content=")[^"]*(")/,
          `$1${productUrl}$2`
        )
        .replace(
          /(<meta property="og:title" content=")[^"]*(")/,
          `$1${og.title}$2`
        )
        .replace(
          /(<meta property="og:description" content=")[^"]*(")/,
          `$1${og.description}$2`
        )
        .replace(
          /(<meta property="og:image" content=")[^"]*(")/,
          `$1${og.image}$2`
        )
        .replace(
          /(<meta name="twitter:title" content=")[^"]*(")/,
          `$1${og.title}$2`
        )
        .replace(
          /(<meta name="twitter:description" content=")[^"]*(")/,
          `$1${og.description}$2`
        )
        .replace(
          /(<meta name="twitter:image" content=")[^"]*(")/,
          `$1${og.image}$2`
        )

      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
        },
      })
    }
  }

  // Pass through to normal Vercel routing
  return
}

export const config = {
  matcher: ['/', '/product/:path*'],
}
