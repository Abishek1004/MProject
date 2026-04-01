import { motion } from 'framer-motion'
import { staggerContainer, fadeUp } from '../../utils/motion'

/**
 * Reusable page hero header with gradient bg
 */
export default function PageHeader({ badge, title, subtitle }) {
  return (
    <div className="bg-gradient-to-br from-eco-900 via-eco-800 to-teal-600 pt-28 pb-16 px-5 relative overflow-hidden transition-colors duration-300">
      {/* Decorative blob */}
      <div
        className="absolute -top-16 -right-16 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: '#6ee7b7', opacity: 0.06, filter: 'blur(50px)' }}
      />
      <motion.div
        className="max-w-[1100px] mx-auto relative"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {badge && (
          <motion.span
            variants={fadeUp}
            className="inline-block mb-4 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase font-inter"
            style={{
              background: 'rgba(110,231,183,0.15)',
              border: '1px solid rgba(110,231,183,0.3)',
              color: '#6ee7b7',
            }}
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          variants={fadeUp}
          className="font-poppins font-extrabold text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p variants={fadeUp} className="font-inter text-white/70 text-lg max-w-xl leading-relaxed">
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
