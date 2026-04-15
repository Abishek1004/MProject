import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import appScreen from '../../assets/img/app-screen.png';

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
      className="relative w-full max-w-[280px] sm:max-w-[320px]"
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
              src={appScreen} 
              alt="EcoLoop App Screen" 
              className="w-full h-full object-cover origin-top"
            />
          </motion.div>

          {/* iPhone Overlay: Status Bar & Icons (Removed because they are in the image) */}
          <div className="absolute inset-0 z-10 flex flex-col p-5 pt-8 pointer-events-none">
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
