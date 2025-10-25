import { useRuntimeConfig } from 'nuxt/app'
import { ref, readonly } from 'vue'
import type { Subscription, Offer, PaymentMethod, PaymentRequest, PaymentResponse } from '~/types/subscription'

export const useSubscription = () => {
  const config = useRuntimeConfig()
  const subscription = ref<Subscription | null>(null)
  const offers = ref<Offer[]>([])
  const paymentMethods = ref<PaymentMethod[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Vérifier si l'utilisateur a une souscription active
  const checkActiveSubscription = async (userId: string): Promise<boolean> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await $fetch(`${config.public.apiBase}/subscriptions/user/${userId}/active`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('workion_token')}`
        }
      })

      if (response.data) {
        subscription.value = response.data
        return true
      }

      return false
    } catch (err: any) {
      console.error('Error checking subscription:', err)
      error.value = err.message || 'Erreur lors de la vérification de l\'abonnement'
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer les offres disponibles
  const fetchOffers = async (): Promise<void> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await $fetch(`${config.public.apiBase}/offers`, {
        method: 'GET',
        query: {
          status: 'active',
          type: 'client'
        }
      })

      if (response.data) {
        offers.value = response.data.offers
      }
    } catch (err: any) {
      console.error('Error fetching offers:', err)
      error.value = err.message || 'Erreur lors du chargement des offres'
    } finally {
      isLoading.value = false
    }
  }

  // Récupérer les moyens de paiement
  const fetchPaymentMethods = async (): Promise<void> => {
    try {
      paymentMethods.value = [
        {
          id: 'wave',
          name: 'Wave',
          type: 'wave',
          icon: 'assets/images/logo_wave.png',
          description: 'Paiement mobile sécurisé',
          isActive: true
        },
        {
          id: 'orange_money',
          name: 'Orange Money',
          type: 'orange_money',
          icon: 'assets/images/logo_om.webp',
          description: 'Paiement mobile Orange',
          isActive: true
        }
      ]
    } catch (err: any) {
      console.error('Error fetching payment methods:', err)
      error.value = err.message || 'Erreur lors du chargement des moyens de paiement'
    }
  }

  // Initier un paiement
  const initiatePayment = async (paymentData: PaymentRequest): Promise<PaymentResponse> => {
    try {
      isLoading.value = true
      error.value = null

      const response = await $fetch(`${config.public.apiBase}/subscriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('workion_token')}`
        },
        body: paymentData
      })

      console.log('response', response)

      if (response) {
        return {
          success: true,
          paymentUrl: response.checkoutUrl,
          transactionId: response.checkoutId
        }
      }

      return {
        success: false,
        message: response.message || 'Erreur lors de l\'initiation du paiement'
      }
    } catch (err: any) {
      console.error('Error initiating payment:', err)
      error.value = err.message || 'Erreur lors de l\'initiation du paiement'
      return {
        success: false,
        message: err.message || 'Erreur lors de l\'initiation du paiement'
      }
    } finally {
      isLoading.value = false
    }
  }

  // Vérifier le statut d'un paiement
  const checkPaymentStatus = async (transactionId: string): Promise<boolean> => {
    try {
      const response = await $fetch(`${config.public.apiBase}/payments/status/${transactionId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('workion_token')}`
        }
      })

      return response.data?.status === 'completed'
    } catch (err: any) {
      console.error('Error checking payment status:', err)
      return false
    }
  }

  // Calculer les jours restants d'une souscription
  const getDaysRemaining = (subscription: Subscription): number => {
    if (!subscription || subscription.status !== 'active') return 0
    
    const now = new Date()
    const endDate = new Date(subscription.endDate)
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return Math.max(0, diffDays)
  }

  // Vérifier si une souscription est expirée
  const isSubscriptionExpired = (subscription: Subscription): boolean => {
    if (!subscription) return true
    return getDaysRemaining(subscription) <= 0
  }

  return {
    // État
    subscription: readonly(subscription),
    offers: readonly(offers),
    paymentMethods: readonly(paymentMethods),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Méthodes
    checkActiveSubscription,
    fetchOffers,
    fetchPaymentMethods,
    initiatePayment,
    checkPaymentStatus,
    getDaysRemaining,
    isSubscriptionExpired
  }
}
