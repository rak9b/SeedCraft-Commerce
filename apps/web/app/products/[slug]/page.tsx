'use client'

import React, { useState } from 'react'
import { Container } from '@plant-ecommerce/ui'
import { Button } from '@plant-ecommerce/ui'

export default function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState('6" Pot')
  
  // Mock product data
  const product = {
    title: "Supertunia Vista Bubblegum",
    genus: "Petunia",
    commonName: "petunia",
    price: 250,
    description: "A vigorous trailing petunia with large, bubblegum pink flowers that bloom continuously from spring to frost. Perfect for containers, hanging baskets, and landscape beds.",
    attributes: {
      usdaZone: "10a",
      light: "Full Sun",
      water: "Medium"
    },
    solutionTags: ["Container Gardening", "Pollinator Friendly"],
    stock: 50,
    images: [
      "/images/supertunia-vista-bubblegum-1.jpg",
      "/images/supertunia-vista-bubblegum-2.jpg"
    ]
  }

  const sizes = ['4" Pot', '6" Pot', '8" Pot', '10" Pot']

  // Product Gallery Component
  const ProductGallery = ({ images }: { images: string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <img 
          src={images[0]} 
          alt="Main product image" 
          className="w-full h-96 object-cover rounded-lg"
        />
      </div>
      {images.slice(1).map((image, index) => (
        <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">Image {index + 2}</span>
        </div>
      ))}
    </div>
  )

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <ProductGallery images={product.images} />
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-muted-foreground mb-4">
            <em>{product.genus}</em> {product.commonName}
          </p>
          
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">
              {new Intl.NumberFormat('bn-BD', {
                style: 'currency',
                currency: 'BDT'
              }).format(product.price)}
            </span>
            {product.stock > 0 ? (
              <span className="ml-4 text-green-600 dark:text-green-400">In Stock</span>
            ) : (
              <span className="ml-4 text-red-600 dark:text-red-400">Out of Stock</span>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Size</h2>
            <div className="flex flex-wrap gap-2">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-input hover:bg-accent'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Care Instructions</h2>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>USDA Zone: {product.attributes.usdaZone}</li>
              <li>Light: {product.attributes.light}</li>
              <li>Water: {product.attributes.water}</li>
            </ul>
          </div>
          
          <div className="flex gap-4">
            <Button size="lg" className="flex-1">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Wishlist
            </Button>
          </div>
        </div>
      </div>
    </Container>
  )
}