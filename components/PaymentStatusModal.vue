<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
            
            <!-- Contenu -->
            <div class="p-6 text-center">
              
              <!-- État en attente -->
              <div v-if="status === 'waiting'" class="space-y-4">
                <div class="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Paiement en cours</h3>
                <p class="text-gray-600">
                  En attente de la confirmation de votre paiement...
                </p>
                <div class="text-sm text-gray-500">
                  <p>• Finalisez votre paiement dans l'onglet ouvert</p>
                  <p>• Cette fenêtre se fermera automatiquement</p>
                </div>
              </div>

              <!-- État de succès -->
              <div v-else-if="status === 'success'" class="space-y-4">
                <div class="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Paiement confirmé !</h3>
                <p class="text-gray-600">
                  Votre abonnement a été activé avec succès.
                </p>
                <p class="text-sm text-green-600 font-medium">
                  Vous pouvez maintenant contacter nos prestataires !
                </p>
              </div>

              <!-- État d'erreur -->
              <div v-else-if="status === 'error'" class="space-y-4">
                <div class="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <svg class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">Paiement échoué</h3>
                <p class="text-gray-600">{{ errorMessage || 'Une erreur est survenue lors du paiement.' }}</p>
                <button 
                  @click="$emit('retry')"
                  class="bg-gradient-to-r from-[#006970] to-[#008891] text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Réessayer
                </button>
              </div>

              <!-- Boutons d'action -->
              <div class="mt-6 space-y-3">
                <button 
                  v-if="status === 'success'"
                  @click="$emit('close')"
                  class="w-full bg-gradient-to-r from-[#006970] to-[#008891] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Continuer
                </button>
                
                <button 
                  v-if="status === 'waiting'"
                  @click="$emit('cancel')"
                  class="w-full border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:border-gray-400 transition-all"
                >
                  Annuler
                </button>
                
                <button 
                  v-if="status === 'error'"
                  @click="$emit('close')"
                  class="w-full border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-xl font-semibold hover:border-gray-400 transition-all"
                >
                  Fermer
                </button>
              </div>

              <!-- Informations de connexion WebSocket (dev only) -->
              <div v-if="showDebugInfo" class="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
                <p>WebSocket: {{ isConnected ? '🟢 Connecté' : '🔴 Déconnecté' }}</p>
                <p>Écoute: {{ isListening ? '🔊 Active' : '🔇 Inactive' }}</p>
                <p v-if="clientId">Client ID: {{ clientId }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean
  status: 'waiting' | 'success' | 'error'
  errorMessage?: string
  isConnected?: boolean
  isListening?: boolean
  clientId?: string
  showDebugInfo?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'retry'): void
}

const props = withDefaults(defineProps<Props>(), {
  showDebugInfo: false
})

const emit = defineEmits<Emits>()
</script>

<style scoped>
/* Animations personnalisées */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease-in-out;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
