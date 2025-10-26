import { ref } from 'vue'
import CryptoJS from 'crypto-js'

export const useSecureContact = () => {
  const config = useRuntimeConfig()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Clé de déchiffrement (doit correspondre à celle du backend)
  const encryptionKey = config.public.phoneEncryptionKey || '9f4b7dc2a1e6f8b3c0d2e4f6a7b9c1d09f4b7dc2a1e6f8b3c0d2e4f6a7b9c1d0'

  // Déchiffrer le numéro de téléphone
  const decryptPhone = (encryptedData: string): string => {
    try {
      console.log('🔓 Déchiffrement de:', encryptedData)
      console.log('🔑 Clé utilisée:', encryptionKey)
      
      // Séparer IV et données chiffrées
      const parts = encryptedData.split(':')
      if (parts.length !== 2) {
        throw new Error('Format de données invalide')
      }

      const ivHex = parts[0]
      const encryptedHex = parts[1]
      
      // Convertir en format CryptoJS
      const iv = CryptoJS.enc.Hex.parse(ivHex)
      const key = CryptoJS.enc.Hex.parse(encryptionKey)
      const encrypted = CryptoJS.enc.Hex.parse(encryptedHex)
      
      // Déchiffrer
      const decrypted = CryptoJS.AES.decrypt(
        CryptoJS.enc.Base64.stringify(encrypted), 
        key, 
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        }
      )

      const result = decrypted.toString(CryptoJS.enc.Utf8)
      
      if (!result) {
        throw new Error('Déchiffrement échoué - résultat vide')
      }

      console.log('✅ Déchiffrement réussi:', result)
      return result

    } catch (err) {
      console.error('❌ Erreur de déchiffrement:', err)
      throw new Error(`Impossible de déchiffrer: ${err.message}`)
    }
  }

  // Récupérer le numéro de téléphone chiffré du prestataire
  const getProviderPhone = async (providerId: string): Promise<string | null> => {
    isLoading.value = true
    error.value = null

    try {
      const token = localStorage.getItem('workion_token')
      if (!token) {
        throw new Error('Token d\'authentification manquant')
      }

      const response = await $fetch(`${config.public.apiBase}/secure-contact/provider-phone/${providerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      console.log('🔍 Réponse du serveur:', response)

      if (response.data.encryptedPhone) {
        console.log('🔐 Données chiffrées reçues:', response.data.encryptedPhone)
        
        // Déchiffrer le numéro de téléphone
        const decryptedPhone = decryptPhone(response.data.encryptedPhone)
        
        console.log(`✅ Numéro récupéré de manière sécurisée pour ${response.data.providerName}`)
        
        return decryptedPhone
      } else {
        console.error('❌ Structure de réponse:', response)
        throw new Error('Réponse invalide du serveur')
      }

    } catch (err: any) {
      console.error('❌ Erreur lors de la récupération sécurisée du numéro:', err)
      
      if (err.status === 403) {
        error.value = 'Abonnement actif requis pour contacter les prestataires'
      } else if (err.status === 404) {
        error.value = 'Prestataire ou numéro de téléphone non trouvé'
      } else {
        error.value = err.message || 'Erreur lors de la récupération du numéro'
      }
      
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Contacter via WhatsApp de manière sécurisée
  const contactProviderSecurely = async (providerId: string, providerName: string) => {
    try {
      const phone = await getProviderPhone(providerId)
      
      if (!phone) {
        throw new Error(error.value || 'Impossible de récupérer le numéro de téléphone')
      }

      // Récupérer les informations utilisateur
      const userStr = localStorage.getItem('workion_user')
      let userName = 'Client Workion'
      
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          userName = `${user.firstname || ''} ${user.lastname || ''}`.trim() || 'Client Workion'
        } catch (error) {
          console.error('Erreur lecture données utilisateur:', error)
        }
      }

      // Nettoyer le numéro
      const cleanPhone = phone.replace(/[\s\-\(\)]/g, '')
      
      // Message WhatsApp
      const message = `Bonjour ${providerName},

Je suis ${userName} et je vous contacte via la plateforme Workion.

Je suis intéressé(e) par vos services et j'aimerais discuter d'un projet avec vous.

Merci !`

      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`
      
      window.open(whatsappUrl, '_blank')
      
      console.log(`✅ Redirection WhatsApp pour ${providerName} (${cleanPhone})`)
      
      return true
    } catch (err: any) {
      console.error('❌ Erreur contact sécurisé:', err)
      error.value = err.message
      return false
    }
  }

  // Test avec données backend
  const testWithBackendData = async () => {
    try {
      const response = await $fetch('http://localhost:3100/api/debug-crypto/test/221701234567')
      console.log('🔍 Test backend:', response.data)
      
      if (response.data.success) {
        const result = decryptPhone(response.data.test.encrypted)
        const match = result === response.data.test.original
        console.log('🎯 Test résultat:', { result, expected: response.data.test.original, match })
        return match
      }
    } catch (err) {
      console.error('❌ Erreur test:', err)
      return false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    isLoading: isLoading as Readonly<Ref<boolean>>,
    error: error as Readonly<Ref<string | null>>,
    getProviderPhone,
    contactProviderSecurely,
    clearError,
    testWithBackendData
  }
}
