import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { CATEGORIES } from '../data'
import heroVideo from '../assets/img/Home/ewaste_video - Copy.mp4'
import Footer from '../components/layout/Footer'
import ImgF from '../components/ui/ImgF'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'
import priceIcon from '../assets/price.png'
import pickupIcon from '../assets/schedule_pickup.jpg'
import paidIcon from '../assets/paid.png'

function TypeWriter({ text, speed = 40, delay = 1000 }) {
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    let timeoutId
    let intervalId

    timeoutId = setTimeout(() => {
      let index = 0
      intervalId = setInterval(() => {
        setDisplayText(text.slice(0, index + 1))
        index++
        if (index >= text.length) {
          clearInterval(intervalId)
          setIsDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [text, speed, delay])

  return (
    <span className="relative whitespace-normal">
      {displayText}
      <motion.span
        initial={{ opacity: 1 }}
        animate={isDone ? { opacity: 0 } : { opacity: [1, 0, 1] }}
        transition={{
          duration: isDone ? 1.0 : 0.8,
          repeat: isDone ? 0 : Infinity,
          ease: "linear",
          times: isDone ? [0, 1] : [0, 0.5, 1]
        }}
        className="inline-block w-[2px] h-[1.1em] bg-emerald-400 ml-0.5 align-middle"
      />
    </span>
  )
}

function CategoryCard({ cat, onClick, go }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg'])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div
      style={{ perspective: '1000px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow cursor-pointer overflow-hidden w-full transition-colors duration-300"
        style={{
          '--cat-color': cat.color,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') onClick()
        }}
        variants={fadeUp}
        whileHover={{
          translateZ: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderColor: cat.color,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div
          className="min-h-[190px] flex items-center justify-center relative p-6"
          style={{ background: cat.light, transform: 'translateZ(50px)' }}
        >
          <span
            className="absolute top-3 right-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: cat.color, transform: 'translateZ(30px)' }}
          >
            {cat.badge}
          </span>

          <div
            className="p-2 cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation()
              go('cart')
            }}
            style={{ transform: 'translateZ(60px)' }}
          >
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

        <div className="p-5 pb-6" style={{ transform: 'translateZ(40px)' }}>
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
    </div>
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
    { val: '12 Cr+', label: 'Paid to Users' },
    { val: '99%', label: 'Recycled Safely' },
  ]

  const features = [
    { icon: priceIcon, title: 'Check Price', desc: 'Provide device details and get the best price through our advanced AI.' },
    { icon: pickupIcon, title: 'Schedule Pickup', desc: 'Free pickup from your home or office address.' },
    { icon: paidIcon, title: 'Get Paid', desc: 'Instant and 100% secure payment at the time of pickup.' },
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
            <div className="text-xl font-bold text-eco-600 dark:text-eco-400">{s.val}</div>
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
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

      <section className="px-5 py-24 transition-colors duration-300">
        <motion.h2
          className="text-center text-3xl md:text-4xl font-poppins font-black mb-16 text-slate-800 dark:text-slate-100"
          {...inViewFadeUp}
        >
          Why Choose Us?
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.18)] border border-slate-100/50 dark:border-slate-700 transition-all duration-500 text-center flex flex-col items-center relative overflow-hidden group"
              style={{
                WebkitBoxReflect: 'below 1px linear-gradient(transparent, rgba(0,0,0,0.04))',
              }}
              variants={fadeUp}
              whileHover={{
                y: -20,
                transition: { duration: 0.4 },
              }}
            >
              {/* Glossy Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-[-25deg] z-20 pointer-events-none" />
              
              <div className="h-28 w-full flex items-center justify-center mb-8">
                {f.icon && typeof f.icon === 'string' && f.icon.length > 10 ? (
                  <ImgF
                    src={f.icon}
                    alt={f.title}
                    className="h-full w-auto object-contain"
                    fallback={<span className="text-6xl">💰</span>}
                  />
                ) : (
                  <span className="text-7xl">{f.icon || '✨'}</span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#037252] text-white text-xs font-bold">
                  {i + 1}
                </span>
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">{f.title}</h3>
              </div>

              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed max-w-[250px]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>



      <Footer />
    </div>
  )
}
