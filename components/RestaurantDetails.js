"use client";
import { motion } from 'framer-motion';

export default function RestaurantDetails({ restaurant, onBack, onConfirm }) {
  if (!restaurant) return null;

  const baseUrl = "https://raw.githubusercontent.com/denisharol/images/main/restaurants/";
  
  // Helper to get correct filename based on your repo structure
  const getFileName = (num) => {
    // Handle Dispatch Grill case-sensitivity: Pic 1 and Pic 2 are capitalized
    if (restaurant.name === "Dispatch Grill" && (num === 1 || num === 2)) {
      return `Pic%20${num}`;
    }
    return `pic%20${num}`;
  };

  const images = Array.from({ length: restaurant.count }, (_, i) => i + 1);

  return (
    <div className="space-y-20 py-10 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-zinc-100 dark:border-zinc-800 pb-12">
        <div className="space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-8xl font-serif italic tracking-tighter"
          >
            {restaurant.name}
          </motion.h2>
          <p className="text-zinc-500 max-w-xl font-light italic text-xl leading-relaxed">
            "{restaurant.msg}"
          </p>
        </div>
        
        <div className="flex gap-8 pb-2">
          <button 
            onClick={onBack} 
            className="text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:text-zinc-500"
          >
            Go Back
          </button>
          <button 
            onClick={onConfirm} 
            className="px-10 py-5 uppercase text-[10px] tracking-[0.4em] bg-zinc-900 text-white dark:bg-white dark:text-black font-bold active:scale-95 transition-transform"
          >
            Select This Restaurant
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {images.map((num) => (
          <motion.div
            key={`${restaurant.name}-pic-${num}`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="break-inside-avoid rounded-[2rem] overflow-hidden bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm"
          >
            <img
              src={`${baseUrl}${restaurant.folder}/${getFileName(num)}.${restaurant.ext}`}
              alt={`${restaurant.name} ${num}`}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
              onError={(e) => {
                console.error(`Error loading: ${e.target.src}`);
                e.target.style.display = 'none';
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center pt-20 pb-32 space-y-6">
        <button 
          onClick={onConfirm}
          className="group flex flex-col items-center gap-4 uppercase text-[11px] tracking-[0.6em] font-bold"
        >
          <span>Confirm Selection</span>
          <div className="w-20 h-[2px] bg-zinc-900 dark:bg-white group-hover:w-40 transition-all duration-700" />
        </button>
      </div>
    </div>
  );
}