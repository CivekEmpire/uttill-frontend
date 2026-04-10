'use client';

/**
 * Cart Context - Global cart state management
 * Session #022 - 10 Abril 2026
 */

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Cart, createCart, addToCart as addToCartAPI, getCart, removeFromCart as removeFromCartAPI, updateCartLine, getCartItemCount } from '@/lib/shopify/cart';

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  itemCount: number;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = 'uttill_cart_id';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      const existingCart = await getCart(cartId);
      if (existingCart) {
        setCart(existingCart);
        return;
      }
    }
    // If no cart exists, we'll create one when user adds first item
  };

  const ensureCart = async (): Promise<string | null> => {
    if (cart?.id) return cart.id;

    const newCart = await createCart();
    if (newCart) {
      setCart(newCart);
      localStorage.setItem(CART_ID_KEY, newCart.id);
      return newCart.id;
    }
    return null;
  };

  const addToCart = useCallback(async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      const cartId = await ensureCart();
      if (!cartId) {
        console.error('Failed to create cart');
        return;
      }

      const updatedCart = await addToCartAPI(cartId, variantId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
        setIsCartOpen(true); // Auto-open cart drawer
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cart?.id) return;

    setIsLoading(true);
    try {
      const updatedCart = await removeFromCartAPI(cart.id, [lineId]);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart?.id) return;

    if (quantity <= 0) {
      await removeFromCart(lineId);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await updateCartLine(cart.id, lineId, quantity);
      if (updatedCart) {
        setCart(updatedCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setIsLoading(false);
    }
  }, [cart, removeFromCart]);

  const clearCart = useCallback(() => {
    setCart(null);
    localStorage.removeItem(CART_ID_KEY);
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const itemCount = getCartItemCount(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        isCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
