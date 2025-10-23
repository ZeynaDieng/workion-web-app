// Types pour l'application Workion Web

export interface User {
  id: string
  firstname: string
  lastname: string
  email: string
  phone: string
  slug: string
  isCompany: boolean
  companyName?: string
  biography?: string
  profilePicture?: string
  addresses: Address[]
  services: string[]
  tags: string[]
  certificationLevel?: 'level_1' | 'level_2'
  certificationStatus?: 'none' | 'pending' | 'approved' | 'rejected'
  status: 'active' | 'inactive' | 'suspended' | 'offline_provider'
  role: 'client' | 'partner' | 'admin'
  createdAt: string
  updatedAt: string
}

export interface Address {
  id?: string
  lat: number
  lng: number
  address: string
  street: string
  locality: string
  country: string
  isDefault?: boolean
}

export interface Service {
  id: string
  name: string
  description: string
  cover?: Media
  enablePricing: boolean
  enableRealization: boolean
  availableTags: string[]
  createdAt: string
  updatedAt: string
}

export interface Media {
  id: string
  name: string
  type: string
  url_streaming: string
  slug: string
}

export interface ServiceRequest {
  id: string
  reqNumber: string
  user?: User
  guestName?: string
  guestPhone?: string
  guestAddress?: string
  allowCalls: boolean
  allowWhatsApp: boolean
  service: Service
  services: Service[]
  details: string
  serviceType?: 'self_service' | 'full_service'
  periodicity?: 'par heure' | 'par jour' | 'par semaine' | 'par mois' | 'pour la prestation'
  price?: number
  negotiable: boolean
  likes: number
  comments: number
  seen: number
  status: 'running' | 'complete' | 'failed' | 'canceled' | 'archived'
  address?: Address
  archived: boolean
  reasons?: string[]
  createdAt: string
  updatedAt: string
}

export interface Advert {
  id: string
  description: string
  partner: User
  services: Service[]
  status: 'active' | 'inactive' | 'expired'
  endDate: string
  viewsCount: number
  contactsCount: number
  createdAt: string
  updatedAt: string
}

export interface Price {
  id: string
  user: User
  service: Service
  title: string
  price: number
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  description?: string
  appreciation: 'positive' | 'negative'
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Realization {
  id: string
  title: string
  description?: string
  image: Media
  partner: User
  createdAt: string
  updatedAt: string
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    total: number
    totalPages: number
    page: number
    limit: number
  }
}

// Types pour les formulaires
export interface ServiceRequestForm {
  guestName?: string
  guestPhone?: string
  guestAddress?: string
  allowCalls: boolean
  allowWhatsApp: boolean
  services: string[]
  details: string
  serviceType?: 'self_service' | 'full_service'
  periodicity?: string
  price?: number
  negotiable: boolean
  address?: Partial<Address>
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// Types pour la navigation
export interface MenuItem {
  label: string
  to: string
  icon?: string
  children?: MenuItem[]
}
