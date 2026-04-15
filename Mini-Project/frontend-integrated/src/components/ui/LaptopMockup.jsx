import React from 'react';
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
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2 }}
      style={{ perspective: 1400 }}
      className="relative w-full max-w-[560px]"
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
        <div className="relative aspect-[16/10] w-full rounded-t-xl bg-[#111827] p-2 overflow-hidden border-[2px] border-slate-800 shadow-2xl">
          
          {/* Screen Content */}
          <div className="relative h-full w-full overflow-hidden rounded-[6px] bg-[#f8fafc] ring-1 ring-slate-900/10">
            <motion.div
              style={{ y: internalImageY }}
              className="h-full w-full"
            >
              <img 
                src="/laptop-screen.png" 
                alt="EcoLoop Web Dashboard" 
                className="h-full w-full object-cover opacity-95"
                onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' }}
              />
            </motion.div>

            {/* Screen Glare */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-black/5 opacity-40" />
            
            {/* Webcam Hole */}
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black/80 rounded-full" />
          </div>
        </div>

        {/* Hinge */}
        <div className="relative mx-auto h-1.5 w-[94%] rounded-full bg-slate-800 -mt-[2px] z-10" />

        {/* Laptop Base (Keyboard Deck) */}
        <div
          className="relative h-20 w-[98%] mx-auto bg-[#2b2f35] rounded-b-lg border-t border-slate-600 shadow-2xl overflow-hidden"
          style={{
            transform: 'rotateX(-58deg) translateY(-14px)',
            transformOrigin: 'top',
            boxShadow: '0 20px 32px rgba(0,0,0,0.35)'
          }}
        >
          {/* Metallic finish */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-400/15 via-slate-700/5 to-slate-950/25" />

          {/* Keyboard layout */}
          <div className="absolute inset-x-5 top-2.5 bottom-6 opacity-75">
            <div className="mb-1 grid grid-cols-14 gap-[2px]">
              {[...Array(14)].map((_, i) => (
                <div key={`fn-${i}`} className="h-1 rounded-[1px] bg-slate-900 border border-slate-800/70" />
              ))}
            </div>

            <div className="grid grid-cols-14 gap-[2px]">
              {[...Array(42)].map((_, i) => (
                <div key={`k-${i}`} className="h-2 rounded-[1px] bg-slate-900 border border-slate-800/70" />
              ))}
            </div>

            <div className="mt-[2px] grid grid-cols-14 gap-[2px]">
              <div className="col-span-2 h-2 rounded-[1px] bg-slate-900 border border-slate-800/70" />
              <div className="col-span-2 h-2 rounded-[1px] bg-slate-900 border border-slate-800/70" />
              <div className="col-span-6 h-2 rounded-[1px] bg-slate-900 border border-slate-800/70" />
              <div className="col-span-2 h-2 rounded-[1px] bg-slate-900 border border-slate-800/70" />
              <div className="col-span-2 h-2 rounded-[1px] bg-slate-900 border border-slate-800/70" />
            </div>
          </div>

          {/* Trackpad */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900/55 rounded-sm border border-slate-700/60 shadow-inner" />

          {/* Front lip */}
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Front thickness strip */}
        <div
          className="relative h-2.5 w-[98%] mx-auto bg-slate-900 rounded-b-md -mt-4"
          style={{
            boxShadow: '0 10px 20px rgba(0,0,0,0.45)'
          }}
        />
      </motion.div>

      {/* Shadow */}
      <div className="absolute -bottom-10 inset-x-8 h-10 bg-black/20 rounded-full blur-2xl pointer-events-none z-[-1]" />
    </motion.div>
  );
};

export default LaptopMockup;
