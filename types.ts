import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  pulse?: boolean;
  href?: string;
  target?: string;
}

// Meta Pixel Types
declare global {
  interface Window {
    fbq: ((command: 'init' | 'track', eventName: string, params?: Record<string, any>) => void) | undefined;
    _fbq: any;
  }
}

export type MetaPixelEvent =
  | 'PageView'
  | 'PageTime30s'
  | 'PageTime60s'
  | 'PageTime120s'
  | 'ScrollDepth25'
  | 'ScrollDepth50'
  | 'ScrollDepth75'
  | 'ScrollDepth100'
  | 'VideoPlay'
  | 'VideoPause'
  | 'VideoProgress25'
  | 'VideoProgress50'
  | 'VideoProgress75'
  | 'VideoProgress100'
  | 'ButtonClick';

export interface UseMetaPixelReturn {
  trackEvent: (eventName: MetaPixelEvent, params?: Record<string, any>) => void;
  trackPageView: () => void;
  isAvailable: boolean;
}