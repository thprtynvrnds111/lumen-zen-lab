import { NextRequest, NextResponse } from 'next/server'

// All major crawlers + AI platforms
const BOT_PATTERN = /googlebot|google-inspectiontool|bingbot|yandexbot|baiduspider|duckduckbot|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|applebot|pinterestbot|redditbot|gptbot|chatgpt-user|claude-web|anthropic-ai|perplexitybot|cohere-ai|ia_archiver|semrushbot|ahrefsbot|mj12bot/i

export function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent') || ''
  const { pathname } = req.nextUrl

  // Only intercept homepage and product paths
  if (pathname === '/' || pathname.startsWith('/product')) {
    if (BOT_PATTERN.test(ua)) {
      // Rewrite to static SEO snapshot — bots get full content
      const staticUrl = new URL('/seo-snapshot.html', req.url)
      return NextResponse.rewrite(staticUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/product/:path*']
}
