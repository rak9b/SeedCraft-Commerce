// Type definitions for the plant e-commerce platform config

export interface AppConfig {
  NAME: string
  DESCRIPTION: string
  URL: string
  CURRENCY: string
  DEFAULT_LOCALE: string
  SUPPORTED_LOCALES: string[]
  HARDINESS_ZONES: string[]
  LIGHT_REQUIREMENTS: string[]
  CATEGORIES: {
    [key: string]: string
  }
  SOLUTION_TAGS: string[]
  ROLES: {
    ADMIN: string
    MODERATOR: string
    FINANCE: string
    CUSTOMER: string
    DELIVERY: string
    PRODUCTION: string
  }
  SHIPPING_LOCATIONS: {
    id: string
    name: string
    cost: number
  }[]
  PAYMENT_METHODS: {
    id: string
    name: string
  }[]
}

export interface PlantNameFormatting {
  formatGenus: (genus: string) => string
  formatCommonName: (name: string) => string
  formatBotanicalName: (genus: string, species: string) => string
}

export const APP_CONFIG: AppConfig
export const PLANT_NAME_FORMATTING: PlantNameFormatting

export default APP_CONFIG