<template>
  <div>
    <!-- Loading state -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Prestataire non trouvé</h1>
        <p class="text-gray-600 mb-8">Le prestataire que vous recherchez n'existe pas ou a été supprimé.</p>
        <NuxtLink to="/prestataires" class="btn-primary">
          Retour aux prestataires
        </NuxtLink>
      </div>
    </div>

    <!-- Provider details -->
    <div v-else-if="provider" class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <!-- Photo de profil -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img 
                  v-if="provider.profilePicture" 
                  :src="provider.profilePicture" 
                  :alt="`${provider.firstname} ${provider.lastname}`"
                  class="w-full h-full object-cover"
                >
                <div v-else class="w-full h-full bg-blue-500 flex items-center justify-center">
                  <span class="text-3xl font-bold">
                    {{ provider.firstname.charAt(0) }}{{ provider.lastname.charAt(0) }}
                  </span>
                </div>
              </div>
              
              <!-- Badge de certification -->
              <div v-if="provider.certified" class="absolute -bottom-2 -right-2">
                <div class="bg-green-500 text-white p-2 rounded-full">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Informations principales -->
            <div class="text-center md:text-left flex-1">
              <h1 class="text-4xl font-bold mb-2">
                {{ provider.firstname }} {{ provider.lastname }}
              </h1>
              
              <div class="flex items-center justify-center md:justify-start mb-4">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-blue-100">{{ provider.location || 'Localisation non précisée' }}</span>
              </div>

              <!-- Note et avis -->
              <div class="flex items-center justify-center md:justify-start mb-6">
                <div class="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <svg class="w-5 h-5 text-yellow-400 fill-current mr-2" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="font-semibold mr-2">{{ provider.rating || 'N/A' }}</span>
                  <span class="text-blue-100">({{ provider.reviews || 0 }} avis)</span>
                </div>
              </div>

              <!-- Services -->
              <div class="flex flex-wrap gap-2 justify-center md:justify-start">
                <span 
                  v-for="service in provider.services?.slice(0, 5)" 
                  :key="service"
                  class="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
                >
                  {{ service }}
                </span>
                <span 
                  v-if="provider.services?.length > 5"
                  class="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm"
                >
                  +{{ provider.services.length - 5 }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-4">
              <button class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors">
                Contacter
              </button>
              <button class="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors">
                Ajouter aux favoris
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Contenu principal -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Colonne principale -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Description -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
                <p class="text-gray-600 leading-relaxed">
                  {{ provider.description || 'Aucune description disponible pour ce prestataire.' }}
                </p>
              </div>

              <!-- Services détaillés -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Services proposés</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="service in provider.services" 
                    :key="service"
                    class="flex items-center p-4 border border-gray-200 rounded-lg"
                  >
                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                      <span class="text-blue-600">🔧</span>
                    </div>
                    <span class="font-medium text-gray-900">{{ service }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Informations de contact -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <div class="space-y-3">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    </svg>
                    <span class="text-gray-600">{{ provider.location || 'Non précisé' }}</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600">Disponible maintenant</span>
                  </div>
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span class="text-gray-600">{{ provider.certified ? 'Certifié' : 'Non certifié' }}</span>
                  </div>
                </div>
              </div>

              <!-- Statistiques -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
                <div class="space-y-4">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Missions réalisées</span>
                    <span class="font-semibold">{{ provider.completedJobs || 0 }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Taux de satisfaction</span>
                    <span class="font-semibold">{{ provider.satisfactionRate || 'N/A' }}%</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Temps de réponse</span>
                    <span class="font-semibold">{{ provider.responseTime || 'N/A' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
const route = useRoute()
const providerId = route.params.id as string

const apiStore = useApiStore()

// API call
const { data, pending, error } = await useLazyAsyncData(`provider-${providerId}`, () => 
  apiStore.getProviderById(providerId)
)
console.log('👤 Provider Detail API Response:', data.value)
console.log('⚠️ Provider Detail Error:', error.value)

const provider = computed(() => data.value?.data)

// SEO
useHead({
  title: computed(() => provider.value ? `${provider.value.firstname} ${provider.value.lastname} - Prestataire Workion` : 'Prestataire - Workion'),
  meta: [
    {
      name: 'description',
      content: computed(() => provider.value ? `Découvrez le profil de ${provider.value.firstname} ${provider.value.lastname}, prestataire de services à domicile sur Workion.` : 'Profil prestataire Workion')
    }
  ]
})
</script>
