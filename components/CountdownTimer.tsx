import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null;

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-accent opacity-20 blur rounded-lg group-hover:opacity-40 transition duration-500"></div>
        <div className="relative bg-[#0F0F0F] border border-white/10 rounded-lg p-3 w-16 md:w-20 aspect-square flex flex-col items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
            <span className="text-2xl md:text-3xl font-bold text-accent tabular-nums leading-none">
            {value.toString().padStart(2, '0')}
            </span>
        </div>
      </div>
      <span className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mt-2 font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-start gap-2 md:gap-4 py-4 animate-[fadeIn_0.5s_ease-out]">
      <TimeUnit value={timeLeft.days} label="Dias" />
      <div className="text-white/20 text-2xl font-light mt-3 hidden md:block">:</div>
      <TimeUnit value={timeLeft.hours} label="Horas" />
      <div className="text-white/20 text-2xl font-light mt-3 hidden md:block">:</div>
      <TimeUnit value={timeLeft.minutes} label="Minutos" />
      <div className="text-white/20 text-2xl font-light mt-3 hidden md:block">:</div>
      <TimeUnit value={timeLeft.seconds} label="Segundos" />
    </div>
  );
};