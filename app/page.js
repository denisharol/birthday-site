"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Volume2, VolumeX } from 'lucide-react';

// Component Imports
import SplashScreen from '@/components/SplashScreen';
import AgeGate from '@/components/AgeGate';
import MemeReveal from '@/components/MemeReveal';
import BirthdayReveal from '@/components/BirthdayReveal';
import PhotoStack from '@/components/PhotoStack';
import Achievements from '@/components/Achievements';
import SongPage from '@/components/SongPage';
import Oracle from '@/components/Oracle';
import SpotDifference from '@/components/SpotDifference';
import PresentGame from '@/components/PresentGame';
import BonusPresent from '@/components/BonusPresent';
import Disappointment from '@/components/Disappointment';
import RestaurantSelector from '@/components/RestaurantSelector';
import RestaurantDetails from '@/components/RestaurantDetails';
import MenuViewer from '@/components/MenuViewer';
import FinalVideo from '@/components/FinalVideo';
import Summary from '@/components/Summary';

export default function BirthdaySite() {
  const [step, setStep] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // NEW: Track if a video is playing on screen
  const [isExternalPlaying, setIsExternalPlaying] = useState(false);
  
  const [showMessage, setShowMessage] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const audioRef = useRef(null);
  
  const [selections, setSelections] = useState({
    gift: null,
    bonus: null,
    restaurant: null
  });

  // NEW: Reset external playing state whenever we change steps
  useEffect(() => {
    setIsExternalPlaying(false);
  }, [step]);

  // Updated Audio Logic: Pause if Splash(0), Muted, or External Video is Playing
  useEffect(() => {
    if (audioRef.current) {
      if (step === 0 || isMuted || isExternalPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback interaction required."));
      }
    }
  }, [isMuted, step, isExternalPlaying]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className={`${isDark ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-900'} min-h-screen transition-colors duration-700 font-sans selection:bg-zinc-500 selection:text-white`}>
      
      <audio 
        ref={audioRef}
        src="/audio/birthday-song.mp3" 
        loop 
        preload="auto"
      />

      {step > 0 && (
        <header className="fixed top-0 w-full p-8 flex justify-between items-end z-50 mix-blend-difference text-white">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-xl font-serif italic tracking-tighter">The 25th Edition</h1>
            <p className="text-[10px] uppercase tracking-[0.3em]">Volume I / 2026</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-8 items-center">
            <button onClick={() => setIsMuted(!isMuted)} className="hover:scale-110 transition">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            
            <div className="flex flex-col items-end gap-2 relative">
              <button onClick={toggleTheme}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <AnimatePresence>
                {showMessage && (
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-10 right-0 text-[10px] uppercase tracking-widest w-64 text-right pointer-events-none italic"
                  >
                    {isDark 
                      ? "Good choice, I don't want your beautiful eyes getting damaged" 
                      : "Excellent choice, don't strain your beautiful eyes"}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </header>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={step === 0 ? "w-full h-screen" : "pt-40 pb-20 px-6 max-w-6xl mx-auto"}
        >
          {step === 0 && <SplashScreen onComplete={() => setStep(1)} />}
          {step === 1 && <AgeGate onNext={() => setStep(2)} />}
          {step === 2 && <MemeReveal onNext={() => setStep(3)} />}
          {step === 3 && <BirthdayReveal onNext={() => setStep(4)} />} 
          {step === 4 && <PhotoStack onNext={() => setStep(5)} />}
          {step === 5 && <Achievements onNext={() => setStep(6)} />}
          
          {/* Step 6: SongPage - Pass the mute handler */}
          {step === 6 && <SongPage onNext={() => setStep(7)} muteBackground={() => setIsExternalPlaying(true)} />}
          
          {step === 7 && <Oracle onNext={() => setStep(8)} />}
          {step === 8 && <SpotDifference onNext={() => setStep(9)} />}
          
          {step === 9 && (
            <PresentGame 
              onWin={() => {
                setSelections(prev => ({ ...prev, gift: "Gift Hamper" }));
                setStep(10);
              }} 
              onLose={() => setStep(11)} 
            />
          )}
          {step === 10 && (
            <BonusPresent 
              onSelect={(extra) => {
                setSelections(prev => ({ ...prev, bonus: extra }));
                setStep(12);
              }} 
            />
          )}
          {step === 11 && <Disappointment onNext={() => setStep(12)} />}
          {step === 12 && (
            <RestaurantSelector onSelect={(res) => { 
              setSelections(prev => ({ ...prev, restaurant: res.name }));
              setSelectedRestaurant(res); 
              setStep(13); 
            }} />
          )}
          {step === 13 && <RestaurantDetails restaurant={selectedRestaurant} onBack={() => setStep(12)} onConfirm={() => setStep(14)} />}
          {step === 14 && <MenuViewer restaurant={selectedRestaurant} onNext={() => setStep(15)} />}
          
          {/* Step 15: FinalVideo - Pass the mute handler */}
          {step === 15 && <FinalVideo onNext={() => setStep(16)} muteBackground={() => setIsExternalPlaying(true)} />}
          
          {step === 16 && (
            <Summary 
              selections={selections} 
              onReset={() => {
                setStep(1);
                setSelections({ gift: null, bonus: null, restaurant: null });
                setIsMuted(true);
              }} 
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}