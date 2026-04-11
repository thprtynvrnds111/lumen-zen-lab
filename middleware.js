const BOT_PATTERN = /googlebot|google-inspectiontool|bingbot|yandexbot|baiduspider|duckduckbot|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|slackbot|discordbot|applebot|pinterestbot|redditbot|gptbot|chatgpt-user|claude-web|anthropic-ai|perplexitybot|cohere-ai|ia_archiver|semrushbot|ahrefsbot/i

export default async function middleware(request) {
  const ua = request.headers.get('user-agent') || ''
  const url = new URL(request.url)

  if (url.pathname === '/' && BOT_PATTERN.test(ua)) {
    const snapshot = new URL('/seo-snapshot.html', request.url)
    return Response.redirect(snapshot, 302)
  }

  // Return undefined = pass through to normal Vercel routing
  return
}

export const config = {
  matcher: '/'
}
