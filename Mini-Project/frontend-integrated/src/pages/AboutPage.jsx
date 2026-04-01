import { motion } from 'framer-motion'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/ui/PageHeader'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'

const TEAM = [
  { name: 'Abishek R',     role: 'Full-Stack Developer',  emoji: '💻', color: '#059669' },
  { name: 'Priya S',       role: 'UI/UX Designer',        emoji: '🎨', color: '#0891b2' },
  { name: 'Karthik M',     role: 'ML Engineer',           emoji: '🤖', color: '#7c3aed' },
  { name: 'Divya L',       role: 'Backend Engineer',      emoji: '⚙️', color: '#d97706' },
]

const VALUES = [
  { icon: '♻️', title: 'Zero-Waste Mission',       color: '#059669', light: '#ecfdf5', desc: 'We divert e-waste from landfills and ensure every component is handled responsibly.' },
  { icon: '🔒', title: 'Data Privacy First',       color: '#0891b2', light: '#ecfeff', desc: 'Certified data wiping before any device is processed — your data never leaves safely.' },
  { icon: '💚', title: 'Fair & Transparent Prices', color: '#16a34a', light: '#f0fdf4', desc: 'AI-powered pricing with no hidden charges. What you see is what you get.' },
  { icon: '🌍', title: 'Positive Planet Impact',   color: '#7c3aed', light: '#f5f3ff', desc: 'Every successful recycle contributes to tree planting and clean water initiatives.' },
]

const STATS = [
  { val: '2019', label: 'Year Founded'         },
  { val: '1.2L+', label: 'Devices Recycled'   },
  { val: '50K+',  label: 'Happy Customers'     },
  { val: '15',    label: 'Cities Served'       },
]

function ValueCard({ item }) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border transition-colors duration-300"
      style={{ borderColor: `${item.color}30` }}
      variants={fadeUp}
      whileHover={{ y: -5, boxShadow: `0 12px 32px ${item.color}18`, transition: { duration: 0.2 } }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ background: item.light }}>
        {item.icon}
      </div>
      <h3 className="font-poppins font-bold text-slate-800 dark:text-slate-100 text-base mb-2">{item.title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm font-inter leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

function TeamCard({ member }) {
  return (
    <motion.div
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700 transition-colors duration-300"
      variants={fadeUp}
      whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(0,0,0,0.10)', transition: { duration: 0.2 } }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto"
        style={{ background: `${member.color}15` }}
      >
        {member.emoji}
      </div>
      <p className="font-poppins font-bold text-slate-800 dark:text-slate-100 mb-1">{member.name}</p>
      <p className="text-sm font-inter font-medium" style={{ color: member.color }}>{member.role}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        badge="About EcoRecycle"
        title="Recycling Made Simple, Rewarding & Responsible"
        subtitle="We're on a mission to make e-waste recycling effortless for every Indian household — one device at a time."
      />

      {/* Stats strip */}
      <motion.div
        className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 transition-colors duration-300"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="max-w-[1100px] mx-auto px-5 grid grid-cols-2 md:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className={`py-5 px-4 text-center ${i < 3 ? 'border-r border-slate-100 dark:border-slate-700' : ''}`}
              variants={fadeUp}
            >
              <div className="font-poppins font-extrabold text-2xl text-eco-600 dark:text-eco-400 mb-0.5">{s.val}</div>
              <div className="text-xs font-inter text-slate-500 dark:text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="max-w-[1100px] mx-auto px-5 py-16 bg-white dark:bg-slate-900 transition-colors duration-300">

        {/* Mission */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 0.68, 0, 1.1] }}
        >
          <div>
            <span className="inline-block mb-4 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase font-inter bg-eco-50 text-eco-700 border border-eco-200">
              Our Mission
            </span>
            <h2 className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-3xl leading-tight mb-4">
              India's E-Waste Problem Is Too Big to Ignore
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-inter leading-[1.8] mb-4">
              India generates over <strong>3.2 million tonnes</strong> of e-waste every year, and only a fraction is recycled safely. Most ends up in landfills, releasing toxic materials into the soil and groundwater.
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-inter leading-[1.8]">
              EcoRecycle bridges the gap between individual households and certified recyclers — making it as easy as ordering food online to responsibly dispose of your old gadgets, while getting paid for it.
            </p>
          </div>
          <motion.div
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#ecfdf5,#d1fae5)' }}
            whileHover={{ scale: 1.02, transition: { duration: 0.22 } }}
          >
            <div className="text-[6rem] leading-none mb-4">♻️</div>
            <p className="font-poppins font-extrabold text-eco-800 text-2xl mb-2">3.2M Tonnes</p>
            <p className="text-eco-700 font-inter text-sm">of e-waste generated in India each year</p>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full"
              style={{ background: '#6ee7b7', opacity: 0.15 }} />
          </motion.div>
        </motion.div>

        {/* Values */}
        <motion.h2
          className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-2xl text-center mb-10"
          {...inViewFadeUp}
        >
          What We Stand For
        </motion.h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          {VALUES.map((v) => <ValueCard key={v.title} item={v} />)}
        </motion.div>

        {/* Team */}
        <motion.h2
          className="font-poppins font-extrabold text-slate-800 dark:text-slate-100 text-2xl text-center mb-10"
          {...inViewFadeUp}
        >
          Meet the Team
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-40px' }}
        >
          {TEAM.map((m) => <TeamCard key={m.name} member={m} />)}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="rounded-2xl px-10 py-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,#064e3b,#0d9488)' }}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none"
            style={{ background: '#6ee7b7', opacity: 0.08, filter: 'blur(40px)' }} />
          <h2 className="font-poppins font-extrabold text-white text-3xl mb-3 relative">
            Join the Green Revolution
          </h2>
          <p className="text-white/70 font-inter mb-7 relative max-w-lg mx-auto">
            Be part of the solution. Recycle your old devices today and earn real cash while protecting our planet.
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
