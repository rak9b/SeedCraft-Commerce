'use client'

import React from 'react'
import { Container } from '@plant-ecommerce/ui'
import { Button } from '@plant-ecommerce/ui'

export default function AccountPage() {
  // Mock user data
  const user = {
    name: "Customer User",
    email: "customer@plantshop.com",
    phone: "+8801712345683",
    address: "Flat 2A, House 56, Road 10, Block B, Mirpur, Dhaka"
  }

  // Mock order history
  const orders = [
    {
      id: "ORD-001",
      date: "2025-09-15",
      total: 1250,
      status: "Delivered"
    },
    {
      id: "ORD-002",
      date: "2025-09-22",
      total: 890,
      status: "Processing"
    }
  ]

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium">{user.address}</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Edit Profile
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Intl.NumberFormat('bn-BD', {
                          style: 'currency',
                          currency: 'BDT'
                          }).format(order.total)}
                      </p>
                      <p className={`text-sm ${
                        order.status === 'Delivered' 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}