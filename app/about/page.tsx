import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          UTTILL
        </h1>
        <p className="text-2xl text-gold-primary mb-4">Life, beautifully lived</p>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Transformando espacios con materiales premium de clase mundial
        </p>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              UTTILL nace de una visión clara: democratizar el acceso a materiales de construcción
              y bienestar de nivel premium en Costa Rica y más allá.
            </p>
            <p>
              Somos parte del CIVEK Empire, un ecosistema empresarial que combina tecnología de
              punta con comercio internacional estratégico. Esto nos permite ofrecer productos
              excepcionales a precios incomparables.
            </p>
            <p>
              No somos solo una tienda. Somos arquitectos de experiencias, curadores de calidad,
              y partners estratégicos para profesionales y consumidores que no aceptan compromisos.
            </p>
          </div>
        </Card>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
          Nuestros Valores
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Excelencia</h3>
            <p className="text-text-secondary">
              Solo trabajamos con productos que nosotros mismos usaríamos en nuestros espacios
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-3">Transparencia</h3>
            <p className="text-text-secondary">
              Precios claros, información completa, sin sorpresas ni letra pequeña
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Innovación</h3>
            <p className="text-text-secondary">
              Tecnología y automatización al servicio de una experiencia de compra superior
            </p>
          </Card>
        </div>
      </div>

      {/* Products */}
      <div className="mb-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
          Nuestras Líneas
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#8b7355' }}>
              Espacios Vivos
            </h3>
            <p className="text-text-secondary mb-4">
              Pisos SPC de última generación y piedra flexible para paredes que desafían lo convencional
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• <strong>Suelux:</strong> Pisos premium SPC y laminados</li>
              <li>• <strong>PietraFlex:</strong> Piedra natural y translúcida flexible</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#6b8e7f' }}>
              Wellbeing
            </h3>
            <p className="text-text-secondary mb-4">
              Productos para el bienestar que combinan tradición milenaria con diseño moderno
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• <strong>Dr.Vek Ayurvedic:</strong> Botellas de cobre ayurvédicas</li>
              <li>• <strong>Sankom:</strong> Ropa de compresión inteligente</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Card className="p-12 max-w-3xl mx-auto bg-gradient-to-r from-gold-primary/10 via-gold-primary/5 to-gold-primary/10">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl text-text-secondary mb-8">
            Explora nuestro catálogo o habla directamente con un especialista
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="inline-block px-8 py-3 bg-gold-primary text-bg-primary font-medium rounded hover:bg-gold-light transition-colors"
            >
              Ver Catálogo
            </a>
            <a
              href="https://wa.me/50684105999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border border-gold-primary text-gold-primary font-medium rounded hover:bg-gold-primary hover:text-bg-primary transition-all"
            >
              WhatsApp
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
