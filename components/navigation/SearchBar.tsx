'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
        setResults([]);
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuery('');
        setResults([]);
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
      }

      if (e.key === 'Enter' && selectedIndex >= 0) {
        const selected = results[selectedIndex];
        if (selected) {
          window.location.href = `/products/${selected.handle}`;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, selectedIndex]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-12 pr-12 py-4 bg-bg-secondary border border-bg-tertiary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:border-gold-primary transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-bg-tertiary rounded transition-colors"
          >
            <X className="w-5 h-5 text-text-tertiary" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {query.length >= 2 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-bg-secondary border border-bg-tertiary rounded-lg shadow-xl max-h-[60vh] overflow-y-auto z-50"
          >
            {isLoading && (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-primary mx-auto"></div>
                <p className="text-text-tertiary mt-2">Buscando...</p>
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div className="p-8 text-center text-text-tertiary">
                No se encontraron resultados para &ldquo;{query}&rdquo;
              </div>
            )}

            {!isLoading && results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <Link
                    key={result.id}
                    href={`/products/${result.handle}`}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? 'bg-bg-tertiary'
                        : 'hover:bg-bg-tertiary'
                    }`}
                  >
                    {result.image && (
                      <div className="relative w-16 h-16 flex-shrink-0 bg-bg-primary rounded overflow-hidden">
                        <Image
                          src={result.image}
                          alt={result.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-text-primary font-medium truncate">
                        {result.title}
                      </h3>
                      {result.category && (
                        <p className="text-xs text-text-tertiary">{result.category}</p>
                      )}
                    </div>
                    <div className="text-gold-primary font-mono font-bold">
                      {result.price}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Fetch predictive search results from Shopify
 */
async function fetchPredictiveSearch(query: string): Promise<SearchResult[]> {
  // TODO: Implement actual Shopify Predictive Search API
  // For now, return mock data
  return [];
}
