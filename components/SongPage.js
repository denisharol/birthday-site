"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function SongPage({ onNext, muteBackground }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    muteBackground(); // Pauses the site's background music
    setIsPlaying(true); // Loads the YouTube video
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-center">
        This song reminds me of you
      </h2>
      
      <div className="relative w-full max-w-3xl aspect-video bg-zinc-100 shadow-2xl overflow-hidden rounded-xl">
        {!isPlaying ? (
          /* 1. The Cover Image (Click to Play) */
          <div 
            onClick={handlePlay}
            className="absolute inset-0 cursor-pointer group flex items-center justify-center bg-black"
          >
            {/* YouTube Thumbnail */}
            <img 
              src="https://img.youtube.com/vi/woLfAvD5iXI/maxresdefault.jpg" 
              alt="Cover" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" 
            />
            
            {/* Custom Play Button */}
            <div className="absolute w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition-transform">
              <Play className="fill-white text-white ml-1" size={32} />
            </div>
          </div>
        ) : (
          /* 2. The Actual Video (Loads after click) */
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/woLfAvD5iXI?si=b68F1lJbMQwkRFyb&autoplay=1" 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>

      <button 
        onClick={onNext}
        className="px-12 py-4 border border-zinc-900 dark:border-white uppercase text-[10px] tracking-[0.4em] hover:invert transition-all duration-500"
      >
        Continue
      </button>
    </div>
  );
}