/**
 * i18n Configuration for next-intl
 * Multi-language support: ES (default), EN, PT (future)
 */

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'es';

// Locale labels for UI
export const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

// Locale detection config
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});

/**
 * Detect user's preferred language from:
 * 1. URL parameter (?lang=en)
 * 2. Cookie (NEXT_LOCALE)
 * 3. Accept-Language header
 * 4. IP geolocation (future enhancement)
 */
export function detectPreferredLocale(
  params?: URLSearchParams,
  cookies?: { locale?: string },
  acceptLanguage?: string
): Locale {
  // 1. Check URL parameter
  if (params?.has('lang')) {
    const urlLang = params.get('lang');
    if (urlLang && locales.includes(urlLang as Locale)) {
      return urlLang as Locale;
    }
  }

  // 2. Check cookie
  if (cookies?.locale && locales.includes(cookies.locale as Locale)) {
    return cookies.locale as Locale;
  }

  // 3. Check Accept-Language header
  if (acceptLanguage) {
    // Parse Accept-Language header (e.g., "es-CR,es;q=0.9,en;q=0.8")
    const languages = acceptLanguage
      .split(',')
      .map((lang) => {
        const [code, qValue] = lang.trim().split(';');
        const quality = qValue ? parseFloat(qValue.split('=')[1]) : 1.0;
        return { code: code.split('-')[0], quality };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { code } of languages) {
      if (locales.includes(code as Locale)) {
        return code as Locale;
      }
    }
  }

  // 4. Default to Spanish (Costa Rica primary market)
  return defaultLocale;
}

/**
 * Language-specific currency formatting
 */
export const currencyConfig: Record<Locale, { currency: string; locale: string }> = {
  es: {
    currency: 'CRC',
    locale: 'es-CR',
  },
  en: {
    currency: 'USD',
    locale: 'en-US',
  },
};
