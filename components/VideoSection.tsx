import React from 'react';

export const VideoSection: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto my-12 group/wrapper">
      {/* Background Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-spotlight via-accent to-spotlight opacity-30 blur-2xl rounded-2xl group-hover/wrapper:opacity-50 transition duration-1000"></div>

      {/* Main Video Container - Aspect Ratio 16:9 */}
      <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-video-glow border border-white/10 z-10">
        
        {/* 
           VTURB IFRAME CONFIGURATION:
           1. Replace 'YOUR_ACCOUNT_ID' with your VTurb account ID.
           2. Replace 'YOUR_VIDEO_ID' with your specific video ID.
           
           Example format: https://scripts.converteai.net/5e9.../players/64b.../embed
        */}
        <iframe 
            id="vturb-player"
            src="https://scripts.converteai.net/YOUR_ACCOUNT_ID/players/YOUR_VIDEO_ID/embed"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
            title="Cognita VSL"
            loading="lazy"
            referrerPolicy="origin"
        ></iframe>

        {/* Fallback/Loading Background (Visible behind iframe) */}
        <div className="absolute inset-0 -z-10 bg-neutral-900 flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Cinematic Overlay (Pointer events none ensures video controls still work) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#380B0F]/60 to-transparent pointer-events-none z-20"></div>
      </div>

      {/* Handwriting Badge "DALE AL PLAY" */}
      <div className="absolute -bottom-6 -right-4 md:-right-12 md:bottom-10 z-30 flex flex-col items-center rotate-[-6deg] animate-bounce duration-[3000ms] pointer-events-none">
        <span className="font-handwriting text-white text-2xl md:text-4xl tracking-wide drop-shadow-lg">
          DALE AL PLAY
        </span>
        <svg className="w-8 h-8 md:w-12 md:h-12 text-white fill-current mt-[-5px] rotate-[100deg]" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="none"/>
             <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" d="M20 5 C 20 20, 5 20, 0 10" />
        </svg>
      </div>
    </div>
  );
};