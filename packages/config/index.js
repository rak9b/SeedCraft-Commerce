// Shared configuration constants for the plant e-commerce platform

export const APP_CONFIG = {
  // App metadata
  NAME: 'Plant E-Commerce',
  DESCRIPTION: 'A premium plant e-commerce platform',
  URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Currency and localization
  CURRENCY: 'BDT',
  DEFAULT_LOCALE: 'en',
  SUPPORTED_LOCALES: ['en', 'bn'],
  
  // Hardiness zones for Bangladesh (adapted from USDA zones)
  HARDINESS_ZONES: [
    '10a', '10b', '11a', '11b', '12a', '12b'
  ],
  
  // Plant care attributes
  LIGHT_REQUIREMENTS: [
    'Full Sun',
    'Partial Sun',
    'Partial Shade',
    'Full Shade'
  ],
  
  // Categories
  CATEGORIES: {
    'annuals': 'Annuals',
    'perennials': 'Perennials',
    'shrubs': 'Shrubs',
    'trees': 'Trees',
    'vines': 'Vines',
    'grass': 'Ornamental Grass',
    'vegetables': 'Vegetables',
    'herbs': 'Herbs'
  },
  
  // Solution tags
  SOLUTION_TAGS: [
    'Deer Resistant',
    'Drought Tolerant',
    'Pollinator Friendly',
    'Shade Loving',
    'Container Gardening',
    'Low Maintenance'
  ],
  
  // User roles
  ROLES: {
    ADMIN: 'Admin',
    MODERATOR: 'Moderator',
    FINANCE: 'Finance',
    CUSTOMER: 'Customer',
    DELIVERY: 'Delivery',
    PRODUCTION: 'Production'
  },
  
  // Shipping locations in Bangladesh
  SHIPPING_LOCATIONS: [
    { id: 'dhaka', name: 'Dhaka', cost: 80 },
    { id: 'chittagong', name: 'Chittagong', cost: 120 },
    { id: 'other', name: 'Other Locations', cost: 150 }
  ],
  
  // Payment methods
  PAYMENT_METHODS: [
    { id: 'stripe', name: 'Credit/Debit Card' },
    { id: 'cod', name: 'Cash on Delivery' }
  ]
}

// Plant name formatting rules according to Proven Winners guidelines
export const PLANT_NAME_FORMATTING = {
  // Italicize genus names
  formatGenus: (genus) => `<em>${genus}</em>`,
  
  // Keep common names lowercase
  formatCommonName: (name) => name.toLowerCase(),
  
  // Format botanical names (omit "hybrid")
  formatBotanicalName: (genus, species) => {
    // Remove "hybrid" if present
    const cleanSpecies = species.replace(/hybrid/gi, '').trim()
    return `${genus} ${cleanSpecies}`
  }
}

export default APP_CONFIG