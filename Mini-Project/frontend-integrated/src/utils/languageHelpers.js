/**
 * Language utilities and helpers for multilingual support
 */

// Language code mappings
export const LANGUAGE_CODES = {
  en: 'en',
  ta: 'ta',
  hi: 'hi',
  te: 'te',
  ml: 'ml',
  kn: 'kn',
  fr: 'fr',
  es: 'es',
}

// Language names and metadata
export const LANGUAGE_METADATA = {
  en: { name: 'English', nativeName: 'English', flag: '🇬🇧', region: 'Global' },
  ta: { name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'India' },
  te: { name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Telangana' },
  ml: { name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala' },
  kn: { name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'France' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Spain' },
}

/**
 * Get language display name
 * @param {string} code - Language code (e.g., 'en', 'ta')
 * @returns {string} Language name
 */
export const getLanguageName = (code) => {
  return LANGUAGE_METADATA[code]?.name || 'English'
}

/**
 * Get native language name
 * @param {string} code - Language code
 * @returns {string} Native language name
 */
export const getNativeLanguageName = (code) => {
  return LANGUAGE_METADATA[code]?.nativeName || 'English'
}

/**
 * Get language flag emoji
 * @param {string} code - Language code
 * @returns {string} Flag emoji
 */
export const getLanguageFlag = (code) => {
  return LANGUAGE_METADATA[code]?.flag || '🌍'
}

/**
 * Check if language is RTL (Right-To-Left)
 * @param {string} code - Language code
 * @returns {boolean} True if RTL
 */
export const isRTLLanguage = (code) => {
  // Currently no RTL languages in our list
  return false
}

/**
 * Get all available languages
 * @returns {Array} Array of language metadata
 */
export const getAllLanguages = () => {
  return Object.entries(LANGUAGE_CODES).map(([key, code]) => ({
    code,
    ...LANGUAGE_METADATA[code],
  }))
}

/**
 * Validate if language code is supported
 * @param {string} code - Language code to validate
 * @returns {boolean} True if language is supported
 */
export const isValidLanguageCode = (code) => {
  return Object.values(LANGUAGE_CODES).includes(code)
}

/**
 * Get supported languages string for Google Translate API
 * @returns {string} Comma-separated language codes
 */
export const getSupportedLanguagesString = () => {
  return Object.values(LANGUAGE_CODES).join(',')
}

/**
 * Format language label with flag and name
 * @param {string} code - Language code
 * @returns {string} Formatted label (e.g., "🇬🇧 English")
 */
export const formatLanguageLabel = (code) => {
  const flag = getLanguageFlag(code)
  const name = getLanguageName(code)
  return `${flag} ${name}`
}

/**
 * Parse language code from browser locale
 * @returns {string} Detected language code or 'en'
 */
export const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage
  const langCode = browserLang.split('-')[0]
  return isValidLanguageCode(langCode) ? langCode : 'en'
}

/**
 * Store language preference
 * @param {string} code - Language code
 */
export const saveLanguagePreference = (code) => {
  if (isValidLanguageCode(code)) {
    localStorage.setItem('selectedLanguage', code)
  }
}

/**
 * Get stored language preference
 * @returns {string} Stored language code or 'en'
 */
export const getLanguagePreference = () => {
  const saved = localStorage.getItem('selectedLanguage')
  return isValidLanguageCode(saved) ? saved : 'en'
}

/**
 * Clear language preference (reset to default)
 */
export const clearLanguagePreference = () => {
  localStorage.removeItem('selectedLanguage')
}

/**
 * Check if Google Translate is available
 * @returns {boolean} True if Google Translate API is loaded
 */
export const isGoogleTranslateAvailable = () => {
  return typeof window !== 'undefined' && window.google?.translate
}

/**
 * Check if translation element is ready
 * @returns {boolean} True if Google Translate select element exists
 */
export const isTranslationElementReady = () => {
  return document.querySelector('.goog-te-combo') !== null
}

/**
 * Manually trigger translation (for advanced usage)
 * @param {string} targetLanguage - Target language code
 * @returns {boolean} True if successful
 */
export const manuallyChangeLanguage = (targetLanguage) => {
  if (!isValidLanguageCode(targetLanguage)) {
    console.warn(`Invalid language code: ${targetLanguage}`)
    return false
  }

  const select = document.querySelector('.goog-te-combo')
  if (!select) {
    console.warn('Google Translate element not ready yet')
    return false
  }

  try {
    select.value = targetLanguage
    const event = new Event('change', { bubbles: true })
    select.dispatchEvent(event)
    saveLanguagePreference(targetLanguage)
    return true
  } catch (error) {
    console.error('Error changing language:', error)
    return false
  }
}

/**
 * Get language statistics for debugging
 * @returns {Object} Debug information
 */
export const getLanguageDebugInfo = () => {
  return {
    currentLanguage: getLanguagePreference(),
    googleTranslateAvailable: isGoogleTranslateAvailable(),
    translationElementReady: isTranslationElementReady(),
    browserLanguage: navigator.language,
    supportedLanguages: Object.values(LANGUAGE_CODES),
    totalLanguages: Object.keys(LANGUAGE_CODES).length,
  }
}

/**
 * Trigger a custom event when language changes
 * Useful for components to react to language changes without hooks
 * @param {string} languageCode - New language code
 */
export const triggerLanguageChangeEvent = (languageCode) => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('eco:languageChanged', {
      detail: { language: languageCode },
      bubbles: true,
      cancelable: true,
    })
    window.dispatchEvent(event)
  }
}

/**
 * Listen for language changes using event listener
 * For class components or non-React code
 * @param {Function} callback - Function to call when language changes
 * @returns {Function} Cleanup function to remove listener
 */
export const onLanguageChange = (callback) => {
  const handleLanguageChange = (event) => {
    callback(event.detail?.language || 'en')
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('eco:languageChanged', handleLanguageChange)
    
    // Return cleanup function
    return () => {
      window.removeEventListener('eco:languageChanged', handleLanguageChange)
    }
  }

  return () => {}
}

/**
 * Force re-render of component when language changes
 * Use in useEffect to detect language changes
 * @param {string} language - Current language code
 * @returns {string} Dependency value for useEffect
 */
export const getLanguageChangeKey = (language) => {
  return `lang-${language}-${Date.now()}`
}

/**
 * Wait for Google Translate to be ready
 * @param {number} maxAttempts - Maximum attempts to check
 * @param {number} delayMs - Delay between checks
 * @returns {Promise<boolean>} True if Google Translate is ready
 */
export const waitForGoogleTranslate = async (maxAttempts = 20, delayMs = 100) => {
  for (let i = 0; i < maxAttempts; i++) {
    if (isGoogleTranslateAvailable() && isTranslationElementReady()) {
      return true
    }
    await new Promise(resolve => setTimeout(resolve, delayMs))
  }
  return false
}

/**
 * Reinitialize Google Translate element
 * Useful if the element gets removed or corrupted
 */
export const reinitializeGoogleTranslate = async () => {
  if (typeof window === 'undefined') return false

  try {
    // Remove old element
    const oldContainer = document.getElementById('google_translate_element')
    if (oldContainer) {
      oldContainer.innerHTML = ''
    }

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500))

    // Reinitialize
    if (window.googleTranslateElementInit) {
      window.googleTranslateElementInit()
      return true
    }
  } catch (error) {
    console.error('Error reinitializing Google Translate:', error)
  }
  return false
}

/**
 * Detect if page content has been translated
 * @returns {boolean} True if page appears to be translated
 */
export const isPageTranslated = () => {
  // Check if any elements have the google-translated attribute
  return document.documentElement.className.includes('translated') ||
         !!document.querySelector('[data-translated="true"]') ||
         !!document.querySelector('html.translated-rtl') ||
         !!document.querySelector('html.translated-ltr')
}

