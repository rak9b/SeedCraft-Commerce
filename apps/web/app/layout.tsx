import React from 'react'
import { ThemeProvider } from '@plant-ecommerce/ui/components/ThemeProvider'
import { Navbar } from '@plant-ecommerce/ui/components/Navbar'
import { Footer } from '@plant-ecommerce/ui/components/Footer'
import { LanguageSwitcher } from '@plant-ecommerce/ui/components/LanguageSwitcher'
import '../styles/globals.css'

export const metadata = {
  title: 'PlantShop - Premium Plants Delivered',
  description: 'Premium plants from trusted breeders, delivered to your door',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="dark">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}