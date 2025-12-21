"use client";
import { motion } from 'framer-motion';

const PREDICTIONS = [
  "25 will be the year your career takes a global turn.",
  "A surprise invitation in three months will change your trajectory.",
  "Your creative energy is at an all-time high; trust your instincts.",
  "You will find peace in a place you once found chaotic."
];

export default function Oracle({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12">
      <div className="relative">
        <motion.div 
          animate={{ 
            boxShadow: ["0 0 20px rgba(0,0,0,0.1)", "0 0 60px rgba(0,0,0,0.2)", "0 0 20px rgba(0,0,0,0.1)"],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-48 h-48 rounded-full bg-gradient-to-tr from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-600 flex items-center justify-center border border-white/20 backdrop-blur-3xl"
        >
          <span className="text-4xl">🔮</span>
        </motion.div>
      </div>

      <div className="space-y-6 max-w-2xl">
        <h2 className="text-4xl font-serif italic">The Oracle Predicts...</h2>
        <div className="grid gap-4">
          {PREDICTIONS.map((p, i) => (
            <motion.p 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.5 }}
              className="text-lg text-zinc-500 dark:text-zinc-400 font-light italic"
            >
              "{p}"
            </motion.p>
          ))}
        </div>
      </div>

      <button 
        onClick={onNext}
        className="mt-8 px-12 py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 uppercase text-[10px] tracking-[0.4em] hover:scale-105 transition-transform"
      >
        Reveal More
      </button>
    </div>
  );
}