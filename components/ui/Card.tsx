'use client';

import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  children: React.ReactNode;
}

export function Card({ hover = false, className = '', children, ...props }: CardProps) {
  const hoverStyles = hover
    ? 'transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold-primary/10'
    : '';

  return (
    <div
      className={`bg-bg-secondary border border-bg-tertiary rounded-lg ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
