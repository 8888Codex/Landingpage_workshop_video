import React, { useRef, useState } from 'react';

export const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-4xl mx-auto my-12 group/wrapper"
    >
      {/* 
         Dynamic Mouse-following Glow 
         - Reacts to mouse movement via radial-gradient position
         - Scales larger than container (-inset-8) for a diffused look
      */}
      <div 
        className="absolute -inset-8 -z-10 blur-[60px] transition-opacity duration-500 rounded-full opacity-0 group-hover/wrapper:opacity-100 will-change-[background]"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 77, 90, 0.4), transparent 50%)`
        }}
      />

      {/* Static Base Glow - Always visible but subtle to ensure depth when not hovering */}
      <div className="absolute -inset-1 bg-gradient-to-r from-spotlight via-accent/20 to-spotlight opacity-20 blur-2xl rounded-2xl transition duration-1000 -z-20"></div>

      {/* Main Video Container - Aspect Ratio 16:9 with subtle hover scale */}
      <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-video-glow border border-white/10 z-10 transform transition-transform duration-700 group-hover/wrapper:scale-[1.01]">
        
        {/* 
           ⚠️ VTURB EMBED CONFIGURATION:
           1. Go to your VTurb/ConverteAI dashboard.
           2. Copy your unique embed URL (usually: https://scripts.converteai.net/ACCOUNT_ID/players/VIDEO_ID/embed).
           3. Paste it below in the 'src' attribute.
        */}
        <iframe 
            id="vturb-player"
            src="https://scripts.converteai.net/YOUR_ACCOUNT_ID/players/YOUR_VIDEO_ID/embed"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="Cognita VSL"
            loading="lazy"
            referrerPolicy="origin"
        ></iframe>

        {/* Fallback/Loading Background (Visible behind iframe until loaded) */}
        <div className="absolute inset-0 -z-10 bg-neutral-900 flex items-center justify-center">
             <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Cinematic Overlay (Pointer events none ensures video controls still work) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#380B0F]/60 to-transparent pointer-events-none z-20"></div>
      </div>
    </div>
  );
};