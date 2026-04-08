import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

const LaptopMockup = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  // Scroll parallax for internal image
  const { scrollYProgress } = useScroll();
  const internalImageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

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
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      style={{ perspective: 1500 }}
      className="relative w-full max-w-[580px]"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative shadow-2xl transition-shadow duration-500"
      >
        {/* Laptop Screen (Top) */}
        <div className="relative aspect-[16/10.5] w-full rounded-t-2xl bg-slate-900 p-2.5 overflow-hidden transition-colors border-2 border-slate-800">
          
          {/* Screen Content */}
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-white ring-1 ring-slate-900/10">
            <motion.div
              style={{ y: internalImageY }}
              className="h-full w-full"
            >
              <img 
                src="/laptop-screen.png" 
                alt="EcoLoop Web Dashboard" 
                className="w-full object-cover scale-[1.2] origin-top"
              />
            </motion.div>

            {/* Screen Glare */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-black/5 opacity-40" />
            
            {/* Webcam Hole */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black/80 rounded-full" />
          </div>
        </div>

        {/* Laptop Base (Bottom) */}
        <div 
          className="relative h-4 w-full bg-slate-800 rounded-b-xl border-t border-slate-700 shadow-xl"
          style={{ transform: 'rotateX(-15deg)', transformOrigin: 'top' }}
        >
           {/* Center indent / Trackpad area */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-slate-900 rounded-b-md" />
        </div>
      </motion.div>

      {/* Shadow */}
      <div className="absolute -bottom-10 inset-x-8 h-10 bg-black/20 rounded-full blur-2xl pointer-events-none z-[-1]" />
    </motion.div>
  );
};

export default LaptopMockup;
