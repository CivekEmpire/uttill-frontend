import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function FranquiciasPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-gradient">Franquicias Cognitivas UTTILL</h1>
        <p className="text-xl text-text-secondary mb-12">
          El primer modelo de franquicia con IA integrada. Sistema completo, tecnología incluida, soporte continuo.
        </p>

        <div className="space-y-8 mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Sistema Completo</h2>
            <p className="text-text-secondary mb-4">
              Todo lo que necesitas para operar desde día 1
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• E-commerce headless (Next.js + Shopify)</li>
              <li>• Sistema de inventario automatizado</li>
              <li>• CRM con seguimiento de leads</li>
              <li>• Marketing automation incluido</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">3 Tiers de Inversión</h2>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-bg-tertiary rounded">
                <h3 className="font-bold text-lg mb-2">Micro</h3>
                <p className="text-2xl font-mono text-gold-primary mb-2">$5,000</p>
                <p className="text-sm text-text-tertiary">Online only, 1 ciudad</p>
              </div>
              <div className="p-4 bg-bg-tertiary rounded border-2 border-gold-primary">
                <h3 className="font-bold text-lg mb-2">Standard</h3>
                <p className="text-2xl font-mono text-gold-primary mb-2">$25,000</p>
                <p className="text-sm text-text-tertiary">Showroom físico, región</p>
              </div>
              <div className="p-4 bg-bg-tertiary rounded">
                <h3 className="font-bold text-lg mb-2">Premium</h3>
                <p className="text-2xl font-mono text-gold-primary mb-2">$50,000</p>
                <p className="text-sm text-text-tertiary">Multi-ubicación, país</p>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">IA que Trabaja para Ti</h2>
            <p className="text-text-secondary mb-4">
              Automatización real, no buzzwords
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• Chatbot para atención 24/7</li>
              <li>• Predicción de demanda por producto</li>
              <li>• Pricing dinámico según mercado</li>
              <li>• Generación automática de contenido</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">ROI Proyectado</h2>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-semibold mb-2">Micro ($5K)</h3>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Ingresos mes 1-3: $2K-5K</li>
                  <li>• Margen: 25-30%</li>
                  <li>• Break-even: 6-8 meses</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Standard ($25K)</h3>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Ingresos mes 1-3: $10K-20K</li>
                  <li>• Margen: 30-35%</li>
                  <li>• Break-even: 8-12 meses</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <a
            href="https://wa.me/50684105999?text=Hola! Me interesa información sobre las Franquicias Cognitivas UTTILL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg">
              Solicitar Información Completa
            </Button>
          </a>
          <p className="text-sm text-text-tertiary mt-4">
            Documento completo disponible bajo NDA
          </p>
        </div>
      </div>
    </div>
  );
}
