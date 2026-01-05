import React, { useState, useEffect, useRef } from 'react';
import { Users } from 'lucide-react';

export const ScarcityBadge: React.FC = () => {
  const [count, setCount] = useState(14); // Start higher to show the drop
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const end = 5;
          let current = 14;
          const duration = 2000; // 2 seconds total animation
          const intervalTime = duration / (current - end);

          const timer = setInterval(() => {
            current -= 1;
            setCount(current);
            if (current <= end) {
              clearInterval(timer);
            }
          }, intervalTime);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={elementRef}
      className="absolute top-0 left-1/2 -translate-x-1/2 bg-accent/10 border-b border-x border-accent/20 px-4 py-2 rounded-b-xl flex items-center gap-2 text-accent text-sm font-bold shadow-[0_4px_20px_-5px_rgba(255,77,90,0.3)] backdrop-blur-md z-20"
    >
       <Users size={16} className={count === 5 ? "animate-pulse" : ""} />
       <span className="tabular-nums transition-colors duration-300">
          Restam apenas {count} vagas
       </span>
    </div>
  );
};