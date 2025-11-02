import * as React from 'react'
import { Button } from './Button'

const ThemeToggle = () => {
  // In a real implementation, this would integrate with next-themes
  // For now, we'll just provide a simple toggle
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}

export { ThemeToggle }