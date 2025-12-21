"use client";
import { motion } from 'framer-motion';

export default function FinalVideo({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12 px-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif italic tracking-tight">Final Chapter</h2>
        <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-400">A special message for you</p>
      </div>

      {/* Resized to match YouTube player (max-w-3xl aspect-video) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-3xl aspect-video shadow-2xl rounded-3xl overflow-hidden bg-black"
      >
        <video controls autoPlay className="w-full h-full object-cover">
          <source src="https://raw.githubusercontent.com/denisharol/images/main/videos/vid%201.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <button 
        onClick={onNext}
        className="px-12 py-5 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-transform"
      >
        Complete
      </button>
    </div>
  );
}