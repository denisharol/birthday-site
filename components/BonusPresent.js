"use client";
import { motion } from 'framer-motion';

const GIFTS = [
  { name: "Necklace", img: "https://raw.githubusercontent.com/denisharol/images/main/bonus-presents/Necklase.webp" },
  { name: "Oraimo Spacebuds", img: "https://raw.githubusercontent.com/denisharol/images/main/bonus-presents/Oraimo%20spacebuds.webp" },
  { name: "Gift Hamper", img: "https://raw.githubusercontent.com/denisharol/images/main/bonus-presents/gift%20hamper.jpg" }
];

export default function BonusPresent({ onSelect }) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 space-y-12">
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-serif italic"
        >
          I KNEW you'd get it!
        </motion.h2>
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
          Now pick something extra for your special day
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {GIFTS.map((gift, i) => (
          <motion.button
            key={gift.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(gift.name)}
            className="group flex flex-col items-center gap-6"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 transition-transform active:scale-95">
              <img src={gift.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={gift.name} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
              {gift.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}