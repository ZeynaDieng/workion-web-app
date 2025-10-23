<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Mentions légales
        </h1>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2>Informations légales</h2>
          
          <h3>Éditeur du site</h3>
          <p>
            <strong>Workion</strong><br>
            Plateforme de services à domicile<br>
            Dakar, Sénégal
          </p>

          <h3>Hébergement</h3>
          <p>
            Ce site est hébergé par des services cloud sécurisés.
          </p>

          <h3>Propriété intellectuelle</h3>
          <p>
            L'ensemble de ce site relève de la législation sénégalaise et internationale sur le droit d'auteur et la propriété intellectuelle. 
            Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
          </p>

          <h3>Responsabilité</h3>
          <p>
            Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, 
            mais peut toutefois contenir des inexactitudes ou des omissions.
          </p>

          <h3>Contact</h3>
          <p>
            Pour toute question concernant ces mentions légales, vous pouvez nous contacter via notre formulaire de contact.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Mentions légales - Workion',
  meta: [
    {
      name: 'description',
      content: 'Mentions légales de Workion, plateforme de services à domicile au Sénégal.'
    }
  ]
})
</script>
