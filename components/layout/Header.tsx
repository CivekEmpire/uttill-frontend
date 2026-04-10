'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { MenuDrawer } from '@/components/navigation/MenuDrawer';
import { SearchBar } from '@/components/navigation/SearchBar';
import { NAVIGATION } from '@/lib/constants/categories';
import { useCart } from '@/contexts/CartContext';

export function Header() {
  const { itemCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-bg-tertiary">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gold-primary tracking-tight">
              UTTILL
            </span>
            <span className="hidden md:block text-sm text-text-tertiary">
              Life, beautifully lived
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => 'submenu' in item && item.submenu && setActiveSubmenu(item.name)}
                onMouseLeave={() => setActiveSubmenu(null)}
              >
                <Link
                  href={item.href}
                  className="text-text-secondary hover:text-gold-primary transition-colors duration-200"
                >
                  {item.name}
                  {'submenu' in item && item.submenu && <span className="ml-1">▼</span>}
                </Link>

                {/* Submenu */}
                {'submenu' in item && item.submenu && activeSubmenu === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-bg-secondary border border-bg-tertiary rounded-lg shadow-xl p-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        href={subitem.href}
                        className="block px-4 py-2 text-text-secondary hover:text-gold-primary hover:bg-bg-tertiary rounded transition-all duration-200"
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-text-secondary hover:text-gold-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Cart Icon */}
            <button
              onClick={openCart}
              className="relative p-2 text-text-secondary hover:text-gold-primary transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-primary text-bg-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-gold-primary"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Drawer (Mobile + Desktop) */}
      <MenuDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Search Bar Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-lg">
          <div className="container mx-auto px-4 py-8">
            <SearchBar />
            <button
              onClick={() => setSearchOpen(false)}
              className="mt-4 text-text-tertiary hover:text-gold-primary transition-colors"
            >
              Cerrar búsqueda (ESC)
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
