'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';

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
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 'espacios-vivos',
      name: 'Espacios Vivos',
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
      name: 'Wellbeing',
      href: '/shop/wellbeing',
      subcategories: [
        {
          id: 'drvek',
          name: 'Dr.Vek Ayurvedic',
          href: '/collections/dr-vek-ayurvedic',
          description: 'Botellas de cobre',
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
      name: 'Soluciones B2B',
      href: '/b2b',
      subcategories: [
        {
          id: 'arquitectos',
          name: 'Arquitectos',
          href: '/b2b/arquitectos',
        },
        {
          id: 'franquicias',
          name: 'Franquicias',
          href: '/b2b/franquicias',
        },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-full max-w-sm bg-bg-secondary border-r border-bg-tertiary z-[70] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-bg-tertiary">
              <h2 className="text-2xl font-bold text-gold-primary">UTTILL</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-text-secondary" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              {categories.map((category) => (
                <div key={category.id} className="mb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={category.href}
                      onClick={onClose}
                      className="flex-1 px-4 py-3 text-text-primary hover:text-gold-primary transition-colors font-medium"
                    >
                      {category.name}
                    </Link>
                    {category.subcategories && (
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="p-3 hover:bg-bg-tertiary rounded-lg transition-colors"
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-text-tertiary transition-transform ${
                            expandedCategory === category.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Subcategories */}
                  {category.subcategories && expandedCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="ml-4 mt-2 space-y-1"
                    >
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          href={sub.href}
                          onClick={onClose}
                          className="block px-4 py-2 text-sm text-text-secondary hover:text-gold-primary hover:bg-bg-tertiary rounded-lg transition-colors"
                        >
                          <div className="font-medium">{sub.name}</div>
                          {sub.description && (
                            <div className="text-xs text-text-tertiary mt-0.5">
                              {sub.description}
                            </div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Additional Links */}
              <div className="mt-6 pt-6 border-t border-bg-tertiary space-y-2">
                <Link
                  href="/projects"
                  onClick={onClose}
                  className="block px-4 py-3 text-text-primary hover:text-gold-primary transition-colors"
                >
                  Proyectos
                </Link>
                <Link
                  href="/about"
                  onClick={onClose}
                  className="block px-4 py-3 text-text-primary hover:text-gold-primary transition-colors"
                >
                  Nosotros
                </Link>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="block px-4 py-3 text-text-primary hover:text-gold-primary transition-colors"
                >
                  Contacto
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
