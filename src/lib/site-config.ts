const DEFAULT_LOCAL_SITE_URL = 'http://127.0.0.1:3004'

export function getSiteUrl(rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL): string {
  const normalizedSiteUrl =
    typeof rawSiteUrl === 'string' && rawSiteUrl.trim() ? rawSiteUrl.trim() : DEFAULT_LOCAL_SITE_URL

  return /^https?:\/\//.test(normalizedSiteUrl)
    ? normalizedSiteUrl
    : `https://${normalizedSiteUrl}`
}

export function getMetadataBase(rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL): URL {
  return new URL(getSiteUrl(rawSiteUrl))
}
