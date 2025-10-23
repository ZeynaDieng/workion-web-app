export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.appUrl || 'https://workion.app'
  
  // URLs statiques
  const staticUrls = [
    { loc: '/', priority: 1.0, changefreq: 'daily' },
    { loc: '/services', priority: 0.9, changefreq: 'weekly' },
    { loc: '/prestataires', priority: 0.9, changefreq: 'daily' },
    { loc: '/demandes', priority: 0.8, changefreq: 'daily' },
    { loc: '/poster-demande', priority: 0.7, changefreq: 'monthly' },
    { loc: '/comment-ca-marche', priority: 0.6, changefreq: 'monthly' },
    { loc: '/devenir-prestataire', priority: 0.7, changefreq: 'monthly' },
    { loc: '/contact', priority: 0.5, changefreq: 'monthly' },
    { loc: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
    { loc: '/politique-confidentialite', priority: 0.3, changefreq: 'yearly' },
    { loc: '/conditions-utilisation', priority: 0.3, changefreq: 'yearly' }
  ]

  // TODO: Ajouter les URLs dynamiques depuis l'API
  // - Services individuels (/services/[slug])
  // - Prestataires (/prestataires/[slug])
  // - Demandes (/demandes/[id])

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map(url => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})
