import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ParticleHero } from '@/components/hero/ParticleHero';
import { CATEGORIES, COLLECTIONS } from '@/lib/constants/categories';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section with Particle Animation */}
      <ParticleHero />

      {/* Categories Section */}
      <section className="container py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
          Nuestras Categorías
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Espacios Vivos */}
          <Link href="/shop/espacios-vivos">
            <Card hover className="p-8 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-3xl font-bold mb-4" style={{ color: CATEGORIES.ESPACIOS_VIVOS.color }}>
                  {CATEGORIES.ESPACIOS_VIVOS.name}
                </h3>
                <p className="text-text-secondary mb-6 flex-grow">
                  {CATEGORIES.ESPACIOS_VIVOS.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded">
                    <span className="text-text-primary font-medium">Suelux</span>
                    <span className="text-text-tertiary text-sm">Pisos premium</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded">
                    <span className="text-text-primary font-medium">PietraFlex</span>
                    <span className="text-text-tertiary text-sm">Piedra flexible</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          {/* Wellbeing */}
          <Link href="/shop/wellbeing">
            <Card hover className="p-8 h-full">
              <div className="flex flex-col h-full">
                <h3 className="text-3xl font-bold mb-4" style={{ color: CATEGORIES.WELLBEING.color }}>
                  {CATEGORIES.WELLBEING.name}
                </h3>
                <p className="text-text-secondary mb-6 flex-grow">
                  {CATEGORIES.WELLBEING.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded">
                    <span className="text-text-primary font-medium">Dr.Vek</span>
                    <span className="text-text-tertiary text-sm">Botellas cobre</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-bg-tertiary rounded">
                    <span className="text-text-primary font-medium">Sankom</span>
                    <span className="text-text-tertiary text-sm">Compresión inteligente</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-bg-secondary py-24">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">
            ¿Por qué UTTILL?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-text-secondary">
                Solo los mejores materiales seleccionados para tu hogar
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Mejor Precio</h3>
              <p className="text-text-secondary">
                Importación directa, sin intermediarios
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-primary/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Asesoría Expert</h3>
              <p className="text-text-secondary">
                Equipo especializado para tu proyecto
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <Card className="p-12 text-center bg-gradient-to-r from-gold-primary/10 via-gold-primary/5 to-gold-primary/10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            ¿Listo para transformar tu espacio?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Contacta con nuestro equipo B2B para proyectos comerciales o explora nuestro catálogo completo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/b2b">
              <Button variant="primary" size="lg">
                Soluciones B2B
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contactar
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}
