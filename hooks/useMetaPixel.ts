import { useEffect, useCallback, useRef } from 'react';
import { MetaPixelEvent, UseMetaPixelReturn } from '../types';

export const useMetaPixel = (): UseMetaPixelReturn => {
  const isAvailable = typeof window !== 'undefined' && typeof window.fbq !== 'undefined';
  const trackedEvents = useRef<Set<string>>(new Set());
  const trackedScrolls = useRef<Set<number>>(new Set());

  const trackEvent = useCallback((eventName: MetaPixelEvent, params?: Record<string, any>) => {
    if (!isAvailable || !window.fbq) {
      console.warn('Meta Pixel (fbq) não está disponível');
      return;
    }

    try {
      window.fbq('track', eventName, params);
    } catch (error) {
      console.error('Erro ao rastrear evento do Meta Pixel:', error);
    }
  }, [isAvailable]);

  const trackPageView = useCallback(() => {
    if (!isAvailable || !window.fbq) return;
    
    try {
      window.fbq('track', 'PageView');
    } catch (error) {
      console.error('Erro ao rastrear PageView:', error);
    }
  }, [isAvailable]);

  // Tracking de tempo de página
  useEffect(() => {
    if (!isAvailable) return;

    const timeouts: NodeJS.Timeout[] = [];

    // 30 segundos
    const timeout30s = setTimeout(() => {
      if (!trackedEvents.current.has('PageTime30s')) {
        trackEvent('PageTime30s');
        trackedEvents.current.add('PageTime30s');
      }
    }, 30000);

    // 60 segundos
    const timeout60s = setTimeout(() => {
      if (!trackedEvents.current.has('PageTime60s')) {
        trackEvent('PageTime60s');
        trackedEvents.current.add('PageTime60s');
      }
    }, 60000);

    // 120 segundos (2 minutos)
    const timeout120s = setTimeout(() => {
      if (!trackedEvents.current.has('PageTime120s')) {
        trackEvent('PageTime120s');
        trackedEvents.current.add('PageTime120s');
      }
    }, 120000);

    timeouts.push(timeout30s, timeout60s, timeout120s);

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isAvailable, trackEvent]);

  // Tracking de profundidade de scroll
  useEffect(() => {
    if (!isAvailable) return;

    const scrollDepths = [25, 50, 75, 100];
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

          scrollDepths.forEach(depth => {
            if (scrollPercentage >= depth && !trackedScrolls.current.has(depth)) {
              trackEvent(`ScrollDepth${depth}` as MetaPixelEvent);
              trackedScrolls.current.add(depth);
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAvailable, trackEvent]);

  return {
    trackEvent,
    trackPageView,
    isAvailable,
  };
};
