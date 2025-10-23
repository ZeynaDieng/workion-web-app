<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Comment ça marche ?
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Découvrez comment Workion vous connecte facilement avec les meilleurs prestataires de services à domicile
          </p>
        </div>
      </div>
    </section>

    <!-- Pour les clients -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pour les clients
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Trouvez et engagez des prestataires qualifiés en quelques clics
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">1. Postez votre demande</h3>
            <p class="text-gray-600 mb-6">
              Décrivez précisément le service dont vous avez besoin, votre budget et vos préférences. C'est gratuit et sans engagement.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Description détaillée du service</li>
              <li>• Budget indicatif</li>
              <li>• Localisation et disponibilités</li>
              <li>• Préférences de contact</li>
            </ul>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">2. Recevez des propositions</h3>
            <p class="text-gray-600 mb-6">
              Les prestataires qualifiés près de chez vous vous contactent avec leurs propositions personnalisées et leurs tarifs.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Propositions personnalisées</li>
              <li>• Tarifs transparents</li>
              <li>• Profils vérifiés</li>
              <li>• Avis clients authentiques</li>
            </ul>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">3. Choisissez et planifiez</h3>
            <p class="text-gray-600 mb-6">
              Comparez les profils, consultez les avis et choisissez le prestataire qui vous convient le mieux. Planifiez ensuite l'intervention.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Comparaison facile</li>
              <li>• Planification flexible</li>
              <li>• Communication directe</li>
              <li>• Satisfaction garantie</li>
            </ul>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/poster-demande" class="btn-primary inline-flex items-center">
            Poster ma première demande
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Pour les prestataires -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pour les prestataires
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Développez votre activité et trouvez de nouveaux clients facilement
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">1. Créez votre profil</h3>
            <p class="text-gray-600 mb-6">
              Présentez vos services, votre expérience et vos tarifs. Ajoutez des photos de vos réalisations pour vous démarquer.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Profil professionnel complet</li>
              <li>• Portfolio de réalisations</li>
              <li>• Tarifs transparents</li>
              <li>• Certifications et badges</li>
            </ul>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">2. Trouvez des clients</h3>
            <p class="text-gray-600 mb-6">
              Consultez les demandes de services dans votre zone et contactez directement les clients intéressés par vos services.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Demandes géolocalisées</li>
              <li>• Filtres par service</li>
              <li>• Contact direct avec clients</li>
              <li>• Notifications en temps réel</li>
            </ul>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-gray-900 mb-4">3. Développez votre activité</h3>
            <p class="text-gray-600 mb-6">
              Réalisez vos prestations, collectez des avis positifs et développez votre réputation pour attirer plus de clients.
            </p>
            <ul class="text-sm text-gray-500 space-y-2">
              <li>• Gestion des rendez-vous</li>
              <li>• Système d'avis clients</li>
              <li>• Statistiques de performance</li>
              <li>• Support dédié</li>
            </ul>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/devenir-prestataire" class="btn-primary inline-flex items-center">
            Devenir prestataire
            <svg class="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Avantages -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Workion ?
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Prestataires vérifiés</h3>
            <p class="text-gray-600 text-sm">Tous nos prestataires sont vérifiés et certifiés pour votre sécurité</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Disponibilité 24/7</h3>
            <p class="text-gray-600 text-sm">Postez vos demandes à tout moment, des prestataires sont toujours disponibles</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Tarifs transparents</h3>
            <p class="text-gray-600 text-sm">Comparez facilement les tarifs et choisissez selon votre budget</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Support client</h3>
            <p class="text-gray-600 text-sm">Notre équipe vous accompagne pour résoudre tout problème rapidement</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 bg-gray-50">
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
            class="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
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
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Prêt à commencer ?
        </h2>
        <p class="text-xl mb-8 text-blue-100">
          Rejoignez des milliers d'utilisateurs qui font confiance à Workion
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/poster-demande" class="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors">
            Je cherche un prestataire
          </NuxtLink>
          <NuxtLink to="/devenir-prestataire" class="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-lg transition-colors">
            Je veux devenir prestataire
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Comment ça marche - Workion',
  meta: [
    {
      name: 'description',
      content: 'Découvrez comment Workion fonctionne. Guide complet pour clients et prestataires de services à domicile au Sénégal.'
    },
    {
      name: 'keywords',
      content: 'comment ça marche, guide Workion, services à domicile, prestataires, clients'
    }
  ]
})

// Reactive data
const openFaq = ref(null)

const faqs = ref([
  {
    question: 'Workion est-il gratuit ?',
    answer: 'Oui, Workion est entièrement gratuit pour les clients. Vous pouvez poster des demandes et contacter des prestataires sans frais. Les prestataires paient uniquement des frais de service lors de la réalisation de prestations.'
  },
  {
    question: 'Comment sont vérifiés les prestataires ?',
    answer: 'Tous nos prestataires passent par un processus de vérification incluant la validation de leur identité, de leurs compétences et de leurs références. Nous vérifions également leurs assurances et certifications professionnelles.'
  },
  {
    question: 'Que faire si je ne suis pas satisfait du service ?',
    answer: 'Nous avons une garantie satisfaction. Si vous n\'êtes pas satisfait, contactez notre service client dans les 24h. Nous médierons avec le prestataire et, si nécessaire, vous aiderons à trouver une solution ou un remboursement.'
  },
  {
    question: 'Comment fixer les tarifs ?',
    answer: 'Les tarifs sont librement fixés par les prestataires. Vous pouvez comparer les propositions et négocier directement avec eux. Nous affichons des tarifs indicatifs pour vous aider à évaluer les offres.'
  },
  {
    question: 'Dans quelles villes Workion est-il disponible ?',
    answer: 'Workion est actuellement disponible dans toutes les grandes villes du Sénégal : Dakar, Thiès, Saint-Louis, Kaolack, Ziguinchor, et nous étendons progressivement notre couverture.'
  },
  {
    question: 'Comment contacter le support client ?',
    answer: 'Vous pouvez nous contacter via l\'application mobile, le site web, par email à support@workion.app ou par téléphone. Notre équipe est disponible 7j/7 pour vous aider.'
  }
])

// Methods
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}
</script>
