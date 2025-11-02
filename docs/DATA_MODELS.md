# Data Models

This document describes the data models used in the Plant E-Commerce Platform.

## Users

The users collection stores information about all users in the system.

```ts
{
  uid: string,                    // Firebase user ID or MongoDB ObjectId
  email: string,                  // User's email address
  name: string,                   // User's full name
  role: 'Admin' | 'Moderator' | 'Finance' | 'Customer' | 'Delivery' | 'Production',
  phone?: string,                 // Optional phone number
  address?: string,               // Optional shipping address
  createdAt: Date,                // Account creation timestamp
  updatedAt?: Date                // Last update timestamp
}
```

### Roles

- **Admin**: Full access to all system features
- **Moderator**: Can manage products and limited user functions
- **Finance**: Can view transactions and financial reports
- **Customer**: Can place orders and manage their account
- **Delivery**: Can view and update delivery statuses
- **Production**: Can manage inventory and production schedules

## Products

The products collection stores information about all plants available for sale.

```ts
{
  title: string,                  // Product title (e.g., "Supertunia Vista Bubblegum")
  slug: string,                   // URL-friendly version of the title
  description: string,            // Detailed product description
  price: number,                  // Price in BDT
  currency: 'BDT',                // Currency code (fixed to BDT for Bangladesh)
  stock: number,                  // Available quantity
  images: string[],               // Array of image URLs
  status: 'published' | 'draft',  // Product status
  attributes: {
    usdaZone: string,             // Recommended hardiness zone
    light: string,                // Light requirements
    water: string                 // Water requirements
  },
  solutionTags: string[],         // Tags for solution-based shopping
  genus: string,                  // Botanical genus (e.g., "Petunia")
  commonName: string,             // Common name (e.g., "petunia")
  createdAt: Date,                // Product creation timestamp
  updatedAt?: Date                // Last update timestamp
}
```

## Orders

The orders collection stores information about customer orders.

```ts
{
  userId: string,                 // ID of the customer who placed the order
  items: [{
    productId: string,            // ID of the product
    quantity: number,             // Quantity ordered
    price: number                 // Price at time of order
  }],
  total: number,                  // Total order amount
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  shippingAddress: string,        // Delivery address
  shippingLocation: 'dhaka' | 'chittagong' | 'other', // Shipping location
  shippingCost: number,           // Shipping cost
  tax: number,                    // Tax amount
  createdAt: Date,                // Order creation timestamp
  updatedAt?: Date                // Last update timestamp
}
```

## Deliveries

The deliveries collection tracks the shipping status of orders.

```ts
{
  orderId: string,                // ID of the associated order
  status: 'pending' | 'picked' | 'in_transit' | 'delivered' | 'returned',
  trackingNumber?: string,        // Shipping carrier tracking number
  estimatedDelivery?: Date,       // Estimated delivery date
  actualDelivery?: Date,          // Actual delivery date
  deliveryPersonId?: string,      // ID of the delivery person
  createdAt: Date,                // Delivery record creation timestamp
  updatedAt?: Date                // Last update timestamp
}
```

## Finance

The finance collection stores financial transaction records.

```ts
{
  orderId: string,                // ID of the associated order
  amount: number,                 // Transaction amount
  type: 'sale' | 'refund' | 'payment', // Transaction type
  status: 'pending' | 'completed' | 'failed' | 'refunded',
  paymentMethod: 'stripe' | 'cod', // Payment method used
  transactionId?: string,         // External payment processor ID
  createdAt: Date,                // Transaction timestamp
  updatedAt?: Date                // Last update timestamp
}
```

## Production

The production collection tracks inventory and production activities.

```ts
{
  productId: string,              // ID of the associated product
  activity: 'received' | 'moved' | 'shipped' | 'damaged', // Type of activity
  quantity: number,               // Quantity affected
  location: string,               // Location of the activity
  notes?: string,                 // Additional notes
  createdAt: Date,                // Activity timestamp
  updatedAt?: Date                // Last update timestamp
}
```

## Audit Logs

The auditLogs collection tracks all important system events for security and compliance.

```ts
{
  action: string,                 // Description of the action taken
  userId: string,                 // ID of the user who performed the action
  resourceId?: string,            // ID of the affected resource
  resourceType?: string,          // Type of the affected resource
  details?: object,               // Additional details about the action
  ipAddress?: string,             // IP address of the user
  userAgent?: string,             // User agent string
  timestamp: Date                 // When the action occurred
}
```