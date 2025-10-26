<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <!-- Icône de succès -->
        <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <svg class="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-900 mb-4">
          Demande publiée avec succès !
        </h1>
        
        <p class="text-lg text-gray-600 mb-8">
          Votre demande de service a été publiée. Les prestataires qualifiés près de chez vous vont bientôt vous contacter.
        </p>

        <!-- Prochaines étapes -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left mb-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Prochaines étapes :
          </h2>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">1</span>
              <span>Vous recevrez des propositions de prestataires dans les prochaines heures</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">2</span>
              <span>Comparez les profils, avis et tarifs des prestataires</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">3</span>
              <span>Choisissez le prestataire qui vous convient le mieux</span>
            </li>
            <li class="flex items-start">
              <span class="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">4</span>
              <span>Planifiez l'intervention avec le prestataire choisi</span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="space-y-4">
          <!--<NuxtLink 
            to="/demandes" 
            class="w-full btn-primary block text-center"
          >
            Voir toutes les demandes
          </NuxtLink>
           
          <NuxtLink 
            to="/prestataires" 
            class="w-full btn-secondary block text-center"
          >
            Parcourir les prestataires
          </NuxtLink>
           -->
          <NuxtLink 
            to="/" 
            class="block text-blue-600 hover:text-blue-800 font-medium"
          >
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// SEO Meta
useHead({
  title: 'Demande confirmée - Workion',
  meta: [
    {
      name: 'description',
      content: 'Votre demande de service a été publiée avec succès. Les prestataires vont bientôt vous contacter.'
    }
  ]
})
</script>
