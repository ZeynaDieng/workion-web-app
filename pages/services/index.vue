<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Tous nos services
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Découvrez notre large gamme de services à domicile disponibles près de chez vous
          </p>
          
          <!-- Barre de recherche -->
          <div class="max-w-2xl mx-auto">
            <div class="relative">
              <input 
                v-model="searchQuery"
                @input="handleSearch"
                type="text" 
                placeholder="Rechercher un service..." 
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
          
          <!-- Filtre par catégorie -->
          <select 
            v-model="selectedCategory"
            @change="handleCategoryChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les catégories</option>
            <option value="maison">Maison & Entretien</option>
            <option value="jardin">Jardin & Extérieur</option>
            <option value="technique">Services Techniques</option>
            <option value="personnel">Services Personnels</option>
          </select>

          <!-- Filtre par disponibilité -->
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

    <!-- Liste des services -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Chargement des services...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p class="text-gray-600 mb-4">Impossible de charger les services pour le moment.</p>
          <button 
            @click="refresh()"
            class="btn-primary"
          >
            Réessayer
          </button>
        </div>

        <!-- Services grid -->
        <div v-else-if="services?.length" class="space-y-8">
          <!-- Résultats -->
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900">
              {{ filteredServicesCount }} service{{ filteredServicesCount > 1 ? 's' : '' }} trouvé{{ filteredServicesCount > 1 ? 's' : '' }}
            </h2>
            
            <!-- Tri -->
            <select 
              v-model="sortBy"
              @change="handleSortChange"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Nom A-Z</option>
              <option value="name-desc">Nom Z-A</option>
              <option value="popular">Plus populaires</option>
              <option value="recent">Plus récents</option>
            </select>
          </div>

          <!-- Grid des services -->
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            <ServiceCard 
              v-for="service in services" 
              :key="service.id"
              :service="service"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aucun service trouvé</h3>
          <p class="text-gray-600 mb-4">
            {{ searchQuery ? 'Aucun service ne correspond à votre recherche.' : 'Aucun service disponible pour le moment.' }}
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
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Services à domicile - Workion',
  meta: [
    {
      name: 'description',
      content: 'Découvrez tous nos services à domicile : ménage, jardinage, plomberie, électricité et bien plus encore. Trouvez le prestataire idéal près de chez vous.'
    },
    {
      name: 'keywords',
      content: 'services à domicile, ménage, jardinage, plomberie, électricité, cuisine, Sénégal'
    }
  ]
})

// Stores
const apiStore = useApiStore()

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const availableNow = ref(false)
const sortBy = ref('name')
const currentPage = ref(1)
const limit = 24

// Computed
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || availableNow.value
})

const filteredServicesCount = computed(() => {
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
const { data, pending, error, refresh } = await useLazyAsyncData('services', () => 
  apiStore.getServices({
    page: currentPage.value,
    limit,
    search: searchQuery.value || undefined
  })
)
console.log('🔧 Services Page API Response:', data.value)
console.log('⚠️ Services Page Error:', error.value)

const services = computed(() => data.value?.data?.items || [])

// Methods
const handleSearch = useDebounceFn(() => {
  currentPage.value = 1
  refresh()
}, 300)

const handleCategoryChange = () => {
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
  selectedCategory.value = ''
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

// Watch route query for search
const route = useRoute()
watch(() => route.query.q, (newQuery) => {
  if (newQuery && typeof newQuery === 'string') {
    searchQuery.value = newQuery
    handleSearch()
  }
}, { immediate: true })
</script>
