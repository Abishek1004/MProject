import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES, getCompany, getDevices, SEARCH_INDEX } from '../data'
import BackButton from '../components/ui/BackButton'
import { staggerContainer, fadeUp } from '../utils/motion'

// ── Mini search scoped to this brand ─────────────────────────────────────────
function BrandSearch({ categoryId, companyId, go }) {
  const [q, setQ] = useState('')
  const cat = CATEGORIES.find((c) => c.id === categoryId)
  const color = cat?.color || '#059569'

  const results = useMemo(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    const exact = [], starts = [], rest = []
    for (const item of SEARCH_INDEX) {
      if (item.categoryId !== categoryId || item.companyId !== companyId) continue
      const name = item.variantName.toLowerCase()
      if (name === t)             exact.push(item)
      else if (name.startsWith(t)) starts.push(item)
      else if (name.includes(t))   rest.push(item)
    }
    return [...exact, ...starts, ...rest].slice(0, 6)
  }, [q, categoryId, companyId])

  return (
    <div className="relative mb-7 max-w-lg">
      <div className="flex items-center bg-white dark:bg-slate-800 border-2 rounded-xl overflow-hidden transition-colors"
        style={{ borderColor: q ? color : '#e2e8f0' }}>
        <div className="pl-4 pr-2 flex-shrink-0">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke={q ? color : '#94a3b8'} strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search variants of this brand…"
          className="flex-1 py-2.5 pr-3 text-sm font-inter bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
        {q && (
          <button onClick={() => setQ('')}
            className="mr-2 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center border-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 text-xs flex-shrink-0">×</button>
        )}
      </div>

      {q && results.length > 0 && (
        <motion.div
          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30 overflow-hidden"
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {results.map((item, i) => (
            <button key={i}
              onClick={() => {
                go('details', {
                  category: item.categoryId, company: item.companyId,
                  variant: item.variantName, variantBase: item.variantBase,
                  ramOptions: item.ramOptions, storageOptions: item.storageOptions,
                  modelId: item.modelId,
                })
                setQ('')
              }}
              className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors border-none cursor-pointer bg-transparent border-b border-slate-50 dark:border-slate-700 last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className="font-inter font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{item.variantName}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-inter">Base ₹{item.variantBase.toLocaleString()} · {item.ramOptions[0]} RAM</p>
              </div>
              <span className="text-xs font-bold font-inter flex-shrink-0" style={{ color }}>→</span>
            </button>
          ))}
        </motion.div>
      )}
      {q && results.length === 0 && (
        <motion.div
          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30 px-4 py-4 text-center"
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          <p className="text-slate-400 dark:text-slate-500 text-sm font-inter">No variants found for <strong>"{q}"</strong></p>
        </motion.div>
      )}
    </div>
  )
}

// ── Variant card ──────────────────────────────────────────────────────────────
function VariantCard({ variant, catColor, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full text-left bg-white dark:bg-slate-800 rounded-2xl p-5 cursor-pointer border-none transition-colors duration-300"
      style={{ border: '2px solid #e2e8f0' }}
      variants={fadeUp}
      whileHover={{
        y: -3,
        borderColor: catColor,
        background: `${catColor}08`,
        boxShadow: `0 8px 22px ${catColor}20`,
        transition: { duration: 0.18 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-poppins font-semibold text-[0.95rem] text-slate-800 dark:text-white capitalize">{variant.name}</span>
        <span className="flex-shrink-0" style={{ color: catColor }}>→</span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {variant.ramOptions.map((r) => (
          <span key={r} className="text-[10px] sm:text-[11px] font-medium font-inter px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 tracking-tight">{r} RAM</span>
        ))}
        {variant.storageOptions.slice(0,3).map((s) => (
          <span key={s} className="text-[10px] sm:text-[11px] font-medium font-inter px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 tracking-tight">{s}</span>
        ))}
        {variant.storageOptions.length > 3 && (
          <span className="text-[10px] sm:text-[11px] font-medium font-inter px-2 py-0.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400">+{variant.storageOptions.length-3} more</span>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-400 dark:text-slate-500 text-xs font-inter">Base value</span>
        <span className="font-poppins font-bold text-sm" style={{ color: catColor }}>Up to ₹{variant.base.toLocaleString()}</span>
      </div>
    </motion.button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function VariantsPage({ nav, go, goBack, canGoBack }) {
  const cat     = CATEGORIES.find((c) => c.id === nav.category)
  const company = getCompany(nav.category, nav.company)
  const models  = getDevices(nav.category, nav.company)
  const model   = models.find((m) => m.id === nav.model)
  if (!model) return null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1200px] mx-auto px-5 pt-8 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-8"
        >
          <BackButton goBack={goBack} canGoBack={canGoBack} label={company?.name || 'Back'} />
        </motion.div>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <p className="text-slate-400 dark:text-slate-500 text-xs font-inter font-semibold uppercase tracking-widest mb-1.5">Select Variant</p>
          <h1 className="font-poppins font-extrabold text-slate-800 dark:text-white text-3xl md:text-4xl mb-2">{model.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-inter text-sm md:text-base">Compare prices for different RAM &amp; storage configurations.</p>
        </motion.div>

        <BrandSearch categoryId={nav.category} companyId={nav.company} go={go} />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {model.variants.map((variant, i) => (
            <VariantCard
              key={i}
              variant={variant}
              catColor={cat?.color}
              onClick={() => go('details', {
                variant:        variant.name,
                variantBase:    variant.base,
                ramOptions:     variant.ramOptions,
                storageOptions: variant.storageOptions,
                modelId:        model.id,
              })}
            />
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
