// API client for communicating with the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface ApiResponse<T> {
  data: T
  error?: string
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return { data }
    } catch (error) {
      return { 
        data: null as unknown as T,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }
    }
  }

  // Product endpoints
  async getProducts() {
    return this.request('/products')
  }

  async getProductById(id: string) {
    return this.request(`/products/${id}`)
  }

  // Order endpoints
  async getOrders() {
    return this.request('/orders')
  }

  async getUserOrders(userId: string) {
    return this.request(`/orders/user/${userId}`)
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // User endpoints
  async getUsers() {
    return this.request('/users')
  }

  async setUserRole(userId: string, role: string) {
    return this.request(`/users/role`, {
      method: 'POST',
      body: JSON.stringify({ uid: userId, role }),
    })
  }

  // Delivery endpoints
  async getDeliveries() {
    return this.request('/deliveries')
  }

  async getOrderDeliveries(orderId: string) {
    return this.request(`/deliveries/order/${orderId}`)
  }

  // Finance endpoints
  async getFinanceData() {
    return this.request('/finance')
  }

  async getOrderFinance(orderId: string) {
    return this.request(`/finance/order/${orderId}`)
  }

  // Production endpoints
  async getProductionData() {
    return this.request('/production')
  }

  async getProductProduction(productId: string) {
    return this.request(`/production/product/${productId}`)
  }
}

// Create a singleton instance
export const apiClient = new ApiClient()