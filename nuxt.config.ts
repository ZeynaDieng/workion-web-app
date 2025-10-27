// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],

  // Pinia configuration
  pinia: {
    storesDirs: ['./stores/**']
  },

  // App configuration
  app: {
    head: {
      title: 'Workion - Plateforme de Services à Domicile',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Trouvez facilement des prestataires de services à domicile qualifiés près de chez vous. Ménage, jardinage, plomberie, et bien plus encore.' 
        },
        { name: 'keywords', content: 'services à domicile, prestataires, ménage, jardinage, plomberie, Sénégal, Dakar' },
        { property: 'og:title', content: 'Workion - Plateforme de Services à Domicile' },
        { property: 'og:description', content: 'Trouvez facilement des prestataires de services à domicile qualifiés près de chez vous.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://workion.app' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Workion - Plateforme de Services à Domicile' },
        { name: 'twitter:description', content: 'Trouvez facilement des prestataires de services à domicile qualifiés près de chez vous.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://workion.app' }
      ]
    }
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    apiSecret: process.env.API_SECRET,
    // Public keys (exposed to client-side)
    public: {
      phoneEncryptionKey: process.env.PHONE_ENCRYPTION_KEY,
      apiBase: process.env.API_BASE_URL || 'http://localhost:3000',
      appUrl: process.env.APP_URL || 'http://localhost:3001',
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    }
  },

  // SSR Configuration
  ssr: false,
  
  // Experimental features
  experimental: {
    payloadExtraction: false
  },
  
  // Nitro configuration for better SEO
  nitro: {
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt']
    },
    experimental: {
      wasm: true
    }
  },

  // Vite configuration for Node.js compatibility
  vite: {
    define: {
      global: 'globalThis'
    },
    optimizeDeps: {
      include: ['undici']
    }
  },

  // Router configuration
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  }
})
