<template>
  <header class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-lg">W</span>
            </div>
            <span class="text-xl font-bold text-gray-900">Workion</span>
          </NuxtLink>
        </div>

        <!-- Navigation Desktop -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink 
            to="/services" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Services
          </NuxtLink>
          <NuxtLink 
            to="/prestataires" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Prestataires
          </NuxtLink>
          <NuxtLink 
            to="/demandes" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Demandes
          </NuxtLink>
          <NuxtLink 
            to="/comment-ca-marche" 
            class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Comment ça marche
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Bouton Poster une demande -->
          <NuxtLink 
            to="/poster-demande" 
            class="hidden sm:inline-flex btn-primary"
          >
            Poster une demande
          </NuxtLink>
          
          <!-- Bouton Devenir prestataire -->
          <NuxtLink 
            to="/devenir-prestataire" 
            class="hidden sm:inline-flex btn-secondary"
          >
            Devenir prestataire
          </NuxtLink>

          <!-- Menu mobile -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu Mobile -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-t border-gray-200">
      <div class="px-4 py-2 space-y-2">
        <NuxtLink 
          to="/services" 
          class="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          @click="closeMobileMenu"
        >
          Services
        </NuxtLink>
        <NuxtLink 
          to="/prestataires" 
          class="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          @click="closeMobileMenu"
        >
          Prestataires
        </NuxtLink>
        <NuxtLink 
          to="/demandes" 
          class="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          @click="closeMobileMenu"
        >
          Demandes
        </NuxtLink>
        <NuxtLink 
          to="/comment-ca-marche" 
          class="block py-2 text-gray-700 hover:text-blue-600 font-medium"
          @click="closeMobileMenu"
        >
          Comment ça marche
        </NuxtLink>
        <div class="pt-2 border-t border-gray-200 space-y-2">
          <NuxtLink 
            to="/poster-demande" 
            class="block w-full text-center btn-primary"
            @click="closeMobileMenu"
          >
            Poster une demande
          </NuxtLink>
          <NuxtLink 
            to="/devenir-prestataire" 
            class="block w-full text-center btn-secondary"
            @click="closeMobileMenu"
          >
            Devenir prestataire
          </NuxtLink>
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
