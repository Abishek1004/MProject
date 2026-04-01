import { useEffect, useRef, useState } from 'react'

const LANGUAGES = [
  { code: 'en', label: '🇬🇧 English' },
  { code: 'ta', label: '🇮🇳 Tamil' },
  { code: 'hi', label: '🇮🇳 Hindi' },
  { code: 'te', label: '🇮🇳 Telugu' },
  { code: 'ml', label: '🇮🇳 Malayalam' },
  { code: 'kn', label: '🇮🇳 Kannada' },
  { code: 'fr', label: '🇫🇷 French' },
  { code: 'es', label: '🇪🇸 Spanish' },
]

function setGoogleTranslateLang(langCode) {
  // Google Translate stores selected language via cookie
  const domain = window.location.hostname
  // Remove old translation cookie
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`

  if (langCode !== 'en') {
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain}`
    document.cookie = `googtrans=/en/${langCode}; path=/;`
  }

  // Trigger Google Translate widget to re-translate
  const select = document.querySelector('.goog-te-combo')
  if (select) {
    select.value = langCode
    select.dispatchEvent(new Event('change'))
  } else {
    // Widget not ready, reload to apply cookie
    window.location.reload()
  }
}

export default function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(() => {
    return localStorage.getItem('eco_lang') || 'en'
  })
  const dropRef = useRef(null)

  // Restore language on mount
  useEffect(() => {
    const saved = localStorage.getItem('eco_lang')
    if (saved && saved !== 'en') {
      // Give Google Translate widget time to load
      const timer = setTimeout(() => {
        setGoogleTranslateLang(saved)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (code) => {
    setSelected(code)
    localStorage.setItem('eco_lang', code)
    setGoogleTranslateLang(code)
    setOpen(false)
  }

  const current = LANGUAGES.find(l => l.code === selected) || LANGUAGES[0]

  return (
    <div ref={dropRef} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Select language"
        title="Change language"
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer transition-all duration-200 hover:border-eco-400 hover:bg-eco-50 dark:hover:bg-slate-700"
      >
        {/* Globe icon */}
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#059569" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </svg>
        <span className="text-xs font-semibold font-inter text-slate-600 dark:text-slate-300 hidden sm:block">
          {current.label.split(' ')[1]}
        </span>
        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth="2.5"
          style={{ transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="dropdown-enter absolute right-0 top-[calc(100%+8px)] w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 z-50 overflow-hidden py-1"
          style={{ animation: 'dropIn 0.18s cubic-bezier(.22,.68,0,1.2) forwards' }}
        >
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-sm font-inter border-none cursor-pointer transition-colors duration-100
                ${selected === lang.code
                  ? 'bg-eco-50 dark:bg-eco-900/30 text-eco-700 dark:text-eco-400 font-semibold'
                  : 'bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
