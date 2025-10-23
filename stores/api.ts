import type { 
  ApiResponse, 
  PaginatedResponse, 
  Service, 
  ServiceRequest, 
  User, 
  Advert,
  Price,
  Tag,
  Realization
} from '~/types'

export const useApiStore = defineStore('api', () => {
  const config = useRuntimeConfig()
  
  // Base API URL
  const baseURL = config.public.apiBase

  // Generic API call function
  const apiCall = async <T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> => {
    const url = `${baseURL}${endpoint}`
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    console.log('🚀 API Call:', {
      url,
      method: options.method || 'GET',
      headers: defaultHeaders,
      body: options.body
    })

    try {
      const response = await fetch(url, {
        ...options,
        headers: defaultHeaders
      })

      // console.log('📡 API Response Status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error Response:', errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const data = await response.json()
      // console.log('✅ API Response Data:', data)
      return data
    } catch (error) {
      console.error('💥 API call failed:', error)
      throw error
    }
  }

  // Services API
  const getServices = async (params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<PaginatedResponse<Service>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.search) searchParams.append('search', params.search)
    
    const query = searchParams.toString()
    return apiCall<PaginatedResponse<Service>>(`/services${query ? `?${query}` : ''}`)
  }

  const getServiceById = async (id: string): Promise<ApiResponse<Service>> => {
    return apiCall<ApiResponse<Service>>(`/services/${id}`)
  }

  // Service Requests API
  const getServiceRequests = async (params?: {
    page?: number
    limit?: number
    search?: string
    status?: string
    serviceId?: string
  }): Promise<PaginatedResponse<ServiceRequest>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.search) searchParams.append('search', params.search)
    if (params?.status) searchParams.append('status', params.status)
    if (params?.serviceId) searchParams.append('serviceId', params.serviceId)
    
    const query = searchParams.toString()
    return apiCall<PaginatedResponse<ServiceRequest>>(`/service-request${query ? `?${query}` : ''}`)
  }

  const getServiceRequestByNumber = async (reqNumber: string): Promise<ApiResponse<ServiceRequest>> => {
    return apiCall<ApiResponse<ServiceRequest>>(`/service-request/by-number/${reqNumber}`)
  }

  const createServiceRequest = async (data: any): Promise<ApiResponse<ServiceRequest>> => {
    return apiCall<ApiResponse<ServiceRequest>>('/service-request', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  // Users/Providers API
  const getProviders = async (params?: {
    page?: number
    limit?: number
    search?: string
    services?: string[]
    location?: string
    certified?: boolean
  }): Promise<PaginatedResponse<User>> => {
    const searchParams = new URLSearchParams()
    searchParams.append('roles', 'partner')
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.search) searchParams.append('search', params.search)
    if (params?.location) searchParams.append('location', params.location)
    if (params?.certified !== undefined) searchParams.append('certified', params.certified.toString())
    if (params?.services?.length) {
      params.services.forEach(service => searchParams.append('services[]', service))
    }
    
    const query = searchParams.toString()
    return apiCall<PaginatedResponse<User>>(`/users${query ? `?${query}` : ''}`)
  }

  const getProviderById = async (id: string): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>(`/users/${id}`)
  }

  const getProviderBySlug = async (slug: string): Promise<ApiResponse<User>> => {
    return apiCall<ApiResponse<User>>(`/users/slug/${slug}`)
  }

  // Adverts API
  const getAdverts = async (params?: {
    page?: number
    limit?: number
    search?: string
    serviceId?: string
    partnerId?: string
  }): Promise<PaginatedResponse<Advert>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.search) searchParams.append('search', params.search)
    if (params?.serviceId) searchParams.append('serviceId', params.serviceId)
    if (params?.partnerId) searchParams.append('partnerId', params.partnerId)
    
    const query = searchParams.toString()
    return apiCall<PaginatedResponse<Advert>>(`/adverts${query ? `?${query}` : ''}`)
  }

  const getAdvertById = async (id: string): Promise<ApiResponse<Advert>> => {
    return apiCall<ApiResponse<Advert>>(`/adverts/${id}`)
  }

  // Prices API
  const getPrices = async (params?: {
    page?: number
    limit?: number
    serviceId?: string
    userId?: string
  }): Promise<PaginatedResponse<Price>> => {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.serviceId) searchParams.append('serviceId', params.serviceId)
    if (params?.userId) searchParams.append('userId', params.userId)
    
    const query = searchParams.toString()
    return apiCall<PaginatedResponse<Price>>(`/prices${query ? `?${query}` : ''}`)
  }

  const getPricesByService = async (serviceId: string): Promise<ApiResponse<Price[]>> => {
    return apiCall<ApiResponse<Price[]>>(`/prices/by-service/${serviceId}`)
  }

  // Tags API
  const getTags = async (params?: {
    appreciation?: 'positive' | 'negative'
    isActive?: boolean
  }): Promise<ApiResponse<Tag[]>> => {
    const searchParams = new URLSearchParams()
    if (params?.appreciation) searchParams.append('appreciation', params.appreciation)
    if (params?.isActive !== undefined) searchParams.append('isActive', params.isActive.toString())
    
    const query = searchParams.toString()
    return apiCall<ApiResponse<Tag[]>>(`/tags${query ? `?${query}` : ''}`)
  }

  const getTagsByService = async (serviceId: string): Promise<ApiResponse<Tag[]>> => {
    return apiCall<ApiResponse<Tag[]>>(`/tags/by-service/${serviceId}`)
  }

  // Realizations API
  const getRealizationsByPartner = async (partnerId: string): Promise<ApiResponse<Realization[]>> => {
    return apiCall<ApiResponse<Realization[]>>(`/realizations/by-partner/${partnerId}`)
  }

  // Statistics API
  const getStats = async (): Promise<ApiResponse<{
    totalProviders: number
    totalServices: number
    totalRequests: number
    totalAdverts: number
  }>> => {
    return apiCall<ApiResponse<any>>('/stats')
  }

  return {
    // Services
    getServices,
    getServiceById,
    
    // Service Requests
    getServiceRequests,
    getServiceRequestByNumber,
    createServiceRequest,
    
    // Providers
    getProviders,
    getProviderById,
    getProviderBySlug,
    
    // Adverts
    getAdverts,
    getAdvertById,
    
    // Prices
    getPrices,
    getPricesByService,
    
    // Tags
    getTags,
    getTagsByService,
    
    // Realizations
    getRealizationsByPartner,
    
    // Statistics
    getStats
  }
})
