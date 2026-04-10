'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  href: string;
  subcategories?: Array<{
    id: string;
    name: string;
    href: string;
    description?: string;
  }>;
}

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Hamburger Menu Drawer - Unimart-style Navigation
 * Slides in from left with category accordion
 */
export function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  const t = useTranslations('navigation');

  const categories: Category[] = [
    {
      id: 'espacios-vivos',
      name: t('espaciosVivos'),
      href: '/shop/espacios-vivos',
      subcategories: [
        {
          id: 'suelux',
          name: 'Suelux',
          href: '/collections/suelux',
          description: 'Pisos SPC premium',
        },
        {
          id: 'pietraflex',
          name: 'PietraFlex',
          href: '/collections/pietraflex',
          description: 'Piedra flexible',
        },
      ],
    },
    {
      id: 'wellbeing',
      name: t('wellbeing'),
      href: '/shop/wellbeing',
      subcategories: [
        {
          id: 'drvek',
          name: 'Dr.Vek',
          href: '/collections/dr-vek',
          description: 'Botellas cobre ayurvédicas',
        },
        {
          id: 'sankom',
          name: 'Sankom',
          href: '/collections/sankom',
          description: 'Compresión inteligente',
        },
      ],
    },
    {
      id: 'b2b',
      name: t('b2b'),
      href: '/b2b',
      subcategories: [
        { id: 'arquitectos', name: t('arquitectos'), href: '/b2b/arquitectos' },
        { id: 'constructoras', name: t('constructoras'), href: '/b2b/constructoras' },
        { id: 'distribuidores', name: t('distribuidores'), href: '/b2b/distribuidores' },
        { id: 'franquicias', name: t('franquicias'), href: '/b2b/franquicias' },
      ],
    },
    {
      id: 'projects',
      name: t('projects'),
      href: '/projects',
    },
    {
      id: 'about',
      name: t('about'),
      href: '/about',
    },
    {
      id: 'contact',
      name: t('contact'),
      href: '/contact',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-80 max-w-[80vw] bg-bg-primary z-50 overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-bg-primary border-b border-bg-tertiary px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gold-primary">
                {t('menu')}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-secondary rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categories */}
            <nav className="p-6 space-y-2">
              {categories.map((category, i) => (
                <CategoryAccordion
                  key={category.id}
                  category={category}
                  delay={i * 0.05}
                  onClose={onClose}
                />
              ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-bg-tertiary mt-8">
              <p className="text-sm text-text-tertiary">
                © 2026 UTTILL S.A.
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                Part of CIVEK Empire
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Category Accordion Item
 */
function CategoryAccordion({
  category,
  delay,
  onClose,
}: {
  category: Category;
  delay: number;
  onClose: () => void;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      {/* Main category */}
      <div className="group">
        {category.subcategories ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-bg-secondary transition-colors text-left"
          >
            <span className="text-text-primary font-medium group-hover:text-gold-primary transition-colors">
              {category.name}
            </span>
            <motion.svg
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-5 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
        ) : (
          <Link
            href={category.href}
            onClick={onClose}
            className="block px-4 py-3 rounded-lg hover:bg-bg-secondary transition-colors"
          >
            <span className="text-text-primary font-medium group-hover:text-gold-primary transition-colors">
              {category.name}
            </span>
          </Link>
        )}

        {/* Subcategories */}
        <AnimatePresence>
          {isExpanded && category.subcategories && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-2 space-y-1 border-l-2 border-bg-tertiary pl-4">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={sub.href}
                    onClick={onClose}
                    className="block py-2 px-3 rounded-lg hover:bg-bg-secondary transition-colors group/sub"
                  >
                    <div className="text-sm text-text-secondary group-hover/sub:text-gold-primary transition-colors font-medium">
                      {sub.name}
                    </div>
                    {sub.description && (
                      <div className="text-xs text-text-tertiary mt-0.5">
                        {sub.description}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Fix: Import React
import React from 'react';
