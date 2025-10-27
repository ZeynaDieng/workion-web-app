<template>
  <div>

    <!-- Header avec recherche et filtres -->
    <section class="bg-white shadow-lg z-40">
      <!-- Hero Section avec gradient moderne -->
      <div class="bg-gradient-to-br from-[#006970] via-[#008891] to-[#20b2aa] text-white w-full mx-auto py-24 relative overflow-hidden">
        <!-- Éléments décoratifs -->
        <div class="absolute inset-0 bg-black bg-opacity-10"></div>
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div class="absolute bottom-20 right-20 w-48 h-48 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
          <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400 bg-opacity-20 rounded-full blur-lg"></div>
        </div>
        
        <div class="relative z-10 text-center px-4">
          <div class="max-w-5xl mx-auto">
            <!-- Badge moderne -->
            <div class="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-8 border border-white border-opacity-30">
              <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              Plateforme #1 des services à domicile au Sénégal
            </div>
            
            <h1 class="text-4xl md:text-7xl font-black mb-6 leading-tight">
              <span class="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                Trouvez le bon
              </span>
              <br>
              <span class="text-yellow-400 drop-shadow-lg">prestataire</span>
              <br>
              <span class="text-2xl md:text-4xl font-semibold text-gray-100">près de chez vous</span>
            </h1>
            
            <p class="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light">
              Connectez-vous avec des <span class="font-semibold text-yellow-300">professionnels qualifiés</span> pour tous vos besoins de services à domicile
            </p>

            <!-- Stats modernes -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">1000+</div>
                <div class="text-sm text-gray-200 font-medium">Prestataires</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">20+</div>
                <div class="text-sm text-gray-200 font-medium">Services</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">5000+</div>
                <div class="text-sm text-gray-200 font-medium">Clients satisfaits</div>
              </div>
              <div class="text-center">
                <div class="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">24/7</div>
                <div class="text-sm text-gray-200 font-medium">Disponibilité</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Section filtres moderne -->
      <div class="bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Titre de section -->
          <div class="text-center mb-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">
              Trouvez votre prestataire idéal
            </h2>
            <p class="text-gray-600 font-medium">
              <span class="text-[#006970] font-bold">{{ filteredProvidersCount }}</span> prestataires disponibles
            </p>
          </div>

          <!-- Barre de recherche principale -->
          <div class="max-w-2xl mx-auto mb-8">
            <div class="relative group">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Rechercher un prestataire ou service..." 
                class="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#006970] focus:ring-opacity-20 focus:border-[#006970] transition-all duration-300 shadow-lg hover:shadow-xl bg-white"
                @input="handleSearch"
              >
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg class="h-6 w-6 text-gray-400 group-focus-within:text-[#006970] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Filtres modernes -->
          <div class="flex flex-wrap justify-center gap-4 mb-6">
            <!-- Filtre par service -->
            <div class="relative">
              <select 
                v-model="selectedService"
                @change="handleServiceChange"
                class="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-4 focus:ring-[#006970] focus:ring-opacity-20 focus:border-[#006970] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <option value="">🔧 Tous les services</option>
                <option 
                  v-for="service in availableServices" 
                  :key="service.id"
                  :value="service.id"
                >
                  {{ service.name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <!-- Filtre par localisation -->
            <div class="relative">
              <select 
                v-model="selectedLocation"
                @change="handleLocationChange"
                class="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-4 focus:ring-[#006970] focus:ring-opacity-20 focus:border-[#006970] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <option value="">📍 Toutes les zones</option>
                <option value="dakar">Dakar</option>
                <option value="pikine">Pikine</option>
                <option value="guediawaye">Guédiawaye</option>
                <option value="rufisque">Rufisque</option>
                <option value="thies">Thiès</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>

            <!-- Tri -->
            <!-- <div class="relative">
              <select 
                v-model="sortBy"
                @change="handleSortChange"
                class="appearance-none bg-white border-2 border-gray-200 rounded-xl px-6 py-3 pr-10 text-gray-700 font-medium focus:outline-none focus:ring-4 focus:ring-[#006970] focus:ring-opacity-20 focus:border-[#006970] transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <option value="rating">⭐ Mieux notés</option>
                <option value="reviews">Plus d'avis</option>
                <option value="recent">Plus récents</option>
                <option value="name">Nom A-Z</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div> -->

            <!-- Reset filtres -->
            <button 
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              <svg class="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- Liste des prestataires -->
    <section class="py-8 bg-white min-h-screen" id="providers-block">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Loading state -->
        <div v-if="pending" class="flex items-center justify-center py-12">
          <div class="text-center">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#006970] border-t-transparent mb-6"></div>
            <p class="text-gray-600 font-medium">Chargement des prestataires...</p>
          </div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-500 mb-6">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Erreur de chargement</h3>
          <p class="text-gray-600 mb-6">Impossible de charger les prestataires pour le moment.</p>
          <button 
            @click="refresh" 
            class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#006970] to-[#008891] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Réessayer
          </button>
        </div>

        <!-- Providers grid -->
        <div v-else-if="providers.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 auto-rows-fr" >
            <ProviderCard 
              v-for="provider in providers" 
              :key="provider.id"
              :provider="provider"
              class="h-full"
              @open-drawer="openProviderDrawer"
            />
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg">
            <div class="flex flex-1 justify-between sm:hidden">
              <button 
                :disabled="currentPage === 1"
                @click.prevent="goToPage(currentPage - 1)"
                class="relative inline-flex items-center rounded-xl border-2 border-[#006970] bg-white px-6 py-3 text-sm font-bold text-[#006970] hover:bg-[#006970] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Précédent
              </button>
              <button 
                :disabled="currentPage === totalPages"
                @click.prevent="goToPage(currentPage + 1)"
                class="relative inline-flex items-center rounded-xl border-2 border-[#006970] bg-white px-6 py-3 text-sm font-bold text-[#006970] hover:bg-[#006970] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Suivant
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Affichage de 
                  <span class="font-medium">{{ (currentPage - 1) * limit + 1 }}</span>
                  à 
                  <span class="font-medium">{{ Math.min(currentPage * limit, filteredProvidersCount) }}</span>
                  sur 
                  <span class="font-medium">{{ filteredProvidersCount }}</span>
                  prestataires
                </p>
              </div>
              
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button 
                  :disabled="currentPage === 1"
                  @click="goToPage(currentPage - 1)"
                  class="relative inline-flex items-center rounded-l-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-[#006970] hover:bg-opacity-10 hover:text-[#006970] hover:ring-[#006970] hover:ring-opacity-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span class="sr-only">Précédent</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                  </svg>
                </button>
                
                <template v-for="(page, index) in visiblePages" :key="`page-${index}-${page}`">
                  <button 
                    v-if="typeof page === 'number'"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 transition-all duration-300',
                      page === currentPage 
                        ? 'z-10 bg-gradient-to-r from-[#006970] to-[#008891] text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-[#006970] hover:bg-opacity-10 hover:text-[#006970] hover:ring-[#006970] hover:ring-opacity-50'
                    ]"
                    @click.prevent="goToPage(page)"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                </template>
                
                <button 
                  :disabled="currentPage === totalPages"
                  @click="goToPage(currentPage + 1)"
                  class="relative inline-flex items-center rounded-r-md px-3 py-2 text-gray-500 ring-1 ring-inset ring-gray-300 hover:bg-[#006970] hover:bg-opacity-10 hover:text-[#006970] hover:ring-[#006970] hover:ring-opacity-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span class="sr-only">Suivant</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16">
          <div class="text-gray-300 mb-8">
            <svg class="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Aucun prestataire trouvé</h3>
          <p class="text-gray-600 mb-8 max-w-md mx-auto">
            {{ hasActiveFilters ? 'Aucun prestataire ne correspond à vos critères de recherche.' : 'Aucun prestataire disponible pour le moment.' }}
          </p>
          <div v-if="hasActiveFilters" class="space-y-4">
            <button 
              @click="resetFilters"
              class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#006970] to-[#008891] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Réinitialiser les filtres
            </button>
            <p class="text-sm text-gray-500">ou essayez d'élargir vos critères de recherche</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comment ça marche -->
    <section class="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <!-- Éléments décoratifs -->
      <div class="absolute top-0 left-0 w-full h-full">
        <div class="absolute top-20 right-10 w-64 h-64 bg-[#006970] bg-opacity-5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-48 h-48 bg-yellow-400 bg-opacity-10 rounded-full blur-2xl"></div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16">
          <div class="inline-flex items-center px-4 py-2 bg-[#006970] bg-opacity-10 rounded-full text-sm font-semibold text-[#006970] mb-6">
            ✨ Processus simplifié
          </div>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
            Comment ça marche ?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            Trouvez un prestataire en <span class="font-bold text-[#006970]">3 étapes simples</span> et commencez votre projet dès aujourd'hui
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <!-- Étape 1 -->
          <div class="relative group">
            <div class="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <!-- Numéro avec gradient -->
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-[#006970] to-[#008891] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <span class="text-3xl font-black text-white">1</span>
                </div>
                <!-- Ligne de connexion -->
                <div class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#006970] to-transparent opacity-30"></div>
              </div>
              
              <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Décrivez votre besoin</h3>
                <p class="text-gray-600 leading-relaxed">
                  Postez votre demande en décrivant précisément le service dont vous avez besoin. Plus c'est détaillé, mieux c'est !
                </p>
              </div>

              <!-- Icône décorative -->
              <div class="absolute top-4 right-4 text-[#006970] opacity-20">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Étape 2 -->
          <div class="relative group">
            <div class="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <!-- Numéro avec gradient -->
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-[#008891] to-[#20b2aa] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <span class="text-3xl font-black text-white">2</span>
                </div>
                <!-- Ligne de connexion -->
                <div class="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-[#008891] to-transparent opacity-30"></div>
              </div>
              
              <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Recevez des propositions</h3>
                <p class="text-gray-600 leading-relaxed">
                  Les prestataires qualifiés près de chez vous vous contactent avec leurs meilleures offres personnalisées
                </p>
              </div>

              <!-- Icône décorative -->
              <div class="absolute top-4 right-4 text-[#008891] opacity-20">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Étape 3 -->
          <div class="relative group">
            <div class="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <!-- Numéro avec gradient -->
              <div class="relative mb-8">
                <div class="w-20 h-20 bg-gradient-to-br from-[#20b2aa] to-[#40e0d0] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <span class="text-3xl font-black text-white">3</span>
                </div>
              </div>
              
              <div class="text-center">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Choisissez et planifiez</h3>
                <p class="text-gray-600 leading-relaxed">
                  Comparez les profils, choisissez votre prestataire idéal et planifiez l'intervention selon vos disponibilités
                </p>
              </div>

              <!-- Icône décorative -->
              <div class="absolute top-4 right-4 text-[#20b2aa] opacity-20">
                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H19v2h-1.5v17.5c0 .83-.67 1.5-1.5 1.5h-9c-.83 0-1.5-.67-1.5-1.5V4H5V2h3.5V.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V2h3.5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA moderne -->
        <div class="text-center mt-16">
          <div class="inline-flex flex-col sm:flex-row gap-4">
            <NuxtLink 
              to="/poster-demande" 
              class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-[#006970] to-[#008891] rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span class="relative z-10">Poster ma demande</span>
              <svg class="relative z-10 ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </NuxtLink>
            
            <button class="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#006970] bg-white border-2 border-[#006970] rounded-2xl shadow-lg hover:shadow-xl hover:bg-[#006970] hover:text-white transform hover:-translate-y-1 transition-all duration-300">
              <span>En savoir plus</span>
              <svg class="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section finale -->
    <section class="py-24 bg-gradient-to-br from-[#006970] via-[#008891] to-[#20b2aa] text-white relative overflow-hidden">
      <!-- Éléments décoratifs -->
      <div class="absolute inset-0">
        <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10"></div>
        <div class="absolute -top-20 -right-20 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-400 bg-opacity-10 rounded-full blur-2xl"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white bg-opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-sm font-medium text-white mb-8 border border-white border-opacity-30">
          <span class="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
          Rejoignez la communauté Workion
        </div>

        <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight">
          <span class="bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
            Prêt à commencer
          </span>
          <br>
          <span class="text-yellow-400 drop-shadow-lg">votre projet ?</span>
        </h2>
        
        <p class="text-xl md:text-2xl mb-12 text-gray-100 max-w-4xl mx-auto leading-relaxed font-light">
          Rejoignez des <span class="font-bold text-yellow-300">milliers de clients satisfaits</span> qui font confiance à Workion pour leurs services à domicile
        </p>

        <!-- Boutons CTA modernes -->
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <NuxtLink 
            to="/poster-demande" 
            class="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-[#006970] bg-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden min-w-64"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="relative z-10 group-hover:text-white transition-colors duration-300">🔍 Je cherche un prestataire</span>
          </NuxtLink>
          
          <NuxtLink 
            to="/devenir-prestataire" 
            class="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white border-2 border-white rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white hover:text-[#006970] transform hover:-translate-y-2 transition-all duration-300 min-w-64"
          >
            <span class="mr-2">💼</span>
            <span>Je veux devenir prestataire</span>
          </NuxtLink>
        </div>

        <!-- Stats finales -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">98%</div>
            <div class="text-sm text-gray-200">Satisfaction client</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">24h</div>
            <div class="text-sm text-gray-200">Temps de réponse</div>
          </div>
          <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">100%</div>
            <div class="text-sm text-gray-200">Sécurisé</div>
          </div>
          <!-- <div class="text-center">
            <div class="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">0€</div>
            <div class="text-sm text-gray-200">Frais d'inscription</div>
          </div> -->
        </div>
      </div>
    </section>

    <!-- Provider Drawer -->
    <ProviderDrawer 
      :is-open="isDrawerOpen"
      :provider="selectedProvider"
      @close="closeProviderDrawer"
    />
  </div>
</template>

<style scoped>
/* Polices modernes */
* {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 700;
  letter-spacing: -0.025em;
}

/* Animations personnalisées */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 105, 112, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 105, 112, 0.6); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Effets de glassmorphism */
.glass-effect {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Gradients personnalisés */
.gradient-workion {
  background: linear-gradient(135deg, #006970 0%, #008891 50%, #20b2aa 100%);
}

.gradient-workion-light {
  background: linear-gradient(135deg, rgba(0, 105, 112, 0.1) 0%, rgba(0, 136, 145, 0.1) 50%, rgba(32, 178, 170, 0.1) 100%);
}

/* Styles pour les boutons */
.btn-workion {
  @apply bg-gradient-to-r from-[#006970] to-[#008891] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300;
}

.btn-workion-outline {
  @apply border-2 border-[#006970] text-[#006970] font-bold py-3 px-6 rounded-xl hover:bg-[#006970] hover:text-white transition-all duration-300;
}

/* Effets de hover pour les cartes */
.card-hover {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Styles pour les inputs */
.input-modern {
  @apply w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#006970] focus:ring-opacity-20 focus:border-[#006970] transition-all duration-300 bg-white;
}

.input-modern:focus {
  box-shadow: 0 0 0 4px rgba(0, 105, 112, 0.1);
}

/* Animations d'entrée */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease-out forwards;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.fade-in-right {
  animation: fadeInRight 0.6s ease-out forwards;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Styles pour les éléments décoratifs */
.decoration-blob {
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: blob 7s ease-in-out infinite;
}

@keyframes blob {
  0% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: translate(0px, 0px) scale(1);
  }
}

/* Responsive typography */
@media (max-width: 640px) {
  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }
  
  h2 {
    font-size: 2rem;
    line-height: 1.3;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #006970, #008891);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #008891, #20b2aa);
}
</style>

<script setup lang="ts">
import { navigateTo, useHead, useLazyAsyncData } from 'nuxt/app'
import { computed, nextTick, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useApiStore } from '../stores/api'

// SEO Meta avec polices modernes
useHead({
  title: 'Workion - Trouvez le bon prestataire près de chez vous',
  meta: [
    {
      name: 'description',
      content: 'Plateforme de services à domicile au Sénégal. Trouvez facilement des prestataires qualifiés pour ménage, jardinage, plomberie et plus encore.'
    },
    {
      name: 'keywords',
      content: 'services à domicile, prestataires Sénégal, ménage Dakar, jardinage, plomberie, électricité'
    },
    {
      property: 'og:title',
      content: 'Workion - Trouvez le bon prestataire près de chez vous'
    },
    {
      property: 'og:description',
      content: 'Plateforme de services à domicile au Sénégal. Trouvez facilement des prestataires qualifiés pour ménage, jardinage, plomberie et plus encore.'
    }
  ],
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: ''
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap'
    }
  ]
})

// Data
const searchQuery = ref('')
const selectedService = ref('')
const selectedLocation = ref('')
const certifiedOnly = ref(false)
const sortBy = ref('rating')
const currentPage = ref(1)
const limit = 12

// Variables pour le drawer
const isDrawerOpen = ref(false)
const selectedProvider = ref(null)

const apiStore = useApiStore()

// API calls avec logs pour les services
const { data: servicesData } = await useLazyAsyncData('services', () => apiStore.getServices())

// Fonction pour fetch les providers
const fetchProviders = () => {
  return apiStore.getProviders({
    page: currentPage.value,
    limit,
    search: searchQuery.value || undefined,
    services: selectedService.value ? [selectedService.value] : undefined,
    location: selectedLocation.value || undefined,
    certified: certifiedOnly.value || undefined
  })
}

// API call principal pour les prestataires avec filtres
const { data: providersData, pending, error, refresh } = await useLazyAsyncData(
  'providers', 
  fetchProviders,
  { watch: [currentPage] } 
)

// Computed properties
const availableServices = computed(() => {
  const services = servicesData?.value?.data?.services || []
  return services.map(service => ({
    id: service.id || service._id,
    name: service.name
  }))
})

const popularServices = computed(() => {
  const services = servicesData?.value?.data?.services || []
  return services.slice(0, 6).map(service => ({
    id: service.id || service._id,
    name: service.name,
    icon: service.icon || '🔧',
    slug: service.slug || service.name.toLowerCase().replace(/\s+/g, '-')
  }))
})

const providers = computed(() => providersData.value?.data?.users || [])
const filteredProvidersCount = computed(() => {
  return providersData.value?.data?.totalUsers || 0
});

const totalPages = computed(() => {
  return providersData.value?.data?.totalPages || Math.ceil(providersData.value?.data?.total / limit)
});

const visiblePages = computed((): (number | string)[] => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedService.value || selectedLocation.value || certifiedOnly.value
})

// Watcher pour déclencher le fetch quand les paramètres changent
watch([searchQuery, selectedService, selectedLocation, certifiedOnly], 
  () => {
    refresh()
  }, 
  { immediate: false }
)

// Methods
const handleSearch = useDebounceFn(() => {
  currentPage.value = 1
  refresh()
}, 300)

const handleServiceChange = () => {
  currentPage.value = 1
  refresh()
}

const handleLocationChange = () => {
  currentPage.value = 1
  refresh()
}

const handleCertifiedChange = () => {
  currentPage.value = 1
  refresh()
}

const handleSortChange = () => {
  currentPage.value = 1
  refresh()
}
const resetFilters = () => {
  searchQuery.value = ''
  selectedService.value = ''
  selectedLocation.value = ''
  certifiedOnly.value = false
  sortBy.value = 'rating'
  currentPage.value = 1
}

const goToPage = (page: number) => {
  
  // Vérification plus stricte
  if (typeof page !== 'number' || page < 1 || page > totalPages.value) {
    return
  }
  
  if (page !== currentPage.value) {
    currentPage.value = page
    refresh()
    
    // Scroll jusqu'à l'élément avec l'id "providers-block"
    nextTick(() => {
      const target = document.getElementById('providers-block')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  } else {
    console.log('⚠️ Already on page', page)
  }
}

// Fonctions pour gérer le drawer
const openProviderDrawer = (provider: any) => {
  selectedProvider.value = provider
  isDrawerOpen.value = true
}

const closeProviderDrawer = () => {
  isDrawerOpen.value = false
  selectedProvider.value = null
}
</script>
