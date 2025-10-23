<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Loading state -->
    <div v-if="pending" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Chargement du service...</p>
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Service non trouvé</h1>
        <p class="text-gray-600 mb-4">Le service que vous recherchez n'existe pas ou a été supprimé.</p>
        <NuxtLink to="/services" class="btn-primary">
          Voir tous les services
        </NuxtLink>
      </div>
    </div>

    <!-- Service content -->
    <div v-else-if="service">
      <!-- Hero Section -->
      <section class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <!-- Breadcrumb -->
          <nav class="flex mb-8" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600 inline-flex items-center">
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                  </svg>
                  Accueil
                </NuxtLink>
              </li>
              <li>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <NuxtLink to="/services" class="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Services</NuxtLink>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="ml-1 text-gray-500 md:ml-2">{{ service.name }}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Service Info -->
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-6">
                {{ service.name }}
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                {{ service.description }}
              </p>
              
              <!-- Stats -->
              <div class="grid grid-cols-2 gap-6 mb-8">
                <div class="text-center p-4 bg-blue-50 rounded-lg">
                  <div class="text-2xl font-bold text-blue-600">{{ providersCount }}</div>
                  <div class="text-sm text-gray-600">Prestataires disponibles</div>
                </div>
                <div class="text-center p-4 bg-green-50 rounded-lg">
                  <div class="text-2xl font-bold text-green-600">{{ requestsCount }}</div>
                  <div class="text-sm text-gray-600">Demandes ce mois</div>
                </div>
              </div>

              <!-- CTA Buttons -->
              <div class="flex flex-col sm:flex-row gap-4">
                <NuxtLink 
                  :to="`/poster-demande?service=${service.id}`"
                  class="btn-primary flex-1 text-center"
                >
                  Poster une demande
                </NuxtLink>
                <NuxtLink 
                  :to="`/prestataires?service=${service.id}`"
                  class="btn-secondary flex-1 text-center"
                >
                  Voir les prestataires
                </NuxtLink>
              </div>
            </div>

            <!-- Service Image -->
            <div class="relative">
              <div class="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600">
                <img 
                  v-if="service.cover?.url_streaming" 
                  :src="service.cover.url_streaming" 
                  :alt="service.name"
                  class="w-full h-full object-cover"
                >
                <div v-else class="flex items-center justify-center h-full">
                  <div class="text-center text-white">
                    <div class="text-6xl mb-4">🔧</div>
                    <div class="text-xl font-semibold">{{ service.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Prestataires recommandés -->
      <section v-if="featuredProviders?.length" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Prestataires recommandés pour {{ service.name }}
            </h2>
            <p class="text-xl text-gray-600">
              Découvrez nos meilleurs prestataires certifiés
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ProviderCard 
              v-for="provider in featuredProviders" 
              :key="provider.id"
              :provider="provider"
            />
          </div>

          <div class="text-center">
            <NuxtLink 
              :to="`/prestataires?service=${service.id}`"
              class="btn-primary inline-flex items-center"
            >
              Voir tous les prestataires
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Tarifs indicatifs -->
      <section v-if="prices?.length" class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Tarifs indicatifs
            </h2>
            <p class="text-xl text-gray-600">
              Exemples de tarifs pratiqués par nos prestataires
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="price in prices" 
              :key="price.id"
              class="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ price.title }}
              </h3>
              <div class="text-2xl font-bold text-blue-600 mb-2">
                {{ formatPrice(price.price) }} FCFA
              </div>
              <p v-if="price.description" class="text-gray-600 text-sm">
                {{ price.description }}
              </p>
            </div>
          </div>

          <div class="text-center mt-8">
            <p class="text-sm text-gray-500">
              * Les tarifs sont indicatifs et peuvent varier selon les prestataires et la complexité de la tâche
            </p>
          </div>
        </div>
      </section>

      <!-- Demandes récentes -->
      <section v-if="recentRequests?.length" class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Demandes récentes
            </h2>
            <p class="text-xl text-gray-600">
              Exemples de demandes pour {{ service.name }}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceRequestCard 
              v-for="request in recentRequests" 
              :key="request.id"
              :request="request"
            />
          </div>

          <div class="text-center mt-12">
            <NuxtLink to="/demandes" class="btn-primary inline-flex items-center">
              Voir toutes les demandes
              <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              Questions fréquentes
            </h2>
            <p class="text-xl text-gray-600">
              Tout ce que vous devez savoir sur {{ service.name }}
            </p>
          </div>

          <div class="space-y-6">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index"
              class="bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
              >
                <span class="font-medium text-gray-900">{{ faq.question }}</span>
                <svg 
                  :class="['w-5 h-5 text-gray-500 transition-transform', openFaq === index ? 'rotate-180' : '']"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div 
                v-if="openFaq === index"
                class="px-6 pb-4 text-gray-600"
              >
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// Route params
const route = useRoute()
const slug = route.params.slug

// Stores
const apiStore = useApiStore()

// SEO Meta (will be updated when service loads)
useHead({
  title: 'Service - Workion',
  meta: [
    { name: 'description', content: 'Découvrez ce service et trouvez le prestataire idéal près de chez vous.' }
  ]
})

// Reactive data
const openFaq = ref(null)

// API calls
const { data: serviceData, pending, error } = await useLazyAsyncData(`service-${slug}`, () => 
  apiStore.getServiceById(slug)
)
console.log('🔧 Service Detail API Response:', serviceData.value)
console.log('⚠️ Service Detail Error:', error.value)

const service = computed(() => serviceData.value?.data)

// Update SEO when service loads
watch(service, (newService) => {
  if (newService) {
    useHead({
      title: `${newService.name} - Services à domicile - Workion`,
      meta: [
        {
          name: 'description',
          content: `${newService.description} Trouvez des prestataires qualifiés pour ${newService.name} près de chez vous sur Workion.`
        },
        {
          name: 'keywords',
          content: `${newService.name}, services à domicile, prestataires, Sénégal`
        },
        {
          property: 'og:title',
          content: `${newService.name} - Services à domicile - Workion`
        },
        {
          property: 'og:description',
          content: `${newService.description} Trouvez des prestataires qualifiés pour ${newService.name} près de chez vous.`
        }
      ]
    })
  }
}, { immediate: true })

// Mock data (à remplacer par de vraies API calls)
const providersCount = ref(45)
const requestsCount = ref(23)

const featuredProviders = ref([
  {
    id: '1',
    firstname: 'Amadou',
    lastname: 'Diallo',
    slug: 'amadou-diallo',
    services: ['Ménage'],
    rating: 4.8,
    reviews: 45,
    certified: true,
    location: 'Dakar'
  },
  {
    id: '2',
    firstname: 'Fatou',
    lastname: 'Sow',
    slug: 'fatou-sow',
    services: ['Ménage'],
    rating: 4.9,
    reviews: 67,
    certified: true,
    location: 'Pikine'
  },
  {
    id: '3',
    firstname: 'Moussa',
    lastname: 'Ba',
    slug: 'moussa-ba',
    services: ['Ménage'],
    rating: 4.7,
    reviews: 32,
    certified: false,
    location: 'Guédiawaye'
  }
])

const prices = ref([
  {
    id: '1',
    title: 'Ménage complet appartement 2 pièces',
    price: 15000,
    description: 'Nettoyage complet, aspirateur, serpillière, salle de bain'
  },
  {
    id: '2',
    title: 'Ménage rapide studio',
    price: 8000,
    description: 'Nettoyage de base, rangement'
  },
  {
    id: '3',
    title: 'Grand ménage maison',
    price: 25000,
    description: 'Ménage approfondi, vitres, électroménager'
  }
])

const recentRequests = ref([
  {
    id: '1',
    details: 'Recherche femme de ménage pour appartement 3 pièces à Dakar Plateau, 2 fois par semaine',
    location: 'Dakar Plateau',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    details: 'Besoin d\'aide ménagère pour grand nettoyage avant déménagement',
    location: 'Pikine',
    createdAt: '2024-01-14'
  }
])

const faqs = ref([
  {
    question: 'Comment choisir le bon prestataire ?',
    answer: 'Consultez les profils, les avis clients, les certifications et comparez les tarifs. N\'hésitez pas à contacter plusieurs prestataires pour discuter de vos besoins.'
  },
  {
    question: 'Les prestataires sont-ils assurés ?',
    answer: 'Nous recommandons fortement à nos prestataires d\'avoir une assurance responsabilité civile. Vérifiez ce point lors de votre premier contact.'
  },
  {
    question: 'Comment se passe le paiement ?',
    answer: 'Le paiement se fait directement entre vous et le prestataire selon les modalités convenues (espèces, mobile money, virement).'
  },
  {
    question: 'Que faire en cas de problème ?',
    answer: 'Contactez notre service client via l\'application ou par téléphone. Nous vous aiderons à résoudre tout différend avec le prestataire.'
  }
])

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

// 404 handling
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service non trouvé'
  })
}
</script>
