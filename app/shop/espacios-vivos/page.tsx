import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCTS_QUERY } from '@/lib/shopify/queries';
import { ShopifyProduct } from '@/lib/shopify/types';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { CATEGORIES } from '@/lib/constants/categories';

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export const revalidate = 3600;

export default async function EspaciosVivosPage() {
  let products: ShopifyProduct[] = [];

  try {
    const data = await shopifyFetch<ProductsResponse>({
      query: GET_PRODUCTS_QUERY,
      variables: { first: 100 },
    });

    // Filter products for Espacios Vivos (SPC, Laminate, Stone)
    products = data.products.edges
      .map((edge) => edge.node)
      .filter((product) => {
        const type = product.productType.toLowerCase();
        const tags = product.tags.join(' ').toLowerCase();
        return (
          type.includes('floor') ||
          type.includes('stone') ||
          tags.includes('suelux') ||
          tags.includes('pietraflex')
        );
      });
  } catch (error) {
    console.error('Error fetching products:', error);
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: CATEGORIES.ESPACIOS_VIVOS.color }}>
          {CATEGORIES.ESPACIOS_VIVOS.name}
        </h1>
        <p className="text-xl text-text-secondary">
          {CATEGORIES.ESPACIOS_VIVOS.description}
        </p>
      </div>

      {/* Subcategories */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-bg-secondary border border-bg-tertiary rounded-lg">
          <h3 className="text-2xl font-bold mb-2">Suelux</h3>
          <p className="text-text-secondary">
            Pisos premium SPC y laminados de alta durabilidad
          </p>
        </div>
        <div className="p-6 bg-bg-secondary border border-bg-tertiary rounded-lg">
          <h3 className="text-2xl font-bold mb-2">PietraFlex</h3>
          <p className="text-text-secondary">
            Piedra flexible natural y translúcida para espacios únicos
          </p>
        </div>
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
