"use client";
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
  { 
    title: "Got a Job", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/employeeofthemonth.jpg", 
    text: "You put in incredible effort and dedication into your work. Watching you grow professionally has been amazing, and I'm so proud of how you tackle every challenge with determination." 
  },
  { 
    title: "Graduated with Second Class Upper", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/graduation.jpg", 
    text: "You accomplished something truly big. Your hard work paid off and you made everyone who loves you incredibly proud. This is just the beginning of your success story." 
  },
  { 
    title: "Learned Essential Skills", 
    image: null, 
    text: "You didn't just get a job - you mastered the skills needed to excel in the job market. Your commitment to growth and learning is inspiring." 
  },
  { 
    title: "Made Amazing Friends", 
    image: null, 
    text: "You built genuine connections and friendships this year. Your warm personality draws people in, and you've created a wonderful circle around you." 
  },
  { 
    title: "Completed Your Education", 
    image: null, 
    text: "You successfully finished your educational journey and made your family and parents incredibly proud. This milestone is a testament to your perseverance." 
  }
];

export default function Achievements({ onNext }) {
  const [index, setIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate) {
      if (index < DATA.length - 1) {
        setIndex(prev => prev + 1);
        setProgress(0);
        setShouldNavigate(false);
      } else {
        onNext();
      }
    }
  }, [shouldNavigate, index, onNext]);

  useEffect(() => {
    if (isPaused || shouldNavigate) return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setShouldNavigate(true);
          return 100;
        }
        return prev + 0.5; 
      });
    }, 20);
    return () => clearInterval(interval);
  }, [isPaused, shouldNavigate]);

  return (
    <div className="relative min-h-[75vh] flex flex-col justify-center px-4 select-none"
      onMouseDown={() => setIsPaused(true)} 
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)} 
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        {index === -1 ? (
          <motion.h2 
            key="intro" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="text-6xl font-serif text-center leading-tight tracking-tighter"
          >
            These are all the things you achieved all before 25
          </motion.h2>
        ) : (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto w-full"
          >
            <div className="space-y-6">
              <h3 className="text-5xl font-serif italic font-bold tracking-tight">
                {DATA[index]?.title}
              </h3>
              <p className="text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {DATA[index]?.text}
              </p>
            </div>

            {/* Image Container with Full Visibility Logic */}
            <motion.div 
              animate={{ 
                rotate: index % 2 === 0 ? 3 : -3 
              }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative aspect-square w-full flex items-center justify-center rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 shadow-2xl border-8 border-white dark:border-zinc-800 overflow-hidden"
            >
              {DATA[index]?.image ? (
                <>
                  {/* Blurred Background for aesthetic padding */}
                  <img 
                    src={DATA[index].image} 
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110" 
                    alt="" 
                  />
                  {/* The Main Fully Visible Image */}
                  <img 
                    src={DATA[index].image} 
                    className="relative w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105" 
                    alt={DATA[index].title} 
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center p-12 text-center">
                  <span className="text-zinc-300 dark:text-zinc-700 font-serif italic text-2xl">
                    A milestone worth celebrating
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar: Starting at edges, meeting in center */}
      <div className="fixed bottom-12 left-0 right-0 h-[4px] flex px-10 md:px-20 z-50">
        <div className="flex-1 relative overflow-hidden rounded-l-full bg-zinc-200/50 dark:bg-zinc-800/50">
          <motion.div 
            style={{ width: `${progress}%` }} 
            className="absolute left-0 h-full bg-zinc-900 dark:bg-white origin-left" 
          />
        </div>
        <div className="flex-1 relative overflow-hidden rounded-r-full bg-zinc-200/50 dark:bg-zinc-800/50">
          <motion.div 
            style={{ width: `${progress}%` }} 
            className="absolute right-0 h-full bg-zinc-900 dark:bg-white origin-right" 
          />
        </div>
      </div>

      {isPaused && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-32 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full text-[10px] uppercase tracking-[0.4em] font-bold shadow-sm z-50"
        >
          Paused
        </motion.div>
      )}
    </div>
  );
}