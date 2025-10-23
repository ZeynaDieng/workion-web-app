<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
    <!-- Header avec localisation et date -->
    <div class="flex justify-between items-start mb-4">
      <div class="flex items-center text-sm text-gray-500">
        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        {{ request.location || 'Localisation non précisée' }}
      </div>
      <span class="text-sm text-gray-500">
        {{ formatDate(request.createdAt) }}
      </span>
    </div>

    <!-- Détails de la demande -->
    <div class="mb-4">
      <p class="text-gray-900 line-clamp-3">
        {{ request.details }}
      </p>
    </div>

    <!-- Services demandés -->
    <div v-if="request.services?.length" class="mb-4">
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="(service, index) in request.services.slice(0, 2)" 
          :key="typeof service === 'string' ? service : service.id || index"
          class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
        >
          {{ typeof service === 'string' ? service : service.name }}
        </span>
        <span 
          v-if="request.services.length > 2"
          class="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
        >
          +{{ request.services.length - 2 }}
        </span>
      </div>
    </div>

    <!-- Prix et type de service -->
    <div class="flex justify-between items-center mb-4">
      <div v-if="request.price" class="text-sm">
        <span class="font-semibold text-gray-900">{{ formatPrice(request.price) }} FCFA</span>
        <span v-if="request.periodicity" class="text-gray-500 ml-1">{{ request.periodicity }}</span>
        <span v-if="request.negotiable" class="text-green-600 ml-2 text-xs">(Négociable)</span>
      </div>
      <div v-if="request.serviceType" class="text-xs text-gray-500">
        {{ request.serviceType === 'self_service' ? 'Libre service' : 'Service complet' }}
      </div>
    </div>

    <!-- Stats et statut -->
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4 text-sm text-gray-500">
        <!-- Vues -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
          {{ request.seen || 0 }}
        </div>
        
        <!-- Likes -->
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          {{ request.likes || 0 }}
        </div>
      </div>

      <!-- Statut -->
      <div class="flex items-center">
        <span 
          :class="[
            'px-2 py-1 rounded-full text-xs font-medium',
            getStatusClass(request.status)
          ]"
        >
          {{ getStatusText(request.status) }}
        </span>
      </div>
    </div>

    <!-- Bouton d'action -->
    <div class="mt-4 pt-4 border-t border-gray-100">
      <NuxtLink 
        :to="`/demandes/${request.reqNumber || request.id}`"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
      >
        Voir les détails
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  request: {
    id: string
    reqNumber?: string
    details: string
    location?: string
    createdAt: string
    services?: Array<{ id: string; name: string } | string>
    price?: number
    periodicity?: string
    negotiable?: boolean
    serviceType?: 'self_service' | 'full_service'
    seen?: number
    likes?: number
    status: 'running' | 'complete' | 'failed' | 'canceled' | 'archived'
  }
}

defineProps<Props>()

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
    month: 'short',
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
</script>
