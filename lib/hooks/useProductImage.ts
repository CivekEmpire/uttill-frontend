'use client';

import { useState, useEffect } from 'react';
import { generateProductImageByCategory } from '@/lib/imagineart/client';

/**
 * Custom hook for product images with ImagineArt fallback
 *
 * Logic:
 * 1. Use Shopify image if available
 * 2. If no image, generate one with ImagineArt
 * 3. Cache generated images in localStorage
 */
export function useProductImage(
  shopifyImageUrl: string | undefined,
  productName: string,
  category: string
) {
  const [imageUrl, setImageUrl] = useState<string | null>(shopifyImageUrl || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If we have a Shopify image, use it
    if (shopifyImageUrl) {
      setImageUrl(shopifyImageUrl);
      return;
    }

    // Check localStorage cache
    const cacheKey = `product-image-${productName}`;
    const cachedUrl = localStorage.getItem(cacheKey);

    if (cachedUrl) {
      setImageUrl(cachedUrl);
      return;
    }

    // Generate new image with ImagineArt
    async function generateImage() {
      setIsGenerating(true);
      setError(null);

      try {
        const generatedUrl = await generateProductImageByCategory(
          productName,
          category as any
        );

        if (generatedUrl) {
          setImageUrl(generatedUrl);
          // Cache for 30 days
          localStorage.setItem(cacheKey, generatedUrl);
        } else {
          setError('Failed to generate image');
        }
      } catch (err) {
        console.error('Image generation error:', err);
        setError('Image generation failed');
      } finally {
        setIsGenerating(false);
      }
    }

    generateImage();
  }, [shopifyImageUrl, productName, category]);

  return {
    imageUrl,
    isGenerating,
    error,
    hasShopifyImage: !!shopifyImageUrl,
  };
}
