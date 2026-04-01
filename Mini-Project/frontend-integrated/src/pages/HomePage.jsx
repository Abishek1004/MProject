import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data'
import Footer from '../components/layout/Footer'
import ImgF from '../components/ui/ImgF'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'

// ── TypeWriter: types once per session, never restarts on re-mount ───────────
let _twDone = false   // module-level: survives re-renders / route changes

function TypeWriter({ text, speed = 38, delay = 900 }) {
  const [displayed, setDisplayed] = useState(_twDone ? text : '')
  const [done, setDone]           = useState(_twDone)

  useEffect(() => {
    if (_twDone) return   // already typed — show full text instantly

    let i = 0
    let intervalId = null

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(intervalId)
          setDone(true)
          _twDone = true   // persist across re-mounts
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [])   // run only once per mount; module flag prevents re-run anyway

  return (
    <>
      {displayed}
      {!done && (
        <span
          className="inline-block w-[2px] h-[1.1em] ml-[1px] align-middle rounded-sm"
          style={{ background: '#b5ffe4', animation: 'twCaret 0.7s step-end infinite' }}
        />
      )}
      <style>{`@keyframes twCaret{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </>
  )
}

function CategoryCard({ cat, onClick }) {
  return (
    <motion.div
      className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow cursor-pointer overflow-hidden w-full transition-colors duration-300"
      style={{ '--cat-color': cat.color }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
      variants={fadeUp}
      whileHover={{ y: -7, scale: 1.03, boxShadow: '0 18px 42px rgba(0,0,0,0.12)', borderColor: cat.color, transition: { duration: 0.22 } }}
      whileTap={{ scale: 0.98, y: -2 }}
    >
      {/* Image */}
      <div
        className="min-h-[190px] flex items-center justify-center relative p-6"
        style={{ background: cat.light }}
      >
        <span
          className="absolute top-3 right-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: cat.color }}
        >
          {cat.badge}
        </span>

        <ImgF
          src={cat.img}
          alt={cat.name}
          style={{ maxWidth: 150, maxHeight: 150, objectFit: 'contain' }}
          fallback={
            <div className="text-center">
              <div className="text-8xl">{cat.emoji}</div>
            </div>
          }
        />
      </div>

      {/* Text */}
      <div className="p-5 pb-6">
        <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">{cat.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">{cat.sub}</p>

        <div className="flex justify-between items-center">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: cat.light, color: cat.color }}
          >
            {cat.count}
          </span>
          <span style={{ color: cat.color }}>→</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage({ go }) {
  const catRef = useRef(null)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const { user, firstName, displayName, isLoggedIn, loading } = useAuth()
  const name = firstName || displayName || 'User'
  const showBanner = isLoggedIn && !bannerDismissed

  const stats = [
    { val: '50,000+', label: 'Happy Customers' },
    { val: '15',      label: 'Cities Served'   },
    { val: '₹2 Cr+',  label: 'Paid to Users'   },
    { val: '99%',     label: 'Recycled Safely'  },
  ]

  const features = [
    { icon: '⚡', title: 'Instant Price Quote', desc: 'Get price in 2 minutes.'  },
    { icon: '🚚', title: 'Free Pickup',         desc: 'Doorstep pickup available.' },
    { icon: '🔒', title: 'Data Safety',         desc: 'Certified data wiping.'   },
  ]

  return (
    <div>

      {/* HERO */}
      <section
        className="relative overflow-hidden px-5 pt-[98px] pb-28"
        style={{ background: 'linear-gradient(135deg,#014f3a,#059569)' }}
      >
        <div className="absolute -top-20 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
             style={{ background: '#26c49a', opacity: 0.25, filter: 'blur(40px)' }} />

        <div className="max-w-[1120px] mx-auto grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-inter font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ background: 'rgba(15,118,110,0.18)', color: '#e0fff6', border: '1px solid rgba(208,250,237,0.35)' }}
            >
              ♻ INDIA&apos;S #1 E-WASTE RECYCLING PLATFORM
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-poppins font-black leading-tight mb-4"
              style={{ fontSize: 'clamp(2.4rem,4.4vw,3.6rem)', color: '#f8fafc' }}
            >
              Turn Your Old
              <br />
              or Damage Devices
              <br />
              <span style={{ color: '#b5ffe4' }}>Into Cash</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-inter text-base md:text-lg text-emerald-50/80 max-w-xl mb-8">
              Get instant price quotes for old phones, laptops &amp; tablets.{' '}
              <span className="text-white/90 font-medium">
                <TypeWriter
                  text="Free doorstep pickup and fair, transparent pricing."
                  speed={38}
                  delay={1100}
                />
              </span>
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => catRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#024334] font-poppins font-semibold text-sm md:text-base px-7 py-3.5 rounded-xl border-none cursor-pointer shadow-lg shadow-black/15"
              >
                Get My Price Now →
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(240,253,250,0.12)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => go('process')}
                className="bg-transparent text-emerald-50 font-poppins font-semibold text-sm md:text-base px-4 py-3.5 rounded-xl border border-emerald-200/40 cursor-pointer transition-colors"
              >
                How It Works ↗
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero image — right column */}
          <motion.div
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, x: 40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 0.68, 0, 1.1] }}
          >
            <div
              className="relative w-full max-w-[420px]"
              style={{ animation: 'heroFloat 4.5s ease-in-out infinite' }}
            >
              {/* Glow ring behind image */}
              <div
                className="absolute inset-8 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,#6ee7b7 0%,transparent 70%)', opacity: 0.35, filter: 'blur(24px)' }}
              />
              <img
                src="/hero-devices.png"
                alt="Recycle your old phone, laptop and tablet"
                className="w-full h-auto relative drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 12px 48px rgba(110,231,183,0.35))' }}
              />
            </div>
            <style>{`@keyframes heroFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}`}</style>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <motion.section
        className="grid grid-cols-2 md:grid-cols-4 text-center border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {stats.map((s, i) => (
          <motion.div key={i} className="p-6" variants={fadeUp}>
            <div className="text-xl font-bold text-green-600 dark:text-eco-400">{s.val}</div>
            <div className="text-sm text-gray-500 dark:text-slate-400">{s.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* CATEGORIES */}
      <section ref={catRef} className="px-5 py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.h2
          className="text-center text-2xl font-bold mb-10 text-slate-800 dark:text-slate-100"
          {...inViewFadeUp}
        >
          What Do You Want to Recycle?
        </motion.h2>

        <motion.div
          className="grid sm:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              cat={cat}
              onClick={() => go('category', { category: cat.id })}
            />
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="px-5 py-20 bg-gray-50 dark:bg-slate-800/60 transition-colors duration-300">
        <motion.h2
          className="text-center text-2xl font-bold mb-10 text-slate-800 dark:text-slate-100"
          {...inViewFadeUp}
        >
          Why Choose Us?
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-slate-900/50 transition-colors duration-300"
              variants={fadeUp}
              whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(0,0,0,0.10)', transition: { duration: 0.2 } }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-20 text-center bg-white dark:bg-slate-900 transition-colors duration-300">
        <motion.h2
          className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100"
          {...inViewFadeUp}
        >
          Ready to Recycle &amp; Earn?
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 8px 24px rgba(22,163,74,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={() => catRef.current?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-green-600 hover:bg-eco-700 text-white px-6 py-3 rounded-lg border-none cursor-pointer font-semibold transition-colors"
        >
          Start Now →
        </motion.button>
      </section>

      <Footer />
    </div>
  )
}