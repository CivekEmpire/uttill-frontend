'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ParallaxSection } from './ParallaxSection';

/**
 * LifestyleSection - Aspirational content section
 *
 * "Life, beautifully lived" - Not selling products, selling vision
 */
export function LifestyleSection() {
  return (
    <ParallaxSection
      backgroundColor="#141414"
      speed={0.3}
      className="py-32"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
              Life, beautifully lived
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed">
              No vendemos productos. Creamos espacios que respiran contigo.
              Pisos que cuentan historias. Piedra que captura luz.
              Bienestar que se toca con las manos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-12"
          >
            {/* Feature 1 */}
            <div className="p-6 bg-bg-secondary/50 backdrop-blur-sm rounded-lg border border-bg-tertiary">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2 text-gold-primary">
                Espacios Vivos
              </h3>
              <p className="text-text-tertiary">
                Pisos premium y revestimientos que transforman tu hogar
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-bg-secondary/50 backdrop-blur-sm rounded-lg border border-bg-tertiary">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-gold-primary">
                Innovación
              </h3>
              <p className="text-text-tertiary">
                Piedra flexible translúcida, tecnología que sorprende
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-bg-secondary/50 backdrop-blur-sm rounded-lg border border-bg-tertiary">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-semibold mb-2 text-gold-primary">
                Wellbeing
              </h3>
              <p className="text-text-tertiary">
                Productos ayurvédicos para tu bienestar diario
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/shop">
              <Button variant="primary" size="lg" className="px-12">
                Explora Nuestra Visión
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </ParallaxSection>
  );
}
