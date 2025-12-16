import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  label, 
  icon,
  className = '',
  ...props 
}) => {
  
  const baseStyles = "font-bold font-mono transition-all duration-150 border-2 border-nb-contrast flex items-center justify-center gap-2 active:translate-x-[4px] active:translate-y-[4px] active:shadow-hard-active";
  
  const variants = {
    primary: "bg-nb-orange text-black shadow-hard hover:bg-nb-orange/90 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover",
    secondary: "bg-nb-tan text-black shadow-hard hover:bg-nb-tan/90 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover",
    outline: "bg-transparent text-nb-contrast shadow-hard hover:bg-nb-gray hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover",
    danger: "bg-nb-green text-black shadow-hard hover:bg-nb-green/90 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-hover",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;