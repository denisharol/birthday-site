"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
  { 
    title: "Succesfully Graduated with Honors", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/graduation.jpg", 
    text: "Completing university in itself is a huge achievement but doing so with honors is even more impressive. Your hard work paid off and you made everyone who loves you incredibly proud. This is just the beginning of your success story." 
  },
  { 
    title: "Begun Your career journey", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/employeeofthemonth.jpg", 
    text: "You put in incredible effort and dedication into your work. Watching you grow professionally has been amazing, and I'm so proud of how you tackle every challenge with determination, though sometimes you get overwhelmed but still proud and happy to see you navigate and figure out how to deal with the small issues." 
  },
  { 
    title: "Learned Essential Life Skills", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/communicationskills.jpg", 
    text: "Getting a job this year was a huge milestona that put you out to the world, I'm happy to have watched you improve your communication skills and other important life lessons in general you've had this year." 
  },
  { 
    title: "Made Amazing Friends", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/madenewfriends.jpg", 
    text: "This year alone you built genuine connections and friendships. Your warm personality draws people in, and you've created a wonderful circle around you." 
  },
  { 
    title: "Completed Your Education", 
    image: "https://raw.githubusercontent.com/denisharol/images/main/achievements/completededucation.jpg", 
    text: "You successfully finished your educational journey every step of the way and made your family and parents incredibly proud. Also you set up a perfect example for your younger siblings to emulate." 
  },
  { 
    title: "Explored the World", 
    // We treat this special case in the render logic
    isSpecial: true,
    images: Array.from({ length: 6 }, (_, i) => `https://raw.githubusercontent.com/denisharol/images/main/achievements/Explore${i + 1}.jpg`),
    text: "This year and the previous years you've been able to explore and do a lot of things that exposed you to a different world where you met and learned different new cultures, This year will be even more exciting than the last."
  }
];

export default function Achievements({ onNext, logEgg }) {
  const [index, setIndex] = useState(-1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  
  // Specific state for the Explore slideshow
  const [exploreIndex, setExploreIndex] = useState(0);

  // 1. Navigation Logic
  useEffect(() => {
    if (shouldNavigate) {
      if (index < DATA.length - 1) {
        setIndex(prev => prev + 1);
        setProgress(0);
        setShouldNavigate(false);
        setExploreIndex(0); // Reset explore slideshow
      } else {
        onNext();
      }
    }
  }, [shouldNavigate, index, onNext]);

  // 2. Progress Bar Logic (Handles Duration)
  useEffect(() => {
    if (isPaused || shouldNavigate) return;

    // Is this the special "Explore" slide?
    const isExploreSlide = index !== -1 && DATA[index]?.isSpecial;
    
    // Standard slide = 4 seconds total (0.5% per 20ms)
    // Explore slide = 12 seconds total (6 images * 2s). 
    // Calculation: 100% / (12000ms / 20ms) = 100 / 600 = ~0.1666
    const increment = isExploreSlide ? 0.1666 : 0.5;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setShouldNavigate(true);
          return 100;
        }
        return prev + increment; 
      });
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused, shouldNavigate, index]);

  // 3. Explore Slideshow Timer (Cycles every 2 seconds)
  useEffect(() => {
    const isExploreSlide = index !== -1 && DATA[index]?.isSpecial;
    if (!isExploreSlide || isPaused) return;

    const imageInterval = setInterval(() => {
      setExploreIndex(prev => (prev + 1) % 6);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(imageInterval);
  }, [index, isPaused]);

  // 4. Easter Egg: Scroll to bottom check (from previous context)
  const handleScrollEgg = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) logEgg?.();
  };

  return (
    <div 
      className="relative min-h-[75vh] flex flex-col justify-center px-4 select-none"
      onMouseDown={() => setIsPaused(true)} 
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)} 
      onTouchEnd={() => setIsPaused(false)}
      onScroll={handleScrollEgg} // Mobile Egg Trigger
    >
      <AnimatePresence mode="wait">
        {index === -1 ? (
          <motion.h2 
            key="intro" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }} 
            className="text-5xl md:text-6xl font-serif text-center leading-tight tracking-tighter"
          >
            These are all the things you achieved all before 25
          </motion.h2>
        ) : (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 1.05 }} 
            className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto w-full"
          >
            {/* Text Section */}
            <div className="space-y-6 text-center md:text-left">
              <h3 className="text-4xl md:text-5xl font-serif italic font-bold tracking-tight">
                {DATA[index]?.title}
              </h3>
              <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                {DATA[index]?.text}
              </p>
            </div>

            {/* Image Section */}
            <motion.div 
              animate={{ 
                rotate: index % 2 === 0 ? 2 : -2 
              }}
              transition={{ type: "spring", stiffness: 100 }}
              className="relative aspect-square w-full max-w-[400px] mx-auto md:max-w-none flex items-center justify-center rounded-[2rem] bg-zinc-100 dark:bg-zinc-900 shadow-2xl border-4 md:border-8 border-white dark:border-zinc-800 overflow-hidden"
            >
              {DATA[index]?.isSpecial ? (
                // --- SPECIAL SLIDESHOW LOGIC ---
                <AnimatePresence mode="popLayout">
                  <motion.img 
                    key={exploreIndex} // Key change triggers animation
                    src={DATA[index].images[exploreIndex]}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute w-full h-full object-cover"
                    alt={`Explore ${exploreIndex + 1}`}
                  />
                  {/* Progress Indicator for Slideshow */}
                  <div className="absolute bottom-4 flex gap-2 z-10">
                    {DATA[index].images.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === exploreIndex ? 'bg-white' : 'bg-white/30'}`} 
                      />
                    ))}
                  </div>
                </AnimatePresence>
              ) : (
                // --- STANDARD SINGLE IMAGE ---
                <>
                  <img 
                    src={DATA[index].image} 
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110" 
                    alt="" 
                  />
                  <img 
                    src={DATA[index].image} 
                    className="relative w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-105" 
                    alt={DATA[index].title} 
                  />
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Progress Bar */}
      <div 
        className="fixed bottom-12 left-0 right-0 h-[4px] flex px-10 md:px-20 z-50 cursor-pointer"
        // Tap/Click progress bar for Egg #4
        onClick={() => { if(progress > 90) logEgg?.(); }}
      >
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