import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/ui/PageHeader';

// --- Premium Content Definitions ---

const MISSION = {
  badge: "Simplified E-Waste Solutions",
  title: "Empowering Sustainability Through Innovation",
  description: [
    "Our mission is to lead the transition toward a circular economy by making e-waste recycling effortless, secure, and rewarding. We believe that every discarded device represents a responsibility to protect our environment.",
    "By providing a seamless platform for safe recycling, we ensure that toxic materials are diverted from landfills, reducing the global environmental footprint while returning value to our users."
  ],
  metric: { val: "Eco-Safe", label: "Certified Recycling" }
};

const VALUES = [
  {
    photo: '/src/assets/img/body/ai_eval.png',
    gradient: 'from-emerald-50 to-teal-100',
    iconColor: '#10B981',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#10B981" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Smart AI Eval',
    desc: 'Our advanced AI instantly analyzes your device condition (working or not) to give you the most accurate and fair price.'
  },
  {
    photo: '/src/assets/img/body/data_shield.png',
    gradient: 'from-sky-50 to-blue-100',
    iconColor: '#0EA5E9',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#0EA5E9" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Data Shield',
    desc: 'Your privacy is our priority. We use military-grade encryption to wipe and protect your data before any recycling happens.'
  },
  {
    photo: '/src/assets/img/body/instant_wallet.png',
    gradient: 'from-amber-50 to-orange-100',
    iconColor: '#F59E0B',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="#F59E0B" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Instant Wallet',
    desc: 'No waiting around. Once your device is collected, we add the money directly to your wallet for immediate use.'
  }
];

const TEAM = [
  { name: 'Akash S', role: 'Frontend Developer', initial: 'AS', color: '#10B981', bio: 'Driving the vision of a cleaner tomorrow.' },
  { name: 'Abishek N R', role: 'Backend Developer', initial: 'ANR', color: '#0EA5E9', bio: 'Sculpting high-impact digital experiences.' },
  { name: 'Jaysuriya P', role: 'Documentation', initial: 'JP', color: '#8B5CF6', bio: 'Optimizing valuation through neural logic.' },
];

const STATS = [
  { val: '100%', label: 'Data Privacy' },
  { val: '24/7', label: 'AI Support' },
  { val: '1k+', label: 'Happy Recyclers' },
  { val: 'Inst.', label: 'Wallet Credit' }
];

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

// --- Sub-components ---

function FloatingElement({ className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
      className={`absolute pointer-events-none ${className}`}
    />
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className={`relative overflow-hidden rounded-3xl p-8 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/10 dark:from-emerald-500/5 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}

export default function AboutPage({ go }) {
  const logoControls = useAnimation();
  return (
    <div className="dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-emerald-100 dark:selection:bg-emerald-900/30 font-inter transition-colors duration-300" style={{ backgroundColor: 'transparent' }}>
      <div className="relative pt-20 overflow-hidden">
        {/* Abstract Background Ornaments */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/40 dark:bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-50/30 dark:bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 -z-10" />

        <FloatingElement
          className="top-[15%] right-[10%] w-24 h-24 bg-emerald-100/50 dark:bg-emerald-500/10 rounded-full blur-xl"
          delay={0}
        />
        <FloatingElement
          className="top-[40%] left-[5%] w-32 h-32 bg-blue-100/40 dark:bg-blue-500/10 rounded-full blur-2xl"
          delay={2}
        />

        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.span
              variants={fadeUp}
              className="px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-full tracking-wide uppercase"
            >
              Our Vision
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-bold tracking-tight text-slate-900 dark:text-white"
              style={{ fontSize: 'var(--fs-h1)' }}
            >
              Turning old tech into <span className="text-emerald-600 dark:text-emerald-500">New Value</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Whether it's working or not, we help you recycle your devices safely and get paid for doing the right thing.
            </motion.p>
          </motion.div>
        </div>

        {/* Impact Stats */}
        <div className="max-w-7xl mx-auto px-6 mb-40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-y border-slate-100 dark:border-slate-800 py-16"
          >
            {STATS.map((s, i) => (
              <motion.div key={i} variants={itemVariants} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {s.val}
                </div>
                <div className="text-sm uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Narrative Section */}
        <div className="max-w-7xl mx-auto px-6 mb-48">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <span className="text-emerald-600 dark:text-emerald-500 font-bold tracking-widest uppercase text-xs">
                  {MISSION.badge}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.1]">
                  {MISSION.title}
                </h2>
              </div>
              <div className="space-y-6 text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                {MISSION.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative p-12 bg-emerald-50/30 dark:bg-emerald-900/20 rounded-[3rem] border border-emerald-100/50 dark:border-emerald-500/10"
            >
              <div className="text-center space-y-4">
                <div className="text-7xl mb-6">♻️</div>
                <div className="text-6xl font-bold text-emerald-700 dark:text-emerald-400">{MISSION.metric.val}</div>
                <p className="text-emerald-600/70 dark:text-emerald-500/70 uppercase tracking-widest font-bold text-sm">{MISSION.metric.label}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Importance of Recycling Section (Eco-Tree Design) ── */}
        <div className="max-w-7xl mx-auto px-6 mb-40 relative">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              Why Recycling Your Tech <br /> <span className="text-emerald-600 dark:text-emerald-500">Matters Most</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
              Electronic waste is the fastest-growing waste stream on the planet. Here’s why your decision to recycle today creates a massive ripple effect for a better tomorrow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 items-start gap-10 mb-32">
            {/* Left Column */}
            <div className="flex flex-col gap-20 items-center lg:items-end pt-12">
              {/* Resource Conservation */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-center lg:items-end text-center lg:text-right max-w-[280px]"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-8 group">
                  {/* Custom SVG Cup Shape */}
                  <div className="absolute inset-0 drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white dark:fill-slate-800">
                      <path d="M5,15 L95,15 Q100,15 98,20 L85,85 Q80,100 50,100 Q20,100 15,85 L2,20 Q0,15 5,15" />
                      <rect x="0" y="10" width="100" height="7" rx="3.5" fill="#f1f5f9" className="dark:fill-slate-600" />
                    </svg>
                  </div>
                  {/* Icon Container - Shifted down for visual centering */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 w-14 h-14 flex items-center justify-center transform translate-y-2 cursor-pointer"
                  >
                    <img
                      src="/src/assets/img/body/conservation.png"
                      alt="Resource Conservation"
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </motion.div>
                </div>
                <div className="min-h-[180px] flex flex-col items-center lg:items-end">
                  <h3 className="text-xl font-poppins font-black text-amber-700 dark:text-amber-400 mb-3">Resource Conservation</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-inter">
                    Your old phones are 'urban mines.' They contain precious metals like gold, silver, and palladium. By recycling, we recover these materials, reducing the need for destructive mining across the globe.
                  </p>
                </div>
              </motion.div>

              {/* Energy Efficiency */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col items-center lg:items-end text-center lg:text-right max-w-[280px]"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-8 group">
                  <div className="absolute inset-0 drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white dark:fill-slate-800">
                      <path d="M5,15 L95,15 Q100,15 98,20 L85,85 Q80,100 50,100 Q20,100 15,85 L2,20 Q0,15 5,15" />
                      <rect x="0" y="10" width="100" height="7" rx="3.5" fill="#f1f5f9" className="dark:fill-slate-600" />
                    </svg>
                  </div>
                  {/* Icon Container - Shifted down for visual centering */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 w-14 h-14 flex items-center justify-center transform translate-y-2 cursor-pointer"
                  >
                    <img
                      src="/src/assets/img/body/energy.png"
                      alt="Energy Efficiency"
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </motion.div>
                </div>
                <h3 className="text-xl font-poppins font-black text-blue-700 dark:text-blue-400 mb-3">Energy Efficiency</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-inter">
                  Manufacturing new products from recycled materials consumes significantly less energy than refining raw ores. This efficiency helps stabilize global energy demands and lowers operational costs.
                </p>
              </motion.div>
            </div>

            {/* Center Column: The Tree */}
            <div className="relative flex justify-center pt-32 lg:pt-40 pb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0]
                }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 1 },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative z-10 w-full max-w-[450px]"
              >
                <img
                  src="/src/assets/img/body/tree.png"
                  alt="Eco Recycling Tree"
                  className="w-full h-auto drop-shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
                />
                <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-20 items-center lg:items-start pt-12">
              {/* Toxic Leak Prevention */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[280px]"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-8 group">
                  <div className="absolute inset-0 drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white dark:fill-slate-800">
                      <path d="M5,15 L95,15 Q100,15 98,20 L85,85 Q80,100 50,100 Q20,100 15,85 L2,20 Q0,15 5,15" />
                      <rect x="0" y="10" width="100" height="7" rx="3.5" fill="#f1f5f9" className="dark:fill-slate-600" />
                    </svg>
                  </div>
                  {/* Icon Container - Shifted down for visual centering */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 w-14 h-14 flex items-center justify-center transform translate-y-2 cursor-pointer"
                  >
                    <img
                      src="/src/assets/img/body/toxic.webp"
                      alt="Toxic Leak Prevention"
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </motion.div>
                </div>
                <div className="min-h-[180px] flex flex-col items-center lg:items-start">
                  <h3 className="text-xl font-poppins font-black text-red-700 dark:text-red-400 mb-3">Toxic Leak Prevention</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-inter">
                    E-waste contains hazardous substances like lead, mercury, and cadmium. When dumped in landfills, these leak into our groundwater and soil. Professional recycling ensure safe containment and treatment.
                  </p>
                </div>
              </motion.div>

              {/* Climate Change Mitigation */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[280px]"
              >
                <div className="relative w-24 h-24 flex items-center justify-center mb-8 group">
                  <div className="absolute inset-0 drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white dark:fill-slate-800">
                      <path d="M5,15 L95,15 Q100,15 98,20 L85,85 Q80,100 50,100 Q20,100 15,85 L2,20 Q0,15 5,15" />
                      <rect x="0" y="10" width="100" height="7" rx="3.5" fill="#f1f5f9" className="dark:fill-slate-600" />
                    </svg>
                  </div>
                  {/* Icon Container - Shifted down for visual centering */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 w-14 h-14 flex items-center justify-center transform translate-y-2 cursor-pointer"
                  >
                    <img
                      src="/src/assets/img/body/climate.png"
                      alt="Climate Change Mitigation"
                      className="w-full h-full object-contain drop-shadow-sm"
                    />
                  </motion.div>
                </div>
                <h3 className="text-xl font-poppins font-black text-emerald-700 dark:text-emerald-500 mb-3">Climate Mitigation</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-inter">
                  By keeping computers and mobiles in a circular loop, we prevent massive CO2 emissions associated with the production of new electronics, directly tackling the global climate crisis.
                </p>
              </motion.div>
            </div>

          </div>








          {/* Global Impact by the Numbers */}
          <div className="p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full" />
            <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
              <div className="space-y-2">
                <div className="text-4xl font-black text-slate-800 dark:text-white">53.6M</div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Metric Tons</p>
                <p className="text-sm text-slate-500">Global e-waste generated every single year.</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black text-slate-800 dark:text-white">₹7,000Cr</div>
                <p className="text-xs font-bold text-amber-600 uppercase tracking-widest">Lost Value</p>
                <p className="text-sm text-slate-500">Annual value of gold and copper discarded in e-waste.</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black text-slate-800 dark:text-white">10%</div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Global Energy</p>
                <p className="text-sm text-slate-500">Energy saved by recycling just one million laptops.</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black text-slate-800 dark:text-white">100%</div>
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Safe Disposal</p>
                <p className="text-sm text-slate-500">Our promise to bridge the gap in sustainable tech.</p>
              </div>
            </div>
          </div>
        </div>




        {/* Values Section (Recycling Services) */}
        <div className="max-w-7xl mx-auto px-6 mb-60">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Recycling Services</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">We responsibly recycle a wide range of electronic waste, turning it into valuable raw materials for a greener tomorrow.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {VALUES.map((v, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white dark:bg-slate-800 rounded-t-3xl rounded-b-[50px] shadow-lg hover:shadow-2xl transition-all duration-500 group p-4 pb-8"
              >
                {/* Photo with rounded corners */}
                <div className={`relative rounded-3xl overflow-hidden h-56 mb-10 bg-gradient-to-br ${v.gradient}`}>
                  <img
                    src={v.photo}
                    alt={v.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {/* Cup SVG Icon Badge - overlapping image bottom */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10 w-20 h-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-white dark:fill-slate-800 drop-shadow-lg">
                      <path d="M5,15 L95,15 Q100,15 98,20 L85,85 Q80,100 50,100 Q20,100 15,85 L2,20 Q0,15 5,15" />
                      <rect x="0" y="10" width="100" height="7" rx="3.5" fill="#f1f5f9" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center translate-y-2">
                      {v.icon}
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="pt-4 pb-4 px-4 text-center">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">{v.title}</h3>
                  <p className="text-slate-400 dark:text-slate-400 text-sm leading-relaxed mb-8">{v.desc}</p>
                  {/* Arrow Button */}
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Team Section (The Visionaries) */}
        <div className="max-w-7xl mx-auto px-6 mb-60">
          <div className="text-center mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">The Visionaries</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed text-fit">A collective of specialists dedicated to technological sustainability.</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8"
          >
            {TEAM.map((m, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-8 rounded-3xl border border-transparent hover:border-slate-100 dark:hover:border-slate-800 hover:bg-slate-50/30 dark:hover:bg-slate-900/30 transition-all duration-300 text-center"
              >
                <div
                  className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-2xl font-bold mb-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: `${m.color}10`, color: m.color }}
                >
                  {m.initial}
                </div>
                <h4 className="text-slate-900 dark:text-white font-bold mb-1 text-fit" style={{ fontSize: 'var(--fs-nav)' }}>{m.name}</h4>
                <p className="text-[10px] uppercase tracking-widest font-bold mb-4 text-fit" style={{ color: m.color }}>{m.role}</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm italic">{m.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="max-w-7xl mx-auto px-6 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-950 dark:bg-slate-900 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                Ready to clear your <br /> tech clutter?
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Turn your old devices into cash in minutes. It's good for your wallet and great for the planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => go('home')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                >
                  Start Recycling Now
                </motion.button>
                <motion.button
                  onClick={() => go('process')}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white/5 text-white border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
