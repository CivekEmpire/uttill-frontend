import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function B2BPage() {
  const solutions = [
    {
      title: 'Arquitectos',
      href: '/b2b/arquitectos',
      icon: '📐',
      description: 'Especificaciones técnicas, renders 3D, y muestras físicas para tus proyectos',
      benefits: ['Catálogo BIM', 'Renders personalizados', 'Asesoría técnica', 'Muestras gratis'],
    },
    {
      title: 'Constructoras',
      href: '/b2b/constructoras',
      icon: '🏗️',
      description: 'Volúmenes, logística coordinada, y facturación adaptada a tu flujo',
      benefits: ['Descuentos por volumen', 'Entrega programada', 'Crédito 30 días', 'Soporte on-site'],
    },
    {
      title: 'Distribuidores Internacionales',
      href: '/b2b/distribuidores',
      icon: '🌎',
      description: 'Marca blanca, exclusividad territorial, y soporte comercial completo',
      benefits: ['Exclusividad territorial', 'Marca blanca', 'Material marketing', 'Capacitación'],
    },
    {
      title: 'Franquicias',
      href: '/b2b/franquicias',
      icon: '🏪',
      description: 'Sistema probado, tecnología incluida, y soporte operativo continuo',
      benefits: ['Sistema completo', 'IA integrada', 'Desde $5,000', 'ROI 6-12 meses'],
    },
  ];

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          Soluciones B2B
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Partners estratégicos para profesionales y empresas que exigen excelencia
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {solutions.map((solution) => (
          <Link key={solution.title} href={solution.href}>
            <Card hover className="p-8 h-full">
              <div className="text-5xl mb-4">{solution.icon}</div>
              <h2 className="text-3xl font-bold mb-3">{solution.title}</h2>
              <p className="text-text-secondary mb-6">{solution.description}</p>
              <ul className="space-y-2">
                {solution.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-text-secondary">
                    <span className="text-gold-primary">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          </Link>
        ))}
      </div>

      {/* Custom Solutions */}
      <Card className="p-12 text-center bg-gradient-to-r from-gold-primary/10 via-gold-primary/5 to-gold-primary/10 mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gradient">¿Tienes algo diferente en mente?</h2>
        <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Diseñamos soluciones personalizadas para necesidades únicas. Desde alianzas estratégicas
          hasta modelos de negocio completamente nuevos.
        </p>
        <Link href="/b2b/propuesta">
          <Button variant="primary" size="lg">
            Propón tu Idea
          </Button>
        </Link>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="p-6 text-center">
          <div className="text-4xl font-mono font-bold text-gold-primary mb-2">64+</div>
          <p className="text-text-secondary">Productos Premium</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-4xl font-mono font-bold text-gold-primary mb-2">24/7</div>
          <p className="text-text-secondary">Soporte Técnico</p>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-4xl font-mono font-bold text-gold-primary mb-2">100%</div>
          <p className="text-text-secondary">Satisfacción Garantizada</p>
        </Card>
      </div>

      {/* Contact */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Hablemos de tu Proyecto</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/50684105999?text=Hola! Me interesa una solución B2B de UTTILL"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg">
              WhatsApp B2B
            </Button>
          </a>
          <a href="mailto:b2b@uttill.com">
            <Button variant="outline" size="lg">
              b2b@uttill.com
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
