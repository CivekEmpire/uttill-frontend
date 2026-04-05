'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils/currency';
import { ShopifyProduct } from '@/lib/shopify/types';

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const firstImage = product.images.edges[0]?.node;
  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const priceDisplay = minPrice === maxPrice
    ? formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
    : `Desde ${formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}`;

  // Determinar categoría por tags
  const getCategory = () => {
    if (product.tags.includes('suelux') || product.productType.includes('Floor')) {
      return 'espacios';
    }
    if (product.tags.includes('drvek') || product.tags.includes('sankom')) {
      return 'wellbeing';
    }
    return 'default';
  };

  return (
    <Link href={`/products/${product.handle}`}>
      <Card hover className="overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-square bg-bg-tertiary overflow-hidden">
          {firstImage ? (
            <Image
              src={firstImage.url}
              alt={firstImage.altText || product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-tertiary">
              Sin imagen
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
            <Badge variant={getCategory()}>
              {product.vendor || 'UTTILL'}
            </Badge>
            {product.tags.includes('new') && (
              <Badge variant="gold">Nuevo</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-text-primary group-hover:text-gold-primary transition-colors line-clamp-2">
            {product.title}
          </h3>

          {product.description && (
            <p className="text-sm text-text-tertiary mb-3 line-clamp-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xl font-mono font-bold text-gold-primary">
              {priceDisplay}
            </span>

            {product.variants.edges.length > 1 && (
              <span className="text-xs text-text-tertiary">
                {product.variants.edges.length} variantes
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
