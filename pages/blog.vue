<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Blog Workion
        </h1>
        <p class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          Conseils, actualités et guides pour vos services à domicile
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <div class="text-gray-400 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Blog en construction</h2>
          <p class="text-gray-600 mb-8">
            Notre blog arrive bientôt avec des articles utiles sur les services à domicile, 
            des conseils pratiques et les dernières actualités de Workion.
          </p>
          <NuxtLink to="/" class="btn-primary">
            Retour à l'accueil
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blog - Workion',
  meta: [
    {
      name: 'description',
      content: 'Blog Workion : conseils, actualités et guides pour vos services à domicile au Sénégal.'
    }
  ]
})
</script>
