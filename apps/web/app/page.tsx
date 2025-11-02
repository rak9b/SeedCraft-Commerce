'use client'

import React, { useState } from 'react'
import { Container } from '@plant-ecommerce/ui'
import { Section } from '@plant-ecommerce/ui'
import { Button } from '@plant-ecommerce/ui'
import { Badge } from '@plant-ecommerce/ui'
import { ProductCard } from '@plant-ecommerce/ui'
import { APP_CONFIG } from '@plant-ecommerce/config'

export default function HomePage() {
  const [zone, setZone] = useState('')
  
  const featuredProducts = [
    {
      id: 1,
      title: "Supertunia Vista Bubblegum",
      price: 250,
      imageUrl: "/images/supertunia-vista-bubblegum-1.jpg",
      zone: "10a",
      inStock: true
    },
    {
      id: 2,
      title: "ColorBlaze® Coleus Can Can Coral",
      price: 320,
      imageUrl: "/images/colorblaze-coleus-can-can-coral-1.jpg",
      zone: "11a",
      inStock: true
    },
    {
      id: 3,
      title: "Profusion Cherry Balsam",
      price: 280,
      imageUrl: "/images/profusion-cherry-balsam-1.jpg",
      zone: "10b",
      inStock: false
    },
    {
      id: 4,
      title: "Patio Princess Purple Angelonia",
      price: 300,
      imageUrl: "/images/patio-princess-purple-angelonia-1.jpg",
      zone: "11b",
      inStock: true
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <Section className="bg-gradient-to-r from-leaf-green-500 to-sky-blue-500 text-white">
        <Container className="py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {APP_CONFIG.DESCRIPTION}
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
            Grow Your Garden with Confidence
          </p>
          <Button size="lg" variant="secondary">
            Shop Now
          </Button>
        </Container>
      </Section>

      {/* Hardiness Zone Prompt */}
      <Section className="bg-muted">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Enter your hardiness zone for personalized plant recommendations
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <select 
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                title="Select your hardiness zone"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select your zone</option>
                {APP_CONFIG.HARDINESS_ZONES.map(zone => (
                  <option key={zone} value={zone}>{zone}</option>
                ))}
              </select>
              <Button>Find Plants</Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Shop by Category */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(APP_CONFIG.CATEGORIES).map(([key, label]) => (
              <div 
                key={key} 
                className="bg-muted rounded-lg p-6 text-center cursor-pointer hover:bg-muted/80 transition-colors"
              >
                <h3 className="font-semibold">{label}</h3>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Shop by Solution */}
      <Section className="bg-muted">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Solution</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {APP_CONFIG.SOLUTION_TAGS.map(tag => (
              <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      {/* Featured Products */}
      <Section>
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
                zone={product.zone}
                inStock={product.inStock}
              />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}