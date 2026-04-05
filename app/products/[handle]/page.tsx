import Image from 'next/image';
import { notFound } from 'next/navigation';
import { shopifyFetch } from '@/lib/shopify/client';
import { GET_PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify/queries';
import { ShopifyProduct } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils/currency';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface ProductResponse {
  productByHandle: ShopifyProduct | null;
}

export const revalidate = 3600;

export default async function ProductPage({ params }: { params: { handle: string } }) {
  let product: ShopifyProduct | null = null;

  try {
    const data = await shopifyFetch<ProductResponse>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: params.handle },
    });

    product = data.productByHandle;
  } catch (error) {
    console.error('Error fetching product:', error);
  }

  if (!product) {
    notFound();
  }

  const firstVariant = product.variants.edges[0]?.node;
  const images = product.images.edges.map((edge) => edge.node);

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images Gallery */}
        <div>
          {images.length > 0 ? (
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-bg-secondary rounded-lg overflow-hidden">
                <Image
                  src={images[0].url}
                  alt={images[0].altText || product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Thumbnail Grid */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(1, 5).map((image, index) => (
                    <div key={index} className="relative aspect-square bg-bg-tertiary rounded overflow-hidden">
                      <Image
                        src={image.url}
                        alt={image.altText || `${product.title} ${index + 2}`}
                        fill
                        className="object-cover"
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-bg-secondary rounded-lg flex items-center justify-center">
              <span className="text-text-tertiary">Sin imágenes disponibles</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div>
          {/* Badges */}
          <div className="flex gap-2 mb-4">
            <Badge variant="gold">{product.vendor || 'UTTILL'}</Badge>
            {product.productType && (
              <Badge>{product.productType}</Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            {product.title}
          </h1>

          {/* Price */}
          <div className="mb-8">
            <span className="text-4xl font-mono font-bold text-gold-primary">
              {formatPrice(
                product.priceRange.minVariantPrice.amount,
                product.priceRange.minVariantPrice.currencyCode
              )}
            </span>
          </div>

          {/* Description */}
          {product.description && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Descripción</h2>
              <p className="text-text-secondary whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Variants */}
          {product.variants.edges.length > 1 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Variantes disponibles</h3>
              <div className="space-y-2">
                {product.variants.edges.map(({ node: variant }) => (
                  <Card key={variant.id} className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-text-primary">{variant.title}</span>
                      <span className="font-mono text-gold-primary">
                        {formatPrice(variant.priceV2.amount, variant.priceV2.currencyCode)}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/50684105999?text=Hola! Me interesa el producto: ${product.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg" className="w-full">
                Consultar por WhatsApp
              </Button>
            </a>

            <Button variant="outline" size="lg" className="w-full">
              Contactar Asesor
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-bg-secondary border border-bg-tertiary rounded-lg">
            <h3 className="font-semibold mb-2">Información de Compra</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>✓ Métodos de pago: SINPE Móvil, Transferencia Bancaria</li>
              <li>✓ Entrega en Costa Rica</li>
              <li>✓ Asesoría técnica incluida</li>
              <li>✓ Proyectos comerciales: descuentos especiales</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
