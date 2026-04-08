import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import PageHeader from '../components/ui/PageHeader';

// --- Premium Content Definitions ---

const MISSION = {
  badge: "Circular Economy Leaders",
  title: "Driving a World Without Electronic Waste",
  description: [
    "India generates over 3.2 million tonnes of e-waste annually, but less than 10% is processed responsibly. This isn't just an environmental crisis—it's a massive loss of precious high-tech materials.",
    "EcoLoop is redefining the lifecycle of technology. By bridging the gap between consumers and certified green recyclers, we're building a sustainable future where every device is a resource, not a pollutant."
  ],
  metric: { val: "3.2M+", label: "Tonnes of Annual Impact" }
};

const VALUES = [
  { 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Circular Stewardship',
    color: '#10B981',
    desc: 'Ensuring that every salvaged material—from copper to gold—is reintroduced into the manufacturing loop with zero environmental leakage.'
  },
  { 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Certified Integrity',
    color: '#0EA5E9',
    desc: 'Every device undergoes military-grade data erasure before recycling, guaranteed by verified compliance standards and ethical transparency.'
  },
  { 
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Equitable Liquidity',
    color: '#F59E0B',
    desc: 'Combining tech-valuation AI with ethical markets to provide owners with the highest possible value for their retiring technology.'
  }
];

const TEAM = [
  { name: 'Akash S', role: 'Frontend Developer', initial: 'AS', color: '#10B981', bio: 'Driving the vision of a cleaner tomorrow.' },
  { name: 'Abishek N R', role: 'Backend Developer', initial: 'ANR', color: '#0EA5E9', bio: 'Sculpting high-impact digital experiences.' },
  { name: 'Jaysuriya P', role: 'Documentation', initial: 'JP', color: '#8B5CF6', bio: 'Optimizing valuation through neural logic.' },
  ];

const STATS = [
  { val: '2019', label: 'Founded' },
  { val: '1.2M+', label: 'Devices Saved' },
  { val: '50K+', label: 'Eco-Partners' },
  { val: '15+', label: 'Cities Impacted' }
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

export default function AboutPage() {
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
              Leading the <span className="text-emerald-600 dark:text-emerald-500">Technical Rebirth</span>
            </motion.h1>
            <motion.p 
              variants={fadeUp}
              className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Empowering households to transform electronic waste into environmental capital through circular innovation.
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

        {/* Values Section */}
        <div className="max-w-7xl mx-auto px-6 mb-48">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Core Philosophy</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">The principles that guide our progress towards a zero-waste landscape.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
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

        {/* Team Section */}
        <div className="max-w-7xl mx-auto px-6 mb-48">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">The Visionaries</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">A collective of specialists dedicated to technological sustainability.</p>
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
                Be Carbon Conscious. <br/> Join the Revolution.
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Turn your retiring hardware into a legacy of renewal. Start your circular journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
                >
                  Start Recycling Now
                </motion.button>
                <motion.button 
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
