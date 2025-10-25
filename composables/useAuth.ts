interface User {
  id: string
  firstname: string
  lastname: string
  phone: string
  email?: string
  roles: string[]
  photo?: {
    fullUrl: string
  }
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuth = () => {
  const config = useRuntimeConfig()
  
  // État réactif de l'authentification
  const authState = useState<AuthState>('auth.state', () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }))

  // Initialiser l'authentification depuis le localStorage
  const initAuth = () => {
    if (process.client) {
      const token = localStorage.getItem('workion_token')
      const userStr = localStorage.getItem('workion_user')
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)
          authState.value = {
            user,
            token,
            isAuthenticated: true
          }
        } catch (error) {
          console.error('Erreur lors du parsing des données utilisateur:', error)
          logout()
        }
      }
    }
  }

  // Connexion
  const login = async (credentials: { phone: string; pin: string }) => {
    try {
      // D'abord vérifier le téléphone
      const checkResponse = await $fetch(`${config.public.apiBase}/auth/check-phone`, {
        method: 'POST',
        body: {
          phone: credentials.phone,
          type: 'signin',
          method: 'pin'
        }
      })
      
      if (!checkResponse.success) {
        throw new Error('Numéro de téléphone non trouvé')
      }
      
      // Ensuite se connecter
      const loginResponse = await $fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: {
          username: credentials.phone,
          password: credentials.pin
        }
      })
      
      if (loginResponse.access_token) {
        // Stocker les données
        if (process.client) {
          localStorage.setItem('workion_token', loginResponse.access_token)
          localStorage.setItem('workion_user', JSON.stringify(loginResponse.user))
        }
        
        // Mettre à jour l'état
        authState.value = {
          user: loginResponse.user,
          token: loginResponse.access_token,
          isAuthenticated: true
        }
        
        return { success: true, user: loginResponse.user }
      }
      
      throw new Error('Erreur de connexion')
    } catch (error: any) {
      console.error('Erreur de connexion:', error)
      throw error
    }
  }

  // Inscription
  const register = async (userData: {
    firstname: string
    lastname: string
    phone: string
    role: string
  }) => {
    try {
      const signupResponse = await $fetch(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: {
          firstname: userData.firstname,
          lastname: userData.lastname,
          phone: userData.phone,
          roles: [userData.role]
        }
      })
      
      return { success: true, data: signupResponse }
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error)
      throw error
    }
  }

  // Déconnexion
  const logout = () => {
    if (process.client) {
      localStorage.removeItem('workion_token')
      localStorage.removeItem('workion_user')
    }
    
    authState.value = {
      user: null,
      token: null,
      isAuthenticated: false
    }
  }

  // Récupérer les informations utilisateur
  const fetchUser = async () => {
    if (!authState.value.token) return null
    
    try {
      const user = await $fetch(`${config.public.apiBase}/auth/whoami`, {
        headers: {
          Authorization: `Bearer ${authState.value.token}`
        }
      })
      
      authState.value.user = user
      
      if (process.client) {
        localStorage.setItem('workion_user', JSON.stringify(user))
      }
      
      return user
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error)
      logout()
      return null
    }
  }

  // Vérifier si l'utilisateur est connecté
  const checkAuth = () => {
    return authState.value.isAuthenticated && authState.value.user && authState.value.token
  }

  // Vérifier si l'utilisateur a un rôle spécifique
  const hasRole = (role: string) => {
    return authState.value.user?.roles?.includes(role) || false
  }

  // Récupération de mot de passe
  const forgotPassword = async (phone: string) => {
    try {
      const response = await $fetch(`${config.public.apiBase}/auth/pass-recovery`, {
        method: 'POST',
        body: { username: phone }
      })
      return { success: true, data: response }
    } catch (error: any) {
      console.error('Erreur de récupération de mot de passe:', error)
      throw error
    }
  }

  // Réinitialisation de mot de passe
  const resetPassword = async (phone: string, pin: string) => {
    try {
      const response = await $fetch(`${config.public.apiBase}/auth/reset-password`, {
        method: 'POST',
        body: { phone, pin }
      })
      return { success: true, data: response }
    } catch (error: any) {
      console.error('Erreur de réinitialisation de mot de passe:', error)
      throw error
    }
  }

  // Rafraîchir le token
  const refreshToken = async () => {
    if (!authState.value.token) return false
    
    try {
      const response = await $fetch(`${config.public.apiBase}/auth/refresh`, {
        method: 'POST',
        body: { refresh_token: authState.value.token }
      })
      
      if (response.access_token) {
        authState.value.token = response.access_token
        
        if (process.client) {
          localStorage.setItem('workion_token', response.access_token)
        }
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Erreur de rafraîchissement du token:', error)
      logout()
      return false
    }
  }

  return {
    // État
    user: computed(() => authState.value.user),
    token: computed(() => authState.value.token),
    isAuthenticated: computed(() => authState.value.isAuthenticated),
    
    // Méthodes
    initAuth,
    login,
    register,
    logout,
    fetchUser,
    checkAuth,
    hasRole,
    forgotPassword,
    resetPassword,
    refreshToken
  }
}
