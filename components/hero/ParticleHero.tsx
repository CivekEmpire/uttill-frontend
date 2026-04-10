'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

// Lazy load Three.js canvas (reduces initial bundle)
const ParticleCanvas = lazy(() => import('./ParticleCanvas'));

/**
 * Hero Section with Particle Animation Logo Reveal
 *
 * Animation sequence:
 * 1. 0-2s: Particles float randomly
 * 2. 2-4s: Particles move toward logo formation
 * 3. 4-6s: Logo "UTTILL" fully formed with gold glow
 * 4. 6s+: Particles gently disperse, content fades in
 *
 * Performance:
 * - Desktop: 5000 particles @ 60fps
 * - Mobile: Disabled (shows static gradient)
 * - GPU-accelerated WebGL
 */
export function ParticleHero() {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Three.js Particle Background (Desktop only) */}
      <div className="absolute inset-0 hidden md:block">
        <Suspense fallback={<HeroSkeleton />}>
          <ParticleCanvas />
        </Suspense>
      </div>

      {/* Static gradient fallback for mobile */}
      <div className="absolute inset-0 md:hidden bg-gradient-radial from-gold-primary/10 via-transparent to-transparent" />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-grain pointer-events-none" />

      {/* Content Overlay - Fades in after particle animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1.5 }}
        className="relative z-10 flex items-center justify-center h-full px-4"
      >
        <div className="text-center max-w-5xl">
          {/* Title - Already formed by particles */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-gradient gold-glow"
          >
            UTTILL
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5, duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-5xl text-text-secondary mb-4 font-light"
          >
            Life, beautifully lived
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 5.5, duration: 0.8 }}
            className="text-lg md:text-xl lg:text-2xl text-text-tertiary mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Materiales premium para espacios extraordinarios. Pisos de lujo, piedra flexible, y productos wellness.
          </motion.p>

          {/* CTAs with stagger animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/shop">
              <Button variant="primary" size="lg" className="min-w-[200px]">
                Explorar Catálogo
              </Button>
            </Link>
            <Link href="/projects">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Ver Proyectos
              </Button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 7, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-text-tertiary"
            >
              <span className="text-sm tracking-wider">SCROLL</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Loading skeleton while Three.js loads
 */
function HeroSkeleton() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary animate-pulse" />
  );
}
