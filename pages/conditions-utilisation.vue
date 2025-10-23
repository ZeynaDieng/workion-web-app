<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Conditions d'utilisation
        </h1>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 prose prose-lg max-w-none">
          <h2>Conditions générales d'utilisation</h2>
          
          <h3>Acceptation des conditions</h3>
          <p>
            En utilisant la plateforme Workion, vous acceptez pleinement et sans réserve les présentes conditions d'utilisation.
          </p>

          <h3>Description du service</h3>
          <p>
            Workion est une plateforme numérique qui met en relation des particuliers (clients) avec des prestataires de services à domicile au Sénégal.
          </p>

          <h3>Inscription et compte utilisateur</h3>
          <p>
            Pour utiliser certaines fonctionnalités de Workion, vous devez créer un compte utilisateur. 
            Vous vous engagez à fournir des informations exactes et à maintenir votre compte à jour.
          </p>

          <h3>Obligations des utilisateurs</h3>
          <h4>Pour les clients :</h4>
          <ul>
            <li>Fournir des informations précises sur vos besoins</li>
            <li>Respecter les prestataires et leurs conditions</li>
            <li>Effectuer les paiements convenus</li>
          </ul>

          <h4>Pour les prestataires :</h4>
          <ul>
            <li>Fournir des services de qualité</li>
            <li>Respecter les engagements pris</li>
            <li>Maintenir un profil à jour et véridique</li>
          </ul>

          <h3>Responsabilités</h3>
          <p>
            Workion agit en tant qu'intermédiaire. La responsabilité des services fournis incombe entièrement aux prestataires. 
            Workion ne peut être tenu responsable de la qualité des services ou des litiges entre utilisateurs.
          </p>

          <h3>Propriété intellectuelle</h3>
          <p>
            Tous les éléments de la plateforme Workion (textes, images, logos, etc.) sont protégés par le droit d'auteur 
            et ne peuvent être reproduits sans autorisation.
          </p>

          <h3>Modification des conditions</h3>
          <p>
            Workion se réserve le droit de modifier ces conditions à tout moment. 
            Les utilisateurs seront informés des modifications importantes.
          </p>

          <h3>Résiliation</h3>
          <p>
            Workion peut suspendre ou résilier un compte utilisateur en cas de non-respect des présentes conditions.
          </p>

          <h3>Droit applicable</h3>
          <p>
            Les présentes conditions sont régies par le droit sénégalais. 
            Tout litige sera soumis aux tribunaux compétents de Dakar.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Conditions d\'utilisation - Workion',
  meta: [
    {
      name: 'description',
      content: 'Conditions générales d\'utilisation de la plateforme Workion.'
    }
  ]
})
</script>
