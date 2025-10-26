export default defineNuxtRouteMiddleware(() => {
  // Ce middleware s'exécute sur toutes les routes
  
  // Initialiser l'authentification côté client
  if (process.client) {
    const { initAuth } = useAuth()
    initAuth()
  }
})
