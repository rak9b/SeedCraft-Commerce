import * as React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './Card'
import { Button } from './Button'
import { cn } from '../lib/utils'

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  price: number
  imageUrl?: string
  zone?: string
  inStock?: boolean
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ className, title, price, imageUrl, zone, inStock = true, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn('flex flex-col', className)} {...props}>
        <CardHeader className="p-0">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-48 object-cover rounded-t-lg"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">No image</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg font-medium mb-2">{title}</CardTitle>
          {zone && (
            <div className="text-sm text-muted-foreground mb-2">
              Zone: {zone}
            </div>
          )}
          <div className="text-lg font-bold">
            {new Intl.NumberFormat('bn-BD', {
              style: 'currency',
              currency: 'BDT'
            }).format(price)}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" disabled={!inStock}>
            {inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </CardFooter>
      </Card>
    )
  }
)
ProductCard.displayName = 'ProductCard'

export { ProductCard }