'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  handle: string;
  price: string;
  image?: string;
  category?: string;
}

/**
 * Intelligent Search Bar with Instant Results
 * Features:
 * - Debounced search (300ms)
 * - Shopify Predictive Search API
 * - Instant preview with images + prices
 * - Keyboard navigation (arrow keys, enter, escape)
 * - Click outside to close
 */
export function SearchBar() {
  const t = useTranslations('common');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const searchResults = await fetchPredictiveSearch(query);
        setResults(searchResults);
        setIsLoading(false);
      } catch (error) {
        console.error('Search error:', error);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      const selected = results[selectedIndex];
      if (selected) {
        window.location.href = `/products/${selected.handle}`;
      }
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={t('search')}
          className="w-full pl-12 pr-12 py-3 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-gold-primary transition-colors"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-bg-tertiary rounded transition-colors"
          >
            <X className="w-4 h-4 text-text-tertiary" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query.length >= 2 || results.length > 0) && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-bg-tertiary rounded-lg shadow-xl overflow-hidden z-50"
          >
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="inline-block w-6 h-6 border-2 border-gold-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : results.length > 0 ? (
              <div className="max-h-[400px] overflow-y-auto">
                {results.map((result, index) => (
                  <Link
                    key={result.id}
                    href={`/products/${result.handle}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex items-center gap-4 p-4 hover:bg-bg-tertiary transition-colors ${
                        index === selectedIndex ? 'bg-bg-tertiary' : ''
                      }`}
                    >
                      {/* Product Image */}
                      {result.image && (
                        <div className="flex-shrink-0 w-12 h-12 bg-bg-primary rounded overflow-hidden">
                          <Image
                            src={result.image}
                            alt={result.title}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">
                          {result.title}
                        </p>
                        {result.category && (
                          <p className="text-xs text-text-tertiary">
                            {result.category}
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex-shrink-0 text-sm font-semibold text-gold-primary">
                        {result.price}
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-text-tertiary">
                No se encontraron productos para &ldquo;{query}&rdquo;
              </div>
            )}

            {/* Footer hint */}
            {results.length > 0 && (
              <div className="px-4 py-2 bg-bg-primary border-t border-bg-tertiary text-xs text-text-tertiary">
                <kbd className="px-2 py-1 bg-bg-tertiary rounded">↑</kbd>
                <kbd className="px-2 py-1 bg-bg-tertiary rounded ml-1">↓</kbd>
                {' '}para navegar
                {' • '}
                <kbd className="px-2 py-1 bg-bg-tertiary rounded">Enter</kbd>
                {' '}para seleccionar
                {' • '}
                <kbd className="px-2 py-1 bg-bg-tertiary rounded">Esc</kbd>
                {' '}para cerrar
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Fetch search results from Shopify Predictive Search API
 */
async function fetchPredictiveSearch(query: string): Promise<SearchResult[]> {
  // TODO: Replace with actual Shopify Storefront API call
  // For now, mock data
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    {
      id: '1',
      title: 'Piso SPC Roble Natural',
      handle: 'piso-spc-roble-natural',
      price: '₡12,500',
      image: '/images/products/spc-oak.jpg',
      category: 'Suelux',
    },
    {
      id: '2',
      title: 'Piedra Flexible Translúcida',
      handle: 'piedra-flexible-translucida',
      price: '₡20,156',
      image: '/images/products/pietraflex-trans.jpg',
      category: 'PietraFlex',
    },
  ].filter((p) => p.title.toLowerCase().includes(query.toLowerCase()));
}
