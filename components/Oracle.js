"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Distinct predictions for each card
const TAROT_CARDS = [
  {
    id: 0,
    name: "The Sovereign",
    desc: "25 is your year, now that your frontal lobe is fully developed you can make better and more informed decisions. I forsee a year of you pivoting your life in a good direction based on the good decisions you will make.",
    color: "from-purple-500 to-indigo-600"
  },
  {
    id: 1,
    name: "The Alchemist",
    desc: "Your transformation is inevitable. A more serendipitous year coming ahead, keep sending in those job applications, your dream job is looking your way.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    id: 2,
    name: "The Navigator",
    desc: "New horizons. You will find peace in a place you'll be visiting this year. Trust your compass; the path isn't straight, but the destination is magnificent.",
    color: "from-amber-500 to-orange-600"
  }
];

export default function Oracle({ onNext, logEgg }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [shakeCard, setShakeCard] = useState(null); 

  // Mobile Easter Egg: Shake to trigger Egg #7
  useEffect(() => {
    const handleDevMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      if (Math.abs(acc.x) > 20 || Math.abs(acc.y) > 20) {
        logEgg(); 
        if (navigator.vibrate) navigator.vibrate(200);
      }
    };
    window.addEventListener('devicemotion', handleDevMotion);
    return () => window.removeEventListener('devicemotion', handleDevMotion);
  }, [logEgg]);

  const handleCardClick = (index) => {
    if (selectedCard !== null && selectedCard !== index) {
      setShakeCard(index);
      setTimeout(() => setShakeCard(null), 500);
      return;
    }
    setSelectedCard(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full perspective-[1000px] px-4">
      
      {/* Header Text */}
      <div className="text-center space-y-4 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-serif italic tracking-tighter"
        >
          Choose Your Fate
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-zinc-400"
        >
          {selectedCard !== null ? "The Oracle has spoken." : "Three paths lie before you. Pick one."}
        </motion.p>
      </div>

      {/* The 3D Cards Container */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center w-full max-w-5xl">
        {TAROT_CARDS.map((card, index) => {
          const isSelected = selectedCard === index;
          const isOtherSelected = selectedCard !== null && !isSelected;
          const isShaking = shakeCard === index;

          return (
            <div 
              key={card.id} 
              className="relative w-64 h-96 cursor-pointer group" 
              onClick={() => handleCardClick(index)}
            >
              <motion.div
                animate={
                  isShaking ? { x: [-5, 5, -5, 5, 0] } : 
                  isSelected ? { rotateY: 180, scale: 1.1, zIndex: 50 } : 
                  isOtherSelected ? { opacity: 0.5, scale: 0.9, filter: "blur(2px)" } : 
                  { y: [0, -15, 0] } 
                }
                transition={
                  isShaking ? { duration: 0.4 } :
                  isSelected ? { duration: 0.8, type: "spring", stiffness: 60 } :
                  { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                }
                className="w-full h-full relative preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* --- FRONT OF CARD (Face Down) --- */}
                <div 
                  className="absolute inset-0 backface-hidden rounded-2xl border-2 border-yellow-500/30 bg-zinc-900 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute inset-0 opacity-20" 
                    style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #fbbf24 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
                  />
                  
                  {/* Central Avatar Container */}
                  <div className="w-24 h-24 rounded-full border-2 border-yellow-500/30 flex items-center justify-center relative p-1">
                    {/* Glowing Pulse Effect */}
                    <div className="absolute inset-0 border border-yellow-500/20 rounded-full animate-ping opacity-20" />
                    
                    {/* Replaced Emoji with Image Avatar */}
                    <img 
                      src="/splash/lisa-portrait.jpg" 
                      alt="Avatar" 
                      className="w-full h-full object-cover rounded-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                    />
                  </div>
                  
                  <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-yellow-500/60 font-bold">
                    Card {index + 1}
                  </p>
                </div>

                {/* --- BACK OF CARD (The Reveal) --- */}
                <div 
                  className={`absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${card.color} text-white border border-white/20`}
                  style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black/20" /> 
                  
                  <div className="relative z-10 space-y-6">
                    {/* Emoji removed from back, kept text/icon logic clean */}
                    <span className="text-6xl drop-shadow-md">{card.icon}</span>
                    <div>
                      <h3 className="text-2xl font-serif italic font-bold mb-2">{card.name}</h3>
                      <div className="w-12 h-[1px] bg-white/50 mx-auto" />
                    </div>
                    <p className="text-sm leading-relaxed font-light opacity-90">
                      "{card.desc}"
                    </p>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                </div>

              </motion.div>
              
              <AnimatePresence>
                {isShaking && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-12 left-0 right-0 text-center"
                  >
                    <span className="text-[9px] uppercase tracking-widest text-red-400 font-bold bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">
                      Fate is sealed
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedCard !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16"
          >
            <button 
              onClick={onNext}
              className="px-12 py-5 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-transform shadow-lg hover:shadow-xl"
            >
              Accept Prediction
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}