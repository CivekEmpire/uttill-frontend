/**
 * ImagineArt API Client
 * Gateway integration for AI-generated product visuals
 */

const GATEWAY_URL = 'https://civek-gateway-651139657995.us-central1.run.app';
const GATEWAY_API_KEY = 'CvkMprGtwyChmm1970*#';

export interface ImagineArtRequest {
  prompt: string;
  model?: 'imagine-v5' | 'imagine-v4.1' | 'realistic';
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  style?: 'realistic' | 'anime' | 'artistic' | 'photographic';
  negativePrompt?: string;
}

export interface ImagineArtResponse {
  success: boolean;
  image_url?: string;
  error?: string;
  model_used?: string;
}

/**
 * Generate product image using ImagineArt via Gateway
 */
export async function generateProductImage(
  request: ImagineArtRequest
): Promise<string | null> {
  try {
    const response = await fetch(`${GATEWAY_URL}/api/v1/imagineart/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': GATEWAY_API_KEY,
      },
      body: JSON.stringify({
        prompt: request.prompt,
        model: request.model || 'imagine-v5',
        aspect_ratio: request.aspectRatio || '1:1',
        style_preset: request.style || 'photographic',
        negative_prompt: request.negativePrompt || 'blurry, low quality, distorted',
      }),
    });

    if (!response.ok) {
      console.error('ImagineArt API error:', response.statusText);
      return null;
    }

    const data: ImagineArtResponse = await response.json();

    if (data.success && data.image_url) {
      return data.image_url;
    }

    console.error('ImagineArt generation failed:', data.error);
    return null;
  } catch (error) {
    console.error('ImagineArt client error:', error);
    return null;
  }
}

/**
 * Generate product image with category-specific prompts
 */
export async function generateProductImageByCategory(
  productName: string,
  category: 'suelux' | 'pietraflex' | 'drvek' | 'sankom' | 'default'
): Promise<string | null> {
  const categoryPrompts: Record<string, string> = {
    suelux: `Premium SPC luxury flooring "${productName}", high-end interior design, photorealistic, professional product photography, clean white background, perfect lighting, 8K resolution`,
    pietraflex: `Flexible natural stone "${productName}", translucent stone panel, architectural material, professional product shot, dramatic lighting, textured surface detail, photorealistic`,
    drvek: `Ayurvedic copper water bottle "${productName}", premium wellness product, golden copper finish, minimalist product photography, white background, soft studio lighting`,
    sankom: `Premium compression garment "${productName}", athletic wellness wear, professional product photography, clean background, lifestyle context, high quality fabric detail`,
    default: `Premium product "${productName}", professional ecommerce photography, clean background, perfect lighting, photorealistic, 8K quality`,
  };

  const prompt = categoryPrompts[category] || categoryPrompts.default;

  return generateProductImage({
    prompt,
    model: 'imagine-v5',
    aspectRatio: '1:1',
    style: 'photographic',
    negativePrompt: 'blurry, low quality, distorted, watermark, text, logo',
  });
}

/**
 * Batch generate images for multiple products
 */
export async function batchGenerateProductImages(
  products: Array<{ name: string; category: string }>
): Promise<Array<{ name: string; imageUrl: string | null }>> {
  const results = [];

  for (const product of products) {
    const imageUrl = await generateProductImageByCategory(
      product.name,
      product.category as any
    );

    results.push({
      name: product.name,
      imageUrl,
    });

    // Rate limiting: wait 2s between requests
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  return results;
}
