import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ArquitectosPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-gradient">Soluciones para Arquitectos</h1>
        <p className="text-xl text-text-secondary mb-12">
          Especificaciones técnicas completas, renders 3D, y el soporte que necesitas para especificar con confianza
        </p>

        <div className="space-y-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Catálogo BIM</h2>
            <p className="text-text-secondary mb-4">
              Familias Revit, modelos SketchUp, y archivos CAD para todos nuestros productos
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• Especificaciones técnicas detalladas</li>
              <li>• Renders alta resolución</li>
              <li>• Texturas PBR para visualización</li>
              <li>• Documentación de instalación</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Muestras Físicas</h2>
            <p className="text-text-secondary mb-4">
              Envío gratis de muestras para presentación a clientes
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• Kit de muestras gratuito</li>
              <li>• Material board personalizado</li>
              <li>• Certificaciones de producto</li>
              <li>• Garantías extendidas para proyectos</li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Asesoría Técnica</h2>
            <p className="text-text-secondary mb-4">
              Equipo especializado disponible para consultas de especificación
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li>• Soporte pre-especificación</li>
              <li>• Cálculo de cantidades</li>
              <li>• Recomendaciones de instalación</li>
              <li>• Visitas a obra (proyectos +100m²)</li>
            </ul>
          </Card>

          <div className="text-center pt-8">
            <a
              href="https://wa.me/50684105999?text=Hola! Soy arquitecto y me interesa el programa B2B de UTTILL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="lg">
                Solicitar Kit de Arquitecto
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
