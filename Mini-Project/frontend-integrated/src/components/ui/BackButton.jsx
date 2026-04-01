import { motion } from 'framer-motion'

/**
 * BackButton — shows when canGoBack is true.
 * Goes to the genuine previous page in the history stack.
 */
export default function BackButton({ goBack, canGoBack, label = 'Back' }) {
  if (!canGoBack) return null
  return (
    <motion.button
      onClick={goBack}
      className="inline-flex items-center gap-2 text-sm font-inter font-semibold text-slate-500 hover:text-eco-600 bg-transparent border-none cursor-pointer px-0 py-0 group"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-eco-50 flex items-center justify-center transition-colors flex-shrink-0">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </span>
      {label}
    </motion.button>
  )
}
