<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Politique de confidentialité
        </h1>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2>Protection de vos données personnelles</h2>
          
          <h3>Collecte des données</h3>
          <p>
            Workion collecte uniquement les données nécessaires au fonctionnement de la plateforme et à l'amélioration de nos services. 
            Ces données incluent les informations de profil, les préférences de services et les données d'utilisation.
          </p>

          <h3>Utilisation des données</h3>
          <p>
            Vos données sont utilisées pour :
          </p>
          <ul>
            <li>Faciliter la mise en relation entre clients et prestataires</li>
            <li>Améliorer nos services et votre expérience utilisateur</li>
            <li>Vous envoyer des notifications importantes</li>
            <li>Assurer la sécurité de la plateforme</li>
          </ul>

          <h3>Partage des données</h3>
          <p>
            Nous ne vendons, ne louons, ni ne partageons vos données personnelles avec des tiers, 
            sauf dans les cas suivants :
          </p>
          <ul>
            <li>Avec votre consentement explicite</li>
            <li>Pour respecter nos obligations légales</li>
            <li>Pour protéger nos droits et notre sécurité</li>
          </ul>

          <h3>Sécurité</h3>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre 
            l'accès non autorisé, la modification, la divulgation ou la destruction.
          </p>

          <h3>Vos droits</h3>
          <p>
            Vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul>
            <li>Droit d'accès et de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
          </ul>

          <h3>Contact</h3>
          <p>
            Pour exercer vos droits ou pour toute question concernant cette politique, 
            contactez-nous via notre formulaire de contact.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Politique de confidentialité - Workion',
  meta: [
    {
      name: 'description',
      content: 'Politique de confidentialité de Workion : comment nous protégeons vos données personnelles.'
    }
  ]
})
</script>
