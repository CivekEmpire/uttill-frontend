'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/shop/ProductImage';
import { formatPrice } from '@/lib/utils/currency';
import { ShopifyProduct } from '@/lib/shopify/types';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: ShopifyProduct;
  index?: number; // For stagger animations
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isLoading } = useCart();
  const firstImage = product.images.edges[0]?.node;
  const minPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const maxPrice = parseFloat(product.priceRange.maxVariantPrice.amount);
  const priceDisplay = minPrice === maxPrice
    ? formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)
    : `Desde ${formatPrice(product.priceRange.minVariantPrice.amount, product.priceRange.minVariantPrice.currencyCode)}`;

  // Get first available variant
  const firstVariant = product.variants.edges[0]?.node;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    if (firstVariant?.id) {
      addToCart(firstVariant.id, 1);
    }
  };

  // 3D Tilt Effect motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1], // Apple easing curve
      }}
      viewport={{ once: true, margin: '-50px' }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/products/${product.handle}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Card hover className="overflow-hidden group relative">
            {/* Image Container with Zoom Effect */}
            <div className="relative aspect-square overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="w-full h-full"
              >
                <ProductImage
                  shopifyImageUrl={firstImage?.url}
                  productName={product.title}
                  category={getCategory()}
                  alt={firstImage?.altText || product.title}
                  className="w-full h-full"
                />
              </motion.div>

              {/* Hover Overlay Gradient (Bottom-Up) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-4 pointer-events-none"
              >
                <span className="text-white font-semibold text-sm tracking-wide pointer-events-auto">
                  Ver Detalles
                </span>
              </motion.div>
            </div>

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
              <Badge variant={getCategoryBadge()}>
                {product.vendor || 'UTTILL'}
              </Badge>
              {product.tags.includes('new') && (
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Badge variant="gold">Nuevo</Badge>
                </motion.div>
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

              <div className="flex items-center justify-between mb-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xl font-mono font-bold text-gold-primary"
                >
                  {priceDisplay}
                </motion.span>

                {product.variants.edges.length > 1 && (
                  <span className="text-xs text-text-tertiary">
                    {product.variants.edges.length} variantes
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={handleAddToCart}
                disabled={isLoading || !firstVariant?.availableForSale}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {firstVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
