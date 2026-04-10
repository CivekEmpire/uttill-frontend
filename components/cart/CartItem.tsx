'use client';

/**
 * CartItem Component - Individual item in cart
 * Session #022 - 10 Abril 2026
 */

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X } from 'lucide-react';
import { CartLine } from '@/lib/shopify/cart';
import { formatPrice } from '@/lib/utils/currency';

interface CartItemProps {
  item: CartLine;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
  onRemove: (lineId: string) => void;
  isLoading?: boolean;
}

export function CartItem({ item, onUpdateQuantity, onRemove, isLoading }: CartItemProps) {
  const { merchandise, quantity, id } = item;
  const imageUrl = merchandise.product.images.edges[0]?.node.url || '/placeholder.jpg';
  const price = merchandise.priceV2.amount;
  const total = (parseFloat(price) * quantity).toString();

  return (
    <div className="flex gap-4 py-4 border-b border-bg-tertiary">
      {/* Image */}
      <Link href={`/products/${merchandise.product.handle}`} className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-bg-tertiary">
          <Image
            src={imageUrl}
            alt={merchandise.product.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${merchandise.product.handle}`}
            className="font-medium text-text-primary hover:text-gold-primary transition-colors"
          >
            {merchandise.product.title}
          </Link>
          {merchandise.title !== 'Default Title' && (
            <p className="text-sm text-text-tertiary mt-1">{merchandise.title}</p>
          )}
          <p className="text-sm text-gold-primary mt-1">
            {formatPrice(price, merchandise.priceV2.currencyCode)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-2 bg-bg-tertiary rounded-lg p-1">
            <button
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={isLoading}
              className="p-1 hover:bg-bg-primary rounded transition-colors disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              disabled={isLoading}
              className="p-1 hover:bg-bg-primary rounded transition-colors disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <span className="text-sm text-text-secondary">
            Total: {formatPrice(total, merchandise.priceV2.currencyCode)}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(id)}
        disabled={isLoading}
        className="flex-shrink-0 p-2 hover:text-red-500 transition-colors disabled:opacity-50"
        aria-label="Remove item"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
