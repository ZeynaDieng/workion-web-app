export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.appUrl || 'https://workion.app'
  
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/api/sitemap.xml

# Disallow admin and private pages
Disallow: /admin/
Disallow: /api/
Disallow: /_nuxt/

# Allow important pages
Allow: /
Allow: /services
Allow: /prestataires
Allow: /demandes
Allow: /poster-demande
Allow: /comment-ca-marche
Allow: /devenir-prestataire

# Crawl delay
Crawl-delay: 1`

  setHeader(event, 'Content-Type', 'text/plain')
  return robots
})
