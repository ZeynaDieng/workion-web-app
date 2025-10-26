<template>
  <header class="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
    <!-- Barre de notification moderne -->
    <div class="bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] text-white text-center py-2 text-sm font-medium">
      <div class="flex items-center justify-center">
        <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
        🎉 Plateforme #1 des services à domicile au Sénégal - Plus de 1000 prestataires qualifiés
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo moderne -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-3 group">
            <div class="relative">
              <img 
                src="assets/images/logo.png" 
                alt="Workion Logo" 
                class="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
              >
              <!-- Effet de glow au hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#006970] to-[#008891] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </div>
          </NuxtLink>
        </div>

        <!-- Navigation Desktop moderne -->
        <nav class="hidden lg:flex items-center space-x-1">
          <!-- <NuxtLink 
            to="/services" 
            class="relative px-4 py-2 text-gray-700 hover:text-[#006970] font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 group"
          >
            <span class="relative z-10">Services</span>
            <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#006970] to-[#008891] group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
          </NuxtLink> -->
          <!-- <NuxtLink 
            to="/prestataires" 
            class="relative px-4 py-2 text-gray-700 hover:text-[#006970] font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 group"
          >
            <span class="relative z-10">Prestataires</span>
            <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#006970] to-[#008891] group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
          </NuxtLink> -->
          <!-- <NuxtLink 
            to="/demandes" 
            class="relative px-4 py-2 text-gray-700 hover:text-[#006970] font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 group"
          >
            <span class="relative z-10">Demandes</span>
            <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#006970] to-[#008891] group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
          </NuxtLink> -->
          <!-- <NuxtLink 
            to="/comment-ca-marche" 
            class="relative px-4 py-2 text-gray-700 hover:text-[#006970] font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 group"
          >
            <span class="relative z-10">Comment ça marche</span>
            <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#006970] to-[#008891] group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
          </NuxtLink> -->
        </nav>

        <!-- Actions modernes -->
        <div class="flex items-center space-x-3">
          <!-- Bouton Poster une demande -->
          <NuxtLink 
            to="/poster-demande" 
            class="hidden md:inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] hover:from-[#005560] hover:via-[#006970] hover:to-[#008891] text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
          >
            <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span class="text-sm">Poster une demande</span>
          </NuxtLink>
          
          <!-- Bouton Devenir prestataire -->
          <!-- <NuxtLink 
            to="/devenir-prestataire" 
            class="hidden md:inline-flex items-center px-6 py-3 bg-white border-2 border-[#006970] text-[#006970] hover:bg-[#006970] hover:text-white font-bold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 group"
          >
            <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
            </svg>
            <span class="text-sm">Devenir prestataire</span>
          </NuxtLink> -->

          <!-- Menu mobile moderne -->
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-3 rounded-2xl text-gray-700 hover:text-[#006970] hover:bg-gradient-to-r hover:from-[#006970]/10 hover:to-[#008891]/10 transition-all duration-300 group"
          >
            <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Mobile moderne -->
    <div 
      v-if="isMobileMenuOpen" 
      class="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg"
    >
      <div class="px-6 py-6 space-y-4">
        <!-- Navigation mobile -->
        <div class="space-y-2">
          <NuxtLink 
            to="/services" 
            class="flex items-center py-3 px-4 text-gray-700 hover:text-[#006970] hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 font-semibold rounded-xl transition-all duration-300 group"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            Services
          </NuxtLink>
          <NuxtLink 
            to="/prestataires" 
            class="flex items-center py-3 px-4 text-gray-700 hover:text-[#006970] hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 font-semibold rounded-xl transition-all duration-300 group"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Prestataires
          </NuxtLink>
          <NuxtLink 
            to="/demandes" 
            class="flex items-center py-3 px-4 text-gray-700 hover:text-[#006970] hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 font-semibold rounded-xl transition-all duration-300 group"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Demandes
          </NuxtLink>
          <NuxtLink 
            to="/comment-ca-marche" 
            class="flex items-center py-3 px-4 text-gray-700 hover:text-[#006970] hover:bg-gradient-to-r hover:from-[#006970]/5 hover:to-[#008891]/5 font-semibold rounded-xl transition-all duration-300 group"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Comment ça marche
          </NuxtLink>
        </div>

        <!-- Boutons d'action mobile -->
        <div class="pt-4 border-t border-gray-100 space-y-3">
          <NuxtLink 
            to="/poster-demande" 
            class="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Poster une demande
          </NuxtLink>
          <!-- <NuxtLink 
            to="/devenir-prestataire" 
            class="flex items-center justify-center w-full py-4 px-6 bg-white border-2 border-[#006970] text-[#006970] hover:bg-[#006970] hover:text-white font-bold rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group"
            @click="closeMobileMenu"
          >
            <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
            </svg>
            Devenir prestataire
          </NuxtLink> -->
        </div>

        <!-- Stats rapides mobile -->
        <div class="pt-4 border-t border-gray-100">
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-lg font-bold text-[#006970]">1000+</div>
              <div class="text-xs text-gray-500">Prestataires</div>
            </div>
            <div>
              <div class="text-lg font-bold text-[#006970]">50+</div>
              <div class="text-xs text-gray-500">Services</div>
            </div>
            <div>
              <div class="text-lg font-bold text-[#006970]">24/7</div>
              <div class="text-xs text-gray-500">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Fermer le menu mobile lors du changement de route
const route = useRoute()
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>
