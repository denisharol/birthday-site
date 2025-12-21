"use client";

export default function SongPage({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12">
      <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-center">
        This song reminds me of you
      </h2>
      
      <div className="w-full max-w-3xl aspect-video bg-zinc-100 shadow-2xl overflow-hidden">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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