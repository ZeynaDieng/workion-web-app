<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Poster une demande de service
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Décrivez votre besoin et recevez des propositions de prestataires qualifiés près de chez vous
          </p>
        </div>
      </div>
    </section>

    <!-- Formulaire -->
    <section class="py-12">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <form @submit.prevent="submitRequest" class="space-y-8">
          <!-- Informations personnelles -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Vos informations
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="guestName" class="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  id="guestName"
                  v-model="form.guestName"
                  type="text"
                  required
                  class="input-field"
                  placeholder="Votre nom complet"
                >
              </div>
              
              <div>
                <label for="guestPhone" class="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone *
                </label>
                <input
                  id="guestPhone"
                  v-model="form.guestPhone"
                  type="tel"
                  required
                  class="input-field"
                  placeholder="+221 XX XXX XX XX"
                >
              </div>
            </div>

            <div class="mt-6">
              <label for="guestAddress" class="block text-sm font-medium text-gray-700 mb-2">
                Adresse
              </label>
              <input
                id="guestAddress"
                v-model="form.guestAddress"
                type="text"
                class="input-field"
                placeholder="Votre adresse complète"
              >
            </div>

            <!-- Préférences de contact -->
            <div class="mt-6">
              <h3 class="text-sm font-medium text-gray-700 mb-3">
                Comment souhaitez-vous être contacté ?
              </h3>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    id="allowCalls"
                    v-model="form.allowCalls"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <label for="allowCalls" class="ml-2 text-sm text-gray-700">
                    Autoriser les appels téléphoniques
                  </label>
                </div>
                <div class="flex items-center">
                  <input
                    id="allowWhatsApp"
                    v-model="form.allowWhatsApp"
                    type="checkbox"
                    class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  >
                  <label for="allowWhatsApp" class="ml-2 text-sm text-gray-700">
                    Autoriser les messages WhatsApp
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Services demandés -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Services demandés *
            </h2>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div
                v-for="service in availableServices"
                :key="service.id"
                class="relative"
              >
                <input
                  :id="`service-${service.id}`"
                  v-model="form.services"
                  :value="service.id"
                  type="checkbox"
                  class="sr-only"
                >
                <label
                  :for="`service-${service.id}`"
                  :class="[
                    'flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all',
                    form.services.includes(service.id)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                >
                  <span class="text-2xl mb-2">{{ service.icon }}</span>
                  <span class="text-sm font-medium text-center">{{ service.name }}</span>
                </label>
              </div>
            </div>
            
            <p v-if="!form.services.length" class="text-red-600 text-sm mt-2">
              Veuillez sélectionner au moins un service
            </p>
          </div>

          <!-- Description détaillée -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Description de votre demande *
            </h2>
            
            <div>
              <label for="details" class="block text-sm font-medium text-gray-700 mb-2">
                Décrivez précisément votre besoin
              </label>
              <textarea
                id="details"
                v-model="form.details"
                rows="6"
                required
                class="input-field resize-none"
                placeholder="Décrivez en détail le service dont vous avez besoin, vos exigences particulières, la fréquence souhaitée, etc."
              ></textarea>
              <p class="text-sm text-gray-500 mt-2">
                Plus votre description est précise, meilleures seront les propositions que vous recevrez.
              </p>
            </div>
          </div>

          <!-- Budget et modalités -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">
              Budget et modalités
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="serviceType" class="block text-sm font-medium text-gray-700 mb-2">
                  Type de service
                </label>
                <select
                  id="serviceType"
                  v-model="form.serviceType"
                  class="input-field"
                >
                  <option value="">Sélectionner le type</option>
                  <option value="self_service">Libre service (vous fournissez le matériel)</option>
                  <option value="full_service">Service complet (prestataire équipé)</option>
                </select>
              </div>
              
              <div>
                <label for="periodicity" class="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence
                </label>
                <select
                  id="periodicity"
                  v-model="form.periodicity"
                  class="input-field"
                >
                  <option value="">Sélectionner la fréquence</option>
                  <option value="par heure">Par heure</option>
                  <option value="par jour">Par jour</option>
                  <option value="par semaine">Par semaine</option>
                  <option value="par mois">Par mois</option>
                  <option value="pour la prestation">Pour la prestation complète</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
                  Budget indicatif (FCFA)
                </label>
                <input
                  id="price"
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  class="input-field"
                  placeholder="Ex: 15000"
                >
              </div>
              
              <div class="flex items-center mt-8">
                <input
                  id="negotiable"
                  v-model="form.negotiable"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                >
                <label for="negotiable" class="ml-2 text-sm text-gray-700">
                  Budget négociable
                </label>
              </div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              @click="resetForm"
              class="btn-secondary"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              :disabled="isSubmitting || !isFormValid"
              :class="[
                'btn-primary',
                (isSubmitting || !isFormValid) && 'opacity-50 cursor-not-allowed'
              ]"
            >
              <span v-if="isSubmitting" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publication en cours...
              </span>
              <span v-else>Publier ma demande</span>
            </button>
          </div>
        </form>
      </div>
    </section>

    <!-- Comment ça marche -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Comment ça marche après votre demande ?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Réception des propositions</h3>
            <p class="text-gray-600">
              Les prestataires qualifiés près de chez vous vous contactent avec leurs propositions et tarifs
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Comparaison et choix</h3>
            <p class="text-gray-600">
              Comparez les profils, les avis, les tarifs et choisissez le prestataire qui vous convient le mieux
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Planification du service</h3>
            <p class="text-gray-600">
              Planifiez l'intervention avec le prestataire choisi et profitez d'un service de qualité
            </p>
          </div>
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

// Reactive data
const isSubmitting = ref(false)

const form = reactive({
  guestName: '',
  guestPhone: '',
  guestAddress: '',
  allowCalls: true,
  allowWhatsApp: true,
  services: [],
  details: '',
  serviceType: '',
  periodicity: '',
  price: null,
  negotiable: false
})

// Available services
const availableServices = ref([
  { id: 'menage', name: 'Ménage', icon: '🧹' },
  { id: 'jardinage', name: 'Jardinage', icon: '🌱' },
  { id: 'plomberie', name: 'Plomberie', icon: '🔧' },
  { id: 'electricite', name: 'Électricité', icon: '⚡' },
  { id: 'cuisine', name: 'Cuisine', icon: '👨‍🍳' },
  { id: 'peinture', name: 'Peinture', icon: '🎨' },
  { id: 'nettoyage', name: 'Nettoyage', icon: '🧽' },
  { id: 'bricolage', name: 'Bricolage', icon: '🔨' }
])

// Computed
const isFormValid = computed(() => {
  return form.guestName && 
         form.guestPhone && 
         form.services.length > 0 && 
         form.details.trim().length > 10
})

// Methods
const submitRequest = async () => {
  if (!isFormValid.value || isSubmitting.value) return

  isSubmitting.value = true

  try {
    const requestData = {
      ...form,
      // Nettoyer les données
      price: form.price || undefined,
      serviceType: form.serviceType || undefined,
      periodicity: form.periodicity || undefined
    }

    await apiStore.createServiceRequest(requestData)
    
    // Rediriger vers une page de confirmation
    await navigateTo('/demande-confirmee')
    
  } catch (error) {
    console.error('Erreur lors de la soumission:', error)
    
    // Afficher un message d'erreur à l'utilisateur
    alert('Une erreur est survenue lors de la publication de votre demande. Veuillez réessayer.')
    
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    guestName: '',
    guestPhone: '',
    guestAddress: '',
    allowCalls: true,
    allowWhatsApp: true,
    services: [],
    details: '',
    serviceType: '',
    periodicity: '',
    price: null,
    negotiable: false
  })
}

// Pre-fill service if coming from service page
const route = useRoute()
onMounted(() => {
  if (route.query.service) {
    const serviceId = route.query.service
    if (availableServices.value.find(s => s.id === serviceId)) {
      form.services.push(serviceId)
    }
  }
})
</script>
