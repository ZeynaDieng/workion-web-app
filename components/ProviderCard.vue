<template>
  <div 
    class="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col cursor-pointer"
    @click="openProviderDrawer"
  >
    <!-- Overlay au hover -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#006970] to-[#008891] opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl"></div>
    
    <!-- Photo de profil avec overlay moderne -->
    <div class="relative h-56 bg-gradient-to-r from-[#006970] to-[#008891]  overflow-hidden"> 
      <!-- from-[#006970] via-[#008891] to-[#20b2aa] -->
      <div class="absolute inset-0 bg-black bg-opacity-10"></div>
      <div class="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-2xl transform translate-x-8 -translate-y-8"></div>
      <div class="absolute bottom-0 left-0 w-24 h-24 bg-yellow-400 bg-opacity-20 rounded-full blur-xl transform -translate-x-4 translate-y-4"></div>
      
      <img 
        v-if="false" 
        :src="provider.photo?.fullUrl" 
        :alt="`${provider.firstname} ${provider.lastname}`"
        class="w-full h-full object-cover relative z-10 blur-xs group-hover:blur-none transition-all duration-500"
      >
      <div v-else class="flex items-center justify-center h-full relative z-10 ">
        <div class="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white border-opacity-30">

          <span class="text-3xl font-black text-white drop-shadow-lg">
            {{ provider.firstname.charAt(0) }}{{ provider.lastname.charAt(0) }}
          </span>
        </div>
      </div>

      <!-- Badge de disponibilité -->
      <div class="absolute top-4 left-4 z-20" v-if="provider?.openToWork">
        <div class="bg-white bg-opacity-20 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center border border-white border-opacity-30">
          <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          Disponible
        </div>
      </div>
    </div>

    <!-- Contenu de la carte -->
    <div class="p-6 relative z-10 flex flex-col flex-1">
      <!-- Nom et localisation -->
      <div class="mb-5">
        <h3 class="text-xl flex gap-2 font-bold text-gray-900 mb-2 group-hover:text-[#006970] transition-colors duration-300">
          {{ provider.firstname }} {{ provider.lastname }} 
          <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" v-if="provider?.certification?.status === 'approved'">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
        </h3>
        <div class="flex items-center text-gray-500 text-sm">
          <div class="w-5 h-5 mr-2 text-[#006970]">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <span class="truncate">{{ provider?.addresses?.[0]?.address || 'Localisation non disponible' }}</span>
        </div>
      </div>

      <!-- Services avec design moderne -->
      <div class="mb-5">
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="service in provider.services.slice(0, 2)" 
            :key="service.id"
            class="bg-gradient-to-r bg-gray-100 bg-opacity-10 text-[#006970] px-3 py-1.5 rounded-xl text-xs font-semibold border border-[#006970] border-opacity-20 hover:bg-opacity-20 transition-all duration-300"
          >
            {{ service?.name }}
          </span>
          <span 
            v-if="provider.services.length > 2"
            class="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-gray-200 transition-colors duration-300"
          >
            +{{ provider.services.length - 2 }} autres
          </span>
        </div>
      </div>

      <!-- Note et avis avec design amélioré -->
      <div class="flex items-center justify-between mb-6 flex-1" v-if="provider.rating">
        <div class="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-2 rounded-xl border border-yellow-200">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-yellow-500 fill-current mr-1" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span class="text-sm font-bold text-gray-900">{{ provider.rating }}</span>
          </div>
          <span class="ml-2 text-xs text-gray-600 font-medium">({{ provider.reviews || 0 }} avis)</span>
        </div>
      </div>

      <!-- Boutons d'action modernes - Fixés en bas -->
      <!-- <div class="flex gap-3 mt-auto">
        <NuxtLink 
          :to="`/prestataires/${provider.slug || provider.id}`"
          class="flex-1 group bg-white border border-[#006970] text-[#006970] hover:bg-[#006970] hover:text-white font-bold p-3.5 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 overflow-hidden"
        >
          <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <span class="relative z-10 flex items-center justify-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Voir profil
          </span>
        </NuxtLink>
        
        <button class="group bg-white border-2 border-[#006970] text-[#006970] hover:bg-[#006970] hover:text-white font-bold p-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>
      </div> -->
    </div>

    <!-- Effet de bordure au hover -->
    <div class="absolute inset-0 border-2 border-transparent  group-hover:border-opacity-20 rounded-2xl transition-all duration-500"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  provider: {
    id: string
    firstname: string
    lastname: string
    slug?: string
    openToWork?: boolean
    photo?: {fullUrl: string}
    services: {id: string, name: string}[]
    rating: number
    reviews: number
    certification: {status: string, level: string}
    addresses: {id: string, address: string}[]
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  openDrawer: [provider: Props['provider']]
}>()

const openProviderDrawer = () => {
  emit('openDrawer', props.provider)
}
</script>
