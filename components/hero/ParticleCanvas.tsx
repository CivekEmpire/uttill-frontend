'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Particle System Component
 * Animates 5000 particles from random → logo formation → disperse
 */
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null);
  const animationProgress = useRef(0);
  const [isClient, setIsClient] = useState(false);

  const particleCount = 5000;

  // Only run on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate initial random positions
  const { positions, initialPositions } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const initial = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      initial[i * 3] = x;
      initial[i * 3 + 1] = y;
      initial[i * 3 + 2] = z;
    }

    return { positions: pos, initialPositions: initial };
  }, [particleCount]);

  // Target positions forming "UTTILL" text
  const targetPositions = useMemo(() => {
    const target = new Float32Array(particleCount * 3);

    // Simple text formation using grid pattern
    // In production, use text-to-geometry library for precise logo shape
    const text = 'UTTILL';
    const charsPerLetter = Math.floor(particleCount / text.length);

    for (let i = 0; i < particleCount; i++) {
      const letterIndex = Math.floor(i / charsPerLetter);
      const letterOffset = (letterIndex - text.length / 2) * 2;

      // Create cloud of particles around each letter position
      const localX = (Math.random() - 0.5) * 1.2;
      const localY = (Math.random() - 0.5) * 2;

      target[i * 3] = letterOffset + localX;
      target[i * 3 + 1] = localY;
      target[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }

    return target;
  }, [particleCount]);

  // Animation loop
  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    // Animation: 6 seconds total
    const animationDuration = 6;
    animationProgress.current += delta / animationDuration;
    const progress = Math.min(animationProgress.current, 1);

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      if (progress < 0.33) {
        // Phase 1 (0-2s): Random floating
        positions[i3] = initialPositions[i3] + Math.sin(state.clock.elapsedTime + i) * 0.1;
        positions[i3 + 1] = initialPositions[i3 + 1] + Math.cos(state.clock.elapsedTime + i) * 0.1;
      } else if (progress < 0.67) {
        // Phase 2 (2-4s): Move to logo formation
        const phase = (progress - 0.33) / 0.34;
        const eased = easeInOutCubic(phase);

        positions[i3] = THREE.MathUtils.lerp(
          initialPositions[i3],
          targetPositions[i3],
          eased
        );
        positions[i3 + 1] = THREE.MathUtils.lerp(
          initialPositions[i3 + 1],
          targetPositions[i3 + 1],
          eased
        );
        positions[i3 + 2] = THREE.MathUtils.lerp(
          initialPositions[i3 + 2],
          targetPositions[i3 + 2],
          eased
        );
      } else {
        // Phase 3 (4-6s): Logo formed, gentle float + start disperse
        const phase = (progress - 0.67) / 0.33;
        const disperseAmount = phase * 0.3;

        positions[i3] =
          targetPositions[i3] +
          Math.sin(state.clock.elapsedTime + i) * 0.05 +
          (Math.random() - 0.5) * disperseAmount;
        positions[i3 + 1] =
          targetPositions[i3 + 1] +
          Math.cos(state.clock.elapsedTime + i) * 0.05 +
          (Math.random() - 0.5) * disperseAmount;
        positions[i3 + 2] =
          targetPositions[i3 + 2] + (Math.random() - 0.5) * disperseAmount * 0.5;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!isClient) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#c8a84b"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Easing function for smooth animation
 */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Main Canvas Export
 */
export default function ParticleCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]} // Adaptive pixel ratio
    >
      <color attach="background" args={['transparent']} />
      <ambientLight intensity={0.5} />
      <ParticleSystem />
    </Canvas>
  );
}
