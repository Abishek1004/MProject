import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext()

const LANGUAGE_MAP = {
  en: { name: 'English', code: 'en', flag: '🇬🇧' },
  ta: { name: 'Tamil', code: 'ta', flag: '🇮🇳' },
  hi: { name: 'Hindi', code: 'hi', flag: '🇮🇳' },
  te: { name: 'Telugu', code: 'te', flag: '🇮🇳' },
  ml: { name: 'Malayalam', code: 'ml', flag: '🇮🇳' },
  kn: { name: 'Kannada', code: 'kn', flag: '🇮🇳' },
  fr: { name: 'French', code: 'fr', flag: '🇫🇷' },
  es: { name: 'Spanish', code: 'es', flag: '🇪🇸' },
}

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en'
  })
  const [isChanging, setIsChanging] = useState(false)
  const [languageChangeKey, setLanguageChangeKey] = useState(0) // Force re-render trigger

  // Persist language on change
  useEffect(() => {
    localStorage.setItem('selectedLanguage', currentLanguage)
    // Notify all components of language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: currentLanguage }))
  }, [currentLanguage])

  // Trigger translation change via Google Translate
  const changeLanguage = (langCode) => {
    if (langCode === currentLanguage) return

    setIsChanging(true)
    setCurrentLanguage(langCode)

    // Trigger Google Translate change
    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo')
      if (select) {
        select.value = langCode
        const event = new Event('change', { bubbles: true })
        select.dispatchEvent(event)
      }
      
      // Force component updates after translation
      setTimeout(() => {
        setLanguageChangeKey(prev => prev + 1)
        setIsChanging(false)
      }, 500)
    }, 100)
  }

  const value = {
    currentLanguage,
    changeLanguage,
    isChanging,
    languages: Object.values(LANGUAGE_MAP),
    getLanguageInfo: (code) => LANGUAGE_MAP[code] || LANGUAGE_MAP.en,
    languageChangeKey, // For components to detect language changes
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
