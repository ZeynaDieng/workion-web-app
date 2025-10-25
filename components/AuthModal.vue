<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 z-50 overflow-hidden"
    @click="closeModal"
  >
    <!-- Overlay avec effet de flou -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500"></div>
    
    <!-- Modal -->
    <div 
      class="absolute inset-0 flex items-center justify-center p-4"
      @click.stop
    >
      <div 
        class="bg-white rounded-3xl shadow-2xl transform transition-all duration-500 ease-out max-w-md w-full max-h-[90vh] overflow-hidden"
        :class="{ 'scale-100 opacity-100': isOpen, 'scale-95 opacity-0': !isOpen }"
      >
        <!-- Header avec gradient -->
        <div class="relative bg-gradient-to-br from-[#006970] via-[#008891] to-[#20b2aa] text-white p-6">
          <!-- Motif de fond -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
          </div>
          
          <!-- Bouton fermer -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
          >
            <svg class="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Logo et titre -->
          <div class="relative z-10 text-center">
            <div class="mb-4">
              <img 
                src="assets/images/logo_light.png" 
                alt="Workion Logo" 
                class="h-20 w-auto mx-auto"
              >
            </div>
            <h2 class="text-2xl font-bold mb-2">
              {{ mode === 'login' ? 'Connexion' : 'Inscription' }}
            </h2>
            <p class="text-white/80 text-sm">
              {{ mode === 'login' ? 'Connectez-vous pour contacter ce prestataire' : 'Créez votre compte gratuitement' }}
            </p>
          </div>
        </div>

        <!-- Contenu scrollable -->
        <div class="p-6 max-h-[60vh] overflow-y-auto">
          <!-- Formulaire de connexion -->
          <div v-if="mode === 'login'" class="space-y-4">
            <!-- Numéro de téléphone -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <vue-tel-input
                v-bind="phoneInputProps"
                v-model="loginForm.phone"
                class="vue-phone-input-custom"
                :class="{ 'error': errors.phone }"
              />

              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
            </div>

            <!-- Code PIN -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Code PIN
              </label>
              <input 
                v-model="loginForm.pin"
                type="password" 
                placeholder="Votre code PIN"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#006970]/20 focus:border-[#006970] transition-all duration-300"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.pin }"
              >
              <p v-if="errors.pin" class="text-red-500 text-xs mt-1">{{ errors.pin }}</p>
            </div>

            <!-- Mot de passe oublié -->
            <div class="text-right">
              <button 
                @click="forgotPassword"
                class="text-sm text-[#006970] hover:text-[#008891] font-medium transition-colors duration-200"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <!-- Bouton de connexion -->
            <button 
              @click="handleLogin"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] hover:from-[#005560] hover:via-[#006970] hover:to-[#008891] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Connexion...
              </div>
              <span v-else>Se connecter</span>
            </button>
          </div>

          <!-- Formulaire d'inscription -->
          <div v-else class="space-y-4">
            <!-- Prénom -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Prénom
              </label>
              <input 
                v-model="signupForm.firstname"
                type="text" 
                placeholder="Votre prénom"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#006970]/20 focus:border-[#006970] transition-all duration-300"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.firstname }"
              >
              <p v-if="errors.firstname" class="text-red-500 text-xs mt-1">{{ errors.firstname }}</p>
            </div>

            <!-- Nom -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nom
              </label>
              <input 
                v-model="signupForm.lastname"
                type="text" 
                placeholder="Votre nom"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#006970]/20 focus:border-[#006970] transition-all duration-300"
                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/20': errors.lastname }"
              >
              <p v-if="errors.lastname" class="text-red-500 text-xs mt-1">{{ errors.lastname }}</p>
            </div>

            <!-- Numéro de téléphone -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Numéro de téléphone
              </label>
              <vue-tel-input
                v-bind="phoneInputProps"
                @input="(phone, phoneObject) => handlePhoneChange(phone, phoneObject, 'signup')"
                class="vue-phone-input-custom"
                :class="{ 'error': errors.phone }"
              />
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
            </div>

            <!-- Type de compte -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Type de compte
              </label>
              <select 
                v-model="signupForm.role"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#006970]/20 focus:border-[#006970] transition-all duration-300 bg-white"
              >
                <option value="client">Client - Je cherche des services</option>
                <option value="partner">Prestataire - Je propose des services</option>
              </select>
            </div>

            <!-- Bouton d'inscription -->
            <button 
              @click="handleSignup"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-[#006970] via-[#008891] to-[#20b2aa] hover:from-[#005560] hover:via-[#006970] hover:to-[#008891] text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Inscription...
              </div>
              <span v-else>S'inscrire</span>
            </button>
          </div>

          <!-- Séparateur -->
          <div class="flex items-center my-6">
            <div class="flex-1 border-t border-gray-200"></div>
            <span class="px-4 text-sm text-gray-500">ou</span>
            <div class="flex-1 border-t border-gray-200"></div>
          </div>

          <!-- Basculer entre connexion et inscription -->
          <div class="text-center">
            <p class="text-sm text-gray-600 mb-3">
              {{ mode === 'login' ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?" }}
            </p>
            <button 
              @click="toggleMode"
              class="text-[#006970] hover:text-[#008891] font-semibold text-sm transition-colors duration-200"
            >
              {{ mode === 'login' ? "Créer un compte" : "Se connecter" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isOpen: boolean
}

interface LoginForm {
  phone: string
  pin: string
}

interface SignupForm {
  firstname: string
  lastname: string
  phone: string
  role: string
}

interface PhoneValidation {
  isValid: boolean
  country: {
    name: string
    iso2: string
    dialCode: string
  }
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  success: [user: any]
}>()

// État du composant
const mode = ref<'login' | 'signup'>('login')
const isLoading = ref(false)
const errors = ref<Record<string, string>>({})

// État pour la validation du téléphone
const phoneValidation = ref<PhoneValidation | null>(null)
const selectedCountry = ref({
  name: 'Senegal',
  iso2: 'sn',
  dialCode: '221'
})

// Configuration pour vue-tel-input v8 avec dropdown
const phoneInputProps = {
  defaultCountry: 'SN',
  preferredCountries: ['SN', 'FR', 'US', 'GB'],
  onlyCountries: ['SN', 'FR', 'US', 'GB', 'CA', 'DE', 'ES', 'IT', 'MA', 'CI', 'ML', 'BF', 'GN', 'MR'],
  placeholder: 'Entrez votre numéro',
  mode: 'international',
  enabledCountryCode: true,
  enabledFlags: true,
  autocomplete: 'off',
  name: 'telephone',
  maxLen: 25,
  required: false,
  disabled: false
}


// Formulaires
const loginForm = ref<LoginForm>({
  phone: '',
  pin: ''
})

const signupForm = ref<SignupForm>({
  firstname: '',
  lastname: '',
  phone: '',
  role: 'client'
})

// Méthodes
const closeModal = () => {
  emit('close')
  resetForms()
}

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'signup' : 'login'
  errors.value = {}
}

const resetForms = () => {
  loginForm.value = { phone: '', pin: '' }
  signupForm.value = { firstname: '', lastname: '', phone: '', role: 'client' }
  errors.value = {}
  mode.value = 'login'
}

// Méthodes de gestion du téléphone
const handleCountryChanged = (country: any) => {
  selectedCountry.value = {
    name: country.name,
    iso2: country.iso2,
    dialCode: country.dialCode
  }
}

// Méthode pour capturer le numéro complet
const handlePhoneChange = (phone: string, phoneObject: any, form: 'login' | 'signup') => {
  console.log('Phone change:', { phone, phoneObject, form })
  
  // Vérifier si phone est un événement
  let actualPhone = phone
  if (typeof phone === 'object' && phone.target) {
    actualPhone = phone.target.value
    console.log('Phone was an event, extracted value:', actualPhone)
  }
  
  // Capturer le numéro complet international
  let fullNumber = actualPhone
  if (phoneObject) {
    fullNumber = phoneObject.e164 || phoneObject.international || phoneObject.formatted || actualPhone
  }
  
  console.log('Full number:', fullNumber)
  
  if (form === 'login') {
    loginForm.value.phone = fullNumber
  } else {
    signupForm.value.phone = fullNumber
  }
  
  // Clear errors when phone changes
  if (errors.value.phone) {
    errors.value.phone = ''
  }
  
  // Update validation state
  phoneValidation.value = {
    isValid: phoneObject?.isValid || false,
    country: phoneObject?.country || null
  }
}


// Anciennes méthodes supprimées - remplacées par handlePhoneUpdate

const validateLoginForm = (): boolean => {
  errors.value = {}
  
  if (!loginForm.value.phone) {
    errors.value.phone = 'Le numéro de téléphone est requis'
  } 
  // else if (phoneValidation.value && !phoneValidation.value.isValid) {
  //   errors.value.phone = 'Numéro de téléphone invalide'
  // }
  
  if (!loginForm.value.pin) {
    errors.value.pin = 'Le code PIN est requis'
  }
  
  return Object.keys(errors.value).length === 0
}

const validateSignupForm = (): boolean => {
  errors.value = {}
  
  if (!signupForm.value.firstname) {
    errors.value.firstname = 'Le prénom est requis'
  }
  
  if (!signupForm.value.lastname) {
    errors.value.lastname = 'Le nom est requis'
  }
  
  if (!signupForm.value.phone) {
    errors.value.phone = 'Le numéro de téléphone est requis'
  } else if (phoneValidation.value && !phoneValidation.value.isValid) {
    errors.value.phone = 'Numéro de téléphone invalide'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  if (!validateLoginForm()) return
  
  isLoading.value = true
  
  try {
    // Utiliser le numéro de téléphone international complet
    const fullPhoneNumber = loginForm.value.phone.replaceAll(' ', '')
    console.log('Login attempt with phone:', fullPhoneNumber, typeof fullPhoneNumber)
    
    const config = useRuntimeConfig()
    
    // D'abord vérifier le téléphone
    const checkResponse = await $fetch(`${config.public.apiBase}/auth/check-phone`, {
      method: 'POST',
      body: {
        phone: fullPhoneNumber,
        type: 'signin',
        method: 'pin'
      }
    })
    
    if (checkResponse.statusCode == 201) {
      // Ensuite se connecter
      const loginResponse = await $fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: {
          username: fullPhoneNumber,
          password: loginForm.value.pin
        }
      })
      
      console.log('loginResponse:', loginResponse)
      if (loginResponse.data.access_token) {
        // Stocker le token
        localStorage.setItem('workion_token', loginResponse.data.access_token)
        localStorage.setItem('workion_user', JSON.stringify(loginResponse.data))
        
        emit('success', loginResponse.data)
        closeModal()
      }
    }
  } catch (error: any) {
    console.error('Erreur de connexion:', error)
    if (error.data?.message) {
      errors.value.general = error.data.message
    } else {
      errors.value.general = 'Erreur de connexion. Vérifiez vos identifiants.'
    }
  } finally {
    isLoading.value = false
  }
}

const handleSignup = async () => {
  if (!validateSignupForm()) return
  
  isLoading.value = true
  
  try {
    // Utiliser le numéro de téléphone international complet
    const fullPhoneNumber = signupForm.value.phone
    
    // Créer le compte
    const signupResponse = await $fetch(`${config.public.apiBase}/auth/register`, {
      method: 'POST',
      body: {
        firstname: signupForm.value.firstname,
        lastname: signupForm.value.lastname,
        phone: fullPhoneNumber,
        roles: [signupForm.value.role]
      }
    })
    
    if (signupResponse.success) {
      // Basculer vers la connexion
      mode.value = 'login'
      loginForm.value.phone = signupForm.value.phone
      
      // Message de succès
      errors.value.success = 'Compte créé avec succès ! Vous allez recevoir votre code PIN par SMS.'
    }
  } catch (error: any) {
    console.error('Erreur d\'inscription:', error)
    if (error.data?.message) {
      errors.value.general = error.data.message
    } else {
      errors.value.general = 'Erreur lors de l\'inscription. Veuillez réessayer.'
    }
  } finally {
    isLoading.value = false
  }
}

const forgotPassword = () => {
  // TODO: Implémenter la récupération de mot de passe
  alert('Fonctionnalité de récupération de mot de passe à implémenter')
}

// Fermer avec la touche Escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.isOpen) {
      closeModal()
    }
  }
  document.addEventListener('keydown', handleEscape)
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
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

/* Styles pour vue-tel-input v8 */
:deep(.vue-phone-input-custom) {
  border-radius: 0.75rem;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
  overflow: hidden;
}

:deep(.vue-phone-input-custom:focus-within) {
  outline: none;
  border-color: #006970;
  box-shadow: 0 0 0 4px rgba(0, 105, 112, 0.1);
}

:deep(.vue-phone-input-custom.error) {
  border-color: #ef4444;
}

:deep(.vue-phone-input-custom.error:focus-within) {
  border-color: #ef4444;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
}

/* Container principal vue-tel-input */
:deep(.vue-tel-input) {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
}

/* Input field */
:deep(.vti__input) {
  border: none !important;
  outline: none !important;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: transparent;
  width: 100%;
}

/* Country selector */
:deep(.vti__dropdown) {
  border: none !important;
  outline: none !important;
  padding: 0.75rem 0.5rem;
  background: transparent;
  cursor: pointer;
  user-select: none;
}

:deep(.vti__dropdown:hover) {
  background-color: rgba(0, 105, 112, 0.05);
}

:deep(.vti__dropdown:focus) {
  outline: none;
  background-color: rgba(0, 105, 112, 0.1);
}

/* Dropdown list */
:deep(.vti__dropdown-list) {
  border-radius: 0.75rem;
  border: 2px solid #e5e7eb;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
}

/* Dropdown items */
:deep(.vti__dropdown-item) {
  padding: 0.5rem 1rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

:deep(.vti__dropdown-item:hover) {
  background-color: rgba(0, 105, 112, 0.1);
}

:deep(.vti__dropdown-item.highlighted) {
  background-color: #006970;
  color: white;
}

/* Flag and country code */
:deep(.vti__flag) {
  margin-right: 0.5rem;
}

:deep(.vti__country-code) {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Responsive */
@media (max-width: 640px) {
  :deep(.vti__dropdown-list) {
    max-height: 150px;
  }
  
  :deep(.vti__input) {
    font-size: 16px; /* Évite le zoom sur iOS */
  }
}
</style>
