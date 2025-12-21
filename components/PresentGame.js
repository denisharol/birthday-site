"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFTS = [
  { 
    name: "Necklace", 
    img: "https://raw.githubusercontent.com/denisharol/images/main/bonus-presents/Necklase.webp",
    correct: false 
  },
  { 
    name: "Oraimo Spacebuds", 
    img: "https://raw.githubusercontent.com/denisharol/images/main/bonus-presents/Oraimo%20spacebuds.webp",
    correct: false 
  },
  { 
    name: "Gift Hamper", 
    img: "https://raw.githubusercontent.com/denisharol/images/main/bonus-presents/gift%20hamper.jpg",
    correct: true 
  }
];

export default function PresentGame({ onWin, onLose }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.h2
            key="intro-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-5xl font-serif text-center leading-tight max-w-2xl"
          >
            After a year like that, you deserve something nice. <br/>
            <span className="italic">Guess what I got you?</span>
          </motion.h2>
        ) : (
          <div className="w-full max-w-6xl space-y-12">
            <motion.h2 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-sm uppercase tracking-[0.5em] text-zinc-400"
            >
              Select your guess
            </motion.h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {GIFTS.map((gift, i) => (
                <motion.button
                  key={gift.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, type: "spring", stiffness: 100 }}
                  onClick={() => gift.correct ? onWin() : onLose()}
                  className="group flex flex-col items-center gap-6"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-4 border-transparent group-hover:border-zinc-900 dark:group-hover:border-white transition-all">
                    <img src={gift.img} className="w-full h-full object-cover" alt={gift.name} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {gift.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}