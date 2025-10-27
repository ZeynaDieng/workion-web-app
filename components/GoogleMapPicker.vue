<template>
  <div class="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <!-- Barre de recherche -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Rechercher une adresse..."
        class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        @keyup.enter="searchAddress"
      />
    </div>

    <!-- Carte Google Maps -->
    <div class="relative mb-4">
      <div
        ref="mapContainer"
        class="w-full h-80 rounded-xl border border-gray-300 bg-gray-100"
      ></div>
      
      <!-- Marker central -->
      <div v-if="mapReady" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
        <div class="relative">
          <!-- Pin principal -->
          <div class="w-10 h-10 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <!-- Ombre -->
          <div class="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black opacity-20 rounded-full blur-sm"></div>
          <!-- Animation de pulsation -->
          <div class="absolute top-0 left-0 w-10 h-10 flex items-center justify-center">
            <svg class="w-8 h-8 text-red-500 animate-ping opacity-30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="!mapReady" class="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
        <div class="text-center text-gray-500">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p>Chargement de la carte...</p>
        </div>
      </div>
    </div>

    <!-- Adresse sélectionnée -->
    <div v-if="selectedAddress" class="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
      <h3 class="font-semibold text-green-800 mb-2">📍 Adresse sélectionnée</h3>
      <p class="text-green-700 text-sm">{{ selectedAddress.address }}</p>
    </div>

    <!-- Boutons d'action -->
    <div class="space-y-3">
      <button
        type="button"
        @click="getMyLocation"
        :disabled="isLoading"
        class="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {{ isLoading ? 'Localisation...' : 'Ma position' }}
      </button>
      
      <button
        type="button"
        @click="confirmAddress"
        :disabled="!selectedAddress"
        class="w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        Confirmer l'adresse
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  apiKey: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'address-selected'])

// Refs
const mapContainer = ref()
const searchQuery = ref('')
const mapReady = ref(false)
const isLoading = ref(false)
const selectedAddress = ref(props.modelValue)

// Variables Google Maps
let googleMap = null
let geocoder = null

// Charger Google Maps API
const loadGoogleMaps = () => {
  return new Promise((resolve, reject) => {
    // Vérifier si déjà chargé
    if (window.google && window.google.maps) {
      resolve()
      return
    }

    // Créer le script
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${props.apiKey}&libraries=places&language=fr&callback=initGoogleMaps`
    script.async = true
    script.defer = true
    
    // Callback global
    window.initGoogleMaps = () => {
      resolve()
    }
    
    script.onerror = () => {
      reject(new Error('Erreur chargement Google Maps'))
    }
    
    document.head.appendChild(script)
  })
}

// Initialiser la carte
const initializeMap = async () => {
  try {
    await nextTick()
    
    if (!mapContainer.value) {
      console.error('Container non trouvé')
      return
    }

    console.log('Chargement Google Maps...')
    await loadGoogleMaps()
    console.log('Google Maps chargé')

    // Créer la carte
    googleMap = new window.google.maps.Map(mapContainer.value, {
      center: { lat: 14.6937, lng: -17.4441 }, // Dakar
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    })

    // Créer le geocoder
    geocoder = new window.google.maps.Geocoder()

    mapReady.value = true
    console.log('Carte initialisée')

    // Géolocalisation automatique
    setTimeout(() => {
      getMyLocation()
    }, 1000)

  } catch (error) {
    console.error('Erreur initialisation carte:', error)
  }
}

// Géocodage inverse
const reverseGeocode = async (lat, lng) => {
  if (!geocoder) return

  try {
    const response = await geocoder.geocode({ location: { lat, lng } })
    
    if (response && response.results && response.results[0]) {
      const result = response.results[0]
      
      const addressData = {
        lat,
        lng,
        address: result.formatted_address || `${lat}, ${lng}`,
        street: '',
        locality: '',
        country: ''
      }

      selectedAddress.value = addressData
      emit('update:modelValue', addressData)
      console.log('Adresse trouvée:', addressData.address)
    }
  } catch (error) {
    console.error('Erreur géocodage:', error)
  }
}

// Obtenir ma position
const getMyLocation = () => {
  if (!navigator.geolocation) {
    console.error('Géolocalisation non supportée')
    return
  }

  isLoading.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      console.log('Position obtenue:', latitude, longitude)
      
      if (googleMap) {
        const pos = new window.google.maps.LatLng(latitude, longitude)
        googleMap.setCenter(pos)
        googleMap.setZoom(18)
      }
      
      reverseGeocode(latitude, longitude)
      isLoading.value = false
    },
    (error) => {
      console.error('Erreur géolocalisation:', error)
      isLoading.value = false
    }
  )
}

// Rechercher une adresse
const searchAddress = async () => {
  if (!searchQuery.value.trim() || !geocoder) return

  try {
    const response = await geocoder.geocode({ address: searchQuery.value })
    
    if (response.results && response.results[0]) {
      const result = response.results[0]
      const location = result.geometry.location
      
      if (location && googleMap) {
        googleMap.setCenter(location)
        googleMap.setZoom(17)
        reverseGeocode(location.lat(), location.lng())
      }
    }
  } catch (error) {
    console.error('Erreur recherche:', error)
  }
}

// Obtenir l'adresse du centre
const getCenterAddress = () => {
  if (!googleMap || !mapReady.value) return
  
  const center = googleMap.getCenter()
  if (center) {
    reverseGeocode(center.lat(), center.lng())
  }
}

// Confirmer l'adresse
const confirmAddress = () => {
  if (selectedAddress.value) {
    emit('address-selected', selectedAddress.value)
    console.log('Adresse confirmée:', selectedAddress.value.address)
  }
}

// Initialisation
onMounted(() => {
  initializeMap()
})
</script>
