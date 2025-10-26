import { ref, onUnmounted } from 'vue'
import { io, Socket } from 'socket.io-client'

interface PaymentSocketCallbacks {
  onSuccess: () => void
  onError: (message: string) => void
  onConnected?: () => void
  onDisconnected?: () => void
}

export const usePaymentSocket = () => {
  const config = useRuntimeConfig()
  const socket = ref<Socket | null>(null)
  const isConnected = ref(false)
  const isListening = ref(false)

  // Connecter au WebSocket pour écouter les notifications de paiement
  const connect = (clientId: string, callbacks: PaymentSocketCallbacks) => {
    if (socket.value?.connected) {
      console.log('WebSocket déjà connecté')
      return
    }

    try {
      // Créer la connexion WebSocket
      socket.value = io(config.public.apiBase.replace('/api', ''), {
        transports: ['websocket'],
        autoConnect: false,
        query: {
          clientId: clientId
        },
        forceNew: true
      })

      // Événements de connexion
      socket.value.on('connect', () => {
        console.log('✅ Connecté au WebSocket - Client ID:', clientId)
        isConnected.value = true
        isListening.value = true
        
        // S'enregistrer avec le clientId
        socket.value?.emit('register', clientId)
        
        callbacks.onConnected?.()
      })

      socket.value.on('disconnect', (reason) => {
        console.log('🔌 Déconnecté du WebSocket:', reason)
        isConnected.value = false
        isListening.value = false
        
        callbacks.onDisconnected?.()
      })

      // Événements de paiement
      socket.value.on('paymentConfirmed', (data) => {
        console.log('✅ Paiement confirmé:', data)
        isListening.value = false
        callbacks.onSuccess()
      })

      socket.value.on('paymentFailed', (data) => {
        console.log('❌ Paiement échoué:', data)
        isListening.value = false
        callbacks.onError(data?.message || 'Paiement échoué')
      })

      socket.value.on('paymentCancelled', (data) => {
        console.log('🚫 Paiement annulé:', data)
        isListening.value = false
        callbacks.onError(data?.message || 'Paiement annulé')
      })

      // Gestion des erreurs de connexion
      socket.value.on('connect_error', (error) => {
        console.error('❌ Erreur de connexion WebSocket:', error)
        callbacks.onError('Erreur de connexion au service de paiement')
      })

      // Démarrer la connexion
      socket.value.connect()

    } catch (error) {
      console.error('❌ Erreur lors de la création du WebSocket:', error)
      callbacks.onError('Impossible de se connecter au service de paiement')
    }
  }

  // Déconnecter le WebSocket
  const disconnect = () => {
    if (socket.value?.connected) {
      console.log('🔌 Déconnexion du WebSocket...')
      socket.value.disconnect()
    }
    socket.value = null
    isConnected.value = false
    isListening.value = false
  }

  // Vérifier le statut de la connexion
  const getConnectionStatus = () => ({
    isConnected: isConnected.value,
    isListening: isListening.value,
    socketId: socket.value?.id || null
  })

  // Nettoyer automatiquement lors du démontage du composant
  onUnmounted(() => {
    disconnect()
  })

  return {
    // État
    isConnected: readonly(isConnected),
    isListening: readonly(isListening),
    
    // Méthodes
    connect,
    disconnect,
    getConnectionStatus
  }
}
