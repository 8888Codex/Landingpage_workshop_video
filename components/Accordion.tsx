import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQItem } from '../types';

interface AccordionProps {
  items: FAQItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`border border-white/10 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'bg-white/5' : 'bg-transparent'}`}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-white/5 hover:scale-[1.02] transition-all duration-200"
          >
            <span className={`font-semibold text-lg ${openIndex === index ? 'text-white' : 'text-gray-400'}`}>
              {item.question}
            </span>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-accent" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-5 pt-0 text-textBody leading-relaxed border-t border-white/5 mt-2">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};