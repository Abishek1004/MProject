import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';


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
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Smart AI Eval',
    color: '#10B981',
    desc: 'Our advanced AI instantly analyzes your device condition (working or not) to give you the most accurate and fair price.'
  },
  { 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Data Shield',
    color: '#0EA5E9',
    desc: 'Your privacy is our priority. We use military-grade encryption to wipe and protect your data before any recycling happens.'
  },
  { 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Instant Wallet',
    color: '#F59E0B',
    desc: 'No waiting around. Once your device is collected, we add the money directly to your wallet for immediate use.'
  },
  { 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: 'SPAS Partnership',
    color: '#059669',
    desc: 'We are proud to partner with SPAS Recycling Pvt Ltd, a government-certified leader in eco-friendly electronic waste management.'
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
  return (
    <div className="bg-white dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 selection:bg-emerald-100 dark:selection:bg-emerald-900/30 font-inter transition-colors duration-300">
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


        {/* Importance of Recycling Section */}
        <div className="max-w-7xl mx-auto px-6 mb-60">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="space-y-16"
          >
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Why Recycling Your Tech <br/> <span className="text-emerald-600 dark:text-emerald-500">Matters Most</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed text-fit">
                Electronic waste is the fastest-growing waste stream on the planet. Here’s why your decision to recycle today creates a massive ripple effect for a better tomorrow.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Resource Conservation",
                  ic: "💎",
                  desc: "Your old phones are 'urban mines.' They contain precious metals like gold, silver, and palladium. By recycling, we recover these materials, reducing the need for destructive mining across the globe.",
                  color: "bg-amber-50 dark:bg-amber-900/20",
                  text: "text-amber-700 dark:text-amber-400"
                },
                {
                  title: "Toxic Leak Prevention",
                  ic: "☢️",
                  desc: "E-waste contains hazardous substances like lead, mercury, and cadmium. When dumped in landfills, these leak into our groundwater and soil. Professional recycling ensures safe containment and treatment.",
                  color: "bg-red-50 dark:bg-red-900/20",
                  text: "text-red-700 dark:text-red-400"
                },
                {
                  title: "Energy Efficiency",
                  ic: "⚡",
                  desc: "Manufacturing new products from recycled materials consumes significantly less energy than refining raw ores. This efficiency helps stabilize global energy demands and lowers operational costs.",
                  color: "bg-blue-50 dark:bg-blue-900/20",
                  text: "text-blue-700 dark:text-blue-400"
                },
                {
                  title: "Climate Mitigation",
                  ic: "🌍",
                  desc: "By keeping computers and mobiles in a circular loop, we prevent massive CO2 emissions associated with the production of new electronics, directly tackling the global climate crisis.",
                  color: "bg-emerald-50 dark:bg-emerald-900/20",
                  text: "text-emerald-700 dark:text-emerald-400"
                },
                {
                  title: "Economic Incentive",
                  ic: "💰",
                  desc: "Recycling isn't just good for the planet—it's good for your wallet. Our platform ensures you get a fair market valuation for your unused devices, turning 'junk' into capital.",
                  color: "bg-green-50 dark:bg-green-900/20",
                  text: "text-green-700 dark:text-green-400"
                },
                {
                  title: "Data Security",
                  ic: "🛡️",
                  desc: "Simply throwing away a device puts your personal data at risk. Professional recycling includes military-grade data wiping, ensuring your privacy is never compromised.",
                  color: "bg-indigo-50 dark:bg-indigo-900/20",
                  text: "text-indigo-700 dark:text-indigo-400"
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex flex-col p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl group"
                >
                  <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-3xl mb-6 ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                    {item.ic}
                  </div>
                  <div className="space-y-3">
                    <h3 className={`text-xl font-bold ${item.text} text-fit`}>{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base text-fit">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Global Impact by the Numbers */}
            <div className="mt-20 p-12 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden">
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
          </motion.div>
        </div>

        {/* Strategic Partnership Section */}
        <div className="max-w-7xl mx-auto px-6 mb-60">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl"
          >
            {/* Animated Glow Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div className="space-y-4">
                  <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full tracking-[0.2em] uppercase">
                    Official Infrastructure Partner
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black font-poppins leading-tight">
                    Backed by <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">SPAS PVT LTD</span>
                  </h2>
                </div>
                
                <p className="text-xl text-slate-400 leading-relaxed font-inter text-fit">
                  We are proud to announce our exclusive tie-up with <span className="text-white font-bold">SPAS PVT LTD</span>, India's #1 e-waste recycling firm. This partnership combines our seamless user technology with their world-class industrial infrastructure.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Certified R2 & ISO Standards",
                    "State-of-the-art Metal Recovery",
                    "Nationwide Logistics Network",
                    "Zero-Emission Processing"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-300 font-medium text-sm font-inter text-fit">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-slate-950 rounded-[2rem] p-10 border border-white/5 overflow-hidden">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center text-5xl">🏭</div>
                    <div className="space-y-2">
                       <h3 className="text-2xl font-black font-poppins tracking-tight text-fit">SPAS PVT LTD</h3>
                       <p className="text-emerald-500 font-bold uppercase tracking-widest text-[10px] text-fit">India's #1 Recycle Powerhouse</p>
                    </div>
                    <p className="text-slate-500 text-sm italic font-inter text-fit">
                      "Utilizing superior extraction methods to revert e-waste into high-purity raw materials, ensuring a sustainable future for the electronics industry."
                    </p>
                    <div className="pt-4 flex gap-4">
                       <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">EPC Certified</div>
                       <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400">SPCB Authorized</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section (How It Works) */}
        <div className="max-w-7xl mx-auto px-6 mb-60">
          <div className="text-center mb-28">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">How It Works</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed text-fit">Our simple process ensures your device is recycled responsibly and you get rewarded instantly.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-10"
          >
            {VALUES.map((v, i) => (
              <GlassCard key={i}>
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-slate-50 dark:bg-slate-800/50"
                  style={{ color: v.color }}
                >
                  {v.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-fit"  style={{ fontSize: 'var(--fs-h3)' }}>{v.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">{v.desc}</p>
              </GlassCard>
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
                Ready to clear your <br/> tech clutter?
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
