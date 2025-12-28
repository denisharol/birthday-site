"use client";
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

export default function BirthdayReveal({ onNext, logEgg }) {
  const [phase, setPhase] = useState('center');
  const [showButton, setShowButton] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  
  // Counter State
  const [count, setCount] = useState(0);
  const [isCountDone, setIsCountDone] = useState(false);

  const subtopicText = "This is a great milestone that you should be very happy and proud about.";

  // Easter Egg Trigger
  const handleEgg = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) logEgg();
  };

  useEffect(() => {
    // Confetti logic
    let c = 0;
    const interval = setInterval(() => {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
      c++;
      if (c >= 4) clearInterval(interval);
    }, 800);

    // Trigger Phase Split after 2 seconds
    const timer = setTimeout(() => setPhase('split'), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Rolling Counter Logic
  useEffect(() => {
    if (phase === 'split') {
      const startDelay = setTimeout(() => {
        let current = 0;
        const counterInterval = setInterval(() => {
          current += 1;
          setCount(current);
          if (current === 25) {
            clearInterval(counterInterval);
            setIsCountDone(true);
          }
        }, 100); // Speed 100ms
      }, 500);

      return () => clearTimeout(startDelay);
    }
  }, [phase]);

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4 overflow-hidden -mt-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-16 relative">
        
        {/* Profile Image */}
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
            
            {/* Dynamic Header */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight leading-tight flex flex-col items-center md:items-start">
              
              {/* LINE 1: Happy 25TH */}
              <div className="flex items-baseline">
                {/* "Happy" */}
                <span className="flex mr-3">
                  {"Happy".split("").map((char, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ delay: i * 0.05 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>

                {/* "25" (Counter) - Plain Black/Dark Text */}
                {count > 0 && (
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="min-w-[1.2em] text-center" // Removed amber color
                  >
                    {count}
                  </motion.span>
                )}

                {/* "TH" - Sticks directly to 25 */}
                {isCountDone && (
                  <span className="flex">
                    {"TH".split("").map((char, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ delay: i * 0.1 }} 
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                )}
              </div>

              {/* LINE 2: birthday Lisa. (Only appears after count is done) */}
              {isCountDone && (
                <div className="flex items-baseline mt-1">
                  {"birthday Lisa.".split(" ").map((word, wIndex) => (
                    <span key={wIndex} className={`flex ${wIndex > 0 ? "ml-3" : ""}`}>
                      {word.split("").map((char, cIndex) => (
                        <motion.span 
                          key={`${wIndex}-${cIndex}`} 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          // Starts typing after "TH" finishes
                          transition={{ delay: 0.5 + (wIndex * 0.2) + (cIndex * 0.08) }} 
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </div>
              )}
            </h2>

            {/* Subtopic Text */}
            {isCountDone && (
              <p 
                onClick={handleEgg}
                className="text-lg md:text-xl text-zinc-500 italic font-light cursor-pointer select-none"
              >
                {subtopicText.split("").map((char, i) => (
                  <motion.span 
                    key={i} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    // Starts typing after "birthday Lisa." finishes (~2s delay)
                    transition={{ delay: 2.5 + (i * 0.05) }} 
                    onAnimationComplete={() => {
                      if (i === subtopicText.length - 1) setShowButton(true);
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </p>
            )}
            
            {/* Proceed Button */}
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