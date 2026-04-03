import { useEffect, useRef, useState } from 'react'

// Language configuration with proper code mappings
const LANGUAGES = [
  { code: 'en', label: '🇬🇧 English', displayName: 'English' },
  { code: 'ta', label: '🇮🇳 தமிழ்', displayName: 'தமிழ்' },
  { code: 'hi', label: '🇮🇳 हिन्दी', displayName: 'हिन्दी' },
  { code: 'te', label: '🇮🇳 తెలుగు', displayName: 'తెలుగు' },
  { code: 'ml', label: '🇮🇳 മലയാളം', displayName: 'മലയാളം' },
  { code: 'kn', label: '🇮🇳 ಕನ್ನಡ', displayName: 'ಕನ್ನಡ' },
  { code: 'fr', label: '🇫🇷 Français', displayName: 'Français' },
  { code: 'es', label: '🇪🇸 Español', displayName: 'Español' },
]

// Initialize Google Translate programmatically
function initGoogleTranslate() {
  if (window.google?.translate?.TranslateElement) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        includedLanguages: 'en,ta,hi,te,ml,kn,fr,es',
        autoDisplay: false,
      },
      'google_translate_element'
    )
  }
}

// Trigger translation programmatically
function changeLanguage(langCode, retries = 5) {
  const select = document.querySelector('.goog-te-combo')
  if (select) {
    select.value = langCode
    select.dispatchEvent(new Event('change', { bubbles: true }))
    localStorage.setItem('selectedLanguage', langCode)
    document.documentElement.setAttribute('lang', langCode)
    return true
  }
  
  if (retries > 0) {
    setTimeout(() => changeLanguage(langCode, retries - 1), 700)
  }
  return false
}

// Restore saved language on page load
function restoreLanguage() {
  const savedLang = localStorage.getItem('selectedLanguage')
  if (savedLang && savedLang !== 'en') {
    changeLanguage(savedLang, 12)
  }
}

export default function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en'
  })
  const [isLoading, setIsLoading] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    window.googleTranslateElementInit = initGoogleTranslate

    const scriptId = 'google-translate-script'
    const existingScript = document.getElementById(scriptId)
    
    if (!existingScript) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.head.appendChild(script)
    } else if (window.google?.translate?.TranslateElement) {
      initGoogleTranslate()
    }

    restoreLanguage()
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = async (code) => {
    setIsLoading(true)
    setSelected(code)
    localStorage.setItem('selectedLanguage', code)
    
    setTimeout(() => {
      changeLanguage(code)
      setIsLoading(false)
      setOpen(false)
    }, 100)
  }

  const current = LANGUAGES.find(l => l.code === selected) || LANGUAGES[0]

  return (
    <>
      <div id="google_translate_element"></div>

      <div ref={dropRef} className="relative flex-shrink-0 notranslate">
        <button
          onClick={() => setOpen(v => !v)}
          disabled={isLoading}
          aria-label="Select language"
          className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer transition-all duration-200 hover:border-eco-400 hover:bg-eco-50 dark:hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#059569"
            strokeWidth="2"
            className={isLoading ? 'animate-spin' : ''}
          >
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>

          <span className="text-xs font-semibold font-inter text-slate-600 dark:text-slate-300 hidden sm:block">
            {current.displayName}
          </span>

          <svg
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#94a3b8"
            strokeWidth="2.5"
            style={{
              transition: 'transform 0.2s ease',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div
            className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden py-1"
            style={{ animation: 'fadeInDown 0.2s cubic-bezier(0.22, 0.68, 0, 1.2) forwards' }}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-3 text-sm font-inter border-none cursor-pointer transition-all duration-100 disabled:opacity-60 disabled:cursor-not-allowed notranslate
                  ${
                    selected === lang.code
                      ? 'bg-eco-50 dark:bg-eco-900/30 text-eco-700 dark:text-eco-400 font-semibold'
                      : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
              >
                <span className="flex items-center justify-between">
                  <span>{lang.label}</span>
                  {selected === lang.code && (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        /* 1. HIDE ALL GOOGLE TRANSLATE BRANDING & UI */
        .goog-te-banner-frame, 
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame,
        .goog-te-gadget-icon,
        .goog-logo-link,
        .goog-te-gadget span,
        .goog-te-menu-value img,
        .goog-te-menu-value span:nth-child(3),
        .goog-te-gadget-simple img,
        .goog-te-floating-widget,
        #goog-gt-tt, 
        .goog-tooltip, 
        .goog-tooltip:hover {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Hide the bar at the top */
        body { top: 0 !important; }
        
        /* Hide the 'Original Text' tooltip that appears on hover */
        .goog-text-highlight {
          background-color: transparent !important;
          box-shadow: none !important;
        }

        /* Hide the standard google translate bar entirely */
        .skiptranslate {
          display: none !important;
        }

        #google_translate_element {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}
