import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  pulse = false,
  className = '',
  href,
  target,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 transform active:scale-95 cursor-pointer no-underline";
  
  const variants = {
    primary: "bg-accent hover:bg-accentHover text-white shadow-glow hover:shadow-[0_0_30px_rgba(255,77,90,0.7)]",
    secondary: "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10"
  };

  // Ajuste responsivo: menor no mobile (py-3 text-base), maior no desktop (md:py-4 md:text-lg)
  const widthClass = fullWidth 
    ? "w-full py-3 md:py-4 text-base md:text-lg" 
    : "px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base";
  
  const pulseClass = pulse ? "animate-[pulse_2s_infinite]" : "";
  
  const combinedClasses = `${baseStyles} ${variants[variant]} ${widthClass} ${pulseClass} ${className}`;

  const content = (
    <>
      {children}
      {variant === 'primary' && <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />}
    </>
  );

  // Se houver href, renderiza como link <a>, caso contrário, como <button>
  if (href) {
    return (
      <a href={href} target={target} className={combinedClasses}>
        {content}
      </a>
    );
  }

  return (
    <button 
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
};