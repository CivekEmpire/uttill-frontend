/**
 * Cart Page - Full cart view
 * Session #022 - 10 Abril 2026
 */

'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils/currency';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, isLoading, itemCount } = useCart();

  const isEmpty = itemCount === 0;
  const subtotal = cart?.cost?.subtotalAmount?.amount || '0';
  const currency = cart?.cost?.subtotalAmount?.currencyCode || 'USD';

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/shop">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-gradient">Shopping Cart</h1>
      </div>

      {isEmpty ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <ShoppingBag className="w-24 h-24 text-text-tertiary mb-6" />
          <h2 className="text-2xl font-bold text-text-primary mb-2">Your cart is empty</h2>
          <p className="text-text-secondary mb-8 max-w-md">
            Looks like you haven&apos;t added anything to your cart yet. Explore our amazing products!
          </p>
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Explore Products
            </Button>
          </Link>
        </div>
      ) : (
        /* Cart Content */
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Items ({itemCount})
              </h2>
              <div className="space-y-2">
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
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary border border-bg-tertiary rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-text-primary mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal, currency)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Taxes</span>
                  <span className="text-sm">Calculated at checkout</span>
                </div>
                <div className="border-t border-bg-tertiary pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-gold-primary">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <a
                href={cart?.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="primary" size="lg" className="w-full mb-4">
                  Proceed to Checkout
                </Button>
              </a>

              {/* Security Badge */}
              <div className="text-center pt-4 border-t border-bg-tertiary">
                <p className="text-xs text-text-tertiary">
                  🔒 Secure checkout powered by Shopify
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
