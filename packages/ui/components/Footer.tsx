import * as React from 'react'
import { Container } from './Container'
import { cn } from '../lib/utils'

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn(
          'border-t bg-background',
          className
        )}
        {...props}
      >
        <Container className="py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">PlantShop</h3>
              <p className="text-sm text-muted-foreground">
                Premium plants from trusted breeders, delivered to your door.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/shop" className="text-sm text-muted-foreground hover:text-foreground">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="/solutions" className="text-sm text-muted-foreground hover:text-foreground">
                    Solutions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/returns" className="text-sm text-muted-foreground hover:text-foreground">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 PlantShop. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    )
  }
)
Footer.displayName = 'Footer'

export { Footer }