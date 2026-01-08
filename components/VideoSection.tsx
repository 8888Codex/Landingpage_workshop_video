import React, { useRef, useState, useEffect } from 'react';
import { useMetaPixel } from '../hooks/useMetaPixel';

// Duração estimada do vídeo em milissegundos (5 minutos = 300000ms)
// Ajuste este valor conforme a duração real do seu vídeo
const ESTIMATED_VIDEO_DURATION_MS = 5 * 60 * 1000;

export const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { trackEvent, isAvailable } = useMetaPixel();
  
  // Tracking de progresso do vídeo
  const visibleStartTimeRef = useRef<number | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const trackedProgressRef = useRef<Set<number>>(new Set());
  const isVisibleRef = useRef<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Intersection Observer para detectar quando o vídeo está visível
  useEffect(() => {
    if (!videoContainerRef.current || !isAvailable) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            // Vídeo está visível
            if (!isVisibleRef.current) {
              isVisibleRef.current = true;
              visibleStartTimeRef.current = Date.now();
              startProgressTracking();
            }
          } else {
            // Vídeo não está visível
            if (isVisibleRef.current) {
              isVisibleRef.current = false;
              visibleStartTimeRef.current = null;
              stopProgressTracking();
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1.0],
        rootMargin: '0px',
      }
    );

    observer.observe(videoContainerRef.current);

    return () => {
      observer.disconnect();
      stopProgressTracking();
    };
  }, [isAvailable]);

  // Função para iniciar o tracking de progresso
  const startProgressTracking = () => {
    if (progressTimerRef.current) return;

    const checkProgress = () => {
      if (!isVisibleRef.current || !visibleStartTimeRef.current) return;

      const visibleTime = Date.now() - visibleStartTimeRef.current;
      const progressPercentage = Math.round((visibleTime / ESTIMATED_VIDEO_DURATION_MS) * 100);
      const clampedProgress = Math.min(progressPercentage, 100);

      // Marcos de progresso: 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (clampedProgress >= milestone && !trackedProgressRef.current.has(milestone)) {
          trackEvent(`VideoProgress${milestone}` as any);
          trackedProgressRef.current.add(milestone);
        }
      });

      // Continuar verificando se ainda está visível
      if (isVisibleRef.current) {
        progressTimerRef.current = setTimeout(checkProgress, 1000); // Verificar a cada 1 segundo
      }
    };

    checkProgress();
  };

  // Função para parar o tracking de progresso
  const stopProgressTracking = () => {
    if (progressTimerRef.current) {
      clearTimeout(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  // Tentar detectar eventos do Panda Video via postMessage (fallback)
  useEffect(() => {
    if (!isAvailable) return;

    const handleMessage = (event: MessageEvent) => {
      // Verificar se a mensagem vem do domínio do Panda Video
      if (event.origin.includes('pandavideo.com.br')) {
        try {
          const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
          // Tentar detectar eventos de play/pause se o Panda Video enviar
          if (data.type === 'play' || data.event === 'play') {
            trackEvent('VideoPlay');
          } else if (data.type === 'pause' || data.event === 'pause') {
            trackEvent('VideoPause');
          } else if (data.progress !== undefined) {
            // Se o Panda Video enviar progresso, usar isso
            const progress = Math.round(data.progress);
            const milestones = [25, 50, 75, 100];
            milestones.forEach((milestone) => {
              if (progress >= milestone && !trackedProgressRef.current.has(milestone)) {
                trackEvent(`VideoProgress${milestone}` as any);
                trackedProgressRef.current.add(milestone);
              }
            });
          }
        } catch (error) {
          // Ignorar erros de parsing
        }
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [isAvailable, trackEvent]);

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
      <div 
        ref={videoContainerRef}
        className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-video-glow border border-white/10 z-10 transform transition-transform duration-700 group-hover/wrapper:scale-[1.01]"
      >
        
        {/* 
           ⚠️ PANDA VIDEO EMBED CONFIGURATION:
           Vídeo integrado via Panda Video
        */}
        <iframe 
            ref={iframeRef}
            id="panda-1f7f2296-126d-46f0-b312-5e330fbb9a85"
            src="https://player-vz-1bf389a0-d81.tv.pandavideo.com.br/embed/?v=1f7f2296-126d-46f0-b312-5e330fbb9a85"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Cognita VSL"
            loading="lazy"
            referrerPolicy="origin"
            fetchPriority="high"
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