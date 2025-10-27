<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question, un problème ou une suggestion ? Notre équipe est là pour vous aider
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Formulaire de contact -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">
              Envoyez-nous un message
            </h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    id="firstName"
                    v-model="form.firstName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Votre prénom"
                  >
                </div>
                
                <div>
                  <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    id="lastName"
                    v-model="form.lastName"
                    type="text"
                    required
                    class="input-field"
                    placeholder="Votre nom"
                  >
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input-field"
                  placeholder="votre@email.com"
                >
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="input-field"
                  placeholder="+221 XX XXX XX XX"
                >
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Sujet *
                </label>
                <select
                  id="subject"
                  v-model="form.subject"
                  required
                  class="input-field"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="support">Support technique</option>
                  <option value="billing">Facturation</option>
                  <option value="partnership">Partenariat</option>
                  <option value="feedback">Suggestion/Feedback</option>
                  <option value="complaint">Réclamation</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="input-field resize-none"
                  placeholder="Décrivez votre demande en détail..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                :class="[
                  'w-full btn-primary bg-gradient-to-r from-[#008891] to-[#008891] text-white',
                  isSubmitting && 'opacity-50 cursor-not-allowed'
                ]"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
                <span v-else>Envoyer le message</span>
              </button>
            </form>

            <!-- Message de confirmation -->
            <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex">
                <svg class="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                <div class="ml-3">
                  <p class="text-sm text-green-800">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Informations de contact -->
          <div class="space-y-8">
            <!-- Coordonnées -->
            <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-6">
                Nos coordonnées
              </h3>
              
              <div class="space-y-6">
                <!-- <div class="flex items-start">
                  <svg class="w-6 h-6 text-blue-600 mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium text-gray-900">Adresse</h4>
                    <p class="text-gray-600">
                      Dakar, Sénégal<br>
                      Plateau, Rue de la République
                    </p>
                  </div>
                </div> -->

                <div class="flex items-start">
                  <svg class="w-6 h-6 text-[#008891] mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium text-gray-900">Téléphone</h4>
                    <p class="text-gray-600">
                      <a href="tel:+221767629292" class="hover:text-blue-600">+221 76 762 92 92</a>
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <svg class="w-6 h-6 text-[#008891] mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium text-gray-900">Email</h4>
                    <p class="text-gray-600">
                      <a href="mailto:workionsn@gmail.com" class="hover:text-blue-600">workionsn@gmail.com</a>
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <svg class="w-6 h-6 text-[#008891] mt-1 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h4 class="font-medium text-gray-900">Horaires</h4>
                    <p class="text-gray-600">
                      Lundi - Dimanche : 8h - 23h<br>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Support rapide -->
            <div class="bg-blue-50 rounded-lg border border-blue-200 p-8">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">
                Besoin d'aide rapidement ?
              </h3>
              <p class="text-gray-600 mb-6">
                Pour un support immédiat, consultez notre centre d'aide ou contactez-nous via WhatsApp
              </p>
              <div class="space-y-3">
                <a 
                  href="#" 
                  class="block w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-center hover:bg-gray-50 transition-colors"
                >
                  📚 Centre d'aide
                </a>
                <a 
                  href="https://wa.me/221767629292" 
                  target="_blank"
                  class="block w-full bg-green-600 text-white rounded-lg px-4 py-3 text-center hover:bg-green-700 transition-colors"
                >
                  💬 WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p class="text-xl text-gray-600">
            Trouvez rapidement des réponses aux questions les plus courantes
          </p>
        </div>

        <div class="space-y-6">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="bg-gray-50 rounded-lg border border-gray-200"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <svg 
                :class="['w-5 h-5 text-gray-500 transition-transform', openFaq === index ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div 
              v-if="openFaq === index"
              class="px-6 pb-4 text-gray-600"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Contact - Workion',
  meta: [
    {
      name: 'description',
      content: 'Contactez l\'équipe Workion pour toute question, suggestion ou problème. Support client disponible 7j/7.'
    },
    {
      name: 'keywords',
      content: 'contact Workion, support client, aide, assistance, Sénégal'
    }
  ]
})

// Reactive data
const isSubmitting = ref(false)
const showSuccess = ref(false)
const openFaq = ref(null)

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const faqs = ref([
  {
    question: 'Comment créer un compte sur Workion ?',
    answer: 'Téléchargez l\'application mobile Workion sur App Store ou Google Play, puis suivez les étapes d\'inscription. Vous pouvez vous inscrire en tant que client ou prestataire.'
  },
  {
    question: 'Workion est-il disponible dans ma ville ?',
    answer: 'Workion est disponible dans toutes les grandes villes du Sénégal : Dakar, Thiès, Saint-Louis, Kaolack, Ziguinchor. Nous étendons progressivement notre couverture.'
  },
  {
    question: 'Comment signaler un problème avec un prestataire ?',
    answer: 'Vous pouvez signaler un problème directement dans l\'application via la section "Support" ou nous contacter par email à workionsn@gmail.com avec les détails de votre réclamation.'
  },
  // {
  //   question: 'Les prestataires sont-ils vérifiés ?',
  //   answer: 'Oui, tous nos prestataires passent par un processus de vérification incluant la validation de leur identité, de leurs compétences et de leurs références professionnelles.'
  // },
  {
    question: 'Comment modifier ou annuler une demande ?',
    answer: 'Vous pouvez modifier ou annuler une demande directement dans l\'application tant qu\'aucun prestataire n\'a été confirmé. Après confirmation, contactez directement le prestataire.'
  },
  {
    question: 'Que faire si je ne reçois pas de propositions ?',
    answer: 'Vérifiez que votre demande est claire et détaillée, que votre budget est réaliste, et que vous êtes dans une zone couverte. Vous pouvez aussi élargir votre zone de recherche.'
  }
])

// Methods
const submitForm = async () => {
  if (isSubmitting.value) return

  isSubmitting.value = true

  try {
    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Réinitialiser le formulaire
    Object.assign(form, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Afficher le message de succès
    showSuccess.value = true
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error)
    alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.')
  } finally {
    isSubmitting.value = false
  }
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
