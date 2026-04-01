import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SEARCH_INDEX, CATEGORIES } from '../data'
import Footer from '../components/layout/Footer'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'

// ── Search logic ─────────────────────────────────────────────────────────────
function runSearch(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const exact = [], starts = [], contains = []
  for (const item of SEARCH_INDEX) {
    const name = item.variantName.toLowerCase()
    if (name === q)         exact.push(item)
    else if (name.startsWith(q)) starts.push(item)
    else if (
      name.includes(q) ||
      item.companyName.toLowerCase().includes(q) ||
      item.modelName.toLowerCase().includes(q) ||
      item.categoryName.toLowerCase().includes(q)
    ) contains.push(item)
  }
  return [...exact, ...starts, ...contains]
}

// ── Result Card ───────────────────────────────────────────────────────────────
function ResultCard({ item, go, isExact }) {
  return (
    <motion.button
      onClick={() => go('details', {
        category:       item.categoryId,
        company:        item.companyId,
        variant:        item.variantName,
        variantBase:    item.variantBase,
        ramOptions:     item.ramOptions,
        storageOptions: item.storageOptions,
        modelId:        item.modelId,
      })}
      className="w-full text-left bg-white rounded-2xl p-4 cursor-pointer border-none"
      style={{ border: '2px solid #e2e8f0' }}
      variants={fadeUp}
      whileHover={{
        y: -3,
        borderColor: item.categoryColor,
        boxShadow: `0 8px 24px ${item.categoryColor}20`,
        background: `${item.categoryColor}06`,
        transition: { duration: 0.18 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5"
          style={{ background: `${item.categoryColor}15` }}>
          {item.categoryEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className="font-poppins font-bold text-[0.95rem] text-slate-800">
              {item.variantName}
              {isExact && (
                <span className="ml-2 text-[10px] font-inter font-bold px-1.5 py-0.5 rounded-full align-middle"
                  style={{ background: `${item.categoryColor}15`, color: item.categoryColor }}>
                  Exact
                </span>
              )}
            </p>
            <span className="font-poppins font-bold text-sm flex-shrink-0" style={{ color: item.categoryColor }}>
              ₹{item.variantBase.toLocaleString()}
            </span>
          </div>
          <p className="text-slate-500 text-xs font-inter mb-2">
            {item.companyEmoji} {item.companyName} · {item.categoryName}
          </p>
          <div className="flex flex-wrap gap-1">
            {item.ramOptions.map((r) => (
              <span key={r} className="text-[11px] font-medium font-inter px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500">{r} RAM</span>
            ))}
            {item.storageOptions.slice(0,3).map((s) => (
              <span key={s} className="text-[11px] font-medium font-inter px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500">{s}</span>
            ))}
            {item.storageOptions.length > 3 && (
              <span className="text-[11px] font-medium font-inter px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-400">+{item.storageOptions.length-3} more</span>
            )}
          </div>
        </div>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
          stroke={item.categoryColor} strokeWidth="2"
          className="flex-shrink-0 mt-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </motion.button>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function SearchPage({ go, nav = {} }) {
  const [query,  setQuery]  = useState(nav.searchQuery || '')
  const [filter, setFilter] = useState('all')
  const inputRef = useRef(null)

  useEffect(() => {
    if (nav.searchQuery !== undefined) setQuery(nav.searchQuery)
  }, [nav.searchQuery])

  useEffect(() => { inputRef.current?.focus() }, [])

  const allResults = useMemo(() => runSearch(query), [query])
  const results    = useMemo(() =>
    filter === 'all' ? allResults : allResults.filter((r) => r.categoryId === filter),
    [allResults, filter])

  const exactQuery = query.trim().toLowerCase()

  const countByCategory = useMemo(() => {
    const m = {}
    for (const r of allResults) m[r.categoryId] = (m[r.categoryId] || 0) + 1
    return m
  }, [allResults])

  const suggestions = ['iPhone 15', 'MacBook Air', 'Galaxy S24', 'iPad Pro', 'OnePlus 12', 'ThinkPad X1']

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero search */}
      <motion.div
        className="bg-white border-b border-slate-100 px-5 py-10"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-poppins font-extrabold text-slate-800 text-3xl mb-2 text-center">Search All Devices</h1>
          <p className="text-slate-500 font-inter text-center mb-7">
            {SEARCH_INDEX.length.toLocaleString()} devices · Real-time results · Exact match first
          </p>

          <div className="flex items-center bg-white border-2 border-eco-400 rounded-2xl overflow-hidden shadow-lg shadow-eco-500/10 mb-5">
            <div className="pl-5 pr-3 flex-shrink-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#059569" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setFilter('all') }}
              placeholder="Type a device name — iPhone 15, MacBook Air M3, Galaxy S24…"
              className="flex-1 py-4 text-base font-inter bg-transparent outline-none text-slate-800 placeholder-slate-400"
            />
            {query && (
              <button onClick={() => { setQuery(''); inputRef.current?.focus() }}
                className="mr-3 w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-none cursor-pointer hover:bg-slate-200 transition-colors text-base flex-shrink-0">×</button>
            )}
          </div>

          <AnimatePresence>
            {!query && (
              <motion.div
                className="flex flex-wrap gap-2 justify-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-slate-400 text-xs font-inter self-center">Try:</span>
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs font-inter font-semibold text-eco-700 bg-eco-50 border border-eco-200 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-eco-100 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="max-w-[900px] mx-auto px-5 py-8">
        <AnimatePresence mode="wait">
          {query ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Category filter chips */}
              {allResults.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mb-5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={() => setFilter('all')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-inter font-semibold transition-all border-none cursor-pointer"
                    style={{ background: filter==='all'?'#1e293b':'#f1f5f9', color: filter==='all'?'#fff':'#475569' }}>
                    All
                    <span className="text-[11px] px-1.5 py-0.5 rounded-full ml-0.5"
                      style={{ background: filter==='all'?'rgba(255,255,255,0.2)':'#e2e8f0', color: filter==='all'?'#fff':'#64748b' }}>
                      {allResults.length}
                    </span>
                  </button>
                  {CATEGORIES.map((cat) => countByCategory[cat.id] ? (
                    <button key={cat.id} onClick={() => setFilter(filter===cat.id?'all':cat.id)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-inter font-semibold transition-all border-none cursor-pointer"
                      style={{
                        background: filter===cat.id ? cat.color : '#f1f5f9',
                        color:      filter===cat.id ? '#fff'     : '#475569',
                        boxShadow:  filter===cat.id ? `0 4px 12px ${cat.color}35` : 'none',
                      }}>
                      {cat.emoji} {cat.name}
                      <span className="text-[11px] px-1.5 py-0.5 rounded-full ml-0.5"
                        style={{ background: filter===cat.id?'rgba(255,255,255,0.2)':'#e2e8f0', color: filter===cat.id?'#fff':'#64748b' }}>
                        {countByCategory[cat.id]}
                      </span>
                    </button>
                  ) : null)}
                </motion.div>
              )}

              {/* Count row */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-600 font-inter text-sm">
                  {results.length === 0
                    ? 'No results found'
                    : <><strong className="text-slate-800">{results.length}</strong> result{results.length!==1?'s':''} for <strong className="text-slate-800">"{query}"</strong></>}
                </p>
                {allResults.some((r) => r.variantName.toLowerCase() === exactQuery) && (
                  <span className="text-xs font-inter font-semibold text-eco-700 bg-eco-50 border border-eco-200 px-2.5 py-1 rounded-full">
                    ✓ Exact match found
                  </span>
                )}
              </div>

              {results.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {results.map((item, i) => (
                    <ResultCard
                      key={`${item.variantName}-${i}`}
                      item={item}
                      go={go}
                      isExact={item.variantName.toLowerCase() === exactQuery}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-7xl mb-4">🔍</div>
                  <p className="font-poppins font-bold text-slate-700 text-xl mb-2">No devices found</p>
                  <p className="text-slate-400 font-inter mb-6">No results for <strong>"{query}"</strong>. Try a different name.</p>
                  <motion.button
                    onClick={() => setQuery('')}
                    className="bg-eco-600 hover:bg-eco-700 text-white font-poppins font-bold px-6 py-3 rounded-xl border-none cursor-pointer transition-colors"
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  >
                    Clear Search
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center py-14"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-6xl mb-4">📲</div>
              <p className="font-poppins font-bold text-slate-700 text-xl mb-2">Start typing to search</p>
              <p className="text-slate-400 font-inter text-sm mb-8">
                Search across {SEARCH_INDEX.length} devices — phones, laptops &amp; tablets
              </p>
              <p className="text-slate-500 font-inter text-sm font-semibold mb-4">Or browse by category</p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => go('category', { category: cat.id })}
                    className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-slate-200 cursor-pointer border-none"
                    style={{ minWidth: 130 }}
                    variants={fadeUp}
                    whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.10)', borderColor: cat.color, transition: { duration: 0.18 } }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="text-4xl">{cat.emoji}</div>
                    <p className="font-poppins font-bold text-slate-700 text-sm">{cat.name}</p>
                    <p className="text-slate-400 text-xs font-inter">{cat.count}</p>
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  )
}
