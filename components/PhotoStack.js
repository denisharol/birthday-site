"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LISA_IMAGES = Array.from({ length: 15 }, (_, i) => 
  `https://raw.githubusercontent.com/denisharol/images/main/Lisa/Lisa%20${i + 1}.jpg`
);

export default function PhotoStack({ onNext }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const timerRef = useRef(null);

  // Auto-scroll to bottom logic preserved
  useEffect(() => {
    LISA_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  // Mobile-Only Easter Egg: Long press trigger
  const handleTouchStart = () => {
    timerRef.current = setTimeout(() => {
      setShowSecret(true);
      if (navigator.vibrate) navigator.vibrate(50); // Haptic feedback for phone
    }, 2000);
  };

  const handleTouchEnd = () => clearTimeout(timerRef.current);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-visible">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16 overflow-visible">
        
        {/* Left Side: Editorial Text 
            Mobile: Centered, smaller text | Desktop: Left-aligned, 8xl text */}
        <div className="space-y-6 text-center md:text-left md:w-1/3 z-20">
          <motion.h2 
            onContextMenu={(e) => e.preventDefault()} // Prevents context menu on long press
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="text-6xl md:text-8xl font-serif tracking-tighter leading-none cursor-default select-none"
          >
            All you
          </motion.h2>
          
          <motion.p className="text-[10px] md:text-sm uppercase tracking-widest text-zinc-400 max-w-xs mx-auto md:mx-0 leading-relaxed">
            A curated selection of moments from your journey so far.
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 pt-4 items-center">
            {isExpanded && (
              <button 
                onClick={() => setIsExpanded(false)} 
                className="text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:text-zinc-500"
              >
                Back to Stack
              </button>
            )}
            <button 
              onClick={onNext} 
              className="px-10 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-transform"
            >
              Achievements
            </button>
          </div>
        </div>

        {/* Right Side: The Stack 
            Mobile: Downscaled for screen width | Desktop: Original size */}
        <div className="relative md:w-2/3 flex items-center justify-center min-h-[450px] md:min-h-[600px] overflow-visible w-full">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div 
                key="stacked"
                className="relative cursor-pointer will-change-transform scale-[0.8] md:scale-100"
                onClick={() => setIsExpanded(true)}
              >
                {[0, 1, 2, 3, 4, 5, 6].map((imgIndex, i) => (
                  <motion.div
                    key={imgIndex}
                    whileHover={{ rotate: (i - 3) * 12, x: (i - 3) * 60, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute top-0 left-0 w-64 h-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl"
                    style={{ zIndex: 20 - i, rotate: i * 4 - 12 }}
                  >
                    <img src={LISA_IMAGES[imgIndex]} className="w-full h-full object-cover" alt="Lisa" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full"
              >
                {LISA_IMAGES.map((src, i) => (
                  <motion.div key={i} className={`relative overflow-hidden ${i % 5 === 0 ? 'row-span-2 col-span-2' : ''}`}>
                    <img src={src} className="w-full h-full object-cover rounded-xl" alt={`Lisa ${i + 1}`} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Secret Mobile Easter Egg Polaroid */}
      <AnimatePresence>
        {showSecret && (
          <motion.div 
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 5 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setShowSecret(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-10"
          >
            <div className="bg-white p-4 pb-12 shadow-2xl rounded-sm transform rotate-3 max-w-[300px]">
              <img src={LISA_IMAGES[10]} className="w-full aspect-square object-cover" />
              <p className="font-serif italic text-black mt-4 text-center">Found a secret. ✨</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}