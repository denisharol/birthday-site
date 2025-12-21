"use client";
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function MemeReveal({ onNext, logEgg }) {
  const timerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => onNext(), 5000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.h3 className="text-lg md:text-xl font-serif italic mb-6">
        "I hope you get this joke! Haha"
      </motion.h3>
      <motion.div 
        onTouchStart={() => {
          timerRef.current = setTimeout(() => logEgg(), 3000);
        }}
        onTouchEnd={() => clearTimeout(timerRef.current)}
        className="w-full max-w-[280px] md:max-w-sm overflow-hidden shadow-2xl rounded-lg bg-zinc-100"
      >
        <img src="https://raw.githubusercontent.com/denisharol/images/main/memes/meme%201.jpg" alt="Meme" className="w-full h-auto" />
      </motion.div>
      <p className="mt-8 text-[9px] uppercase tracking-[0.5em] opacity-30 animate-pulse">
        Transitioning...
      </p>
    </div>
  );
}