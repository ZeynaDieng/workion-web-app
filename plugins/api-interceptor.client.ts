export default defineNuxtPlugin(() => {
  // Ce plugin s'exécute côté client uniquement
  
  // Intercepter les requêtes fetch globalement
  const originalFetch = window.fetch
  
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    // Obtenir le token d'authentification
    const token = localStorage.getItem('workion_token')
    
    // Modifier les headers si un token existe
    if (token && init) {
      init.headers = {
        ...init.headers,
        'Authorization': `Bearer ${token}`
      }
    } else if (token && !init) {
      init = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    }
    
    // Exécuter la requête originale
    const response = await originalFetch(input, init)
    
    // Gérer les erreurs d'authentification
    if (response.status === 401) {
      console.warn('🔑 Token expired or invalid, clearing auth data')
      localStorage.removeItem('workion_token')
      localStorage.removeItem('workion_user')
      
      // Optionnel: rediriger vers la page de connexion
      // window.location.href = '/login'
    }
    
    return response
  }
})
