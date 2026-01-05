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