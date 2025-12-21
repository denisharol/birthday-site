"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AgeGate({ onNext, logEgg }) {
  const [age, setAge] = useState("");
  const [error, setError] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const handleEgg = () => {
    setTapCount(prev => prev + 1);
    if (tapCount + 1 >= 3) logEgg();
  };

  const handleSubmit = () => {
    if (age === "25") {
      onNext();
    } else {
      setError(true);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 md:space-y-12 px-4">
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-5xl md:text-8xl font-serif tracking-tighter text-center leading-tight"
      >
        How old are you <br className="md:hidden" /> turning?
      </motion.h2>

      <div className="relative w-full max-w-sm">
        <motion.input
          onClick={handleEgg}
          animate={error ? { x: [-10, 10, -10, 10, 0], borderColor: "#ef4444" } : {}}
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          className="w-full bg-transparent border-b-2 border-zinc-300 py-4 text-3xl md:text-4xl text-center outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-200"
        />
      </div>

      <button onClick={handleSubmit} className="group flex flex-col items-center gap-2 uppercase text-[10px] tracking-[0.4em] font-bold">
        <span>Confirm Identity</span>
        <div className="w-12 h-[1px] bg-current group-hover:w-24 transition-all" />
      </button>
    </div>
  );
}