import { useState } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES, getCompany, getDevices } from '../data'
import BackButton from '../components/ui/BackButton'
import ImgF from '../components/ui/ImgF'
import { staggerContainer, fadeUp } from '../utils/motion'

function ModelCard({ model, catColor, onClick }) {
  const min = Math.min(...model.variants.map((v) => v.base))
  const max = Math.max(...model.variants.map((v) => v.base))
  return (
    <motion.button
      onClick={onClick}
      className="w-full bg-white dark:bg-slate-800 rounded-2xl p-5 text-left cursor-pointer border-none transition-colors duration-300"
      style={{ border: '2px solid #e2e8f0' }}
      variants={fadeUp}
      whileHover={{
        y: -4,
        borderColor: catColor,
        boxShadow: `0 10px 28px ${catColor}22`,
        background: `${catColor}05`,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-poppins font-bold text-[1.05rem] text-slate-800 dark:text-white pr-2">
          {model.name}
        </h3>
        <motion.span
          className="text-xl font-bold flex-shrink-0"
          style={{ color: catColor }}
          whileHover={{ x: 4 }}
        >→</motion.span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-400 dark:text-slate-500 text-xs font-inter bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1 rounded-full">
          {model.variants.length} variant{model.variants.length !== 1 ? 's' : ''}
        </span>
        <span className="font-bold text-sm font-inter" style={{ color: catColor }}>
          ₹{min === max ? min.toLocaleString() : `${min.toLocaleString()} – ${max.toLocaleString()}`}
        </span>
      </div>
    </motion.button>
  )
}

export default function ModelsPage({ nav, go, goBack, canGoBack }) {
  const cat     = CATEGORIES.find((c) => c.id === nav.category)
  const company = getCompany(nav.category, nav.company)
  const models  = getDevices(nav.category, nav.company)

  return (
    <div className="min-h-screen bg-transparent transition-colors duration-300">
      <motion.div
        className="px-5 py-10 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 shadow-sm"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
            <ImgF src={company?.logo} alt={company?.name}
              style={{ width:48, height:48, objectFit:'contain' }}
              fallback={<span className="text-3xl">{company?.emoji}</span>} />
          </div>
          <div>
            <p className="text-slate-400 dark:text-slate-500 text-xs font-inter font-semibold uppercase tracking-widest mb-1">Select Model</p>
            <h1 className="font-poppins font-extrabold text-slate-800 dark:text-white text-2xl md:text-3xl">{company?.name} {cat?.name}s</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-inter mt-0.5">{company?.tagline}</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1200px] mx-auto px-5 pt-7 pb-20">
        <BackButton goBack={goBack} canGoBack={canGoBack} label={cat?.name || 'Back'} />
        <div className="mt-8">
          {models.length === 0 ? (
            <motion.div
              className="text-center py-16 text-slate-400"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div className="text-6xl mb-3">📱</div>
              <p className="font-poppins font-semibold text-lg">No models available yet</p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {models.map((m) => (
                <ModelCard key={m.id} model={m} catColor={cat?.color}
                  onClick={() => go('variants', { model: m.id })} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
