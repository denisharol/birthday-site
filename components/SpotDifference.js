"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SpotDifference({ onNext }) {
  const [hasSelected, setHasSelected] = useState(false);
  const baseUrl = "https://raw.githubusercontent.com/denisharol/images/main/spot-the-difference/";

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] space-y-12">
      <AnimatePresence mode="wait">
        {!hasSelected ? (
          /* Game Phase: Images are visible */
          <motion.div 
            key="game-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-12 w-full"
          >
            <div className="text-center space-y-4">
              <h2 className="text-6xl font-serif italic tracking-tighter">Spot the Difference</h2>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">
                Click the picture that looks better
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl px-4">
              {["Lisa 1.jpg", "Lisa 2.jpg"].map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setHasSelected(true)}
                  className="cursor-pointer aspect-[3/4] overflow-hidden rounded-2xl shadow-xl bg-zinc-100 border-8 border-white dark:border-zinc-800"
                >
                  <img 
                    src={`${baseUrl}${img}`} 
                    alt="Comparison" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Reveal Phase: Pictures are gone, only message and button remain */
          <motion.div 
            key="reveal-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col items-center gap-10 text-center max-w-2xl px-6"
          >
            <p className="text-3xl md:text-4xl font-serif italic leading-relaxed">
              "Tricked you! There was actually no difference. They're the same picture, both as perfect as the other."
            </p>
            
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={onNext}
              className="px-12 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[11px] tracking-[0.5em] font-bold active:scale-95 transition-transform"
            >
              Proceed
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}