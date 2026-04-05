'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'espacios' | 'wellbeing' | 'gold';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-bg-tertiary text-text-secondary',
    espacios: 'bg-espacios-vivos/20 text-espacios-vivos border border-espacios-vivos/30',
    wellbeing: 'bg-wellbeing/20 text-wellbeing border border-wellbeing/30',
    gold: 'bg-gold-primary/20 text-gold-primary border border-gold-primary/30',
  };

  return (
    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
