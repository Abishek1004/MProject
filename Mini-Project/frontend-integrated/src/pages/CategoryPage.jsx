import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES, getCompanies, DEVICES, SEARCH_INDEX } from '../data'
import BackButton from '../components/ui/BackButton'
import ImgF from '../components/ui/ImgF'
import Footer from '../components/layout/Footer'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'

// ── Inline mini-search (category-scoped) ─────────────────────────────────────
function CategorySearch({ categoryId, go }) {
  const [q, setQ] = useState('')
  const catColor = (CATEGORIES.find((c) => c.id === categoryId) || {}).color || '#059569'

  const results = useMemo(() => {
    const trimmed = q.trim().toLowerCase()
    if (!trimmed) return []
    const exact = [], starts = [], contains = []
    for (const item of SEARCH_INDEX) {
      if (item.categoryId !== categoryId) continue
      const name = item.variantName.toLowerCase()
      if (name === trimmed)         exact.push(item)
      else if (name.startsWith(trimmed)) starts.push(item)
      else if (name.includes(trimmed) || item.companyName.toLowerCase().includes(trimmed)) contains.push(item)
    }
    return [...exact, ...starts, ...contains].slice(0, 8)
  }, [q, categoryId])

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center bg-white dark:bg-slate-800 border-2 rounded-xl overflow-hidden transition-colors"
        style={{ borderColor: q ? catColor : '#e2e8f0' }}>
        <div className="pl-4 pr-2 flex-shrink-0">
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke={q ? catColor : '#94a3b8'} strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search devices in this category…"
          className="flex-1 py-3 pr-3 text-sm font-inter bg-transparent outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400"
        />
        {q && (
          <button onClick={() => setQ('')}
            className="mr-2 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-300 flex items-center justify-center border-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 text-xs flex-shrink-0">×</button>
        )}
      </div>

      {/* Dropdown results */}
      {q && results.length > 0 && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30 overflow-hidden">
          {results.map((item, i) => (
            <button
              key={i}
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
              <span className="text-lg flex-shrink-0">{item.categoryEmoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-inter font-semibold text-sm text-slate-800 dark:text-slate-100 truncate">{item.variantName}</p>
                <p className="text-slate-400 dark:text-slate-500 text-xs font-inter">{item.companyName} · ₹{item.variantBase.toLocaleString()}</p>
              </div>
              <span className="text-xs font-bold font-inter flex-shrink-0" style={{ color: catColor }}>→</span>
            </button>
          ))}
          <button onClick={() => { go('search'); setQ('') }}
            className="w-full text-center px-4 py-2.5 text-xs font-inter font-semibold text-eco-600 hover:bg-eco-50 dark:hover:bg-eco-900/20 transition-colors border-none cursor-pointer bg-transparent border-t border-slate-100 dark:border-slate-700">
            See all results in Search →
          </button>
        </div>
      )}
      {q && results.length === 0 && (
        <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-30 px-4 py-4 text-center">
          <p className="text-slate-400 dark:text-slate-400 text-sm font-inter">No results for <strong>"{q}"</strong></p>
        </div>
      )}
    </div>
  )
}

// ── Brand card ────────────────────────────────────────────────────────────────
function CompanyCard({ company, catColor, catLight, onClick, go }) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full bg-white dark:bg-slate-800 rounded-2xl p-5 flex flex-col items-center gap-3 cursor-pointer border-none text-center transition-colors duration-300"
      style={{ border: `2px solid #e2e8f0` }}
      variants={fadeUp}
      whileHover={{
        y: -6,
        scale: 1.03,
        borderColor: catColor,
        boxShadow: `0 12px 30px ${catColor}22`,
        background: catLight,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97, y: -2 }}
    >
      <div className="z-10 cursor-pointer p-1" onClick={(e) => { e.stopPropagation(); go('cart') }}>
        <ImgF src={company.logo} alt={company.name}
          style={{ width:48, height:48, objectFit:'contain' }}
          fallback={<span style={{ fontSize:'2.2rem' }}>{company.emoji}</span>} />
      </div>
      <div>
        <p className="font-poppins font-bold text-base text-slate-800 dark:text-slate-100">
          {company.name}
        </p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5 font-inter">{company.tagline}</p>
      </div>
      <span className="text-xs font-bold font-inter px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
        View Models →
      </span>
    </motion.button>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function CategoryPage({ nav, go, goBack, canGoBack }) {
  const cat      = CATEGORIES.find((c) => c.id === nav.category)
  const companies = getCompanies(nav.category)

  if (!cat) return null

  const totalVariants = Object.entries(DEVICES)
    .filter(([k]) => k.startsWith(nav.category + '_'))
    .reduce((a, [, ms]) => a + ms.reduce((s, m) => s + m.variants.length, 0), 0)
  const totalModels = Object.entries(DEVICES)
    .filter(([k]) => k.startsWith(nav.category + '_'))
    .reduce((a, [, ms]) => a + ms.length, 0)

  return (
    <div>
      {/* Hero */}
      <div className="relative overflow-hidden px-5 py-14"
        style={{ background: `linear-gradient(135deg,${cat.color}ee,${cat.color}88)` }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background:'#fff', opacity:0.05, filter:'blur(50px)' }} />
        <div className="max-w-[1200px] mx-auto relative">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ background:'rgba(255,255,255,0.2)', border:'2px solid rgba(255,255,255,0.3)' }}>
              <img src={cat.img} alt={cat.name} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <span className="inline-block mb-2 text-xs font-bold font-inter tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ background:'rgba(255,255,255,0.2)', color:'#fff', border:'1px solid rgba(255,255,255,0.3)' }}>
                {cat.badge}
              </span>
              <h1 className="font-poppins font-extrabold text-white mb-1" style={{ fontSize:'clamp(1.8rem,4vw,2.8rem)' }}>
                Recycle Your {cat.name}
              </h1>
              <p className="text-white/70 font-inter text-sm">{cat.sub} — instant price estimate</p>
            </div>
          </div>
          {/* Search bar inside hero */}
          <CategorySearch categoryId={nav.category} go={go} />
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-6 max-w-sm">
            {[[companies.length,'Brands'],[totalModels,'Series'],[totalVariants,'Variants']].map(([v,l]) => (
              <div key={l} className="rounded-2xl px-3 py-2.5 text-center"
                style={{ background:'rgba(255,255,255,0.15)', border:'1px solid rgba(255,255,255,0.2)' }}>
                <div className="font-poppins font-extrabold text-white text-xl">{v}</div>
                <div className="text-white/65 text-[11px] font-inter">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-5 pt-7 pb-20 transition-colors duration-300" style={{ backgroundColor: '#eff5e6' }}>
        <div className="flex items-center justify-between mb-6">
          <BackButton goBack={goBack} canGoBack={canGoBack} label="Home" />
        </div>

        <div className="mb-7">
          <h2 className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-2xl">Choose Your Brand</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-inter mt-1">{companies.length} brands · click to see models</p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              catColor={cat.color}
              catLight={cat.light}
              onClick={() => go('models', { company: company.id })}
              go={go}
            />
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  )
}
