import { useState, useRef, useEffect, useMemo } from 'react'
import { SEARCH_INDEX } from '../../data'

/** Highlight the matched portion of text */
function Highlight({ text, query }) {
  if (!query) return <span>{text}</span>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <span>{text}</span>
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-yellow-100 text-yellow-800 rounded px-0.5 font-bold not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </span>
  )
}

export default function SearchBar({ go, onClose }) {
  const [query,  setQuery]  = useState('')
  const [active, setActive] = useState(false)
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActive(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') { setActive(false); setQuery('') } }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  // Search logic: exact match first, then starts-with, then includes
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q || q.length < 2) return []

    const exactMatch    = []
    const startsWithMatch = []
    const includesMatch = []

    for (const item of SEARCH_INDEX) {
      const name = item.variantName.toLowerCase()
      if (name === q) {
        exactMatch.push(item)
      } else if (name.startsWith(q)) {
        startsWithMatch.push(item)
      } else if (name.includes(q)) {
        includesMatch.push(item)
      }
    }

    return [...exactMatch, ...startsWithMatch, ...includesMatch].slice(0, 12)
  }, [query])

  const handleSelect = (item) => {
    setActive(false)
    setQuery('')
    // Navigate full flow: set category → brand → model → variant → details
    go('details', {
      category:       item.categoryId,
      company:        item.brandId,
      model:          item.modelId,
      variant:        item.variantName,
      variantBase:    item.variantBase,
      ramOptions:     item.ramOptions,
      storageOptions: item.storageOptions,
      modelId:        item.modelId,
    })
  }

  const showDropdown = active && query.trim().length >= 2

  return (
    <div ref={containerRef} className="relative w-full max-w-[480px]">
      {/* Input */}
      <div
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
          active ? 'bg-white shadow-lg border-2 border-eco-400' : 'bg-slate-100 border-2 border-transparent hover:bg-slate-200'
        }`}
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke={active ? '#059569' : '#94a3b8'} strokeWidth="2.5" className="flex-shrink-0">
          <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(true) }}
          onFocus={() => setActive(true)}
          placeholder="Search devices… e.g. iPhone 15, MacBook Air"
          className="bg-transparent outline-none text-sm font-inter text-slate-700 placeholder-slate-400 w-full min-w-0"
        />
        {query && (
          <button
            onClick={() => { setQuery(''); inputRef.current?.focus() }}
            className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer flex-shrink-0 leading-none text-lg"
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[200] overflow-hidden max-h-[420px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-400">
              <div className="text-3xl mb-2">🔍</div>
              <p className="font-inter text-sm font-semibold">No devices found</p>
              <p className="text-xs mt-1">Try "iPhone 15", "Galaxy S24", "MacBook Air"</p>
            </div>
          ) : (
            <>
              <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold font-inter text-slate-400 uppercase tracking-wider">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </span>
                <span className="text-[11px] font-inter text-slate-400">Click to get price →</span>
              </div>
              {results.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left px-4 py-3 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer border-b border-slate-50 last:border-b-0 flex items-center gap-3"
                >
                  <span className="text-xl flex-shrink-0">{item.categoryEmoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-inter font-semibold text-sm text-slate-800 truncate">
                      <Highlight text={item.variantName} query={query.trim()} />
                    </p>
                    <p className="text-[11px] text-slate-400 font-inter mt-0.5 truncate">
                      {item.brandName} · {item.categoryName} · {item.ramOptions.join('/')} RAM · {item.storageOptions[0]}+
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-poppins font-bold text-sm" style={{ color: item.categoryColor }}>
                      ₹{item.variantBase.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-inter">base value</p>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
