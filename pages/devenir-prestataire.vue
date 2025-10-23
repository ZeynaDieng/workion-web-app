<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-green-600 to-blue-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Devenez prestataire sur Workion
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-green-100">
              Développez votre activité et trouvez de nouveaux clients facilement grâce à notre plateforme
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a 
                href="#inscription" 
                class="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors text-center"
              >
                Commencer maintenant
              </a>
              <a 
                href="#avantages" 
                class="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold px-8 py-4 rounded-lg transition-colors text-center"
              >
                Découvrir les avantages
              </a>
            </div>
          </div>
          
          <div class="relative">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <h3 class="text-2xl font-semibold mb-6">Rejoignez plus de 1000+ prestataires</h3>
              <div class="space-y-4">
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Inscription gratuite et rapide</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Accès à des milliers de clients</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Outils de gestion intégrés</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-green-300 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Support dédié 7j/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Avantages -->
    <section id="avantages" class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi rejoindre Workion ?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez tous les avantages de notre plateforme pour développer votre activité
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="text-center p-6">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Plus de clients</h3>
            <p class="text-gray-600">
              Accédez à une base de clients en constante croissance et augmentez votre chiffre d'affaires
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Revenus réguliers</h3>
            <p class="text-gray-600">
              Bénéficiez d'un flux constant de demandes et stabilisez vos revenus mensuels
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Profil vérifié</h3>
            <p class="text-gray-600">
              Obtenez un badge de confiance qui rassure les clients et augmente vos chances d'être choisi
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Gestion simplifiée</h3>
            <p class="text-gray-600">
              Gérez vos rendez-vous, clients et paiements depuis une seule application mobile
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Avis clients</h3>
            <p class="text-gray-600">
              Construisez votre réputation grâce aux avis authentiques de vos clients satisfaits
            </p>
          </div>

          <div class="text-center p-6">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M12 12h.01M12 12h.01M12 12h.01"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Support 24/7</h3>
            <p class="text-gray-600">
              Bénéficiez d'un support client dédié pour vous accompagner dans votre activité
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services disponibles -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services les plus demandés
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les services qui génèrent le plus de demandes sur notre plateforme
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div 
            v-for="service in popularServices" 
            :key="service.name"
            class="bg-white rounded-lg p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div class="text-4xl mb-4">{{ service.icon }}</div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ service.name }}</h3>
            <p class="text-sm text-gray-600 mb-3">{{ service.demand }}</p>
            <div class="text-green-600 font-semibold text-sm">{{ service.avgPrice }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Témoignages -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos prestataires
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            v-for="testimonial in testimonials" 
            :key="testimonial.name"
            class="bg-gray-50 rounded-lg p-6"
          >
            <div class="flex items-center mb-4">
              <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <span class="text-lg font-semibold text-gray-600">{{ testimonial.name.charAt(0) }}</span>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-600">{{ testimonial.service }}</p>
              </div>
            </div>
            <p class="text-gray-700 italic">"{{ testimonial.quote }}"</p>
            <div class="flex items-center mt-4">
              <div class="flex text-yellow-400">
                <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">{{ testimonial.rating }}/5</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Processus d'inscription -->
    <section id="inscription" class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment s'inscrire ?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Rejoignez Workion en 3 étapes simples et commencez à recevoir des demandes dès aujourd'hui
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Téléchargez l'app</h3>
            <p class="text-gray-600 mb-6">
              Téléchargez l'application Workion sur votre smartphone et créez votre compte prestataire
            </p>
            <div class="flex flex-col sm:flex-row gap-2 justify-center">
              <a href="#" class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                📱 App Store
              </a>
              <a href="#" class="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                🤖 Google Play
              </a>
            </div>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Complétez votre profil</h3>
            <p class="text-gray-600 mb-6">
              Ajoutez vos informations, services, tarifs et photos de réalisations pour attirer les clients
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Informations personnelles</li>
              <li>• Services proposés</li>
              <li>• Tarifs et disponibilités</li>
              <li>• Photos de réalisations</li>
            </ul>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Commencez à travailler</h3>
            <p class="text-gray-600 mb-6">
              Votre profil est vérifié et vous pouvez commencer à recevoir des demandes de clients
            </p>
            <ul class="text-sm text-gray-500 space-y-1">
              <li>• Vérification du profil</li>
              <li>• Réception de demandes</li>
              <li>• Contact direct avec clients</li>
              <li>• Gestion des rendez-vous</li>
            </ul>
          </div>
        </div>

        <div class="text-center mt-12">
          <a 
            href="#" 
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center"
          >
            Télécharger l'application
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
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

    <!-- CTA Final -->
    <section class="py-16 bg-gradient-to-r from-green-600 to-blue-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Prêt à développer votre activité ?
        </h2>
        <p class="text-xl mb-8 text-green-100">
          Rejoignez plus de 1000 prestataires qui font confiance à Workion
        </p>
        <a 
          href="#" 
          class="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors inline-flex items-center"
        >
          Télécharger l'application
          <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Devenir prestataire - Workion',
  meta: [
    {
      name: 'description',
      content: 'Rejoignez Workion en tant que prestataire de services à domicile. Développez votre activité et trouvez de nouveaux clients facilement.'
    },
    {
      name: 'keywords',
      content: 'devenir prestataire, services à domicile, travail indépendant, Sénégal, Workion'
    }
  ]
})

// Reactive data
const openFaq = ref(null)

const popularServices = ref([
  { name: 'Ménage', icon: '🧹', demand: 'Très forte demande', avgPrice: '15 000 FCFA/jour' },
  { name: 'Jardinage', icon: '🌱', demand: 'Forte demande', avgPrice: '12 000 FCFA/jour' },
  { name: 'Plomberie', icon: '🔧', demand: 'Demande régulière', avgPrice: '25 000 FCFA/intervention' },
  { name: 'Électricité', icon: '⚡', demand: 'Demande régulière', avgPrice: '20 000 FCFA/intervention' },
  { name: 'Cuisine', icon: '👨‍🍳', demand: 'Forte demande', avgPrice: '18 000 FCFA/jour' },
  { name: 'Peinture', icon: '🎨', demand: 'Demande saisonnière', avgPrice: '30 000 FCFA/pièce' },
  { name: 'Nettoyage', icon: '🧽', demand: 'Très forte demande', avgPrice: '10 000 FCFA/intervention' },
  { name: 'Bricolage', icon: '🔨', demand: 'Demande régulière', avgPrice: '15 000 FCFA/intervention' }
])

const testimonials = ref([
  {
    name: 'Amadou Diallo',
    service: 'Ménage & Jardinage',
    quote: 'Grâce à Workion, j\'ai triplé mon chiffre d\'affaires en 6 mois. Les clients sont nombreux et les paiements réguliers.',
    rating: 5
  },
  {
    name: 'Fatou Sow',
    service: 'Cuisine',
    quote: 'L\'application est très facile à utiliser. Je reçois des demandes chaque jour et je peux choisir mes clients.',
    rating: 5
  },
  {
    name: 'Moussa Ba',
    service: 'Plomberie',
    quote: 'Le support client est excellent. Ils m\'aident toujours quand j\'ai des questions. Je recommande Workion.',
    rating: 5
  }
])

const faqs = ref([
  {
    question: 'Combien coûte l\'inscription sur Workion ?',
    answer: 'L\'inscription sur Workion est entièrement gratuite. Nous ne prenons qu\'une petite commission sur les prestations réalisées pour maintenir et améliorer la plateforme.'
  },
  {
    question: 'Comment sont calculées les commissions ?',
    answer: 'Nous prélevons une commission de 10% sur chaque prestation réalisée. Cette commission nous permet de maintenir la plateforme, le support client et d\'attirer de nouveaux clients.'
  },
  {
    question: 'Puis-je choisir mes clients ?',
    answer: 'Oui, vous avez le contrôle total. Vous pouvez consulter les demandes, contacter les clients qui vous intéressent et négocier directement avec eux.'
  },
  {
    question: 'Comment recevoir les paiements ?',
    answer: 'Les paiements se font directement entre vous et le client selon les modalités convenues (espèces, mobile money, virement). Workion ne gère pas les paiements.'
  },
  {
    question: 'Que faire si j\'ai un problème avec un client ?',
    answer: 'Notre équipe de support est là pour vous aider. Contactez-nous via l\'application et nous médierons pour résoudre tout conflit rapidement.'
  },
  {
    question: 'Puis-je travailler dans plusieurs villes ?',
    answer: 'Oui, vous pouvez définir plusieurs zones de service dans votre profil et recevoir des demandes dans toutes ces zones.'
  }
])

// Methods
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
