"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- Internal Components for Decoration ---
const DoodleStar = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`absolute opacity-40 ${className}`}>
    <path d="M50,5 L65,35 L95,35 L70,55 L80,85 L50,65 L20,85 L30,55 L5,35 L35,35 Z" 
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
  </svg>
);

const DoodleHeart = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`absolute opacity-40 ${className}`}>
    <path d="M50,30 Q70,5 90,30 Q100,60 50,90 Q0,60 10,30 Q30,5 50,30" 
      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export default function Summary({ selections, onReset }) {
  const [isBookletVisible, setBookletVisible] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);

  // 1. Open the overlay
  const handleComplete = () => {
    setBookletVisible(true);
  };

  // 2. Toggle Book Open/Close
  const toggleBook = (e) => {
    e.stopPropagation(); // Prevent triggering the background click
    setIsBookOpen(!isBookOpen);
  };

  // 3. Click Outside -> Refresh Page
  const handleOutsideClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-12">
        {/* --- Standard Summary View --- */}
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-serif italic tracking-tighter uppercase"
          >
            The Ledger
          </motion.h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-400">
            A summary of your 25th birthday selections
          </p>
        </div>

        <div className="w-full max-w-md py-12 border-y border-zinc-100 dark:border-zinc-800 space-y-10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Gift Selection</span>
            <p className="text-3xl font-serif mt-3 italic">
              {selections.gift || "None"} 
              {selections.bonus && <span className="block text-xl opacity-60">+ {selections.bonus}</span>}
            </p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Venue Choice</span>
            <p className="text-3xl font-serif mt-3 italic">
              {selections.restaurant || "None selected"}
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <p className="text-sm italic font-serif text-zinc-500">
            "Not happy with your selections?"
          </p>
          <div className="flex flex-wrap gap-8 items-center justify-center">
            <button 
              onClick={onReset} 
              className="text-[10px] uppercase tracking-[0.5em] font-bold hover:text-zinc-400 transition-colors"
            >
              Start Over
            </button>
            <button 
              onClick={handleComplete} 
              className="px-10 py-4 bg-zinc-900 text-white dark:bg-white dark:text-black uppercase text-[10px] tracking-[0.4em] font-bold active:scale-95 transition-transform shadow-xl"
            >
              Complete Experience
            </button>
          </div>
        </div>
      </div>

      {/* --- The Booklet Overlay --- */}
      <AnimatePresence>
        {isBookletVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick} // Clicking background refreshes page
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            {/* Instruction Tooltip */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={1}
              className="absolute bottom-10 text-white/50 text-xs uppercase tracking-widest pointer-events-none"
            >
              Tap outside to close & refresh
            </motion.div>

            {/* --- The 3D Book Container --- */}
            <div className="relative w-[300px] h-[420px] md:w-[350px] md:h-[500px] perspective-[1500px]">
              <motion.div
                onClick={toggleBook}
                animate={{ 
                  translateX: isBookOpen ? "50%" : "0%" // Shift right when opening to stay centered
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative w-full h-full preserve-3d cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                
                {/* 1. The Front Cover (Rotates) */}
                <motion.div
                  animate={{ rotateY: isBookOpen ? -180 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  style={{ transformOrigin: "left", transformStyle: "preserve-3d" }}
                  className="absolute inset-0 w-full h-full z-20"
                >
                  {/* Front of Cover (Blue) */}
                  <div 
                    className="absolute inset-0 bg-blue-900 rounded-r-md rounded-l-sm shadow-2xl flex flex-col items-center justify-center border-l-4 border-blue-950 backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Golden Frame & Avatar */}
                    <div className="w-32 h-32 rounded-full border-4 border-yellow-500/50 p-1 mb-8 shadow-inner">
                      <img 
                        src="/splash/lisa-portrait.jpg" 
                        alt="Avatar" 
                        className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" 
                      />
                    </div>
                    <h3 className="font-serif italic text-2xl text-yellow-100/80">For Muthoni</h3>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-blue-300 mt-2">Strictly Confidential</p>
                  </div>

                  {/* Back of Cover (Inner Left - plain paper texture) */}
                  <div 
                    className="absolute inset-0 bg-[#f8f5e6] rounded-l-md rounded-r-sm shadow-md border-r-4 border-zinc-200 rotate-y-180 backface-hidden flex items-center justify-center"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    <DoodleStar className="w-20 h-20 text-blue-900 opacity-10" />
                  </div>
                </motion.div>

                {/* 2. The Inside Page (Static, sits behind cover) */}
                <div className="absolute inset-0 bg-[#fffdf7] rounded-r-md rounded-l-sm shadow-xl z-10 flex flex-col overflow-hidden">
                  {/* Notebook Lines CSS */}
                  <div 
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                    style={{
                      backgroundImage: 'linear-gradient(#9ca3af 1px, transparent 1px)',
                      backgroundSize: '100% 1.8rem',
                      marginTop: '2rem'
                    }}
                  />
                  
                  {/* Doodles */}
                  <DoodleStar className="top-4 right-4 w-12 h-12 text-blue-600 rotate-12" />
                  <DoodleHeart className="bottom-4 right-6 w-10 h-10 text-red-400 -rotate-12" />
                  <DoodleStar className="bottom-12 left-4 w-8 h-8 text-yellow-500 rotate-45" />

                  {/* The Letter Content */}
                  <div className="relative z-10 p-6 md:p-8 pt-12 h-full flex flex-col text-left">
                    <p className="font-serif text-zinc-400 text-xs italic mb-4 text-right">2nd January, 2026</p>
                    
                    <div className="font-serif text-zinc-800 leading-[1.8rem] text-sm md:text-base space-y-4">
                      <p>
                        <span className="text-2xl font-bold text-blue-900 mr-1">D</span>ear Muthoni,
                      </p>
                      <p>
                        Happy 25th Birthday! A quarter of a century has officially passed, and look at the incredible person you have become.
                      </p>
                      <p>
                        I hope this little digital journey brought a smile to your face. I'm proud  of the resilience, beauty, and grace you've moved with so far. As you turn this page into your next chapter, remember that you are capable of everything you dream of.
                      </p>
                      <p>
                        May this year treat you with kindness. 
                      </p>
                      <p className="mt-8 font-bold text-blue-900 text-right">
                        With love,<br/>
                        <span className="text-xs font-normal text-zinc-500 uppercase tracking-widest">Obieze</span>
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}