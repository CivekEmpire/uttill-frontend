/**
 * Shopify Cart API Functions
 * Session #022 - 10 Abril 2026
 */

import { shopifyFetch } from './client';
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  GET_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_LINE_MUTATION,
} from './queries';

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images: {
        edges: Array<{
          node: {
            url: string;
            altText: string | null;
          };
        }>;
      };
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

/**
 * Create a new cart
 */
export async function createCart(): Promise<Cart | null> {
  try {
    const res = await shopifyFetch({
      query: CREATE_CART_MUTATION,
      variables: {
        input: {},
      },
    }) as any;

    return res.body?.data?.cartCreate?.cart || null;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
}

/**
 * Add item to cart
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart | null> {
  try {
    const res = await shopifyFetch({
      query: ADD_TO_CART_MUTATION,
      variables: {
        cartId,
        lines: [
          {
            merchandiseId: variantId,
            quantity,
          },
        ],
      },
    }) as any;

    return res.body?.data?.cartLinesAdd?.cart || null;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return null;
  }
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const res = await shopifyFetch({
      query: GET_CART_QUERY,
      variables: { cartId },
    }) as any;

    return res.body?.data?.cart || null;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return null;
  }
}

/**
 * Update cart line quantity
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  try {
    const res = await shopifyFetch({
      query: UPDATE_CART_LINE_MUTATION,
      variables: {
        cartId,
        lineId,
        quantity,
      },
    }) as any;

    return res.body?.data?.cartLinesUpdate?.cart || null;
  } catch (error) {
    console.error('Error updating cart line:', error);
    return null;
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  try {
    const res = await shopifyFetch({
      query: REMOVE_FROM_CART_MUTATION,
      variables: {
        cartId,
        lineIds,
      },
    }) as any;

    return res.body?.data?.cartLinesRemove?.cart || null;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return null;
  }
}

/**
 * Get total items in cart
 */
export function getCartItemCount(cart: Cart | null): number {
  if (!cart?.lines?.edges) return 0;
  return cart.lines.edges.reduce((total, { node }) => total + node.quantity, 0);
}
