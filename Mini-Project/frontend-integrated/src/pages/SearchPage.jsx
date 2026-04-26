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
        ramOptions:     item.ramOptions || ['4GB', '8GB'],
        storageOptions: item.storageOptions || ['128GB', '256GB'],
        modelId:        item.modelId,
      })}
      className="w-full text-left bg-white rounded-2xl p-5 cursor-pointer border-none transition-colors duration-300"
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
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 mt-0.5"
          style={{ background: `${item.categoryColor}15` }}>
          {item.categoryEmoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <p className="font-poppins font-bold text-[1.05rem] text-slate-800 leading-snug">
              {item.variantName}
              {isExact && (
                <span className="ml-2 text-[9px] font-inter font-black uppercase tracking-widest px-2 py-0.5 rounded-full align-middle border border-emerald-500/30"
                  style={{ background: `${item.categoryColor}15`, color: item.categoryColor }}>
                  Exact
                </span>
              )}
            </p>
          </div>
          <p className="text-slate-500 text-xs font-inter font-bold uppercase tracking-wider mb-3">
             {item.companyName} · {item.categoryName}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {(item.ramOptions || ['4GB', '8GB']).map((r) => (
              <span key={r} className="text-[10px] font-bold font-inter px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500 capitalize">{r} RAM</span>
            ))}
            {(item.storageOptions || ['128GB', '256GB']).slice(0,3).map((s) => (
              <span key={s} className="text-[10px] font-bold font-inter px-2 py-0.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-500">{s}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 h-full justify-between self-stretch">
          <span className="font-poppins font-black text-base" style={{ color: item.categoryColor }}>
            ₹{item.variantBase.toLocaleString()}
          </span>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke={item.categoryColor} strokeWidth="3"
            className="flex-shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
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
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      {/* Hero search */}
      <motion.div
        className="bg-white border-b border-slate-100 px-5 py-10 md:py-16"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-poppins font-black text-slate-800 text-3xl md:text-5xl mb-3 text-center tracking-tight">Search All Devices</h1>
          <p className="text-slate-500 font-inter text-center mb-10 text-sm md:text-base">
            {SEARCH_INDEX.length.toLocaleString()} devices · Real-time results · Instant price quotes
          </p>

          <div className="flex items-center bg-white border-2 border-eco-400 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl shadow-eco-500/10 mb-6 transition-all focus-within:ring-4 focus-within:ring-eco-500/10">
            <div className="pl-5 pr-3 flex-shrink-0">
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#10b981" strokeWidth="3">
                <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setFilter('all') }}
              placeholder="Search iPhone, MacBook, Pixel..."
              className="flex-1 py-4 md:py-5 text-base md:text-lg font-inter bg-transparent outline-none text-slate-800 placeholder-slate-400"
            />
            {query && (
              <button onClick={() => { setQuery(''); inputRef.current?.focus() }}
                className="mr-3 w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-none cursor-pointer hover:bg-slate-200 transition-colors text-lg flex-shrink-0">×</button>
            )}
          </div>

          <AnimatePresence>
            {!query && (
              <motion.div
                className="flex flex-wrap gap-2 justify-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-slate-400 text-xs font-inter font-bold uppercase tracking-wider self-center mr-2">Try:</span>
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-xs md:text-sm font-inter font-bold text-eco-700 bg-eco-50 border border-eco-200 px-4 py-2 rounded-xl cursor-pointer hover:bg-eco-100 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    whileHover={{ y: -2, scale: 1.05 }}
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

      <div className="max-w-[1000px] mx-auto px-5 py-10 md:py-16">
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
                  className="flex flex-wrap items-center gap-3 mb-8"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={() => setFilter('all')}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-inter font-extrabold shadow-sm transition-all border-none cursor-pointer"
                    style={{ background: filter==='all'?'#059669':'#f1f5f9', color: filter==='all'?'#fff':'#475569' }}>
                    All
                    <span className="text-[11px] px-2 py-0.5 rounded-full ml-1"
                      style={{ background: filter==='all'?'rgba(255,255,255,0.2)':'#e2e8f0', color: filter==='all'?'#fff':'#64748b' }}>
                      {allResults.length}
                    </span>
                  </button>
                  {CATEGORIES.map((cat) => countByCategory[cat.id] ? (
                    <button key={cat.id} onClick={() => setFilter(filter===cat.id?'all':cat.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-inter font-extrabold shadow-sm transition-all border-none cursor-pointer"
                      style={{
                        background: filter===cat.id ? cat.color : '#fff',
                        color:      filter===cat.id ? '#fff'     : '#475569',
                        boxShadow:  filter===cat.id ? `0 8px 20px ${cat.color}35` : '0 2px 4px rgba(0,0,0,0.02)',
                        border: filter===cat.id ? 'none' : '1px solid #e2e8f0'
                      }}>
                      {cat.emoji} {cat.name}
                      <span className="text-[11px] px-2 py-0.5 rounded-full ml-1"
                        style={{ background: filter===cat.id?'rgba(255,255,255,0.2)':'#f1f5f9', color: filter===cat.id?'#fff':'#64748b' }}>
                        {countByCategory[cat.id]}
                      </span>
                    </button>
                  ) : null)}
                </motion.div>
              )}

              {/* Count row */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                <p className="text-slate-500 font-inter text-sm md:text-base">
                  {results.length === 0
                    ? 'No results found'
                    : <><span className="text-slate-800 font-bold">{results.length}</span> result{results.length!==1?'s':''} for <span className="text-slate-800 font-bold italic">"{query}"</span></>}
                </p>
                {allResults.some((r) => r.variantName.toLowerCase() === exactQuery) && (
                  <span className="text-[10px] md:text-xs font-inter font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    ✓ Exact match
                  </span>
                )}
              </div>

              {results.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
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
                  className="text-center py-24 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <p className="font-poppins font-black text-slate-800 text-2xl md:text-3xl mb-3 leading-tight tracking-tight">No devices found</p>
                  <p className="text-slate-500 font-inter max-w-xs mx-auto mb-10 text-sm md:text-base leading-relaxed">We couldn't find anything matching <span className="font-bold underline">"{query}"</span>. Try adjusting your search term.</p>
                  <motion.button
                    onClick={() => setQuery('')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-poppins font-black text-base px-10 py-5 rounded-2xl border-none cursor-pointer transition-all shadow-xl shadow-emerald-600/30"
                    whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  >
                    Clear Search
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-center py-10"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="text-7xl md:text-8xl mb-8">📲</div>
              <p className="font-poppins font-black text-slate-800 text-3xl md:text-4xl mb-3 tracking-tight leading-tight">Instant Price Discovery</p>
              <p className="text-slate-500 font-inter text-sm md:text-base mb-14 max-w-lg mx-auto leading-relaxed">
                Start typing to get an instant recycle value for your phone, laptop, or tablet.
              </p>
              
              <div className="relative mb-16">
                 <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200 z-0"></div>
                 <span className="relative z-10 bg-slate-50 px-6 text-xs font-inter font-black uppercase tracking-[0.3em] text-slate-400">Browse Categories</span>
              </div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat.id}
                    onClick={() => go('category', { category: cat.id })}
                    className="flex flex-col items-center gap-4 p-8 bg-white rounded-[2.5rem] border border-slate-100 cursor-pointer shadow-sm transition-all group"
                    variants={fadeUp}
                    whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12)', borderColor: cat.color }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</div>
                    <div>
                      <p className="font-poppins font-black text-slate-800 text-lg mb-1">{cat.name}</p>
                      <p className="text-slate-400 text-xs font-bold font-inter tracking-wider uppercase">{cat.count}</p>
                    </div>
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
