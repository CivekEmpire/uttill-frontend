import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '@/lib/shopify/queries';
import { ShopifyProduct } from '@/lib/shopify/types';
import { ProductGrid } from '@/components/shop/ProductGrid';

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export const revalidate = 3600; // Revalidar cada hora

export default async function ShopPage() {
  let products: ShopifyProduct[] = [];

  try {
    const data = await shopifyFetch<ProductsResponse>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 100 },
    });

    products = data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          Catálogo Completo
        </h1>
        <p className="text-xl text-text-secondary">
          Descubre todos nuestros productos premium
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-8 text-text-tertiary">
        <span className="text-sm">
          {products.length} productos encontrados
        </span>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
