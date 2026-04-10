/**
 * Shopify Predictive Search Integration
 * Session #021 — 10 Abril 2026
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'zxufs7-tz.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '895d30a99e690cd14461b89eb4ea25f6';
const SHOPIFY_API_VERSION = '2024-01';

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

interface PredictiveSearchProduct {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
}

interface PredictiveSearchResult {
  products: PredictiveSearchProduct[];
  queries: string[];
}

/**
 * Shopify Predictive Search GraphQL Query
 */
const PREDICTIVE_SEARCH_QUERY = `
  query PredictiveSearch($query: String!, $limit: Int!) {
    predictiveSearch(query: $query, limit: $limit, types: [PRODUCT, QUERY]) {
      products {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
      queries {
        text
      }
    }
  }
`;

/**
 * Fetch predictive search results from Shopify
 *
 * @param query - Search query string
 * @param limit - Max number of results (default: 10)
 * @returns PredictiveSearchResult with products and suggested queries
 */
export async function fetchPredictiveSearch(
  query: string,
  limit: number = 10
): Promise<PredictiveSearchResult> {
  if (!query || query.trim().length === 0) {
    return { products: [], queries: [] };
  }

  try {
    const response = await fetch(SHOPIFY_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
      },
      body: JSON.stringify({
        query: PREDICTIVE_SEARCH_QUERY,
        variables: {
          query: query.trim(),
          limit,
        },
      }),
      // Cache for 1 minute
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Shopify Predictive Search API error:', response.status);
      return { products: [], queries: [] };
    }

    const data = await response.json();

    if (data.errors) {
      console.error('Shopify GraphQL errors:', data.errors);
      return { products: [], queries: [] };
    }

    const predictiveSearch = data.data?.predictiveSearch;

    if (!predictiveSearch) {
      return { products: [], queries: [] };
    }

    return {
      products: predictiveSearch.products || [],
      queries: predictiveSearch.queries?.map((q: any) => q.text) || [],
    };
  } catch (error) {
    console.error('fetchPredictiveSearch error:', error);
    return { products: [], queries: [] };
  }
}

/**
 * Format product for SearchBar display
 */
export function formatSearchProduct(product: PredictiveSearchProduct) {
  const imageUrl = product.images.edges[0]?.node.url || '/images/placeholder-product.jpg';
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    image: imageUrl,
    price,
    currencyCode,
    url: `/products/${product.handle}`,
  };
}
