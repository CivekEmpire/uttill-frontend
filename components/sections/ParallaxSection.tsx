'use client';

import { useRef, ReactNode } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  speed?: number; // Parallax speed multiplier (default 0.5)
  className?: string;
}

/**
 * ParallaxSection - Background scrolls at different speed than content
 *
 * Inspired by Apple-style scroll animations
 * - Multiple layers with different scroll speeds
 * - Smooth scroll-driven transforms
 * - Mobile optimized (disabled on small screens)
 *
 * Usage:
 * <ParallaxSection backgroundImage="/lifestyle-scene.jpg" speed={0.5}>
 *   <YourContent />
 * </ParallaxSection>
 */
export function ParallaxSection({
  children,
  backgroundImage,
  backgroundColor = 'transparent',
  speed = 0.5,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef(null);

  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'], // Starts animating when section enters viewport
  });

  // Transform scroll into Y position for parallax effect
  // Negative values make background scroll slower (upward)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${(1 - speed) * 100}%`]);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Parallax Background Layer - Hidden on mobile for performance */}
      <div className="absolute inset-0 -z-10 hidden md:block">
        <motion.div
          style={{ y }}
          className="absolute inset-0 -top-[20%] -bottom-[20%]"
        >
          {backgroundImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: backgroundColor,
              }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor }}
            />
          )}
        </motion.div>
      </div>

      {/* Mobile Fallback - Static background */}
      <div className="absolute inset-0 -z-10 md:hidden">
        {backgroundImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundColor: backgroundColor,
            }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor }}
          />
        )}
      </div>

      {/* Content - Scrolls at normal speed */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
