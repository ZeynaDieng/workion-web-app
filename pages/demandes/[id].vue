<template>
  <div>
    <!-- Loading state -->
    <div v-if="pending" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Demande non trouvée</h1>
        <p class="text-gray-600 mb-8">La demande que vous recherchez n'existe pas ou a été supprimée.</p>
        <NuxtLink to="/demandes" class="btn-primary">
          Retour aux demandes
        </NuxtLink>
      </div>
    </div>

    <!-- Request details -->
    <div v-else-if="request" class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl">
            <div class="flex items-center mb-4">
              <NuxtLink to="/demandes" class="text-blue-200 hover:text-white mr-4">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </NuxtLink>
              <span class="text-blue-200">Demande #{{ request.reqNumber || request.id }}</span>
            </div>
            
            <h1 class="text-4xl font-bold mb-6">
              {{ request.title || 'Demande de service' }}
            </h1>
            
            <div class="flex flex-wrap items-center gap-6 text-blue-100">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {{ request.location || 'Localisation non précisée' }}
              </div>
              
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ formatDate(request.createdAt) }}
              </div>
              
              <div class="flex items-center">
                <span 
                  :class="[
                    'px-3 py-1 rounded-full text-sm font-medium',
                    getStatusClass(request.status)
                  ]"
                >
                  {{ getStatusText(request.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Main content -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Description -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Description de la demande</h2>
                <div class="prose prose-lg max-w-none">
                  <p class="text-gray-600 leading-relaxed whitespace-pre-line">
                    {{ request.details }}
                  </p>
                </div>
              </div>

              <!-- Services demandés -->
              <div v-if="request.services?.length" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Services demandés</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="service in request.services" 
                    :key="typeof service === 'string' ? service : service.id"
                    class="flex items-center p-4 border border-gray-200 rounded-lg"
                  >
                    <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                      <span class="text-blue-600">🔧</span>
                    </div>
                    <span class="font-medium text-gray-900">
                      {{ typeof service === 'string' ? service : service.name }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Photos/Documents -->
              <div v-if="request.images?.length" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-4">Photos jointes</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div 
                    v-for="image in request.images" 
                    :key="image.id || image"
                    class="aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    <img 
                      :src="typeof image === 'string' ? image : image.url" 
                      :alt="typeof image === 'string' ? 'Image' : image.alt || 'Image'"
                      class="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Informations du client -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Informations</h3>
                <div class="space-y-4">
                  <div v-if="request.price" class="flex justify-between">
                    <span class="text-gray-600">Budget</span>
                    <div class="text-right">
                      <span class="font-semibold text-gray-900">{{ formatPrice(request.price) }} FCFA</span>
                      <div v-if="request.negotiable" class="text-xs text-green-600">Négociable</div>
                    </div>
                  </div>
                  
                  <div v-if="request.periodicity" class="flex justify-between">
                    <span class="text-gray-600">Fréquence</span>
                    <span class="font-semibold text-gray-900">{{ request.periodicity }}</span>
                  </div>
                  
                  <div v-if="request.serviceType" class="flex justify-between">
                    <span class="text-gray-600">Type de service</span>
                    <span class="font-semibold text-gray-900">
                      {{ request.serviceType === 'self_service' ? 'Libre service' : 'Service complet' }}
                    </span>
                  </div>
                  
                  <div class="flex justify-between">
                    <span class="text-gray-600">Statut</span>
                    <span 
                      :class="[
                        'px-2 py-1 rounded text-xs font-medium',
                        getStatusClass(request.status)
                      ]"
                    >
                      {{ getStatusText(request.status) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Statistiques -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <span class="text-gray-600">Vues</span>
                    </div>
                    <span class="font-semibold">{{ request.seen || 0 }}</span>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      <span class="text-gray-600">Likes</span>
                    </div>
                    <span class="font-semibold">{{ request.likes || 0 }}</span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div class="space-y-3">
                  <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                    Proposer mes services
                  </button>
                  <button class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
                    Contacter le client
                  </button>
                  <button class="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors">
                    Signaler
                  </button>
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
import { useLazyAsyncData, useHead } from 'nuxt/app'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useApiStore } from '../../stores/api'

// SEO Meta
const route = useRoute()
const requestId = route.params.id as string

const apiStore = useApiStore()

// API call
const { data, pending, error } = await useLazyAsyncData(`service-request-${requestId}`, () => 
  apiStore.getServiceRequestByNumber(requestId)
)
console.log('📋 Service Request Detail API Response:', data.value)
console.log('⚠️ Service Request Detail Error:', error.value)

const request = computed(() => data.value?.data)

// Methods
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaines`
  
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const getStatusClass = (status: string) => {
  switch (status) {
    case 'running':
      return 'bg-green-100 text-green-800'
    case 'complete':
      return 'bg-blue-100 text-blue-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    case 'canceled':
      return 'bg-gray-100 text-gray-800'
    case 'archived':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'running':
      return 'En cours'
    case 'complete':
      return 'Terminé'
    case 'failed':
      return 'Échoué'
    case 'canceled':
      return 'Annulé'
    case 'archived':
      return 'Archivé'
    default:
      return 'Inconnu'
  }
}

// SEO
useHead({
  title: computed(() => request.value ? `Demande #${request.value.reqNumber || request.value.id} - Workion` : 'Demande de service - Workion'),
  meta: [
    {
      name: 'description',
      content: computed(() => request.value ? `Découvrez cette demande de service : ${request.value.details?.substring(0, 150)}...` : 'Détails de la demande de service sur Workion')
    }
  ]
})
</script>
