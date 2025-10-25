export interface Subscription {
  id: string
  userId: string
  offerId: string
  offer?: Offer
  startDate: Date
  endDate: Date
  status: 'active' | 'expired' | 'cancelled'
  paymentMethod?: string
  transactionId?: string
  createdAt: Date
  updatedAt: Date
}

export interface Offer {
  id: string
  title: string
  advantages: string[]
  duration: number // en jours
  priceHT: number
  priceTTC: number
  status: 'active' | 'inactive'
  type: 'client' | 'provider'
  createdAt: Date
  updatedAt: Date
}

export interface PaymentMethod {
  id: string
  name: string
  type: 'wave' | 'orange_money' | 'card'
  icon: string
  description: string
  isActive: boolean
}

export interface PaymentRequest {
  offerId: string
  paymentMethod: string
  amount: number
  currency: string
}

export interface PaymentResponse {
  success: boolean
  paymentUrl?: string
  transactionId?: string
  message?: string
}
