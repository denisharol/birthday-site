"use client";
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayReveal({ onNext, logEgg }) {
  const [phase, setPhase] = useState('center');
  const [showButton, setShowButton] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const titleText = "Happy 25TH birthday Lisa.";
  const subtopicText = "This is a great milestone that you should be very happy and proud about.";

  // Easter Egg Trigger
  const handleEgg = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) logEgg();
  };

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
      count++;
      if (count >= 4) clearInterval(interval);
    }, 800);

    const timer = setTimeout(() => setPhase('split'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 overflow-hidden -mt-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-16 relative">
        
        {/* Profile Image - Responsive sizing */}
        <motion.div 
          layout
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className={`relative w-full max-w-[280px] md:max-w-sm aspect-[4/5] rounded-2xl shadow-2xl border-4 border-white dark:border-zinc-800 z-10 ${phase === 'center' ? 'mx-auto' : ''}`}
        >
          <img 
            src="https://raw.githubusercontent.com/denisharol/images/main/spot-the-difference/Lisa%201.jpg" 
            className="w-full h-full object-cover rounded-xl" 
            alt="Lisa" 
          />
        </motion.div>
        
        {phase === 'split' && (
          <div className="flex-1 space-y-4 max-w-xl text-center md:text-left">
            {/* Title Text - Responsive sizing */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight">
              {titleText.split("").map((char, i) => (
                <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  {char}
                </motion.span>
              ))}
            </h2>

            {/* Subtopic Text - Trigger for Egg 3 */}
            <p 
              onClick={handleEgg}
              className="text-lg md:text-xl text-zinc-500 italic font-light cursor-pointer select-none"
            >
              {subtopicText.split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1.2 + (i * 0.03) }}
                  onAnimationComplete={() => {
                    if (i === subtopicText.length - 1) setShowButton(true);
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </p>
            
            {/* Restored: Proceed Button */}
            <AnimatePresence>
              {showButton && (
                <motion.button 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  onClick={onNext}
                  className="mt-8 px-10 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-widest active:scale-95 transition-transform"
                >
                  Proceed to Gallery
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}