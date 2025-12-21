"use client";
import { motion } from 'framer-motion';

const RESTAURANTS = [
  { name: "Artisan Blend", folder: "Artisan%20blend", count: 5, ext: "jpg", msg: "The perfect aesthetic for the perfect person." },
  { name: "Crave Restaurant", folder: "Crave%20restaurant", count: 5, ext: "jpg", msg: "For those who know exactly what they want." },
  { name: "Dawn Culinary", folder: "Dawn%20Culinary", count: 5, ext: "webp", msg: "A fresh taste for a fresh year." },
  { name: "Dispatch Grill", folder: "Dispatch%20Grill", count: 7, ext: "jpg", msg: "Bold, smoky, and unforgettable." },
  { name: "Ezo Restaurant", folder: "Ezo%20Restaurant", count: 5, ext: "jpg", msg: "Classy and refined, just like you." },
  { name: "Meko", folder: "Meko", count: 5, ext: "jpg", msg: "Minimalist vibes, maximum flavor." },
  { name: "Slate", folder: "Slate", count: 5, ext: "jpg", msg: "Sharp, modern, and high-end." },
  { name: "Upepo Restaurant", folder: "Upepo%20Restaurant", count: 6, ext: "jpg", msg: "Let the wind take you to great food." }
];

export default function RestaurantSelector({ onSelect }) {
  const baseUrl = "https://raw.githubusercontent.com/denisharol/images/main/restaurants/";

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center min-h-[70vh] gap-24 py-10 overflow-visible">
      
      {/* Left Side: Title & Interaction */}
      <div className="lg:w-1/4 space-y-10 lg:sticky lg:top-40 z-10">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl font-serif leading-[0.9] tracking-tighter"
          >
            Pick a<br/>Destination
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[11px] uppercase tracking-[0.4em] text-zinc-400 leading-relaxed max-w-[200px]"
          >
            Select where we celebrate your milestone.
          </motion.p>
        </div>
        
        <button 
          onClick={() => onSelect(RESTAURANTS[Math.floor(Math.random() * RESTAURANTS.length)])}
          className="w-full max-w-[220px] py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-transform"
        >
          Pick for Me
        </button>
      </div>
      
      {/* Right Side: The Grid */}
      <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-visible">
        {RESTAURANTS.map((r, i) => {
          // Fix for Dispatch Grill: Thumbnail Pic 1 is capitalized in your repo
          const fileName = (r.name === "Dispatch Grill") ? "Pic%201" : "pic%201";
          
          return (
            <motion.div 
              key={r.name} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelect(r)} 
              className="group cursor-pointer relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900 rounded-2xl"
            >
              <img 
                src={`${baseUrl}${r.folder}/${fileName}.${r.ext}`} 
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                alt={r.name}
                onError={(e) => {
                  console.error(`Failed to load thumbnail for ${r.name}`);
                  e.target.src = "https://via.placeholder.com/400x600?text=Image+Loading...";
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <span className="text-white text-[10px] uppercase tracking-[0.4em] font-bold leading-relaxed px-2">
                  {r.name}
                </span>
                <div className="w-8 h-[1px] bg-white mt-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}