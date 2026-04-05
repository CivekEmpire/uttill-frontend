import { shopifyFetch } from '@/lib/shopify/client';
import { GET_COLLECTION_BY_HANDLE_QUERY } from '@/lib/shopify/queries';
import { ShopifyCollection } from '@/lib/shopify/types';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { notFound } from 'next/navigation';

interface CollectionResponse {
  collectionByHandle: ShopifyCollection | null;
}

export const revalidate = 3600;

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  let collection: ShopifyCollection | null = null;

  try {
    const data = await shopifyFetch<CollectionResponse>({
      query: GET_COLLECTION_BY_HANDLE_QUERY,
      variables: { handle: params.handle, first: 100 },
    });

    collection = data.collectionByHandle;
  } catch (error) {
    console.error('Error fetching collection:', error);
  }

  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map((edge) => edge.node);

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-xl text-text-secondary">
            {collection.description}
          </p>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 mb-8 text-text-tertiary">
        <span className="text-sm">
          {products.length} productos en esta colección
        </span>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />
    </div>
  );
}
