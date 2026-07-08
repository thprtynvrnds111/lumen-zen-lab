import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  jsonLd?: Record<string, unknown>;
  /** ISO date string. Emitted as article:published_time when ogType === "article". */
  publishedTime?: string;
}

const SITE_URL = "https://zentialpure.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function SEO({
  title,
  description,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  canonicalUrl,
  jsonLd,
  publishedTime,
}: SEOProps) {
  const canonicalHref = canonicalUrl
    ? /^https?:\/\//i.test(canonicalUrl)
      ? canonicalUrl
      : `${SITE_URL}${canonicalUrl}`
    : null;
  const ogUrl = canonicalHref ?? SITE_URL;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical — only rendered when the page's URL is explicitly provided */}
      {canonicalHref && <link rel="canonical" href={canonicalHref} />}

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
