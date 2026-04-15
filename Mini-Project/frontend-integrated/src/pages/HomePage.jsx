import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data'
import heroVideo from '../assets/img/Home/ewaste_video - Copy.mp4'
import Footer from '../components/layout/Footer'
import ImgF from '../components/ui/ImgF'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'

let typewriterDone = false

function TypeWriter({ text, speed = 38, delay = 900 }) {
  const [displayed, setDisplayed] = useState(typewriterDone ? text : '')
  const [done, setDone] = useState(typewriterDone)

  useEffect(() => {
    if (typewriterDone) return

    let index = 0
    let intervalId = null

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setDisplayed(text.slice(0, index))

        if (index >= text.length) {
          clearInterval(intervalId)
          setDone(true)
          typewriterDone = true
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [delay, speed, text])

  return (
    <>
      {displayed}
      {!done && (
        <span
          className="inline-block w-[2px] h-[1.1em] ml-[1px] align-middle rounded-sm"
          style={{ background: '#b5ffe4', animation: 'twCaret 0.7s step-end infinite' }}
        />
      )}
      <style>{'@keyframes twCaret{0%,100%{opacity:1}50%{opacity:0}}'}</style>
    </>
  )
}

function CategoryCard({ cat, onClick, go }) {
  return (
    <motion.div
      className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow cursor-pointer overflow-hidden w-full transition-colors duration-300"
      style={{ '--cat-color': cat.color }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick()
      }}
      variants={fadeUp}
      whileHover={{
        y: -7,
        scale: 1.03,
        boxShadow: '0 18px 42px rgba(0,0,0,0.12)',
        borderColor: cat.color,
        transition: { duration: 0.22 },
      }}
      whileTap={{ scale: 0.98, y: -2 }}
    >
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

        <div className="p-2 cursor-pointer z-10" onClick={(e) => { e.stopPropagation(); go('cart') }}>
          <ImgF
            src={cat.img}
            alt={cat.name}
            style={{ maxWidth: 150, maxHeight: 150, objectFit: 'contain' }}
            fallback={(
              <div className="text-center">
                <div className="text-8xl">{cat.emoji}</div>
              </div>
            )}
          />
        </div>
      </div>

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
          <span style={{ color: cat.color }}>?</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function HomePage({ go }) {
  const catRef = useRef(null)
  const [bannerDismissed] = useState(false)

  const { firstName, displayName, isLoggedIn } = useAuth()
  const name = firstName || displayName || 'User'
  const showBanner = isLoggedIn && !bannerDismissed

  const stats = [
    { val: '50,000+', label: 'Happy Customers' },
    { val: '15', label: 'Cities Served' },
    { val: '?2 Cr+', label: 'Paid to Users' },
    { val: '99%', label: 'Recycled Safely' },
  ]

  const features = [
    { icon: '', title: 'Instant Price Quote', desc: 'Get price in 2 minutes.' },
    { icon: '??', title: 'Free Pickup', desc: 'Doorstep pickup available.' },
    { icon: '??', title: 'Data Safety', desc: 'Certified data wiping.' },
  ]

  return (
    <div style={{ background: '#eff5e6' }}>
      {showBanner ? <div className="hidden">{name}</div> : null}

      <section
        className="relative overflow-hidden px-5 pt-[130px] pb-20 flex items-center min-h-screen"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full">
          <motion.div
            className="lg:col-span-12 text-center order-1 lg:order-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-inter font-semibold tracking-[0.18em] uppercase mb-5"
              style={{ background: 'rgba(15,118,110,0.18)', color: '#e0fff6', border: '1px solid rgba(208,250,237,0.35)' }}
            >
              INDIA&apos;S #1 E-WASTE RECYCLING PLATFORM
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-poppins font-black leading-[1.1] mb-6 tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', color: '#ffffff' }}
            >
              Turn Your Old
              <br />
              or Damage Devices
              <br />
              <span className="text-emerald-300 drop-shadow-sm">Into Cash</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="font-inter text-base text-emerald-50/80 max-w-lg mx-auto mb-8">
              Get instant price quotes for old phones, laptops &amp; tablets.{' '}
              <span className="text-white/90 font-medium">
                <TypeWriter
                  text="Free doorstep pickup and fair, transparent pricing."
                  speed={38}
                  delay={1100}
                />
              </span>
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-5 justify-center">
              <motion.button
                whileHover={{ y: -3, scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => catRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-[#037252] font-poppins font-bold text-base px-8 py-4 rounded-xl border-none cursor-pointer shadow-xl transition-all"
              >
                Get My Price Now ?
              </motion.button>
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => go('process')}
                className="bg-transparent text-white font-poppins font-bold text-base px-8 py-4 rounded-xl border-2 border-white/30 cursor-pointer transition-all backdrop-blur-sm"
              >
                How It Works ?
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <motion.section
        className="grid grid-cols-2 md:grid-cols-4 text-center border-b border-slate-200 dark:border-slate-700 transition-colors duration-300" style={{ background: '#eff5e6' }}
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {stats.map((s, i) => (
          <motion.div key={i} className="p-6" variants={fadeUp}>
            <div className="text-xl font-bold text-green-0 dark:text-eco-400">{s.val}</div>
            <div className="text-sm text-gray-500 dark:text-slate-400">{s.label}</div>
          </motion.div>
        ))}
      </motion.section>

      <section ref={catRef} className="px-5 py-20 dark:bg-slate-900 transition-colors duration-300">
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
              go={go}
            />
          ))}
        </motion.div>
      </section>

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
              whileHover={{
                y: -5,
                boxShadow: '0 12px 32px rgba(0,0,0,0.10)',
                transition: { duration: 0.2 },
              }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100">{f.title}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>



      <Footer />
    </div>
  )
}
