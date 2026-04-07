import { Card } from '@/components/ui/Card';

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          Proyectos
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Inspiración real de espacios transformados con nuestros materiales premium
        </p>
      </div>

      {/* Coming Soon */}
      <Card className="p-12 text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gold-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4">Galería Próximamente</h2>
        <p className="text-text-secondary mb-8">
          Estamos preparando una increíble galería de proyectos realizados con nuestros
          materiales. Muy pronto podrás ver renders, fotos reales y casos de éxito.
        </p>
        <a
          href="https://wa.me/50684105999?text=Hola! Me gustaría ver ejemplos de proyectos con UTTILL"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-gold-primary text-bg-primary font-medium rounded hover:bg-gold-light transition-colors"
        >
          Solicitar Portfolio por WhatsApp
        </a>
      </Card>

      {/* Placeholder Grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="aspect-square bg-bg-secondary animate-shimmer">
            <div className="h-full" />
          </Card>
        ))}
      </div>
    </div>
  );
}
