'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/shop/ProductImage';
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
      return 'suelux';
    }
    if (product.tags.includes('pietraflex') || product.tags.includes('stone')) {
      return 'pietraflex';
    }
    if (product.tags.includes('drvek') || product.tags.includes('copper')) {
      return 'drvek';
    }
    if (product.tags.includes('sankom') || product.tags.includes('compression')) {
      return 'sankom';
    }
    return 'default';
  };

  const getCategoryBadge = () => {
    const category = getCategory();
    if (category === 'suelux' || category === 'pietraflex') {
      return 'espacios';
    }
    if (category === 'drvek' || category === 'sankom') {
      return 'wellbeing';
    }
    return 'default';
  };

  return (
    <Link href={`/products/${product.handle}`}>
      <Card hover className="overflow-hidden group">
        {/* Image with ImagineArt Fallback */}
        <ProductImage
          shopifyImageUrl={firstImage?.url}
          productName={product.title}
          category={getCategory()}
          alt={firstImage?.altText || product.title}
          className="aspect-square overflow-hidden"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          <Badge variant={getCategoryBadge()}>
            {product.vendor || 'UTTILL'}
          </Badge>
          {product.tags.includes('new') && (
            <Badge variant="gold">Nuevo</Badge>
          )}
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
