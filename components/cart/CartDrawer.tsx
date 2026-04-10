'use client';

/**
 * CartDrawer Component - Slide-in cart panel
 * Session #022 - 10 Abril 2026
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from './CartItem';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/currency';

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, isLoading, itemCount } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const isEmpty = itemCount === 0;
  const subtotal = cart?.cost?.subtotalAmount?.amount || '0';
  const currency = cart?.cost?.subtotalAmount?.currencyCode || 'USD';

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-primary shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-bg-tertiary">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-gold-primary" />
            <h2 className="text-xl font-bold text-text-primary">
              Cart ({itemCount})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-text-tertiary mb-4" />
              <p className="text-text-secondary mb-2">Your cart is empty</p>
              <p className="text-sm text-text-tertiary mb-6">
                Start adding some amazing products!
              </p>
              <Button variant="primary" onClick={closeCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart?.lines?.edges.map(({ node }) => (
                <CartItem
                  key={node.id}
                  item={node}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  isLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t border-bg-tertiary p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-bold text-text-primary">
                {formatPrice(subtotal, currency)}
              </span>
            </div>

            {/* Shipping Note */}
            <p className="text-xs text-text-tertiary text-center">
              Shipping and taxes calculated at checkout
            </p>

            {/* Actions */}
            <div className="space-y-2">
              <a href={cart?.checkoutUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" className="w-full" size="lg">
                  Checkout
                </Button>
              </a>
              <Link href="/cart" onClick={closeCart}>
                <Button variant="outline" className="w-full">
                  View Cart
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
