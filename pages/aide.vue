<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-[#006970] to-[#008891] text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Centre d'aide
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          Trouvez rapidement les réponses à vos questions
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
          
          <div class="space-y-6">
            <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Comment ça marche ?</h3>
              <p class="text-gray-600">
                Workion vous permet de trouver facilement des prestataires de services à domicile qualifiés. 
                Parcourez les profils, consultez les avis et contactez directement les prestataires.
              </p>
            </div>
            
            <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Comment devenir prestataire ?</h3>
              <p class="text-gray-600">
                Inscrivez-vous en tant que prestataire, complétez votre profil avec vos services et compétences, 
                et commencez à recevoir des demandes de clients.
              </p>
            </div>
            
            <!-- <div class="border-b border-gray-200 pb-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Les services sont-ils garantis ?</h3>
              <p class="text-gray-600">
                Tous nos prestataires sont vérifiés et les services peuvent être évalués par les clients. 
                Nous encourageons la transparence et la qualité.
              </p>
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Centre d\'aide - Workion',
  meta: [
    {
      name: 'description',
      content: 'Trouvez des réponses à vos questions sur Workion, la plateforme de services à domicile au Sénégal.'
    }
  ]
})
</script>
