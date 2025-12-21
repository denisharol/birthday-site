"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function MenuViewer({ restaurant, onNext }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use a high-quality JPG or PNG version of your menu for instant loading
  const menuImageUrl = "https://raw.githubusercontent.com/denisharol/images/main/menus/menu-image.jpg";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 px-6 space-y-12">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-7xl font-serif italic tracking-tighter leading-none">
          The Menu
        </h2>
        <p className="text-[11px] uppercase tracking-[0.5em] text-zinc-400 max-w-md mx-auto leading-relaxed">
          Browse the culinary offerings for your birthday dinner
        </p>
      </div>

      {/* Instant-Load Image Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-3xl bg-zinc-50 dark:bg-zinc-900 shadow-2xl rounded-sm border border-zinc-100 dark:border-zinc-800 overflow-y-auto max-h-[75vh] custom-scrollbar"
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
             <div className="w-6 h-6 border-2 border-zinc-200 border-t-zinc-900 dark:border-t-white rounded-full animate-spin" />
          </div>
        )}

        <img 
          src={menuImageUrl}
          alt="Restaurant Menu"
          className={`w-full h-auto transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            // If the image fails, it falls back to a clean message
            e.target.parentElement.innerHTML = '<div class="p-20 text-center font-serif italic text-zinc-400">Menu loading...</div>';
          }}
        />
        
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.05)]" />
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-col items-center space-y-8 pb-20">
        <p className="text-sm font-serif italic text-zinc-500 italic">
          Ready to move to the final chapter?
        </p>
        <button 
          onClick={onNext}
          className="px-12 py-5 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.5em] font-bold active:scale-95 transition-transform"
        >
          Proceed to Video
        </button>
      </div>
    </div>
  );
}