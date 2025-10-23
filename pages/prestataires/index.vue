<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Nos prestataires certifiés
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Découvrez des professionnels qualifiés et vérifiés près de chez vous
          </p>
          
          <!-- Barre de recherche -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input 
                v-model="searchQuery"
                @input="handleSearch"
                type="text" 
                placeholder="Rechercher un prestataire..." 
                class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtres -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-wrap items-center gap-4">
          <span class="text-sm font-medium text-gray-700">Filtrer par :</span>
          
          <!-- Filtre par service -->
          <select 
            v-model="selectedService"
            @change="handleServiceChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les services</option>
            <option v-for="service in availableServices" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>

          <!-- Filtre par localisation -->
          <select 
            v-model="selectedLocation"
            @change="handleLocationChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les localisations</option>
            <option value="dakar">Dakar</option>
            <option value="pikine">Pikine</option>
            <option value="guediawaye">Guédiawaye</option>
            <option value="rufisque">Rufisque</option>
            <option value="thies">Thiès</option>
          </select>

          <!-- Filtre certification -->
          <div class="flex items-center space-x-2">
            <input 
              id="certified-only" 
              v-model="certifiedOnly"
              @change="handleCertificationChange"
              type="checkbox" 
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <label for="certified-only" class="text-sm text-gray-700">Certifiés uniquement</label>
          </div>

          <!-- Filtre disponibilité -->
          <div class="flex items-center space-x-2">
            <input 
              id="available-now" 
              v-model="availableNow"
              @change="handleAvailabilityChange"
              type="checkbox" 
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            >
            <label for="available-now" class="text-sm text-gray-700">Disponible maintenant</label>
          </div>

          <!-- Bouton reset -->
          <button 
            v-if="hasActiveFilters"
            @click="resetFilters"
            class="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </section>

    <!-- Liste des prestataires -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Chargement des prestataires...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p class="text-gray-600 mb-4">Impossible de charger les prestataires pour le moment.</p>
          <button 
            @click="refresh()"
            class="btn-primary"
          >
            Réessayer
          </button>
        </div>

        <!-- Prestataires grid -->
        <div v-else-if="providers?.length" class="space-y-8">
          <!-- Résultats -->
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900">
              {{ filteredProvidersCount }} prestataire{{ filteredProvidersCount > 1 ? 's' : '' }} trouvé{{ filteredProvidersCount > 1 ? 's' : '' }}
            </h2>
            
            <!-- Tri -->
            <select 
              v-model="sortBy"
              @change="handleSortChange"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
              <option value="rating">Mieux notés</option>
              <option value="recent">Plus récents</option>
              <option value="certified">Certifiés d'abord</option>
            </select>
          </div>

          <!-- Grid des prestataires -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProviderCard 
              v-for="provider in providers" 
              :key="provider.id"
              :provider="provider"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center mt-12">
            <nav class="flex items-center space-x-2">
              <button 
                :disabled="currentPage === 1"
                @click="goToPage(currentPage - 1)"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Précédent
              </button>
              
              <template v-for="page in visiblePages" :key="page">
                <button 
                  v-if="page !== '...'"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-md',
                    page === currentPage 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  ]"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
                <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
              </template>
              
              <button 
                :disabled="currentPage === totalPages"
                @click="goToPage(currentPage + 1)"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            </nav>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun prestataire trouvé</h3>
          <p class="text-gray-600 mb-4">
            {{ searchQuery ? 'Aucun prestataire ne correspond à votre recherche.' : 'Aucun prestataire disponible pour le moment.' }}
          </p>
          <button 
            v-if="hasActiveFilters"
            @click="resetFilters"
            class="btn-primary"
          >
            Réinitialiser les filtres
          </button>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Vous êtes prestataire ?
        </h2>
        <p class="text-xl mb-8 text-blue-100">
          Rejoignez notre communauté de professionnels et développez votre activité
        </p>
        <NuxtLink to="/devenir-prestataire" class="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center">
          Devenir prestataire
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Prestataires de services à domicile - Workion',
  meta: [
    {
      name: 'description',
      content: 'Trouvez des prestataires de services à domicile qualifiés et certifiés près de chez vous. Ménage, jardinage, plomberie, électricité et bien plus encore.'
    },
    {
      name: 'keywords',
      content: 'prestataires services à domicile, professionnels certifiés, Sénégal, Dakar'
    }
  ]
})

// Stores
const apiStore = useApiStore()

// Reactive data
const searchQuery = ref('')
const selectedService = ref('')
const selectedLocation = ref('')
const certifiedOnly = ref(false)
const availableNow = ref(false)
const sortBy = ref('name')
const currentPage = ref(1)
const limit = 12

// Available services for filter
const availableServices = ref([
  { id: 'menage', name: 'Ménage' },
  { id: 'jardinage', name: 'Jardinage' },
  { id: 'plomberie', name: 'Plomberie' },
  { id: 'electricite', name: 'Électricité' },
  { id: 'cuisine', name: 'Cuisine' },
  { id: 'peinture', name: 'Peinture' }
])

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedService.value || selectedLocation.value || certifiedOnly.value || availableNow.value
})

const filteredProvidersCount = computed(() => {
  return data.value?.data?.total || 0
})

const totalPages = computed(() => {
  return data.value?.data?.totalPages || 1
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// API call
const { data, pending, error, refresh } = await useLazyAsyncData('providers', () => 
  apiStore.getProviders({
    page: currentPage.value,
    limit,
    search: searchQuery.value || undefined,
    services: selectedService.value ? [selectedService.value] : undefined,
    location: selectedLocation.value || undefined,
    certified: certifiedOnly.value || undefined
  })
)
console.log(data.value)
const providers = computed(() => data.value?.data?.items || [])

// Methods
const handleSearch = useDebounceFn(() => {
  currentPage.value = 1
  refresh()
}, 300)

const handleServiceChange = () => {
  currentPage.value = 1
  refresh()
}

const handleLocationChange = () => {
  currentPage.value = 1
  refresh()
}

const handleCertificationChange = () => {
  currentPage.value = 1
  refresh()
}

const handleAvailabilityChange = () => {
  currentPage.value = 1
  refresh()
}

const handleSortChange = () => {
  refresh()
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedService.value = ''
  selectedLocation.value = ''
  certifiedOnly.value = false
  availableNow.value = false
  sortBy.value = 'name'
  currentPage.value = 1
  refresh()
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    refresh()
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// Watch route query for service filter
const route = useRoute()
watch(() => route.query.service, (newService) => {
  if (newService && typeof newService === 'string') {
    selectedService.value = newService
    handleServiceChange()
  }
}, { immediate: true })
</script>
