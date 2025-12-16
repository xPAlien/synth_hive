import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  color?: string; // Optional stripe color
}

const Card: React.FC<CardProps> = ({ children, className = '', title, color }) => {
  return (
    <div className={`bg-zinc-900 border-2 border-nb-contrast shadow-hard p-0 overflow-hidden ${className}`}>
      {(title || color) && (
        <div className={`border-b-2 border-nb-contrast flex justify-between items-center ${color ? '' : 'bg-nb-gray'}`}>
             {color && <div className={`h-full w-4 ${color} border-r-2 border-nb-contrast`}></div>}
             {title && (
                <div className="px-4 py-2 font-mono font-bold text-sm uppercase tracking-wider w-full flex justify-between items-center text-nb-contrast">
                    <span>{title}</span>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full border border-nb-contrast bg-transparent"></div>
                        <div className="w-2 h-2 rounded-full border border-nb-contrast bg-nb-contrast"></div>
                    </div>
                </div>
             )}
        </div>
      )}
      <div className="p-4 text-nb-contrast">
        {children}
      </div>
    </div>
  );
};

export default Card;