import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Custom hook to detect when language changes and trigger component updates
 * 
 * This hook will cause the component to re-render whenever the language changes,
 * and provide utilities to update content based on the new language.
 * 
 * @returns {Object} Object with language info and update utilities
 * 
 * @example
 * export default function MyComponent() {
 *   const { language, hasChanged } = useLanguageChange()
 *   
 *   useEffect(() => {
 *     // Fetch content in new language
 *     fetchContentForLanguage(language)
 *   }, [language, hasChanged])
 *   
 *   return <div>{content}</div>
 * }
 */
export function useLanguageChange() {
  const { currentLanguage, isChanging, languageChangeKey } = useLanguage()
  const [previousLanguage, setPreviousLanguage] = useState(currentLanguage)
  const [hasChanged, setHasChanged] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (previousLanguage !== currentLanguage) {
      setPreviousLanguage(currentLanguage)
      setHasChanged(true)
      setIsUpdating(true)

      // Clear the changed flag after update cycle
      const timer = setTimeout(() => {
        setHasChanged(false)
        setIsUpdating(false)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [currentLanguage, languageChangeKey, previousLanguage])

  return {
    language: currentLanguage,
    previousLanguage,
    hasChanged,
    isUpdating,
    isChanging,
    languageChangeKey, // Can be used as dependency in useEffect
  }
}

/**
 * Hook to listen for language change events
 * Useful for updating specific parts of the page
 * 
 * @param {Function} callback - Function to call when language changes (receives new language code)
 * 
 * @example
 * export default function MyComponent() {
 *   useOnLanguageChange((newLang) => {
 *     console.log('Language changed to:', newLang)
 *     // Update your content here
 *   })
 *   
 *   return <div>Content</div>
 * }
 */
export function useOnLanguageChange(callback) {
  const { currentLanguage } = useLanguage()

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLanguage = event.detail?.language || currentLanguage
      callback(newLanguage)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('eco:languageChanged', handleLanguageChange)

      return () => {
        window.removeEventListener('eco:languageChanged', handleLanguageChange)
      }
    }
  }, [callback, currentLanguage])
}

/**
 * Hook to get current language with fallback
 * Also tracks if page translation is complete
 * 
 * @returns {Object} Language info with translation status
 * 
 * @example
 * export default function MyComponent() {
 *   const { language, isTranslated, isTranslating } = useLanguageWithStatus()
 *   
 *   return (
 *     <div>
 *       {isTranslating && <Loading />}
 *       Current: {language}
 *     </div>
 *   )
 * }
 */
export function useLanguageWithStatus() {
  const { currentLanguage, isChanging } = useLanguage()
  const [isTranslated, setIsTranslated] = useState(false)

  useEffect(() => {
    if (!isChanging) {
      // Give Google Translate time to complete translation
      const timer = setTimeout(() => {
        setIsTranslated(true)
      }, 1500)

      return () => clearTimeout(timer)
    } else {
      setIsTranslated(false)
    }
  }, [isChanging])

  return {
    language: currentLanguage,
    isTranslating: isChanging,
    isTranslated,
  }
}

/**
 * Hook to memoize content based on language
 * Useful for language-specific content that shouldn't re-compute unnecessarily
 * 
 * @param {Function} contentFactory - Function that returns content for the language
 * @param {string} language - Current language (dependency)
 * @returns {any} Memoized content
 * 
 * @example
 * export default function MyComponent() {
 *   const { language } = useLanguage()
 *   
 *   const content = useLanguageContent(() => {
 *     return getContentForLanguage(language)
 *   }, language)
 *   
 *   return <div>{content}</div>
 * }
 */
export function useLanguageContent(contentFactory, language) {
  const [content, setContent] = useState(() => contentFactory())

  useEffect(() => {
    setContent(contentFactory())
  }, [language, contentFactory])

  return content
}

/**
 * Hook to delay rendering until translation is complete
 * Useful to prevent showing incomplete translations
 * 
 * @param {number} delayMs - Delay in milliseconds
 * @returns {boolean} True when safe to render translated content
 * 
 * @example
 * export default function MyComponent() {
 *   const isReady = useTranslationReady(1500)
 *   
 *   if (!isReady) return <LoadingPlaceholder />
 *   return <ActualContent />
 * }
 */
export function useTranslationReady(delayMs = 1500) {
  const { isChanging } = useLanguage()
  const [isReady, setIsReady] = useState(!isChanging)

  useEffect(() => {
    if (isChanging) {
      setIsReady(false)

      const timer = setTimeout(() => {
        setIsReady(true)
      }, delayMs)

      return () => clearTimeout(timer)
    } else {
      setIsReady(true)
    }
  }, [isChanging, delayMs])

  return isReady
}

export default useLanguageChange
