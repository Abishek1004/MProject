import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import BackButton from '../components/ui/BackButton'
import Footer from '../components/layout/Footer'
import { CATEGORIES, getCompany } from '../data'

function FieldLabel({ label, error }) {
  return (
    <div className="flex justify-between items-center mb-2">
      <label className="font-poppins font-semibold text-slate-800 dark:text-slate-100 text-[0.95rem]">{label}</label>
      {error && <span className="text-red-500 text-xs font-inter">{error}</span>}
    </div>
  )
}

export default function SystemConfigPage({ nav, go, goBack, canGoBack }) {
  const cat     = CATEGORIES.find(c => c.id === nav.category)
  const company = getCompany(nav.category, nav.company)

  const ramOptions     = nav.ramOptions     || ['4GB','6GB','8GB','12GB','16GB']
  const storageOptions = nav.storageOptions || ['64GB','128GB','256GB','512GB']

  const [form, setForm]           = useState({ processor: '', ram: '', storage: '' })
  const [errs, setErrs]           = useState({})
  const [specQuery, setSpecQuery] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const validate = () => {
    const e = {}
    if (nav.category === 'laptop' && !form.processor) e.processor = 'Select processor'
    if (!form.ram)     e.ram     = 'Select RAM'
    if (!form.storage) e.storage = 'Select storage'
    // For non-laptops, if ram or storage is missing, prompt to select a variant.
    if (nav.category !== 'laptop' && (!form.ram || !form.storage)) {
        e.ram = 'Select a variant'
    }
    setErrs(e); return !Object.keys(e).length
  }

  const handleSubmit = () => {
    if (!validate()) return
    go('estimate', {
      deviceDetails: {
        ...nav.conditionData,
        processor: form.processor,
        ram: form.ram,
        storage: form.storage,
      }
    })
  }

  const cc = '#037252'

  const specOptions = useMemo(() => {
    const combos = []
    for (const r of ramOptions) {
      for (const s of storageOptions) combos.push({ ram: r, storage: s, label: `${r} / ${s}` })
    }
    const q = specQuery.trim().toLowerCase()
    if (!q) return combos
    return combos.filter((c) => c.label.toLowerCase().includes(q))
  }, [ramOptions, storageOptions, specQuery])

  const processorOptions = useMemo(() => ([
    'Intel i3', 'Intel i5', 'Intel i7', 'Intel i9',
    'Ryzen 3', 'Ryzen 5', 'Ryzen 7', 'Ryzen 9',
    'Apple M1', 'Apple M2', 'Apple M3',
    'Other',
  ]), [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 pt-8 pb-20">
      <BackButton goBack={goBack} canGoBack={canGoBack} label="Condition Assessment" />

      <div className="flex flex-col lg:flex-row gap-10 mt-8 items-start">
        {/* ── Left Column: Config Interaction ── */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[2px] rounded-full" style={{ background: cc }}></span>
              <p className="text-slate-400 dark:text-slate-500 text-xs font-inter font-bold uppercase tracking-[0.2em]">
                {company?.name} · {cat?.name}
              </p>
            </div>
            <h1 className="font-poppins font-black text-slate-800 dark:text-slate-100 text-4xl lg:text-5xl mb-3 leading-tight tracking-tight">
              {nav.variant}
            </h1>
            <div className="h-1.5 w-20 rounded-full mb-8" style={{ background: `linear-gradient(90deg, ${cc}, ${cc}40)` }}></div>
            
            <h2 className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-2xl mb-1 mt-10">Configure Specifications</h2>
            <p className="text-slate-500 dark:text-slate-400 font-inter text-sm max-w-lg">Tell us your device's exact specifications to find your precise price estimate.</p>
          </motion.div>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <p className="text-slate-400 text-[11px] font-inter font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px]" style={{ color: cc }}>2</span>
              System Configuration
            </p>
            
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm transition-all duration-300">
              {nav.category === 'laptop' ? (
                <div className="space-y-6">
                  <div>
                    <FieldLabel label="Processor Type" error={errs.processor} />
                    <select
                      value={form.processor}
                      onChange={(e) => set('processor', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 outline-none text-sm font-inter bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-all focus:border-green-600/50"
                      style={{ borderColor: errs.processor ? '#fca5a5' : '#eef2f6' }}
                    >
                      <option value="">Choose Processor</option>
                      {processorOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <FieldLabel label="RAM Capacity" error={errs.ram} />
                    <select
                      value={form.ram}
                      onChange={(e) => set('ram', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 outline-none text-sm font-inter bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-all focus:border-green-600/50"
                      style={{ borderColor: errs.ram ? '#fca5a5' : '#eef2f6' }}
                    >
                      <option value="">Choose RAM Size</option>
                      {ramOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div>
                    <FieldLabel label="Storage Capacity" error={errs.storage} />
                    <select
                      value={form.storage}
                      onChange={(e) => set('storage', e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl border-2 outline-none text-sm font-inter bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-all focus:border-green-600/50"
                      style={{ borderColor: errs.storage ? '#fca5a5' : '#eef2f6' }}
                    >
                      <option value="">Choose Storage Size</option>
                      {storageOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <>
                  <FieldLabel label="Select Your Variant" error={errs.ram || errs.storage} />
                  <div className="relative mb-6">
                    <div
                      className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border-2 rounded-2xl px-4 py-3.5 transition-all"
                      style={{ borderColor: specQuery ? cc : '#eef2f6' }}
                    >
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke={specQuery ? cc : '#94a3b8'} strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
                      </svg>
                      <input
                        value={specQuery}
                        onChange={(e) => setSpecQuery(e.target.value)}
                        placeholder="Search GB capacity (e.g. 128GB)…"
                        className="flex-1 bg-transparent outline-none text-sm font-inter text-slate-800 dark:text-slate-100 placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {specOptions.map((opt) => {
                      const selected = form.ram === opt.ram && form.storage === opt.storage
                      return (
                        <button
                          key={opt.label}
                          onClick={() => { set('ram', opt.ram); set('storage', opt.storage) }}
                          className="w-full text-left rounded-2xl border bg-white dark:bg-slate-800 px-5 py-4 flex items-center gap-4 transition-all hover:border-green-600/30"
                          style={{
                            borderColor: selected ? cc : '#eef2f6',
                            boxShadow: selected ? `0 12px 24px ${cc}15` : 'none',
                          }}
                        >
                          <span
                            className="w-4 h-4 rounded-full flex-shrink-0 border-2"
                            style={{ 
                              borderColor: selected ? cc : '#cbd5e1', 
                              backgroundColor: selected ? cc : 'transparent',
                              boxShadow: selected ? `0 0 0 4px ${cc}15` : 'none' 
                            }}
                          />
                          <span className={`font-inter font-bold text-sm ${selected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                            {opt.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* ── Submit Button ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <motion.button
              onClick={handleSubmit}
              className="w-full text-white font-poppins font-black text-lg py-5 rounded-3xl border-none cursor-pointer shadow-2xl transition-all"
              style={{
                background: (form.ram && form.storage && (nav.category !== 'laptop' || form.processor)) ? `linear-gradient(135deg, ${cc}, #025c42)` : '#cbd5e1',
                boxShadow: (form.ram && form.storage && (nav.category !== 'laptop' || form.processor)) ? `0 12px 30px ${cc}40` : 'none',
              }}
              whileHover={{ scale: 1.015, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Price Valuation →
            </motion.button>
          </motion.div>
        </div>

        {/* ── Right Column: Persistent Device Summary ── */}
        <div className="w-full lg:w-[360px] order-1 lg:order-2">
          <div className="sticky top-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <motion.div
                className="rounded-[2.5rem] p-8 overflow-hidden relative"
                style={{ 
                  background: cat?.light || '#ecfdf5', 
                  border: `2px solid ${cc}15`,
                  boxShadow: `0 30px 60px -15px ${cc}15`
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: cc }}></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-3xl opacity-10" style={{ background: cc }}></div>

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg bg-white"
                    style={{ color: cc }}>{cat?.emoji}</div>
                  
                  <p className="text-slate-500 text-[10px] font-bold font-inter tracking-[0.2em] uppercase mb-1 opacity-70">Summary Details</p>
                  <h3 className="font-poppins font-black text-slate-800 text-2xl mb-4 leading-tight">{nav.variant}</h3>
                  
                  <div className="space-y-4 pt-4 border-t border-slate-900/5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-inter text-slate-500 font-medium">Brand</span>
                      <span className="text-sm font-inter text-slate-800 font-bold">{company?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-inter text-slate-500 font-medium">Category</span>
                      <span className="text-sm font-inter text-slate-800 font-bold uppercase tracking-wider text-[11px]">{cat?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-inter text-slate-500 font-medium">Condition</span>
                      <span className="text-[11px] font-inter text-green-600 font-bold uppercase tracking-wider">Verified ✓</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-4 rounded-2xl mt-4">
                      <span className="text-sm font-inter text-slate-500 font-medium">Starting Value</span>
                      <span className="text-xl font-poppins text-slate-800 font-black" style={{ color: cc }}>
                        ₹{(nav.variantBase || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
