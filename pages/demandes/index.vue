<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Demandes de services
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Découvrez les dernières demandes de services postées par nos clients
          </p>
          
          <!-- CTA Button -->
          <NuxtLink 
            to="/poster-demande"
            class="btn-primary inline-flex items-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Poster une demande
          </NuxtLink>
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

          <!-- Filtre par statut -->
          <select 
            v-model="selectedStatus"
            @change="handleStatusChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="running">En cours</option>
            <option value="complete">Terminé</option>
            <option value="failed">Échoué</option>
            <option value="canceled">Annulé</option>
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

          <!-- Filtre par budget -->
          <select 
            v-model="selectedBudget"
            @change="handleBudgetChange"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Tous les budgets</option>
            <option value="0-10000">Moins de 10 000 FCFA</option>
            <option value="10000-25000">10 000 - 25 000 FCFA</option>
            <option value="25000-50000">25 000 - 50 000 FCFA</option>
            <option value="50000+">Plus de 50 000 FCFA</option>
          </select>

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

    <!-- Liste des demandes -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="pending" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Chargement des demandes...</p>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-600 mb-4">
            <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Erreur de chargement</h3>
          <p class="text-gray-600 mb-4">Impossible de charger les demandes pour le moment.</p>
          <button 
            @click="refresh()"
            class="btn-primary"
          >
            Réessayer
          </button>
        </div>

        <!-- Demandes grid -->
        <div v-else-if="requests?.length" class="space-y-8">
          <!-- Résultats -->
          <div class="flex justify-between items-center">
            <h2 class="text-2xl font-semibold text-gray-900">
              {{ filteredRequestsCount }} demande{{ filteredRequestsCount > 1 ? 's' : '' }} trouvée{{ filteredRequestsCount > 1 ? 's' : '' }}
            </h2>
            
            <!-- Tri -->
            <select 
              v-model="sortBy"
              @change="handleSortChange"
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="budget-high">Budget décroissant</option>
              <option value="budget-low">Budget croissant</option>
              <option value="popular">Plus populaires</option>
            </select>
          </div>

          <!-- Grid des demandes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceRequestCard 
              v-for="request in requests" 
              :key="request.id"
              :request="request"
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune demande trouvée</h3>
          <p class="text-gray-600 mb-4">
            {{ hasActiveFilters ? 'Aucune demande ne correspond à vos critères.' : 'Aucune demande disponible pour le moment.' }}
          </p>
          <div class="space-x-4">
            <button 
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="btn-secondary"
            >
              Réinitialiser les filtres
            </button>
            <NuxtLink to="/poster-demande" class="btn-primary">
              Poster la première demande
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Statistiques des demandes
          </h2>
          <p class="text-xl text-gray-600">
            Aperçu de l'activité sur notre plateforme
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">{{ stats.totalRequests }}</div>
            <div class="text-gray-600">Demandes totales</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ stats.completedRequests }}</div>
            <div class="text-gray-600">Demandes réalisées</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-yellow-600 mb-2">{{ stats.activeRequests }}</div>
            <div class="text-gray-600">En cours</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">{{ stats.averagePrice }}</div>
            <div class="text-gray-600">Prix moyen (FCFA)</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Besoin d'un service ?
        </h2>
        <p class="text-xl mb-8 text-green-100">
          Postez votre demande et recevez des propositions de prestataires qualifiés
        </p>
        <NuxtLink to="/poster-demande" class="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center">
          Poster ma demande
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Demandes de services à domicile - Workion',
  meta: [
    {
      name: 'description',
      content: 'Consultez les dernières demandes de services à domicile postées par nos clients. Trouvez des opportunités de travail près de chez vous.'
    },
    {
      name: 'keywords',
      content: 'demandes services à domicile, opportunités travail, prestataires, Sénégal'
    }
  ]
})

// Stores
const apiStore = useApiStore()

// Reactive data
const selectedService = ref('')
const selectedStatus = ref('')
const selectedLocation = ref('')
const selectedBudget = ref('')
const sortBy = ref('recent')
const currentPage = ref(1)
const limit = 10

// Available services for filter
const availableServices = ref([
  { id: 'menage', name: 'Ménage' },
  { id: 'jardinage', name: 'Jardinage' },
  { id: 'plomberie', name: 'Plomberie' },
  { id: 'electricite', name: 'Électricité' },
  { id: 'cuisine', name: 'Cuisine' },
  { id: 'peinture', name: 'Peinture' }
])

// Stats (mock data)
const stats = ref({
  totalRequests: 1247,
  completedRequests: 892,
  activeRequests: 156,
  averagePrice: '18,500'
})

// Computed
const hasActiveFilters = computed(() => {
  return selectedService.value || selectedStatus.value || selectedLocation.value || selectedBudget.value
})

const filteredRequestsCount = computed(() => {
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
const { data, pending, error, refresh } = await useLazyAsyncData('service-requests', () => 
  apiStore.getServiceRequests({
    page: currentPage.value,
    limit,
    serviceId: selectedService.value || undefined,
    status: selectedStatus.value || undefined
  })
)
console.log('📋 Service Requests Page API Response:', data.value)
console.log('⚠️ Service Requests Page Error:', error.value)

const requests = computed(() => data.value?.data?.serviceRequests || [])

// Methods
const handleServiceChange = () => {
  currentPage.value = 1
  refresh()
}

const handleStatusChange = () => {
  currentPage.value = 1
  refresh()
}

const handleLocationChange = () => {
  currentPage.value = 1
  refresh()
}

const handleBudgetChange = () => {
  currentPage.value = 1
  refresh()
}

const handleSortChange = () => {
  refresh()
}

const resetFilters = () => {
  selectedService.value = ''
  selectedStatus.value = ''
  selectedLocation.value = ''
  selectedBudget.value = ''
  sortBy.value = 'recent'
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
</script>
