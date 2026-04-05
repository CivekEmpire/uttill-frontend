import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gradient">
          Contacto
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Estamos aquí para ayudarte. Contáctanos por tu canal preferido
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Contact Info */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gold-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <a
                  href="https://wa.me/50684105999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-primary hover:text-gold-light"
                >
                  +506 8410 5999
                </a>
                <p className="text-sm text-text-tertiary mt-1">
                  Respuesta inmediata
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Teléfono</h3>
                <a href="tel:+50684105999" className="text-gold-primary hover:text-gold-light">
                  +506 8410 5999
                </a>
                <p className="text-sm text-text-tertiary mt-1">
                  Lun - Vie: 8am - 6pm
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <a href="mailto:info@uttill.com" className="text-gold-primary hover:text-gold-light">
                  info@uttill.com
                </a>
                <p className="text-sm text-text-tertiary mt-1">
                  Respuesta en 24h
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Ubicación</h3>
                <p className="text-text-secondary">Costa Rica</p>
                <p className="text-sm text-text-tertiary mt-1">
                  Entrega nacional
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Métodos de Pago</h2>

          <div className="space-y-6">
            {/* SINPE Móvil */}
            <div className="p-4 bg-bg-tertiary rounded-lg">
              <h3 className="font-semibold mb-2">SINPE Móvil</h3>
              <p className="text-gold-primary font-mono text-lg mb-1">8410-5999</p>
              <p className="text-sm text-text-tertiary">
                Transferencia inmediata desde tu banco
              </p>
            </div>

            {/* Transferencia */}
            <div className="p-4 bg-bg-tertiary rounded-lg">
              <h3 className="font-semibold mb-2">Transferencia Bancaria</h3>
              <div className="space-y-1 text-sm">
                <p className="text-text-secondary">
                  <span className="text-text-tertiary">Banco:</span> Banco Nacional de Costa Rica
                </p>
                <p className="text-text-secondary">
                  <span className="text-text-tertiary">Cuenta Colones:</span> 200-01-100-011733-9
                </p>
                <p className="text-text-secondary">
                  <span className="text-text-tertiary">IBAN CRC:</span> CR68015112420020033467
                </p>
                <p className="text-text-secondary">
                  <span className="text-text-tertiary">Titular:</span> UTTILL S.A.
                </p>
              </div>
            </div>

            {/* Note */}
            <div className="p-4 border border-gold-primary/30 rounded-lg">
              <p className="text-sm text-text-secondary">
                💡 <strong>Nota:</strong> Envíanos el comprobante de pago por WhatsApp para procesar tu pedido más rápido
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Card className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-gold-primary/10 via-gold-primary/5 to-gold-primary/10">
          <h2 className="text-2xl font-bold mb-4">¿Tienes un proyecto comercial?</h2>
          <p className="text-text-secondary mb-6">
            Contamos con soluciones B2B para arquitectos, constructoras y distribuidores
          </p>
          <a
            href="/b2b"
            className="inline-block px-6 py-3 bg-gold-primary text-bg-primary font-medium rounded hover:bg-gold-light transition-colors"
          >
            Ver Soluciones B2B
          </a>
        </Card>
      </div>
    </div>
  );
}
