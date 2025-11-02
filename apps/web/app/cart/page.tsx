'use client'

import React from 'react'
import { Container } from '@plant-ecommerce/ui'
import { Button } from '@plant-ecommerce/ui'

export default function CartPage() {
  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: "Supertunia Vista Bubblegum",
      price: 250,
      quantity: 2,
      size: '6" Pot',
      image: "/images/supertunia-vista-bubblegum-1.jpg"
    },
    {
      id: 2,
      title: "ColorBlaze® Coleus Can Can Coral",
      price: 320,
      quantity: 1,
      size: '4" Pot',
      image: "/images/colorblaze-coleus-can-can-coral-1.jpg"
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 80
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  return (
    <Container className="py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Button>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center border rounded-lg p-4">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.size}</p>
                    <div className="flex items-center mt-2">
                      <span className="font-medium">
                        {new Intl.NumberFormat('bn-BD', {
                          style: 'currency',
                          currency: 'BDT'
                        }).format(item.price)}
                      </span>
                      <div className="ml-4 flex items-center">
                        <button className="w-8 h-8 rounded-md border flex items-center justify-center">-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="w-8 h-8 rounded-md border flex items-center justify-center">+</button>
                      </div>
                    </div>
                  </div>
                  <button className="text-destructive">
                    <span className="sr-only">Remove item</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT'
                  }).format(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT'
                  }).format(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>
                  {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT'
                  }).format(tax)}
                </span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat('bn-BD', {
                    style: 'currency',
                    currency: 'BDT'
                  }).format(total)}
                </span>
              </div>
            </div>
            <Button className="w-full mt-6">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </Container>
  )
}