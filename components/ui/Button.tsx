'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles = 'font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg relative overflow-hidden group';

    const variants = {
      primary: 'bg-gold-primary hover:bg-gold-light text-bg-primary shadow-lg hover:shadow-gold-primary/50 hover:scale-105 active:scale-95',
      secondary: 'bg-bg-tertiary hover:bg-bg-secondary text-text-primary hover:shadow-lg',
      outline: 'border-2 border-gold-primary text-gold-primary hover:bg-gold-primary hover:text-bg-primary hover:shadow-lg hover:shadow-gold-primary/30',
      ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {/* Gold Glow Effect on Hover (Primary variant only) */}
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-light/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        )}

        {/* Button Content */}
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
