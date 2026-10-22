'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '@/lib/sceneState';
import PhoenixGLTF from './PhoenixGLTF';

// Deterministic pseudo-random generator for pure React rendering
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface SceneProps {
  isMobile: boolean;
}

/**
 * Minimal, lightweight, elegant background particle field.
 * - Low particle count (150 desktop / 60 mobile)
 * - Soft theme colors (purple #8B5CF6, violet #A78BFA, emerald #22C55E)
 * - Slow organic drift with subtle lerped mouse parallax
 * - Never obscures text; 60fps high performance
 */
export default function Scene({ isMobile }: SceneProps) {
  const particlesGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Subtle ambient theme point lights
  const purpleLightRef = useRef<THREE.PointLight>(null);
  const greenLightRef = useRef<THREE.PointLight>(null);

  // Low particle count: clean, minimal, non-distracting
  const particleCount = isMobile ? 60 : 150;

  // Generate deterministic particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const purple = new THREE.Color('#8B5CF6');
    const green = new THREE.Color('#22C55E');
    const violet = new THREE.Color('#A78BFA');
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const r1 = pseudoRandom(i * 4 + 1);
      const r2 = pseudoRandom(i * 4 + 2);
      const r3 = pseudoRandom(i * 4 + 3);
      const mixRatio = pseudoRandom(i * 4 + 4);

      // Spread widely across viewport
      pos[i * 3] = (r1 - 0.5) * 22;
      pos[i * 3 + 1] = (r2 - 0.5) * 26;
      pos[i * 3 + 2] = (r3 - 0.5) * 12 - 2;

      // Soft theme color blend
      if (mixRatio < 0.5) {
        tempColor.copy(purple).lerp(violet, mixRatio * 2);
      } else {
        tempColor.copy(violet).lerp(green, (mixRatio - 0.5) * 2);
      }

      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, col];
  }, [particleCount]);

  useFrame((_, delta) => {
    if (!sceneState.isVisible) return;

    // Respect prefers-reduced-motion
    if (sceneState.reducedMotion) {
      if (particlesGroupRef.current) {
        particlesGroupRef.current.rotation.set(0, 0, 0);
      }
      return;
    }

    // Smooth lerp for mouse parallax
    sceneState.mouse.x = THREE.MathUtils.lerp(
      sceneState.mouse.x,
      sceneState.mouse.targetX,
      0.05
    );
    sceneState.mouse.y = THREE.MathUtils.lerp(
      sceneState.mouse.y,
      sceneState.mouse.targetY,
      0.05
    );

    const mouseX = sceneState.mouse.x;
    const mouseY = sceneState.mouse.y;
    const scrollProgress = sceneState.scrollProgress;

    // Slow ambient rotation + gentle mouse parallax
    if (particlesGroupRef.current) {
      particlesGroupRef.current.rotation.y += delta * 0.015;
      particlesGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        particlesGroupRef.current.rotation.x,
        -mouseY * 0.08,
        0.04
      );
      particlesGroupRef.current.position.x = THREE.MathUtils.lerp(
        particlesGroupRef.current.position.x,
        mouseX * 0.25,
        0.04
      );
      // Gentle vertical movement based on scroll progress
      particlesGroupRef.current.position.y = THREE.MathUtils.lerp(
        particlesGroupRef.current.position.y,
        scrollProgress * 3 - 1,
        0.04
      );
    }

    // Very subtle light pulse
    if (purpleLightRef.current && greenLightRef.current) {
      purpleLightRef.current.position.x = 4 + mouseX * 1.5;
      purpleLightRef.current.position.y = 2 - scrollProgress * 3;

      greenLightRef.current.position.x = -4 - mouseX * 1.5;
      greenLightRef.current.position.y = -2 - scrollProgress * 3;
    }
  });

  return (
    <>
      {/* Soft Ambient Light */}
      <ambientLight intensity={0.4} />

      {/* Subtle edge glow lights matching theme */}
      <pointLight
        ref={purpleLightRef}
        position={[4, 2, 0]}
        color="#8B5CF6"
        intensity={1.2}
        distance={22}
      />
      <pointLight
        ref={greenLightRef}
        position={[-4, -2, 0]}
        color="#22C55E"
        intensity={0.8}
        distance={22}
      />

      {/* Minimal Floating Particle Field */}
      <group ref={particlesGroupRef}>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.055 : 0.075}
            vertexColors={true}
            transparent={true}
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </points>
      </group>

      {/* Living Animated 3D Phoenix (.glb model) */}
      <PhoenixGLTF isMobile={isMobile} />
    </>
  );
}
