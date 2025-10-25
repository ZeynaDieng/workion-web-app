<template>
  <div class="space-y-3">
    <h4 class="text-lg font-semibold text-gray-900 flex items-center">
      <svg class="w-5 h-5 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
      </svg>
      Réalisations
      <span v-if="realizations.length > 0" class="ml-2 text-sm text-gray-600">
        ({{ realizations.length }} {{ realizations.length > 1 ? 'réalisations' : 'réalisation' }})
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
      <p class="text-sm text-gray-600">Erreur lors du chargement des réalisations</p>
      <button 
        @click="fetchRealizations"
        class="mt-2 text-sm text-[#006970] hover:text-[#005560] underline"
      >
        Réessayer
      </button>
    </div>

    <!-- Aucune réalisation -->
    <div v-else-if="realizations.length === 0" class="text-center py-8">
      <div class="text-gray-400 mb-2">
        <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      </div>
      <p class="text-sm text-gray-600">Aucune réalisation pour le moment</p>
    </div>

    <!-- Galerie des réalisations -->
    <div v-else class="space-y-4">
      <!-- Grille des réalisations -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div 
          v-for="(realization, index) in displayedRealizations" 
          :key="realization.id"
          @click="openGallery(index)"
          class="relative aspect-square rounded-lg overflow-hidden cursor-pointer group bg-gray-100"
        >
          <!-- Image -->
          <img 
            :src="getImageUrl(realization.image)"
            :alt="realization.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            @error="handleImageError"
          />
          
          <!-- Overlay avec titre -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-2 left-2 right-2">
              <h5 class="text-white text-sm font-medium truncate">{{ realization.title }}</h5>
              <p v-if="realization.description" class="text-white/80 text-xs truncate">{{ realization.description }}</p>
            </div>
          </div>

          <!-- Icône de zoom -->
          <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="bg-white/20 backdrop-blur-sm rounded-full p-1">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton "Voir plus" -->
      <div v-if="realizations.length > displayLimit" class="text-center pt-2">
        <button 
          @click="showMore = !showMore"
          class="text-sm text-[#006970] hover:text-[#005560] font-medium"
        >
          {{ showMore ? 'Voir moins' : `Voir les ${realizations.length - displayLimit} autres réalisations` }}
        </button>
      </div>
    </div>

    <!-- Modal Galerie -->
    <div 
      v-if="galleryOpen" 
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      @click="closeGallery"
      @keydown.esc="closeGallery"
    >
      <div class="relative w-full h-full flex items-center justify-center p-4">
        <!-- Bouton fermer -->
        <button 
          @click="closeGallery"
          class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Navigation précédente -->
        <button 
          v-if="realizations.length > 1"
          @click.stop="previousImage"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Navigation suivante -->
        <button 
          v-if="realizations.length > 1"
          @click.stop="nextImage"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Image principale -->
        <div class="max-w-4xl max-h-full flex flex-col items-center" @click.stop>
          <img 
            :src="getImageUrl(currentRealization?.image)"
            :alt="currentRealization?.title"
            class="max-w-full max-h-[70vh] object-contain rounded-lg"
            @error="handleImageError"
          />
          
          <!-- Informations de l'image -->
          <div class="mt-4 text-center text-white max-w-2xl">
            <h3 class="text-xl font-semibold mb-2">{{ currentRealization?.title }}</h3>
            <p v-if="currentRealization?.description" class="text-gray-300 text-sm mb-2">
              {{ currentRealization.description }}
            </p>
            <p class="text-gray-400 text-xs">
              {{ formatDate(currentRealization?.createdAt) }}
            </p>
          </div>

          <!-- Indicateurs de navigation -->
          <div v-if="realizations.length > 1" class="mt-4 flex space-x-2">
            <div 
              v-for="(_, index) in realizations" 
              :key="index"
              class="w-2 h-2 rounded-full transition-colors"
              :class="index === currentImageIndex ? 'bg-white' : 'bg-white/40'"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { DateTime } from 'luxon'

interface Realization {
  id: string
  title: string
  description?: string
  image: {
    id: string
    fullUrl?: string
    url_streaming?: string
  }
  partner: string
  createdAt: string
}

interface Props {
  partnerId: string
}

const props = defineProps<Props>()

// Configuration API
const config = useRuntimeConfig()
const API_BASE_URL = config.public.apiBase

// État réactif
const realizations = ref<Realization[]>([])
const loading = ref(false)
const error = ref(false)
const showMore = ref(false)
const displayLimit = 6

// État de la galerie
const galleryOpen = ref(false)
const currentImageIndex = ref(0)

// Computed properties
const displayedRealizations = computed(() => {
  return showMore.value ? realizations.value : realizations.value.slice(0, displayLimit)
})

const currentRealization = computed(() => {
  return realizations.value[currentImageIndex.value]
})

// Méthodes
const fetchRealizations = async () => {
  if (!props.partnerId) return
  
  loading.value = true
  error.value = false
  
  try {
    const response = await fetch(`${API_BASE_URL}/realizations/by-partner/${props.partnerId}`)
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des réalisations')
    }
    
    const data = await response.json()
    realizations.value = Array.isArray(data) ? data : (data.data || [])
  } catch (err) {
    console.error('Erreur lors de la récupération des réalisations:', err)
    error.value = true
  } finally {
    loading.value = false
  }
}

const getImageUrl = (image: Realization['image']) => {
  if (!image) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='
  return image.fullUrl || image.url_streaming || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='
}

const formatDate = (dateString: string) => {
  return DateTime.fromISO(dateString).toLocaleString({
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Méthodes de la galerie
const openGallery = (index: number) => {
  currentImageIndex.value = index
  galleryOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeGallery = () => {
  galleryOpen.value = false
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % realizations.value.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0 
    ? realizations.value.length - 1 
    : currentImageIndex.value - 1
}

// Gestion des touches clavier
const handleKeydown = (event: KeyboardEvent) => {
  if (!galleryOpen.value) return
  
  switch (event.key) {
    case 'Escape':
      closeGallery()
      break
    case 'ArrowRight':
      nextImage()
      break
    case 'ArrowLeft':
      previousImage()
      break
  }
}

// Lifecycle
onMounted(() => {
  fetchRealizations()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = 'auto'
})
</script>
