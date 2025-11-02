import * as React from 'react'
import { Button } from './Button'

interface LanguageSwitcherProps {
  currentLanguage: string
  onLanguageChange: (lang: string) => void
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  const toggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'bn' : 'en'
    onLanguageChange(newLang)
  }
  
  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={toggleLanguage}
    >
      {currentLanguage === 'en' ? 'বাংলা' : 'English'}
    </Button>
  )
}

export { LanguageSwitcher }