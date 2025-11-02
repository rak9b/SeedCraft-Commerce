import * as React from 'react'
import { Container } from './Container'
import { Button } from './Button'
import { cn } from '../lib/utils'

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement> {}

const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur',
          className
        )}
        {...props}
      >
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <a href="/" className="text-xl font-bold">
              PlantShop
            </a>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <a href="/shop" className="transition-colors hover:text-foreground/80">
                Shop
              </a>
              <a href="/about" className="transition-colors hover:text-foreground/80">
                About
              </a>
              <a href="/contact" className="transition-colors hover:text-foreground/80">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Cart</span>
              {/* Cart icon would go here */}
              <div className="h-5 w-5">🛒</div>
            </Button>
            <Button variant="ghost" size="icon">
              <span className="sr-only">User</span>
              {/* User icon would go here */}
              <div className="h-5 w-5">👤</div>
            </Button>
          </div>
        </Container>
      </header>
    )
  }
)
Navbar.displayName = 'Navbar'

export { Navbar }