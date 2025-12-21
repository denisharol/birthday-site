"use client";
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PartyHat = () => (
  <svg width="70" height="70" viewBox="0 0 120 120" className="drop-shadow-2xl">
    <defs>
      <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#8B5CF6', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#6366F1', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M25,95 L60,20 L95,95 Z" fill="url(#hatGradient)" stroke="#4C1D95" strokeWidth="2.5" />
    <circle cx="45" cy="50" r="3" fill="#FCD34D" />
    <circle cx="70" cy="60" r="3" fill="#FCD34D" />
    <circle cx="60" cy="40" r="2.5" fill="#FBBF24" />
    <circle cx="60" cy="20" r="10" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
    <circle cx="57" cy="18" r="4" fill="#FFFFFF" opacity="0.5" />
    <ellipse cx="60" cy="95" rx="35" ry="8" fill="#4C1D95" opacity="0.7" />
  </svg>
);

const GiftBox = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-10 h-10 absolute ${className}`}>
    <rect x="20" y="40" width="60" height="50" fill="none" stroke="#FCD34D" strokeWidth="2" />
    <rect x="15" y="30" width="70" height="15" fill="none" stroke="#FCD34D" strokeWidth="2" />
    <line x1="50" y1="30" x2="50" y2="90" stroke="#FCD34D" strokeWidth="2" />
    <path d="M50,30 Q30,15 50,40 Q70,15 50,30" fill="none" stroke="#FCD34D" strokeWidth="2" />
  </svg>
);

const Star = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-8 h-8 absolute ${className}`}>
    <path d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" fill="none" stroke="#FCD34D" strokeWidth="2" />
  </svg>
);

const Confetti = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-6 h-6 absolute ${className}`}>
    <rect x="40" y="40" width="20" height="20" fill="#EC4899" transform="rotate(45 50 50)" />
  </svg>
);

const Cake = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-12 h-12 absolute ${className}`}>
    <rect x="25" y="50" width="50" height="30" fill="none" stroke="#F59E0B" strokeWidth="2" />
    <rect x="20" y="40" width="60" height="15" fill="none" stroke="#F59E0B" strokeWidth="2" />
    <line x1="35" y1="30" x2="35" y2="40" stroke="#EF4444" strokeWidth="2" />
    <line x1="50" y1="25" x2="50" y2="40" stroke="#EF4444" strokeWidth="2" />
    <line x1="65" y1="30" x2="65" y2="40" stroke="#EF4444" strokeWidth="2" />
    <ellipse cx="35" cy="28" rx="3" ry="5" fill="#FBBF24" />
    <ellipse cx="50" cy="23" rx="3" ry="5" fill="#FBBF24" />
    <ellipse cx="65" cy="28" rx="3" ry="5" fill="#FBBF24" />
  </svg>
);

const Balloon2 = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-10 h-10 absolute ${className}`}>
    <ellipse cx="50" cy="45" rx="25" ry="35" fill="none" stroke="#EC4899" strokeWidth="2" />
    <path d="M50,80 L50,95" stroke="#6B7280" strokeWidth="1.5" />
    <ellipse cx="45" cy="30" rx="8" ry="12" fill="#FFFFFF" opacity="0.4" />
  </svg>
);

const Streamers = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-12 h-12 absolute ${className}`}>
    <path d="M20,10 Q40,30 30,50 Q20,70 40,90" fill="none" stroke="#8B5CF6" strokeWidth="2" />
    <path d="M50,10 Q60,25 55,45 Q50,65 60,85" fill="none" stroke="#EC4899" strokeWidth="2" />
    <path d="M75,15 Q85,35 75,55 Q65,75 75,90" fill="none" stroke="#F59E0B" strokeWidth="2" />
  </svg>
);

const PartyPopper = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-10 h-10 absolute ${className}`}>
    <path d="M40,70 L30,90 L50,80 Z" fill="none" stroke="#EF4444" strokeWidth="2" />
    <circle cx="25" cy="30" r="3" fill="#FCD34D" />
    <circle cx="45" cy="25" r="2.5" fill="#EC4899" />
    <circle cx="35" cy="40" r="2" fill="#8B5CF6" />
    <circle cx="55" cy="35" r="3" fill="#F59E0B" />
    <circle cx="50" cy="50" r="2.5" fill="#10B981" />
  </svg>
);

const Cupcake = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-10 h-10 absolute ${className}`}>
    <path d="M30,60 L40,90 L60,90 L70,60 Z" fill="none" stroke="#EC4899" strokeWidth="2" />
    <ellipse cx="50" cy="60" rx="20" ry="8" fill="none" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="50" y1="45" x2="50" y2="60" stroke="#EF4444" strokeWidth="2" />
    <ellipse cx="50" cy="43" rx="3" ry="5" fill="#FBBF24" />
  </svg>
);

export default function SplashScreen({ onComplete }) {
  const [showBalloons, setShowBalloons] = useState(true);
  const [balloonData, setBalloonData] = useState([]);
  const [hatState, setHatState] = useState('waiting');

  useEffect(() => {
    const newBalloons = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      startY: 100 + Math.random() * 20,
      speed: 4,
      delay: Math.random() * 1.5,
      drift: Math.random() * 20 - 10,
      color: i % 3 === 0 ? 'from-orange-400 to-yellow-300' : i % 3 === 1 ? 'from-gray-200 to-white' : 'from-yellow-300 to-orange-400'
    }));
    setBalloonData(newBalloons);

    const balloonTimer = setTimeout(() => setShowBalloons(false), 4000);
    const hatTimer = setTimeout(() => setHatState('falling'), 2500);
    const mainTimer = setTimeout(onComplete, 15000);
    
    return () => {
      clearTimeout(balloonTimer);
      clearTimeout(hatTimer);
      clearTimeout(mainTimer);
    };
  }, [onComplete]);

  const handleHatLand = () => {
    setHatState('landed');
    setTimeout(() => setHatState('swaying'), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="/splash/splash-bg.jpg" 
          className="w-full h-full object-cover" 
          alt="Background" 
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute -top-12 right-20 z-20">
        <motion.div 
          className="flex flex-col items-center origin-top"
          animate={hatState === 'landed' ? {
            rotate: [0, -8, 4, -6, 2, -3, 1, -1, 0],
          } : {
            rotate: [-1, 1, -1],
          }}
          transition={hatState === 'landed' ? {
            duration: 2,
            ease: "easeOut"
          } : {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-[2px] h-32 bg-zinc-800/80 shadow-sm origin-top"
            animate={hatState === 'landed' ? {
              scaleY: [1, 0.95, 1.03, 0.98, 1.01, 1],
            } : {}}
            transition={hatState === 'landed' ? {
              duration: 1.5,
              ease: "easeOut"
            } : {}}
          />
          
          <motion.div 
            animate={hatState === 'landed' ? {
              rotate: [-2, -18, 10, -12, 4, -6, -2],
            } : {
              rotate: [-2, 2, -1, 1, 0, -2],
            }}
            transition={hatState === 'landed' ? {
              duration: 1.8,
              times: [0, 0.15, 0.35, 0.5, 0.7, 0.85, 1],
              ease: "easeOut"
            } : {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative p-4 bg-white shadow-2xl rounded-sm"
          >
            <motion.div
              initial={{ y: -500, rotate: 20, opacity: 0 }}
              animate={hatState === 'falling' ? { 
                y: -25, 
                rotate: -25, 
                opacity: 1 
              } : hatState === 'landed' || hatState === 'swaying' ? {
                y: -25,
                rotate: -25,
                opacity: 1
              } : {}}
              transition={hatState === 'falling' ? { 
                duration: 0.7, 
                ease: "easeIn" 
              } : {}}
              onAnimationComplete={() => {
                if (hatState === 'falling') handleHatLand();
              }}
              className="absolute -top-4 -left-8 z-30"
            >
              <PartyHat />
            </motion.div>

            <GiftBox className="-bottom-6 -right-6 rotate-12 opacity-80" />
            <Star className="-top-4 -right-4 opacity-70" />
            <Star className="bottom-8 -left-8 scale-75 opacity-70" />
            <Confetti className="top-12 -right-8 opacity-60" />
            <Confetti className="-bottom-4 left-6 opacity-60 rotate-45" />
            <Cake className="top-16 -left-10 opacity-75" />
            <Balloon2 className="-bottom-8 left-8 opacity-70" />
            <Streamers className="top-24 right-2 opacity-60" />
            <PartyPopper className="-top-6 left-4 opacity-75 rotate-12" />
            <Cupcake className="bottom-20 -right-8 opacity-70" />
            <Star className="top-8 left-2 scale-50 opacity-60" />
            <Confetti className="bottom-16 left-4 opacity-50 rotate-12" />
            <GiftBox className="top-20 right-6 scale-75 opacity-60 -rotate-12" />

            <div className="w-48 h-64 md:w-64 md:h-80 overflow-hidden bg-zinc-100 border border-zinc-200">
              <img 
                src="/splash/lisa-portrait.jpg" 
                className="w-full h-full object-cover" 
                alt="Lisa" 
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showBalloons && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {balloonData.map((b) => (
              <motion.div
                key={b.id}
                initial={{ y: `${b.startY}vh`, opacity: 0 }}
                animate={{ 
                  y: "-15vh",
                  x: [0, b.drift, -b.drift/2, 0],
                  opacity: [0, 1, 1, 1, 0.7, 0]
                }}
                transition={{ 
                  duration: b.speed,
                  delay: b.delay,
                  ease: "linear",
                  x: {
                    duration: b.speed,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="absolute"
                style={{ left: `${b.left}%` }}
              >
                <div className="relative flex flex-col items-center">
                  <div className={`w-14 h-18 rounded-full bg-gradient-to-br ${b.color} shadow-2xl relative`}>
                    <div className="absolute top-2 left-3 w-5 h-7 bg-white/50 rounded-full blur-[2px]" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gray-700" />
                  </div>
                  <div className="w-[1.5px] h-24 bg-gradient-to-b from-gray-700 to-transparent mt-[-2px]" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}