<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 overflow-hidden"
    @click="closeDrawer"
  >
    <!-- Overlay avec effet de flou -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500"></div>
    
    <!-- Drawer -->
    <div 
      class="absolute right-0 top-0 h-full w-full md:w-[480px] lg:w-[520px] bg-white shadow-2xl transform transition-all duration-500 ease-out flex flex-col"
      :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
      @click.stop
    >
      <!-- Header avec gradient -->
      <div class="relative bg-gradient-to-br from-[#006970] via-[#008891] to-[#20b2aa] text-white overflow-hidden">
        <!-- Motif de fond -->
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
          <div class="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
        </div>
        
        <!-- Bouton fermer -->
        <button 
          @click="closeDrawer"
          class="absolute top-4 right-4 z-10 p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
        >
          <svg class="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <!-- Profil principal -->
        <div v-if="provider" class="relative px-6 pt-8 pb-6 text-center">
          <!-- Avatar avec effet glassmorphism -->
          <div class="relative inline-block mb-6">
            <div class="relative">
              <img 
                v-if="provider.photo?.fullUrl" 
                :src="provider.photo.fullUrl" 
                :alt="`${provider.firstname} ${provider.lastname}`"
                class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
              >
              <div v-else class="w-32 h-32 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white shadow-2xl">
                <span class="text-3xl font-bold text-white">
                  {{ provider.firstname.charAt(0) }}{{ provider.lastname.charAt(0) }}
                </span>
              </div>
              
              <!-- Badge de disponibilité moderne -->
              <div v-if="provider.openToWork" class="absolute -bottom-2 -right-2">
                <div class="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-lg">
                  <div class="w-2 h-2 bg-emerald-300 rounded-full mr-2 animate-pulse"></div>
                  Disponible
                </div>
              </div>
              <div v-else-if="provider.openToWork === false" class="absolute -bottom-2 -right-2">
                <div class="bg-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                  Indisponible
                </div>
              </div>
            </div>
          </div>
          
          <!-- Nom et certification -->
          <div class="mb-4">
            <h3 class="text-3xl font-bold text-white mb-2 flex items-center justify-center">
              {{ provider.firstname }} {{ provider.lastname }}
              <div v-if="provider.certification?.status === 'approved'" class="ml-3 bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </h3>
            
            <!-- Localisation -->
            <div class="flex items-center justify-center text-white/80 text-sm mb-3">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ provider?.addresses?.[0]?.address || 'Localisation non disponible' }}
            </div>
            
            <!-- Tags du prestataire -->
            <div v-if="provider.rating || provider.isOfflineProvider || (provider.tags && provider.tags.length > 0)" class="flex flex-wrap gap-2 justify-center mb-4">
              <div v-if="provider.rating" class="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center">
                <svg class="w-4 h-4 fill-current mr-1.5" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {{ provider.rating }}/5
              </div>

              <div v-if="provider.isOfflineProvider" class="bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium">
                Hors appli
              </div>

              <div 
                v-for="tag in (provider?.tags || []).slice(0, 3)" 
                :key="tag.name"
                class="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center"
              >
                <svg v-if="tag.appreciation === 'POSITIVE'" class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                <svg v-else-if="tag.appreciation === 'NEGATIVE'" class="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>
                {{ tag.name }}
              </div>
            </div>
            
            <!-- Dernière disponibilité -->
            <div v-if="provider.openToWork == null && provider.openToWorkLastUpdate != null" class="text-white/80 text-sm">
              <div class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Dernière dispo: {{ formatTimeDifference(provider.openToWorkLastUpdate) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal avec scroll -->
      <div v-if="provider" class="flex-1 overflow-y-auto bg-gray-50">
        <div class="px-6 py-6 space-y-6">
          <!-- Biographie -->
          <div v-if="provider.biography" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-[#006970] to-[#008891] rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              À propos
            </h4>
            <p class="text-gray-700 leading-relaxed">{{ provider.biography }}</p>
          </div>

          <!-- Services -->
          <div v-if="provider.services && provider.services.length > 0" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-[#006970] to-[#008891] rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              Services proposés
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="service in provider.services" 
                :key="service.id"
                class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-[#006970] to-[#008891] text-white shadow-sm hover:shadow-md transition-shadow"
              >
                {{ service.name }}
              </span>
            </div>
          </div>

          <!-- Langues parlées -->
          <div v-if="provider.languages && provider.languages.length > 0" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div class="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                </svg>
              </div>
              Langues parlées
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="language in provider.languages" 
                :key="language"
                class="inline-flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                {{ language }}
              </span>
            </div>
          </div>

          <!-- Portfolio et réalisations -->
          <ProviderRealizations :partner-id="provider.id" />

          <!-- Avis et évaluations -->
          <ProviderReviews :partner-id="provider.id" />
        </div>
      </div>

      <!-- Boutons d'action modernes -->
      <div class="bg-white border-t border-gray-100 p-6">
        <div class="space-y-3">
          <button 
            @click="handleContact"
            class="w-full bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] hover:from-[#005560] hover:via-[#006970] hover:to-[#008891] text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
          >
            <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <span class="text-lg">Contacter maintenant</span>
          </button>
          
          <!-- <NuxtLink 
            :to="`/prestataires/${provider.slug || provider.id}`"
            class="block w-full bg-white border-2 border-gray-200 text-gray-700 hover:border-[#006970] hover:text-[#006970] font-semibold py-4 px-6 rounded-2xl transition-all duration-300 text-center group"
          >
            <div class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span class="text-lg">Voir le profil complet</span>
            </div>
          </NuxtLink> -->
        </div>
      </div>
    </div>

    <!-- Modal d'authentification -->
    <AuthModal 
      :is-open="isAuthModalOpen"
      @close="closeAuthModal"
      @success="handleAuthSuccess"
    />

    <!-- Modal de souscription -->
    <SubscriptionModal 
      :is-open="isSubscriptionModalOpen"
      @close="closeSubscriptionModal"
      @success="handleSubscriptionSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { DateTime } from 'luxon'
import ProviderReviews from './ProviderReviews.vue'
import ProviderRealizations from './ProviderRealizations.vue'
import AuthModal from './AuthModal.vue'
import SubscriptionModal from './SubscriptionModal.vue'
import { useSubscription } from '../composables/useSubscription'

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

// État des modals
const isAuthModalOpen = ref(false)
const isSubscriptionModalOpen = ref(false)

// Composable de souscription
const { checkActiveSubscription } = useSubscription()

const closeDrawer = () => {
  emit('close')
}

// Gestion de l'authentification et souscription
const handleContact = async () => {
  // Vérifier si l'utilisateur est connecté
  const token = process.client ? localStorage.getItem('workion_token') : null
  
  if (!token) {
    // Ouvrir le modal d'authentification
    isAuthModalOpen.value = true
    return
  }

  // Utilisateur connecté, vérifier la souscription
  const userStr = process.client ? localStorage.getItem('workion_user') : null
  if (!userStr) {
    isAuthModalOpen.value = true
    return
  }

  const user = JSON.parse(userStr)
  const hasActiveSubscription = await checkActiveSubscription(user.id)
  console.log('hasActiveSubscription', hasActiveSubscription)
  if (!hasActiveSubscription) {
    // Ouvrir le modal de souscription
    isSubscriptionModalOpen.value = true
  } else {
    // Utilisateur connecté avec souscription active
    // TODO: Implémenter la logique de contact (chat, message, etc.)
    console.log('Contacter le prestataire:', props.provider?.id)
    alert(`Vous pouvez maintenant contacter ${props.provider?.firstname} ${props.provider?.lastname}`)
  }
}

const closeAuthModal = () => {
  isAuthModalOpen.value = false
}

const handleAuthSuccess = async (user: any) => {
  console.log('Utilisateur connecté:', user)
  // Fermer le modal d'authentification
  isAuthModalOpen.value = false
  
  // Vérifier la souscription après connexion
  const hasActiveSubscription = await checkActiveSubscription(user.id)
  
  if (!hasActiveSubscription) {
    // Ouvrir le modal de souscription
    isSubscriptionModalOpen.value = true
  } else {
    // Utilisateur connecté avec souscription active
    alert(`Bienvenue ${user.firstname} ! Vous pouvez maintenant contacter ce prestataire.`)
  }
}

const closeSubscriptionModal = () => {
  isSubscriptionModalOpen.value = false
}

const handleSubscriptionSuccess = () => {
  console.log('Souscription réussie')
  // Fermer le modal de souscription
  isSubscriptionModalOpen.value = false
  
  // Afficher un message de succès
  alert('Souscription activée ! Vous pouvez maintenant contacter nos prestataires.')
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
