'use client';

import Image from 'next/image';
import { useProductImage } from '@/lib/hooks/useProductImage';

interface ProductImageProps {
  shopifyImageUrl?: string;
  productName: string;
  category: string;
  alt: string;
  className?: string;
}

/**
 * Smart Product Image Component
 * - Uses Shopify image if available
 * - Falls back to ImagineArt generation
 * - Shows loading state
 * - Handles errors gracefully
 */
export function ProductImage({
  shopifyImageUrl,
  productName,
  category,
  alt,
  className = '',
}: ProductImageProps) {
  const { imageUrl, isGenerating, error, hasShopifyImage } = useProductImage(
    shopifyImageUrl,
    productName,
    category
  );

  if (isGenerating) {
    return (
      <div className={`flex items-center justify-center bg-bg-tertiary ${className}`}>
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-primary mx-auto mb-2"></div>
          <p className="text-xs text-text-tertiary">Generando imagen...</p>
        </div>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div className={`flex items-center justify-center bg-bg-tertiary ${className}`}>
        <div className="text-center p-4">
          <svg
            className="w-12 h-12 text-text-tertiary mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-xs text-text-tertiary">Sin imagen</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {!hasShopifyImage && (
        <div className="absolute bottom-2 right-2 bg-bg-primary/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-text-tertiary">
          AI Generated
        </div>
      )}
    </div>
  );
}
