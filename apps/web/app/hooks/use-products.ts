// Custom hook for product data fetching

import { useState, useEffect } from 'react'
import { apiClient } from '../lib/api-client'
import { handleApiError } from '../lib/error-handler'

export interface Product {
  id: string
  title: string
  slug: string
  description: string
  price: number
  currency: string
  stock: number
  images: string[]
  status: string
  attributes: {
    usda_zone: string
    light: string
    water: string
  }
  solution_tags: string[]
  genus: string
  common_name: string
  created_at: string
  updated_at?: string
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getProducts()
        
        if (response.error) {
          throw new Error(response.error)
        }
        
        setProducts(response.data || [])
        setError(null)
      } catch (err) {
        const appError = handleApiError(err)
        setError(appError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}

export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const response = await apiClient.getProductById(productId)
        
        if (response.error) {
          throw new Error(response.error)
        }
        
        setProduct(response.data || null)
        setError(null)
      } catch (err) {
        const appError = handleApiError(err)
        setError(appError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  return { product, loading, error }
}