<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <!-- Hero Section Moderne -->
    <section class="relative overflow-hidden bg-gradient-to-r from-[#006970] to-[#008891] text-white">
      <div class="absolute inset-0 bg-black/10"></div>
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Trouvez le bon prestataire
          </h1>
          <p class="text-xl text-white/90 max-w-2xl mx-auto">
            Décrivez votre besoin en quelques clics et recevez des propositions personnalisées
          </p>
        </div>
      </div>
    </section>

    <!-- Formulaire Moderne -->
    <section class="py-12 -mt-8 relative z-10">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <!-- Progress Bar -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-100">
            <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Étape {{ currentStep }} sur {{ publicationMode === 'user' ? 6 : 5 }}</span>
              <span>{{ Math.round((currentStep / (publicationMode === 'user' ? 6 : 5)) * 100) }}% complété</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="bg-gradient-to-r from-[#006970] to-[#008891] h-2 rounded-full transition-all duration-500"
                :style="{ width: `${(currentStep / (publicationMode === 'user' ? 6 : 5)) * 100}%` }"
              ></div>
            </div>
          </div>

          <form id="form" @submit.prevent="submitRequest" class="p-6 md:p-8">
            <!-- Étape 1: Mode de publication -->
            <div v-show="currentStep === 1" class="space-y-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-[#006970]/10 rounded-full mb-4">
                  <svg class="w-6 h-6 text-[#006970]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Comment souhaitez-vous publier ?</h2>
                <p class="text-gray-600">Choisissez votre mode de publication</p>
              </div>

              <!-- Mode de publication -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div
                  @click="setPublicationMode('guest')"
                  :class="[
                    'p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md',
                    publicationMode === 'guest'
                      ? 'border-[#006970] bg-[#006970]/5 text-[#006970] shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <div class="text-center">
                    <div class="text-3xl mb-3">👤</div>
                    <h3 class="font-semibold mb-2">Mode Invité</h3>
                    <p class="text-sm text-gray-600">Publication rapide sans compte</p>
                  </div>
                </div>

                <div
                  @click="setPublicationMode('user')"
                  :class="[
                    'p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md',
                    publicationMode === 'user'
                      ? 'border-[#006970] bg-[#006970]/5 text-[#006970] shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <div class="text-center">
                    <div class="text-3xl mb-3">🔐</div>
                    <h3 class="font-semibold mb-2">Compte Utilisateur</h3>
                    <p class="text-sm text-gray-600">Avec votre profil Workion</p>
                  </div>
                </div>
              </div>

              <!-- Informations invité -->
              <div v-if="publicationMode === 'guest'" class="space-y-6">
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <h4 class="text-sm font-semibold text-blue-800 mb-1">Mode Invité</h4>
                      <p class="text-sm text-blue-700">Renseignez vos informations pour que les prestataires puissent vous contacter.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label for="guestName" class="block text-sm font-semibold text-gray-700 mb-3">
                    Nom complet *
                  </label>
                  <input
                    id="guestName"
                    v-model="form.guestName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006970] focus:border-transparent transition-all"
                    placeholder="Votre nom complet"
                  >
                </div>
                
                <div>
                  <label for="guestPhone" class="block text-sm font-semibold text-gray-700 mb-3">
                    Numéro de téléphone *
                  </label>
                  <vue-tel-input
                    v-bind="phoneInputProps"
                    v-model="form.guestPhone"
                    class="vue-phone-input-custom"
                    :class="{ 'error': !form.guestPhone }"
                  />
                </div>

                <div>
                  <label for="guestAddress" class="block text-sm font-semibold text-gray-700 mb-3">
                    Adresse
                  </label>
                  <input
                    id="guestAddress"
                    v-model="form.guestAddress"
                    type="text"
                    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006970] focus:border-transparent transition-all"
                    placeholder="Votre adresse complète"
                  >
                </div>

              </div>

              <!-- Mode utilisateur connecté -->
              <div v-else-if="publicationMode === 'user'" class="space-y-6">
                <div v-if="!isUserLoggedIn" class="text-center">
                  <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                    <div class="flex items-center justify-center mb-4">
                      <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-yellow-800 mb-2">Connexion requise</h3>
                    <p class="text-yellow-700 mb-4">Vous devez être connecté pour publier avec votre profil utilisateur.</p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        type="button"
                        @click="redirectToLogin"
                        class="px-6 py-3 bg-[#006970] text-white font-semibold rounded-xl hover:bg-[#005560] transition-colors"
                      >
                        Se connecter
                      </button>
                      <button
                        type="button"
                        @click="setPublicationMode('guest')"
                        class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Continuer en invité
                      </button>
                    </div>
                  </div>
                </div>

                <div v-else class="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div class="flex items-center">
                    <svg class="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <div>
                      <h3 class="text-lg font-semibold text-green-800">Connecté en tant que {{ currentUser?.firstname }} {{ currentUser?.lastname }}</h3>
                      <p class="text-green-700">Votre demande sera associée à votre profil utilisateur.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Étape 2: Type de service -->
            <div v-show="currentStep === 2" class="space-y-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-[#006970]/10 rounded-full mb-4">
                  <svg class="w-6 h-6 text-[#006970]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Type de service</h2>
                <p class="text-gray-600">Choisissez le type de service souhaité</p>
              </div>

              <!-- Type de service -->
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Type de service *</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div
                    @click="form.serviceType = 'self_service'"
                    :class="[
                      'p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md',
                      form.serviceType === 'self_service'
                        ? 'border-[#006970] bg-[#006970]/5 text-[#006970] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                  >
                    <div class="text-center">
                      <div class="text-3xl mb-3">🛠️</div>
                      <h4 class="font-semibold mb-2">Service autonome</h4>
                      <p class="text-sm text-gray-600">Je gère ma demande moi-même</p>
                    </div>
                  </div>

                  <div
                    @click="form.serviceType = 'full_service'"
                    :class="[
                      'p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md',
                      form.serviceType === 'full_service'
                        ? 'border-[#006970] bg-[#006970]/5 text-[#006970] shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                  >
                    <div class="text-center">
                      <div class="text-3xl mb-3">📦</div>
                      <h4 class="font-semibold mb-2">Service complet</h4>
                      <p class="text-sm text-gray-600">Workion gère ma demande</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Étape 3: Sélection des services -->
            <div v-show="currentStep === 3" class="space-y-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-[#006970]/10 rounded-full mb-4">
                  <svg class="w-6 h-6 text-[#006970]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Quels services recherchez-vous ?</h2>
                <p class="text-gray-600">Sélectionnez un ou plusieurs services</p>
              </div>

              <!-- Barre de recherche -->
              <div class="mb-6">
                <div class="relative">
                  <input
                    v-model="serviceSearch"
                    type="text"
                    placeholder="Rechercher un service..."
                    class="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006970] focus:border-transparent transition-all"
                  >
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Services disponibles -->
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  v-for="service in filteredServices"
                  :key="service.id"
                  @click="toggleService(service.id)"
                  :class="[
                    'p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md text-center flex flex-col items-center',
                    form.services.includes(service.id)
                      ? 'border-[#006970] bg-[#006970]/5 text-[#006970] shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <div class="text-2xl mb-2">
                    <img :src="service.icon?.fullUrl" :alt="service.name" class="w-12 h-12">
                  </div>
                  <h3 class="font-semibold text-sm">{{ service.name }}</h3>
                  <div v-if="form.services.includes(service.id)" class="mt-2">
                    <svg class="w-5 h-5 text-[#006970] mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Services sélectionnés -->
              <div v-if="form.services.length > 0" class="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 class="text-sm font-semibold text-green-800 mb-2">Services sélectionnés ({{ form.services.length }})</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="serviceId in form.services"
                    :key="serviceId"
                    class="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
                  >
                    {{ getServiceName(serviceId) }}
                    <button
                      type="button"
                      @click="removeService(serviceId)"
                      class="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <!-- Étape 4: Description et budget -->
            <div v-show="currentStep === 4" class="space-y-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-[#006970]/10 rounded-full mb-4">
                  <svg class="w-6 h-6 text-[#006970]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Décrivez votre projet</h2>
                <p class="text-gray-600">Plus de détails aideront les prestataires à mieux vous comprendre</p>
              </div>

              <!-- Description -->
              <div>
                <label for="details" class="block text-sm font-semibold text-gray-700 mb-3">
                  Description détaillée *
                </label>
                <textarea
                  id="details"
                  v-model="form.details"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006970] focus:border-transparent transition-all resize-none"
                  placeholder="Décrivez précisément ce que vous recherchez : type de travail, fréquence, matériel nécessaire, contraintes particulières..."
                ></textarea>
                <div class="flex justify-between items-center mt-2">
                  <span class="text-sm text-gray-500">Minimum 10 caractères</span>
                  <span class="text-sm text-gray-500">{{ form.details.length }} caractères</span>
                </div>
              </div>

              <!-- Budget -->
              <div class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Budget (optionnel)</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="price" class="block text-sm font-semibold text-gray-700 mb-3">
                      Prix proposé (FCFA)
                    </label>
                    <input
                      id="price"
                      v-model.number="form.price"
                      type="number"
                      min="0"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006970] focus:border-transparent transition-all"
                      placeholder="Ex: 50000"
                    >
                  </div>

                  <div>
                    <label for="periodicity" class="block text-sm font-semibold text-gray-700 mb-3">
                      Périodicité
                    </label>
                    <select
                      id="periodicity"
                      v-model="form.periodicity"
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#006970] focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionner</option>
                      <option value="par heure">Par heure</option>
                      <option value="par jour">Par jour</option>
                      <option value="par semaine">Par semaine</option>
                      <option value="par mois">Par mois</option>
                      <option value="pour la prestation">Pour la prestation</option>
                    </select>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="form.negotiable"
                      type="checkbox"
                      class="w-5 h-5 text-[#006970] border-gray-300 rounded focus:ring-[#006970]"
                    >
                    <span class="ml-3 text-sm text-gray-700">Prix négociable</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Étape 5: Adresse du service (utilisateur connecté uniquement) -->
            <div v-show="currentStep === 5 && publicationMode === 'user'" class="space-y-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-[#006970]/10 rounded-full mb-4">
                  <svg class="w-6 h-6 text-[#006970]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Où se déroule le service ?</h2>
                <p class="text-gray-600">Sélectionnez l'adresse où vous souhaitez recevoir le service</p>
              </div>

              <GoogleMapPicker
                v-model="form.address"
                :api-key="googleMapsApiKey"
                @address-selected="onAddressSelected"
              />
            </div>

            <!-- Étape 6: Moyens de contact -->
            <div v-show="currentStep === 6 || (currentStep === 5 && publicationMode === 'guest')" class="space-y-6">
              <div class="text-center mb-8">
                <div class="inline-flex items-center justify-center w-12 h-12 bg-[#006970]/10 rounded-full mb-4">
                  <svg class="w-6 h-6 text-[#006970]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Finalisation</h2>
                <p class="text-gray-600">Comment souhaitez-vous être contacté ?</p>
              </div>

              <!-- Moyens de contact (pour mode invité uniquement) -->
              <div v-if="publicationMode === 'guest'" class="bg-gray-50 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  Comment souhaitez-vous être contacté ?
                </h3>
                <div class="space-y-3">
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="form.allowCalls"
                      type="checkbox"
                      class="w-5 h-5 text-[#006970] border-gray-300 rounded focus:ring-[#006970]"
                    >
                    <span class="ml-3 text-sm text-gray-700">📞 Autoriser les appels téléphoniques</span>
                  </label>
                  <label class="flex items-center cursor-pointer">
                    <input
                      v-model="form.allowWhatsApp"
                      type="checkbox"
                      class="w-5 h-5 text-[#006970] border-gray-300 rounded focus:ring-[#006970]"
                    >
                    <span class="ml-3 text-sm text-gray-700">💬 Autoriser les messages WhatsApp</span>
                  </label>
                </div>
              </div>

              <!-- Message pour utilisateur connecté -->
              <div v-else class="bg-green-50 border border-green-200 rounded-xl p-6">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <div>
                    <h3 class="text-lg font-semibold text-green-800">Utilisateur connecté</h3>
                    <p class="text-green-700">Les prestataires pourront vous contacter via votre profil Workion.</p>
                  </div>
                </div>
              </div>

              <!-- Récapitulatif -->
              <div class="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-blue-900 mb-4">📋 Récapitulatif</h3>
                <div class="space-y-2 text-sm">
                  <div><strong>Mode:</strong> {{ publicationMode === 'guest' ? 'Invité' : 'Utilisateur connecté' }}</div>
                  <div><strong>Type:</strong> {{ form.serviceType === 'self_service' ? 'Service autonome' : 'Service complet' }}</div>
                  <div><strong>Services:</strong> {{ form.services.map(id => getServiceName(id)).join(', ') }}</div>
                  <div v-if="form.price"><strong>Budget:</strong> {{ form.price.toLocaleString() }} FCFA{{ form.negotiable ? ' (négociable)' : '' }}</div>
                  <div v-if="form.address && publicationMode === 'user'"><strong>Adresse:</strong> {{ form.address.address }}</div>
                </div>
              </div>
            </div>

            <!-- Navigation -->
            <div class="flex items-center justify-between pt-8 border-t border-gray-100">
              <button
                v-if="currentStep > 1"
                type="button"
                @click="previousStep"
                class="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Précédent
              </button>
              <div v-else></div>

              <button
                v-if="currentStep < (publicationMode === 'user' ? 6 : 5)"
                type="button"
                @click="nextStep"
                :disabled="!canProceedToNextStep"
                :class="[
                  'flex items-center px-8 py-3 bg-gradient-to-r from-[#006970] to-[#008891] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5',
                  !canProceedToNextStep && 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none'
                ]"
              >
                Suivant
                <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>

              <button
                v-else-if="currentStep === (publicationMode === 'user' ? 6 : 5)"
                type="submit"
                :disabled="isSubmitting || !isFormValid"
                :class="[
                  'flex items-center px-8 py-3 bg-gradient-to-r from-[#006970] to-[#008891] text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5',
                  (isSubmitting || !isFormValid) && 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none'
                ]"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publication en cours...
                </span>
                <span v-else class="flex items-center">
                  Publier ma demande
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Poster une demande de service - Workion',
  meta: [
    {
      name: 'description',
      content: 'Postez votre demande de service à domicile et recevez des propositions de prestataires qualifiés près de chez vous. Gratuit et sans engagement.'
    },
    {
      name: 'keywords',
      content: 'poster demande service, trouver prestataire, services à domicile, Sénégal'
    }
  ]
})

// Stores
const apiStore = useApiStore()
const route = useRoute()

// Reactive data
const isSubmitting = ref(false)
const currentStep = ref(1)
const publicationMode = ref('guest') // 'guest' ou 'user'
const serviceSearch = ref('')

// Vérifier si l'utilisateur est connecté
const isUserLoggedIn = computed(() => {
  const token = localStorage.getItem('workion_token')
  return !!token
})

const currentUser = computed(() => {
  const userStr = localStorage.getItem('workion_user')
  if (userStr) {
    try {
      return JSON.parse(userStr)
    } catch (error) {
      return null
    }
  }
  return null
})

const form = reactive({
  // Champs pour mode invité
  guestName: '',
  guestPhone: '',
  guestAddress: '',
  allowCalls: true,
  allowWhatsApp: true,
  // Champs communs
  services: [],
  details: '',
  serviceType: '', // 'self_service' ou 'full_service' (obligatoire)
  periodicity: '',
  price: null,
  negotiable: false,
  // Adresse pour utilisateur connecté
  address: null
})

// API call pour récupérer les services
const { data: servicesData } = await useLazyAsyncData('services', () => apiStore.getServices())

// Available services depuis l'API
const availableServices = computed(() => {
  const services = servicesData?.value?.data?.services || []
  
  // Mapping des icônes par défaut
  const defaultIcons = {
    'menage': '🧹',
    'jardinage': '🌱',
    'plomberie': '🔧',
    'electricite': '⚡',
    'cuisine': '👨‍🍳',
    'peinture': '🎨',
    'nettoyage': '🧽',
    'bricolage': '🔨',
    'coiffure': '💇‍♀️',
    'massage': '💆‍♂️',
    'livraison': '🚚',
    'garde': '👶',
    'informatique': '💻',
    'transport': '🚗',
    'sante': '🏥',
    'education': '📚',
    'beaute': '💄',
    'sport': '⚽',
    'musique': '🎵',
    'photographie': '📸'
  }
  
  return services.map(service => ({
    id: service.id || service._id,
    name: service.name,
    icon: defaultIcons[service.name?.toLowerCase()] || service.icon || '🔧'
  }))
})

// Computed
const filteredServices = computed(() => {
  if (!serviceSearch.value) return availableServices.value
  return availableServices.value.filter(service =>
    service.name.toLowerCase().includes(serviceSearch.value.toLowerCase())
  )
})

const isFormValid = computed(() => {
  const baseValid = form.services.length > 0 && 
                   form.details.trim().length > 10 && 
                   form.serviceType

  if (publicationMode.value === 'guest') {
    return baseValid && form.guestName && form.guestPhone
  } else {
    return baseValid && isUserLoggedIn.value
  }
})

const canProceedToNextStep = computed(() => {
  switch (currentStep.value) {
    case 1:
      if (publicationMode.value === 'guest') {
        return form.guestName && form.guestPhone
      } else {
        return isUserLoggedIn.value
      }
    case 2:
      return form.serviceType // Type de service obligatoire
    case 3:
      return form.services.length > 0
    case 4:
      return form.details.trim().length > 10
    case 5:
      if (publicationMode.value === 'user') {
        console.log('form.address !== null:', form.address !== null)
        return form.address !== null // Adresse obligatoire pour utilisateur connecté
      } else {
        return true // Mode invité, pas d'étape d'adresse
      }
    case 6:
      return true // Dernière étape, toujours valide
    default:
      return false
  }
})

// Methods
const setPublicationMode = (mode) => {
  publicationMode.value = mode
  if (mode === 'user' && !isUserLoggedIn.value) {
    // Ne pas changer automatiquement, laisser l'utilisateur choisir
  }
}

const toggleService = (serviceId) => {
  const index = form.services.indexOf(serviceId)
  if (index > -1) {
    form.services.splice(index, 1)
  } else {
    form.services.push(serviceId)
  }
}

const removeService = (serviceId) => {
  const index = form.services.indexOf(serviceId)
  if (index > -1) {
    form.services.splice(index, 1)
  }
}

// Configuration pour vue-tel-input
const phoneInputProps = {
  defaultCountry: 'SN',
  preferredCountries: ['SN', 'FR', 'US', 'GB'],
  onlyCountries: ['SN', 'FR', 'US', 'GB', 'CA', 'DE', 'ES', 'IT', 'MA', 'CI', 'ML', 'BF', 'GN', 'MR'],
  placeholder: 'Entrez votre numéro',
  mode: 'international',
  enabledCountryCode: true,
  enabledFlags: true,
  autocomplete: 'off',
  name: 'telephone',
  maxLen: 25,
  required: false,
  disabled: false
}

// Configuration Google Maps API Key
const config = useRuntimeConfig()
const googleMapsApiKey = config.public.googleMapsApiKey || 'YOUR_GOOGLE_MAPS_API_KEY'

// Gestionnaire de sélection d'adresse
const onAddressSelected = (address) => {
  console.log('Adresse sélectionnée:', address)
  form.address = address
  console.log('form.address:', form.address)
}

const getServiceName = (serviceId) => {
  const service = availableServices.value?.find(s => s.id === serviceId)
  return service ? service.name : serviceId
}

const redirectToLogin = () => {
  navigateTo('/login?redirect=/poster-demande')
}

const nextStep = () => {
  const maxSteps = publicationMode.value === 'user' ? 6 : 5
  console.log('canProceedToNextStep.value:', canProceedToNextStep.value)
  
  if (canProceedToNextStep.value && currentStep.value < maxSteps) {
    currentStep.value++
    document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    document.querySelector('#form')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const submitRequest = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true

  try {
    // Préparer les données selon le mode
    const requestData = {
      // Données communes
      services: form.services,
      details: form.details,
      serviceType: form.serviceType,
      periodicity: form.periodicity || null,
      price: form.price || null,
      negotiable: form.negotiable || false,
      allowCalls: form.allowCalls,
      allowWhatsApp: form.allowWhatsApp,
      // Données spécifiques au mode
      ...(publicationMode.value === 'guest' ? {
        // Mode invité
        guestName: form.guestName,
        guestPhone: form.guestPhone.replaceAll(/[^\d+]/g, ''),
        guestAddress: form.guestAddress || null,
      } : {
        // Mode utilisateur connecté
        address: form.address // Adresse sélectionnée via Google Maps
      })
    }

    console.log('Données à envoyer:', requestData)

    // Appel API
    const response = await apiStore.createServiceRequest(requestData)
    
    console.log('Réponse API:', response)

    // Redirection vers la page de confirmation
    await navigateTo('/demande-confirmee')
    
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    alert(`Une erreur est survenue lors de la publication de votre demande. Veuillez réessayer.\n\n${error?.data?.message || ''}`)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (route.query.service) {
    const serviceId = route.query.service
    if (availableServices.value.find(s => s.id === serviceId)) {
      form.services.push(serviceId)
      currentStep.value = 2
    }
  }
})
</script>

<style scoped>
/* Styles pour les animations et transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* Styles pour vue-tel-input */
:deep(.vue-phone-input-custom) {
  border-radius: 0.75rem;
  border: 2px solid #d1d5db;
  transition: all 0.3s ease;
}

:deep(.vue-phone-input-custom:focus-within) {
  border-color: #006970;
  box-shadow: 0 0 0 4px rgba(0, 105, 112, 0.1);
}

:deep(.vue-phone-input-custom.error) {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

/* Container principal vue-tel-input */
:deep(.vue-tel-input) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: 0.75rem;
}

/* Input field */
:deep(.vue-tel-input input) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: transparent;
}

/* Dropdown */
:deep(.vue-tel-input .vti__dropdown) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  padding: 0.75rem 0.5rem;
}

/* Flag */
:deep(.vue-tel-input .vti__flag) {
  margin-right: 0.5rem;
}

/* Dropdown arrow */
:deep(.vue-tel-input .vti__dropdown-arrow) {
  color: #6b7280;
}
</style>
