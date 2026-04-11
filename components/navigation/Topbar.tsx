'use client';

import { MapPin, Phone, MessageCircle, Globe } from 'lucide-react';
import { useState } from 'react';

/**
 * Topbar - First navigation bar
 * Contains: Location, Contact, Language selector, Dark mode
 */
export function Topbar() {
  const [language, setLanguage] = useState('ES');

  return (
    <div className="bg-bg-primary border-b border-bg-tertiary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 text-sm">
          {/* Left: Location & Contact */}
          <div className="hidden md:flex items-center gap-6 text-text-tertiary">
            <div className="flex items-center gap-2 hover:text-gold-primary transition-colors cursor-pointer">
              <MapPin className="w-4 h-4" />
              <span>Costa Rica</span>
            </div>
            <a
              href="tel:+50684105999"
              className="flex items-center gap-2 hover:text-gold-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+506 8410 5999</span>
            </a>
            <a
              href="https://wa.me/50684105999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-gold-primary transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp 24/7</span>
            </a>
          </div>

          {/* Right: Language Selector */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
              className="flex items-center gap-2 text-text-tertiary hover:text-gold-primary transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{language}</span>
              <span className="text-xs">▼</span>
            </button>

            {/* Dark Mode Toggle (placeholder - already dark theme) */}
            <div className="flex items-center gap-2 text-text-tertiary">
              <span className="text-xs">🌙 Dark</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
