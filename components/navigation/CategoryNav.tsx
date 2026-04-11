'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * CategoryNav - Third navigation bar
 * Horizontal scroll categories
 */
export function CategoryNav() {
  const categories = [
    { name: 'Espacios Vivos', href: '/shop/espacios-vivos', color: '#8b7355' },
    { name: 'Wellbeing', href: '/shop/wellbeing', color: '#6b8e7f' },
    { name: 'B2B', href: '/b2b', color: '#c8a84b' },
    { name: 'Proyectos', href: '/projects', color: '#c8a84b' },
    { name: 'About', href: '/about', color: '#c8a84b' },
    { name: 'Contacto', href: '/contact', color: '#c8a84b' },
  ];

  return (
    <div className="bg-bg-secondary border-b border-bg-tertiary sticky top-[120px] z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide h-12">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative flex-shrink-0"
            >
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="text-text-secondary hover:text-gold-primary transition-colors whitespace-nowrap font-medium text-sm tracking-wide"
              >
                {category.name}
              </motion.span>

              {/* Active Indicator */}
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gold-primary opacity-0 group-hover:opacity-100 transition-opacity"
                layoutId="categoryIndicator"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
