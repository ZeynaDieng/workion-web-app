<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 overflow-hidden"
    @click="closeDrawer"
  >
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
    
    <!-- Drawer -->
    <div 
      class="absolute right-0 top-0 h-full w-full md:w-1/2 lg:w-1/3 min-w-[350px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <h2 class="text-xl font-bold text-gray-900">Profil du prestataire</h2>
        <button 
          @click="closeDrawer"
          class="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div v-if="provider" class="p-6 space-y-6">
        <!-- Photo de profil et infos principales -->
        <div class="text-center">
          <div class="relative inline-block">
            <img 
              v-if="provider.photo?.fullUrl" 
              :src="provider.photo.fullUrl" 
              :alt="`${provider.firstname} ${provider.lastname}`"
              class="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            >
            <div v-else class="w-24 h-24 bg-gradient-to-br from-[#006970] to-[#008891] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <span class="text-2xl font-bold text-white">
                {{ provider.firstname.charAt(0) }}{{ provider.lastname.charAt(0) }}
              </span>
            </div>
            
            <!-- Badge de disponibilité -->
            <div v-if="provider.openToWork" class="absolute -bottom-1 -right-1">
              <div class="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                <span class="w-2 h-2 bg-green-300 rounded-full mr-1 animate-pulse"></span>
                Disponible
              </div>
            </div>
          </div>
          
          <div class="mx-auto flex justify-center items-center">
            <h3 class="mt-4 text-2xl font-bold text-gray-900">
            {{ provider.firstname }} {{ provider.lastname }}
            </h3>
            <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" v-if="provider?.certification?.status === 'approved'">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
          </div>

          <div class="mx-auto flex justify-center items-center text-gray-500 text-sm">
            <div class="w-5 h-5 mr-2 text-[#006970]">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span class="truncate">{{ provider?.addresses?.[0]?.address || 'Localisation non disponible' }}</span>
          </div>

          <div v-if="provider.openToWork == null && provider.openToWorkLastUpdate != null">
            <div class="mx-auto flex justify-center items-center text-gray-500 text-sm">
              <div class="w-5 h-5 mr-2 text-[#006970]"></div>
              <span class="truncate">Dernière dispo: {{ formatTimeDifference(provider.openToWorkLastUpdate) }}</span>
            </div>
          </div>

          <!-- Tags du prestataire -->
          <div v-if="provider.rating || provider.isOfflineProvider || (provider.tags && provider.tags.length > 0)" class="mt-3 flex flex-wrap gap-2 justify-center">
            <span 
              class="bg-yellow-50 text-yellow-500 border border-yellow-200 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium px-2"
            >
            <svg class="w-5 h-5 fill-current mr-1" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
              {{ provider.rating }}
            </span>

            <span v-if="true" class="bg-orange-100 text-orange-500 px-2 py-1 rounded-full text-xs font-medium flex items-center">
              Hors appli
            </span>

            <span 
              v-for="tag in (provider?.tags || [])" 
              :key="tag.name"
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              :class="getTagClasses(tag.appreciation)"
            >
              <svg 
                v-if="tag.appreciation === 'POSITIVE'" 
                class="w-3 h-3 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
              <svg 
                v-else-if="tag.appreciation === 'NEGATIVE'" 
                class="w-3 h-3 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
              <svg 
                v-else 
                class="w-3 h-3 mr-1" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
              {{ tag.name }}
            </span>
          </div>
          
          <p v-if="provider.biography" class="mt-3 text-gray-600 text-sm leading-relaxed">
            {{ provider.biography }}
          </p>
        </div>

        <!-- Services et spécialités -->
        <div v-if="provider.services && provider.services.length > 0" class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Services proposés
          </h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="service in provider.services" 
              :key="service.id"
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#006970] text-white"
            >
              {{ service.name }}
            </span>
          </div>
        </div>

        <!-- Spécialités -->
        <div v-if="provider.specialties && provider.specialties.length > 0" class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Spécialités
          </h4>
          <div class="grid grid-cols-1 gap-2">
            <div 
              v-for="specialty in provider.specialties" 
              :key="specialty.name"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center">
                <div class="w-2 h-2 bg-[#006970] rounded-full mr-3"></div>
                <span class="font-medium text-gray-900">{{ specialty.name }}</span>
              </div>
              <span v-if="specialty.experience" class="text-sm text-gray-500">{{ specialty.experience }}</span>
            </div>
          </div>
        </div>

        <!-- Tarification -->
        <div v-if="provider.pricing" class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            Tarification
          </h4>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4">
              <div v-if="provider.pricing.hourlyRate" class="text-center">
                <div class="text-2xl font-bold text-[#006970]">{{ provider.pricing.hourlyRate }}€</div>
                <div class="text-sm text-gray-600">par heure</div>
              </div>
              <div v-if="provider.pricing.dailyRate" class="text-center">
                <div class="text-2xl font-bold text-[#006970]">{{ provider.pricing.dailyRate }}€</div>
                <div class="text-sm text-gray-600">par jour</div>
              </div>
            </div>
            <p v-if="provider.pricing.description" class="mt-3 text-sm text-gray-600">
              {{ provider.pricing.description }}
            </p>
          </div>
        </div>

        <!-- Réalisations -->
        <div v-if="provider.portfolio && provider.portfolio.length > 0" class="space-y-3">
          <h4 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            Réalisations
          </h4>
          <div class="grid grid-cols-2 gap-3">
            <div 
              v-for="item in provider.portfolio" 
              :key="item.id"
              class="relative group cursor-pointer"
            >
              <img 
                :src="item.imageUrl" 
                :alt="item.title"
                class="w-full h-24 object-cover rounded-lg"
              >
              <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Langues parlées -->
        <div v-if="provider.languages && provider.languages.length > 0" class="space-y-2">
          <h5 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-4 h-4 text-[#006970] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
            Langues parlées
          </h5>
          <div class="flex flex-wrap gap-1">
            <span 
              v-for="language in provider.languages" 
              :key="language"
              class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
            >
              {{ language }}
            </span>
          </div>
        </div>

        <!-- Portfolio et réalisations -->
        <ProviderRealizations :partner-id="provider.id" />

        <!-- Avis et évaluations -->
        <ProviderReviews :partner-id="provider.id" />

        <!-- Statistiques et informations -->
        <div class="space-y-4">
          <!-- Statistiques principales -->
          <!-- <div class="grid grid-cols-3 gap-4">
            <div class="text-center bg-gray-50 rounded-lg p-3">
              <div class="text-2xl font-bold text-[#006970]">{{ provider.completedJobs || 0 }}</div>
              <div class="text-xs text-gray-600">Missions</div>
            </div>
            <div class="text-center bg-gray-50 rounded-lg p-3">
              <div class="text-2xl font-bold text-[#006970]">{{ provider.experienceYears || 0 }}</div>
              <div class="text-xs text-gray-600">Années d'exp.</div>
            </div>
            <div class="text-center bg-gray-50 rounded-lg p-3">
              <div class="text-2xl font-bold text-[#006970]">{{ provider.responseTime || '2h' }}</div>
              <div class="text-xs text-gray-600">Temps réponse</div>
            </div>
          </div> -->

        </div>

        <!-- Boutons d'action -->
        <div class="sticky bottom-0 bg-white pt-4 border-t border-gray-200 space-y-3">
          <button class="w-full bg-gradient-to-r from-[#006970] to-[#008891] hover:from-[#008891] hover:to-[#20b2aa] text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            Contacter
          </button>
          
          <NuxtLink 
            :to="`/prestataires/${provider.slug || provider.id}`"
            class="block w-full bg-white border-2 border-[#006970] text-[#006970] hover:bg-[#006970] hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-center"
          >
            Voir le profil complet
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { DateTime } from 'luxon'
import ProviderReviews from './ProviderReviews.vue'
import ProviderRealizations from './ProviderRealizations.vue'

interface Provider {
  id: string
  firstname: string
  lastname: string
  biography?: string
  isOfflineProvider?: boolean
  photo?: {
    fullUrl: string
  }
  openToWork?: boolean
  openToWorkLastUpdate?: DateTime
  certification: {status: string, level: string}
  services?: Array<{
    id: string
    name: string
  }>
  tags?: Array<{
    name: string
    appreciation?: string
  }>
  specialties?: Array<{
    name: string
    experience?: string
  }>
  pricing?: {
    hourlyRate?: number
    dailyRate?: number
    description?: string
  }
  portfolio?: Array<{
    id: string
    title: string
    imageUrl: string
  }>
  rating?: number
  location?: string
  slug?: string
  addresses: {id: string, address: string}[]
  // Nouvelles propriétés ajoutées
  completedJobs?: number
  experienceYears?: number
  responseTime?: string
  serviceAreas?: string[]
  availability?: {
    [key: string]: {
      start: string
      end: string
    }
  }
  languages?: string[]
  equipment?: string[]
  insurance?: {
    liability?: boolean
    workGuarantee?: string
    equipment?: boolean
  }
}

interface Props {
  isOpen: boolean
  provider: Provider | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const closeDrawer = () => {
  emit('close')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTimeDifference = (dateString) => {
  const lastAvailableDate = DateTime.fromISO(dateString)
  const now = DateTime.now()
  const diff = now.diff(lastAvailableDate, ['hours', 'days'])

  return diff.as('hours') < 24
    ? `Il y a ${Math.floor(diff.as('hours'))} heure(s)`
    : `Il y a ${Math.floor(diff.as('days'))} jour(s)`
}


const getTagClasses = (appreciation?: string) => {
  switch (appreciation) {
    case 'POSITIVE':
      return 'bg-green-100 text-green-800 border border-green-200'
    case 'NEGATIVE':
      return 'bg-red-100 text-red-800 border border-red-200'
    default:
      return 'bg-blue-100 text-blue-800 border border-blue-200'
  }
}

// Fermer avec la touche Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeDrawer()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>

<style scoped>
/* Animations personnalisées */
.drawer-enter-active, .drawer-leave-active {
  transition: transform 0.3s ease-in-out;
}
.drawer-enter-from, .drawer-leave-to {
  transform: translateX(100%);
}
</style>
