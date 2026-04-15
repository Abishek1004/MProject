import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

const PhoneMockup = () => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  // Scroll parallax for internal image
  const { scrollYProgress } = useScroll();
  const internalImageY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, rotateX: '15deg' }}
      animate={{ opacity: 1, y: 0, rotateX: '0deg' }}
      transition={{ 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.8 }
      }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[200px] sm:max-w-[240px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative aspect-[9/18.5] w-full rounded-[3rem] bg-slate-900 p-3 shadow-2xl transition-shadow duration-500 hover:shadow-emerald-500/20"
      >
        {/* Bezel / Metallic Frame Effect */}
        <div className="absolute inset-0 rounded-[3rem] border-[3px] border-slate-800/50 pointer-events-none" />
        
        {/* Screen Container */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-white ring-1 ring-slate-900/10">
          
          {/* Dynamic App Content (Scroll-linked Parallax) */}
          <motion.div
            style={{ y: internalImageY }}
            className="h-full w-full origin-top"
          >
            <img 
              src="/app-screen.png" 
              alt="EcoLoop App Screen" 
              className="w-full object-cover scale-[1.3] origin-top brightness-[0.85]"
            />
          </motion.div>

          {/* iPhone Overlay: Status Bar & Icons */}
          <div className="absolute inset-0 z-10 flex flex-col p-5 pt-8 pointer-events-none">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-[10px] font-bold text-white px-2 mb-8">
              <span>9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-3 h-2 border border-white/50 rounded-sm relative">
                  <div className="absolute inset-[1px] bg-white rounded-sm w-[70%]" />
                </div>
                <span>70%</span>
              </div>
            </div>

            {/* App Icon Grid (Simulated) */}
            <div className="grid grid-cols-4 gap-4 px-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1 opacity-90">
                  <div className={`w-10 h-10 rounded-[10px] shadow-lg ${
                    i % 3 === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' : 
                    i % 3 === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' : 
                    'bg-gradient-to-br from-indigo-400 to-purple-600'
                  }`} />
                  <div className="w-8 h-1 bg-white/30 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Screen Glare Effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/20 via-transparent to-black/5 opacity-60" />
          
          {/* Top Notch / Dynamic Island Area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-20 flex items-center justify-center">
             <div className="w-10 h-1 rounded-full bg-slate-800" />
          </div>
        </div>

        {/* Home Indicator (Bar) */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full z-20" />

        {/* Side Buttons */}
        <div className="absolute -left-[2px] top-24 w-[2px] h-10 bg-slate-700 rounded-l-md" />
        <div className="absolute -left-[2px] top-36 w-[2px] h-16 bg-slate-700 rounded-l-md" />
        <div className="absolute -right-[2px] top-32 w-[2px] h-14 bg-slate-700 rounded-r-md" />
      </motion.div>

      {/* Floor Reflection / Shadow */}
      <motion.div 
        style={{
           rotateX,
           scale: 0.9,
           opacity: 0.15,
           filter: 'blur(10px)',
           y: 20
        }}
        className="absolute -bottom-10 inset-x-4 h-10 bg-black rounded-full pointer-events-none z-[-1]"
      />
    </motion.div>
  );
};

export default PhoneMockup;
