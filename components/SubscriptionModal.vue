<template>
  <Teleport to="body">
    <Transition name="modal" appear>
      <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <div class="relative w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
            
            <!-- Header -->
            <div class="relative bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] px-6 py-8 text-white">
              <button 
                @click="closeModal"
                class="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30 transition-colors"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div class="text-center">
                <div class="mx-auto mb-4 h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 class="text-3xl font-bold mb-2">Abonnement requis</h2>
                <p class="text-white/90 text-lg">
                  Pour contacter nos prestataires, vous devez avoir un abonnement actif.
                </p>
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-6">
              <!-- Étape 1: Sélection d'offre -->
              <div v-if="currentStep === 'offers'">
                <div class="mb-6">
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">Choisissez votre offre</h3>
                  <p class="text-gray-600">Sélectionnez l'offre qui correspond le mieux à vos besoins</p>
                </div>

                <!-- Loading -->
                <div v-if="isLoading" class="flex justify-center py-12">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006970]"></div>
                </div>

                <!-- Offres -->
                <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div 
                    v-for="offer in offers" 
                    :key="offer.id"
                    @click="selectOffer(offer)"
                    class="relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover:border-[#006970] hover:shadow-lg"
                    :class="selectedOffer?.id === offer.id ? 'border-[#006970] bg-[#006970]/5' : 'border-gray-200'"
                  >
                    <!-- Badge populaire -->
                    <div v-if="offer.title?.toLowerCase()?.includes('premium')" 
                         class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Populaire
                      </span>
                    </div>

                    <div class="text-center">
                      <h4 class="text-xl font-bold text-gray-900 mb-2">{{ offer.title }}</h4>
                      
                      <div class="mb-4">
                        <span class="text-3xl font-bold text-[#006970]">{{ formatPrice(offer.priceTTC) }}</span>
                        <span class="text-gray-600 ml-1">FCFA</span>
                      </div>

                      <div class="mb-4">
                        <span class="text-sm text-gray-600">Durée: {{ offer.duration }} jours</span>
                      </div>

                      <ul class="space-y-2 text-left">
                        <li v-for="advantage in offer.advantages" :key="advantage" 
                            class="flex items-start text-sm text-gray-700">
                          <svg class="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          {{ advantage }}
                        </li>
                      </ul>
                    </div>

                    <!-- Indicateur de sélection -->
                    <div v-if="selectedOffer?.id === offer.id" 
                         class="absolute top-4 right-4">
                      <div class="h-6 w-6 rounded-full bg-[#006970] flex items-center justify-center">
                        <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bouton continuer -->
                <div v-if="selectedOffer" class="mt-8 text-center">
                  <button 
                    @click="goToPayment"
                    class="bg-gradient-to-r from-[#006970] to-[#008891] text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Continuer vers le paiement
                  </button>
                </div>
              </div>

              <!-- Étape 2: Sélection du moyen de paiement -->
              <div v-else-if="currentStep === 'payment'">
                <div class="mb-6">
                  <button 
                    @click="currentStep = 'offers'"
                    class="flex items-center text-[#006970] hover:text-[#008891] mb-4"
                  >
                    <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour aux offres
                  </button>

                  <h3 class="text-2xl font-bold text-gray-900 mb-2">Moyen de paiement</h3>
                  <p class="text-gray-600">Choisissez votre méthode de paiement préférée</p>
                </div>

                <!-- Récapitulatif de l'offre -->
                <div v-if="selectedOffer" class="bg-gray-50 rounded-2xl p-6 mb-6">
                  <h4 class="font-semibold text-gray-900 mb-2">Récapitulatif</h4>
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-medium">{{ selectedOffer.title }}</p>
                      <p class="text-sm text-gray-600">{{ selectedOffer.duration }} jours</p>
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold text-[#006970]">{{ formatPrice(selectedOffer.priceTTC) }} FCFA</p>
                    </div>
                  </div>
                </div>

                <!-- Moyens de paiement -->
                <div class="space-y-4">
                  <div 
                    v-for="method in paymentMethods" 
                    :key="method.id"
                    @click="selectPaymentMethod(method)"
                    class="cursor-pointer rounded-2xl border-2 p-4 transition-all hover:border-[#006970] hover:shadow-md"
                    :class="selectedPaymentMethod?.id === method.id ? 'border-[#006970] bg-[#006970]/5' : 'border-gray-200'"
                  >
                    <div class="flex items-center">
                      <div class="text-3xl mr-4">
                        <img :src="method.icon" alt="Payment Method" class="w-12 h-12">
                      </div>
                      <div class="flex-1">
                        <h5 class="font-semibold text-gray-900">{{ method.name }}</h5>
                        <p class="text-sm text-gray-600">{{ method.description }}</p>
                      </div>
                      <div v-if="selectedPaymentMethod?.id === method.id" class="ml-4">
                        <div class="h-6 w-6 rounded-full bg-[#006970] flex items-center justify-center">
                          <svg class="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bouton payer -->
                <div v-if="selectedPaymentMethod" class="mt-8 text-center">
                  <button 
                    @click="processPayment"
                    :disabled="isLoading"
                    class="bg-gradient-to-r from-[#006970] to-[#008891] text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span v-if="isLoading" class="flex items-center">
                      <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </span>
                    <span v-else>
                      Payer {{ formatPrice(selectedOffer?.priceTTC || 0) }} FCFA
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal de statut de paiement -->
    <PaymentStatusModal
      :is-open="isPaymentStatusModalOpen"
      :status="paymentStatus"
      :error-message="paymentErrorMessage"
      :is-connected="isConnected"
      :is-listening="isListening"
      :client-id="getCurrentUserId()"
      :show-debug-info="true"
      @close="handlePaymentStatusClose"
      @cancel="handlePaymentStatusCancel"
      @retry="handlePaymentStatusRetry"
    />
  </Teleport>
</template>

<script setup lang="ts">
import type { Offer, PaymentMethod } from '~/types/subscription'
import { useSubscription } from '../composables/useSubscription'
import { usePaymentSocket } from '../composables/usePaymentSocket'
import { onMounted, ref, watch } from 'vue'
import PaymentStatusModal from './PaymentStatusModal.vue'

interface Props {
  isOpen: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { 
  offers, 
  paymentMethods, 
  isLoading, 
  error,
  fetchOffers, 
  fetchPaymentMethods, 
  initiatePayment 
} = useSubscription()

const { 
  isConnected, 
  isListening, 
  connect: connectSocket, 
  disconnect: disconnectSocket 
} = usePaymentSocket()

const currentStep = ref<'offers' | 'payment'>('offers')
const selectedOffer = ref<Offer | null>(null)
const selectedPaymentMethod = ref<PaymentMethod | null>(null)

// État du modal de statut de paiement
const isPaymentStatusModalOpen = ref(false)
const paymentStatus = ref<'waiting' | 'success' | 'error'>('waiting')
const paymentErrorMessage = ref<string>('')
const currentTransactionId = ref<string>('')

// Charger les données au montage
onMounted(async () => {
  await Promise.all([
    fetchOffers(),
    fetchPaymentMethods()
  ])
})

const closeModal = () => {
  emit('close')
}

const selectOffer = (offer: Offer) => {
  selectedOffer.value = offer
}

const selectPaymentMethod = (method: PaymentMethod) => {
  selectedPaymentMethod.value = method
}

const goToPayment = () => {
  currentStep.value = 'payment'
}

const processPayment = async () => {
  if (!selectedOffer.value || !selectedPaymentMethod.value) return

  try {
    const paymentData = {
      offer: selectedOffer.value.id,
      // paymentMethod: selectedPaymentMethod.value.type,
      // amount: selectedOffer.value.priceTTC,
      // currency: 'XOF'
    }

    const result = await initiatePayment(paymentData)

    if (result.paymentUrl && result.transactionId) {
      // Stocker l'ID de transaction
      currentTransactionId.value = result.transactionId
      
      // Fermer le modal de sélection
      closeModal()
      
      // Ouvrir le modal de statut de paiement
      paymentStatus.value = 'waiting'
      isPaymentStatusModalOpen.value = true
      
      // Récupérer l'ID de l'utilisateur connecté
      const userStr = localStorage.getItem('workion_user')
      if (userStr) {
        const user = JSON.parse(userStr)
        
        // Connecter au WebSocket avec l'ID utilisateur comme clientId
        connectSocket(user.id, {
          onSuccess: handlePaymentSuccess,
          onError: handlePaymentError,
          onConnected: () => {
            console.log('WebSocket connecté pour l\'utilisateur:', user.id)
          },
          onDisconnected: () => {
            console.log('WebSocket déconnecté')
          }
        })
      } else {
        console.error('Utilisateur non connecté')
        paymentErrorMessage.value = 'Erreur: utilisateur non connecté'
        paymentStatus.value = 'error'
        isPaymentStatusModalOpen.value = true
        return
      }
      
      // Ouvrir l'URL de paiement dans un nouvel onglet
      window.open(result.paymentUrl, '_blank')
      
    } else {
      console.error('Erreur de paiement:', result.message)
      paymentErrorMessage.value = result.message || 'Erreur lors de l\'initiation du paiement'
      paymentStatus.value = 'error'
      isPaymentStatusModalOpen.value = true
    }
  } catch (err: any) {
    console.error('Erreur lors du traitement du paiement:', err)
    paymentErrorMessage.value = err.message || 'Erreur lors du traitement du paiement'
    paymentStatus.value = 'error'
    isPaymentStatusModalOpen.value = true
  }
}

// Gestion des événements WebSocket
const handlePaymentSuccess = () => {
  console.log('✅ Paiement confirmé via WebSocket')
  paymentStatus.value = 'success'
  
  // Déconnecter le WebSocket
  disconnectSocket()
  
  // Attendre 2 secondes puis fermer et émettre le succès
  setTimeout(() => {
    isPaymentStatusModalOpen.value = false
    emit('success')
  }, 2000)
}

const handlePaymentError = (message: string) => {
  console.log('❌ Paiement échoué via WebSocket:', message)
  paymentStatus.value = 'error'
  paymentErrorMessage.value = message
  
  // Déconnecter le WebSocket
  disconnectSocket()
}

// Gestion des actions du modal de statut
const handlePaymentStatusClose = () => {
  isPaymentStatusModalOpen.value = false
  disconnectSocket()
}

const handlePaymentStatusCancel = () => {
  isPaymentStatusModalOpen.value = false
  disconnectSocket()
  // Optionnel: annuler le paiement côté serveur
}

const handlePaymentStatusRetry = () => {
  isPaymentStatusModalOpen.value = false
  disconnectSocket()
  // Relancer le processus de paiement
  processPayment()
}

// Récupérer l'ID de l'utilisateur connecté
const getCurrentUserId = (): string => {
  const userStr = localStorage.getItem('workion_user')
  if (userStr) {
    const user = JSON.parse(userStr)
    return user.id || 'unknown'
  }
  return 'not-connected'
}

const formatPrice = (price: number): string => {
  console.log('price', price)
  return new Intl.NumberFormat('fr-FR').format(price)
}

// Réinitialiser l'état quand le modal se ferme
watch(() => props.isOpen, (isOpen) => {
  if (!isOpen) {
    currentStep.value = 'offers'
    selectedOffer.value = null
    selectedPaymentMethod.value = null
  }
})
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
