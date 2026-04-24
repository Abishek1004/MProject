import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { STEPS } from '../data'
import Footer from '../components/layout/Footer'
import PageHeader from '../components/ui/PageHeader'
import ImgF from '../components/ui/ImgF'
import { staggerContainer, fadeUp, inViewFadeUp } from '../utils/motion'

const StepSummaryItem = ({ s, i, scrollYProgress, total }) => {
  // Safe range for transform
  const start = Math.max(0, (i / Math.max(1, total - 1)) - 0.1);
  const end = Math.min(1, (i / Math.max(1, total - 1)) + 0.1);

  const opacity = useTransform(scrollYProgress, [start, end], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.1]);

  return (
    <motion.div
      className="py-4 px-2 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all rounded-xl"
      style={{ opacity, scale }}
      onClick={() => {
        const element = document.getElementById(`step-${s.num}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }}
    >
      <div className="text-xl mb-1">{s.icon}</div>
      <p className="font-poppins font-bold text-[10px] tracking-wider uppercase whitespace-nowrap" style={{ color: s.color }}>
        Step {s.num}
      </p>
    </motion.div>
  );
};

export default function ProcessPage({ go }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'transparent' }}>
      <PageHeader
        badge="How It Works"
        title="The EcoLoop Recycling Process"
        subtitle="From selecting your device to receiving your payment — a simple, automated journey that ensures your tech gets a second life while you get rewarded."
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Steps summary strip - Sticky */}
      <motion.div
        className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-40 transition-colors duration-300 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-8 divide-x divide-slate-100 dark:divide-slate-800">
          {(STEPS || []).map((s, i) => (
            <StepSummaryItem
              key={s.num}
              s={s}
              i={i}
              scrollYProgress={scrollYProgress}
              total={STEPS.length}
            />
          ))}
        </div>
      </motion.div>

      {/* Steps detail */}
      <div className="max-w-[1100px] mx-auto px-5 py-24 relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 top-40 bottom-40 w-px bg-slate-100 dark:bg-slate-800 hidden lg:block -translate-x-1/2" />

        {(STEPS || []).map((step, i) => (
          <motion.div
            key={step.num}
            id={`step-${step.num}`}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32 relative ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Step Number Badge (Center Line) */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-800 z-10 shadow-sm">
              <div className="rounded-full" style={{ backgroundColor: step.color, width: '8px', height: '8px' }} />
            </div>

            {/* Image Section */}
            <motion.div
              className={`relative rounded-3xl overflow-hidden shadow-2xl group ${i % 2 !== 0 ? 'lg:order-2' : ''}`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30 z-10"
                style={{ background: `linear-gradient(135deg, ${step.color}, transparent)` }}
              />
              <div className="aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 1.2 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="w-full h-full"
                >
                  <ImgF
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    fallback={
                      <div className="h-full flex flex-col items-center justify-center p-12 text-center" style={{ background: step.light }}>
                        <div className="text-8xl mb-4">{step.icon}</div>
                        <p className="font-poppins font-bold text-slate-800/30 underline">STEP {step.num}</p>
                      </div>
                    }
                  />
                </motion.div>
              </div>

              {/* Floating Step Number */}
              <div
                className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl backdrop-blur-md flex items-center justify-center text-2xl font-black text-white shadow-xl z-20"
                style={{ backgroundColor: `${step.color}CC` }}
              >
                {step.num}
              </div>
            </motion.div>

            {/* Content Section */}
            <div className={`flex flex-col ${i % 2 !== 0 ? 'lg:order-1 lg:text-right' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 100 : -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                <div className={`flex items-center gap-3 mb-6 ${i % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                  <span
                    className="px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                    style={{ backgroundColor: step.light, color: step.color, border: `1.5px solid ${step.border}` }}
                  >
                    Phase {step.num}
                  </span>
                  <div className="h-px w-12 bg-slate-200 dark:bg-slate-700" />
                </div>

                <h2 className="text-3xl md:text-4xl font-poppins font-black text-slate-800 dark:text-white mb-6 leading-tight">
                  {step.title}
                </h2>

                <p className="text-lg text-slate-600 dark:text-slate-400 font-inter mb-8 leading-relaxed">
                  {step.desc}
                </p>

                <div className={`grid gap-4 ${i % 2 !== 0 ? 'lg:justify-items-end' : ''}`}>
                  {step.points.map((pt, pi) => (
                    <motion.div
                      key={pt}
                      className="flex items-center gap-4 group"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (pi * 0.1) }}
                    >
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:rotate-12 ${i % 2 !== 0 ? 'order-2' : ''}`}
                        style={{ backgroundColor: step.light, border: `1px solid ${step.border}` }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke={step.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium font-inter group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                        {pt}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Environmental impact */}
        <motion.div
          className="mt-32 bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500 blur-[100px]" />
          </div>

          <h2 className="text-3xl md:text-5xl font-poppins font-black text-white mb-16 relative">
            Making a Real Difference
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              ['🌲', '12,000+', 'Trees Equivalent Saved'],
              ['💧', '8M Liters', 'Water Preserved'],
              ['⚗️', '4.2 Tons', 'Toxic Waste Diverted'],
              ['🔋', '2.1 GWh', 'Energy Recovered'],
            ].map(([ic, val, label], idx) => (
              <motion.div
                key={label}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-5xl mb-6">{ic}</div>
                <div className="text-3xl font-poppins font-black text-white mb-2">{val}</div>
                <p className="text-slate-400 font-inter text-sm uppercase tracking-widest">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mt-20 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #064e3b 0%, #134e4a 100%)' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-poppins font-black text-white mb-8">
              Ready to recycle?
            </h2>
            <p className="text-xl text-emerald-100/70 max-w-2xl mx-auto mb-12 font-inter">
              Join thousands of eco-conscious users today and turn your old tech into instant rewards.
            </p>

            <motion.button
              onClick={() => go('home')}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-poppins font-black text-lg px-12 py-5 rounded-2xl shadow-2xl transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              Get My Price Now →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
