<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Logo et description -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <div class="relative">
              <img 
                src="assets/images/logo.png" 
                alt="Workion Logo" 
                class="h-24 w-auto transition-transform duration-300 group-hover:scale-105"
              >
              <!-- Effet de glow au hover -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#006970] to-[#008891] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
            </div>
          </div>
          <p class="text-gray-300 mb-4 max-w-md">
            La plateforme qui connecte les particuliers aux meilleurs prestataires de services à domicile au Sénégal.
          </p>
          <div class="flex space-x-4">
            <!-- Facebook -->
            <a href="https://www.facebook.com/profile.php?id=61579885702356" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <!-- X (Twitter) -->
            <a href="https://x.com/workionsn" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="https://www.instagram.com/workionsn/" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <!-- TikTok -->
            <a href="https://www.tiktok.com/@workionsn" target="_blank" class="text-gray-400 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
          </div>
        </div>
        <!-- <div>
          <h3 class="text-lg font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/services/menage" class="text-gray-300 hover:text-white transition-colors">Ménage</NuxtLink></li>
            <li><NuxtLink to="/services/jardinage" class="text-gray-300 hover:text-white transition-colors">Jardinage</NuxtLink></li>
            <li><NuxtLink to="/services/plomberie" class="text-gray-300 hover:text-white transition-colors">Plomberie</NuxtLink></li>
            <li><NuxtLink to="/services/electricite" class="text-gray-300 hover:text-white transition-colors">Électricité</NuxtLink></li>
            <li><NuxtLink to="/services" class="text-gray-300 hover:text-white transition-colors">Voir tous</NuxtLink></li>
          </ul>
        </div> -->

        <!-- Liens utiles -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens utiles</h3>
          <ul class="space-y-2">
            <!-- <li><NuxtLink to="/comment-ca-marche" class="text-gray-300 hover:text-white transition-colors">Comment ça marche</NuxtLink></li> -->
            <!-- <li><NuxtLink to="/devenir-prestataire" class="text-gray-300 hover:text-white transition-colors">Devenir prestataire</NuxtLink></li> -->
            <li><NuxtLink to="/aide" class="text-gray-300 hover:text-white transition-colors">Centre d'aide</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</NuxtLink></li>
            <!-- <li><NuxtLink to="/blog" class="text-gray-300 hover:text-white transition-colors">Blog</NuxtLink></li> -->
          </ul>
        </div>
      </div>

      <!-- Séparateur -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} Workion. Tous droits réservés.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <!-- <NuxtLink to="/mentions-legales" class="text-gray-400 hover:text-white text-sm transition-colors">
              Mentions légales
            </NuxtLink> -->
            <a href="https://docs.google.com/document/d/1nORIRF4bC_CK5hV5uPjfaIzSMH0z3EN3c5zN2nZU7CQ/edit?usp=drive_link" class="text-gray-400 hover:text-white text-sm transition-colors">
              Politique de confidentialité
            </a>
            <!-- <NuxtLink to="/conditions-utilisation" class="text-gray-400 hover:text-white text-sm transition-colors">
              Conditions d'utilisation
            </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>
