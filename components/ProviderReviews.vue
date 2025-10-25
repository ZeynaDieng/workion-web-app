<template>
  <div class="space-y-3">
    <h4 class="text-lg font-semibold text-gray-900 flex items-center">
      <svg class="w-5 h-5 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
      </svg>
      Avis clients
      <span v-if="averageRating" class="ml-2 text-sm text-gray-600">
        ({{ averageRating.toFixed(1) }}/5 - {{ reviews.length }} avis)
      </span>
    </h4>

    <!-- État de chargement -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#006970]"></div>
    </div>

    <!-- État d'erreur -->
    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-500 mb-2">
        <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
        </svg>
      </div>
      <p class="text-sm text-gray-600">Erreur lors du chargement des avis</p>
      <button 
        @click="fetchReviews"
        class="mt-2 text-sm text-[#006970] hover:text-[#005560] underline"
      >
        Réessayer
      </button>
    </div>

    <!-- Aucun avis -->
    <div v-else-if="reviews.length === 0" class="text-center py-8">
      <div class="text-gray-400 mb-2">
        <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-2.4-.32l-3.2 1.6a1 1 0 01-1.4-1.4l1.6-3.2A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"></path>
        </svg>
      </div>
      <p class="text-sm text-gray-600">Aucun avis pour le moment</p>
    </div>

    <!-- Liste des avis -->
    <div v-else class="space-y-3">
      <!-- Statistiques des étoiles -->
      <div v-if="ratingStats" class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="text-2xl font-bold text-[#006970]">{{ averageRating.toFixed(1) }}</div>
          <div class="flex">
            <svg 
              v-for="star in 5" 
              :key="star"
              class="w-5 h-5"
              :class="star <= Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </div>
        </div>
        
        <!-- Répartition des étoiles -->
        <div class="space-y-1">
          <div v-for="(count, rating) in ratingStats" :key="rating" class="flex items-center text-sm">
            <span class="w-8">{{ rating }}★</span>
            <div class="flex-1 mx-2 bg-gray-200 rounded-full h-2">
              <div 
                class="bg-yellow-400 h-2 rounded-full" 
                :style="{ width: `${(count / reviews.length) * 100}%` }"
              ></div>
            </div>
            <span class="w-8 text-gray-600">{{ count }}</span>
          </div>
        </div>
      </div>

      <!-- Avis individuels -->
      <div class="space-y-3">
        <div 
          v-for="review in displayedReviews" 
          :key="review.id"
          class="bg-gray-50 rounded-lg p-4 border border-gray-100"
        >
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-[#006970] rounded-full flex items-center justify-center text-white text-sm font-medium">
                {{ getClientInitials(review.client) }}
              </div>
              <div>
                <div class="font-medium text-gray-900">{{ getClientName(review.client) }}</div>
                <div class="text-xs text-gray-500">{{ formatDate(review.createdAt) }}</div>
              </div>
            </div>
            <div class="flex items-center space-x-1">
              <div class="flex">
                <svg 
                  v-for="star in 5" 
                  :key="star"
                  class="w-4 h-4"
                  :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span v-if="review.isVerified" class="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Vérifié
              </span>
            </div>
          </div>
          
          <p v-if="review.comment" class="text-sm text-gray-700 leading-relaxed">
            {{ review.comment }}
          </p>
          <p v-else class="text-sm text-gray-500 italic">
            Aucun commentaire
          </p>
        </div>
      </div>

      <!-- Bouton "Voir plus" -->
      <div v-if="reviews.length > displayLimit" class="text-center pt-2">
        <button 
          @click="showMore = !showMore"
          class="text-sm text-[#006970] hover:text-[#005560] font-medium"
        >
          {{ showMore ? 'Voir moins' : `Voir les ${reviews.length - displayLimit} autres avis` }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { DateTime } from 'luxon'

// Configuration API - peut être déplacée vers un composable plus tard
const config = useRuntimeConfig()
const API_BASE_URL = config.public.apiBase

interface Review {
  id: string
  client: {
    id: string
    firstname: string
    lastname: string
  }
  partner: string
  rating: number
  comment?: string
  isVerified: boolean
  createdAt: string
}

interface Props {
  partnerId: string
}

const props = defineProps<Props>()

// État réactif
const reviews = ref<Review[]>([])
const loading = ref(false)
const error = ref(false)
const showMore = ref(false)
const displayLimit = 3

// Computed properties
const displayedReviews = computed(() => {
  return showMore.value ? reviews.value : reviews.value.slice(0, displayLimit)
})

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0
  const sum = reviews.value.reduce((acc, review) => acc + review.rating, 0)
  return sum / reviews.value.length
})

const ratingStats = computed(() => {
  const stats: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.value.forEach(review => {
    stats[review.rating] = (stats[review.rating] || 0) + 1
  })
  return stats
})

// Méthodes
const fetchReviews = async () => {
  if (!props.partnerId) return
  
  loading.value = true
  error.value = false
  
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/partner/${props.partnerId}`)
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des avis')
    }
    
    const data = await response.json()
    // L'API retourne directement le tableau de reviews, pas dans un objet data
    reviews.value = Array.isArray(data) ? data : (data.data || [])
  } catch (err) {
    console.error('Erreur lors de la récupération des avis:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const getClientName = (client: Review['client']) => {
  return `${client.firstname} ${client.lastname.charAt(0).toUpperCase()}.`
}

const getClientInitials = (client: Review['client']) => {
  return `${client.firstname.charAt(0)}${client.lastname.charAt(0)}`.toUpperCase()
}

const formatDate = (dateString: string) => {
  return DateTime.fromISO(dateString).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Lifecycle
onMounted(() => {
  fetchReviews()
})
</script>
