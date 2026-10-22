'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneState } from '@/lib/sceneState';

// Deterministic pseudo-random number generator for pure rendering
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface SceneProps {
  isMobile: boolean;
}

export default function Scene({ isMobile }: SceneProps) {
  // Main group containing all dynamic objects
  const sceneGroupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const innerCrystalRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const floatingOrbRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Lights for dynamic color transitions
  const purpleLightRef = useRef<THREE.PointLight>(null);
  const greenLightRef = useRef<THREE.PointLight>(null);
  const elapsedTimeRef = useRef<number>(0);

  // Particle count: 650 on desktop, 250 on mobile for optimal performance
  const particleCount = isMobile ? 250 : 650;

  // Generate particle positions and colors using deterministic calculations
  const [particlePositions, particleColors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const purple = new THREE.Color('#8B5CF6');
    const green = new THREE.Color('#22C55E');
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const r1 = pseudoRandom(i * 4 + 1);
      const r2 = pseudoRandom(i * 4 + 2);
      const r3 = pseudoRandom(i * 4 + 3);
      const mixRatio = pseudoRandom(i * 4 + 4);

      // Spread across wide area
      positions[i * 3] = (r1 - 0.5) * 24;
      positions[i * 3 + 1] = (r2 - 0.5) * 32;
      positions[i * 3 + 2] = (r3 - 0.5) * 16 - 2;

      // Deterministic blend between purple and green
      tempColor.copy(purple).lerp(green, mixRatio);
      colors[i * 3] = tempColor.r;
      colors[i * 3 + 1] = tempColor.g;
      colors[i * 3 + 2] = tempColor.b;
    }

    return [positions, colors];
  }, [particleCount]);

  // Cleanup geometries and materials on unmount
  useEffect(() => {
    return () => {
      // Three.js automatic disposal helper
    };
  }, []);

  // Frame loop running at 60fps
  useFrame((_, delta) => {
    // If tab is hidden, skip expensive calculations
    if (!sceneState.isVisible) return;

    // Handle prefers-reduced-motion
    if (sceneState.reducedMotion) {
      if (sceneGroupRef.current) {
        sceneGroupRef.current.rotation.set(0, 0, 0);
      }
      return;
    }

    // Accumulate elapsed time cleanly without THREE.Clock
    elapsedTimeRef.current += delta;
    const elapsedTime = elapsedTimeRef.current;

    // Smoothly lerp mouse target to current mouse position (smooth parallax, no jitter)
    sceneState.mouse.x = THREE.MathUtils.lerp(
      sceneState.mouse.x,
      sceneState.mouse.targetX,
      0.06
    );
    sceneState.mouse.y = THREE.MathUtils.lerp(
      sceneState.mouse.y,
      sceneState.mouse.targetY,
      0.06
    );

    const progress = sceneState.scrollProgress; // 0 to 1
    const mouseX = sceneState.mouse.x;
    const mouseY = sceneState.mouse.y;

    // 1. Scene Group Parallax & Scroll Navigation
    if (sceneGroupRef.current) {
      // Gentle mouse parallax on the whole scene
      sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.y,
        mouseX * 0.18 + progress * Math.PI * 0.75,
        0.05
      );
      sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneGroupRef.current.rotation.x,
        -mouseY * 0.12,
        0.05
      );

      // Camera / group movement along scroll:
      // Hero (top): centered right; About/Skills: floating through; Contact: centered
      sceneGroupRef.current.position.y = THREE.MathUtils.lerp(
        sceneGroupRef.current.position.y,
        progress * 7 - 1,
        0.05
      );
    }

    // 2. Crystal Core (Icosahedron)
    if (crystalRef.current) {
      crystalRef.current.rotation.x += delta * 0.35;
      crystalRef.current.rotation.y += delta * 0.45;

      // Scroll position transition:
      // Hero: X = 2.4, Y = 0.5 -> Middle sections: shifts smoothly
      const targetX = isMobile ? 0 : 2.5 - progress * 3.5;
      const targetY = 0.6 - progress * 5 + Math.sin(elapsedTime * 0.8) * 0.2;
      const targetZ = -1.2 + Math.cos(elapsedTime * 0.6) * 0.2;

      crystalRef.current.position.x = THREE.MathUtils.lerp(crystalRef.current.position.x, targetX, 0.05);
      crystalRef.current.position.y = THREE.MathUtils.lerp(crystalRef.current.position.y, targetY, 0.05);
      crystalRef.current.position.z = THREE.MathUtils.lerp(crystalRef.current.position.z, targetZ, 0.05);
    }

    // Inner counter-rotating core
    if (innerCrystalRef.current && crystalRef.current) {
      innerCrystalRef.current.position.copy(crystalRef.current.position);
      innerCrystalRef.current.rotation.x -= delta * 0.6;
      innerCrystalRef.current.rotation.y -= delta * 0.7;
    }

    // 3. Torus Knot / Orbiting Ring
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.25;
      torusRef.current.rotation.z += delta * 0.3;

      const torusTargetX = isMobile ? 0 : -2.6 + progress * 2.8;
      const torusTargetY = -1.5 - progress * 4.5 + Math.cos(elapsedTime * 0.7) * 0.25;
      const torusTargetZ = -2.5 + Math.sin(elapsedTime * 0.5) * 0.3;

      torusRef.current.position.x = THREE.MathUtils.lerp(torusRef.current.position.x, torusTargetX, 0.05);
      torusRef.current.position.y = THREE.MathUtils.lerp(torusRef.current.position.y, torusTargetY, 0.05);
      torusRef.current.position.z = THREE.MathUtils.lerp(torusRef.current.position.z, torusTargetZ, 0.05);
    }

    // 4. Smaller Floating Orb
    if (floatingOrbRef.current) {
      floatingOrbRef.current.rotation.y += delta * 0.5;
      const orbTargetX = 2.0 * Math.sin(elapsedTime * 0.5 + progress * Math.PI);
      const orbTargetY = 2.2 - progress * 6;
      const orbTargetZ = -1.5 + Math.cos(elapsedTime * 0.5);

      floatingOrbRef.current.position.x = THREE.MathUtils.lerp(floatingOrbRef.current.position.x, orbTargetX, 0.05);
      floatingOrbRef.current.position.y = THREE.MathUtils.lerp(floatingOrbRef.current.position.y, orbTargetY, 0.05);
      floatingOrbRef.current.position.z = THREE.MathUtils.lerp(floatingOrbRef.current.position.z, orbTargetZ, 0.05);
    }

    // 5. Particles Swirl
    if (particlesRef.current) {
      particlesRef.current.rotation.y = delta * 0.04 + progress * 0.3;
      particlesRef.current.position.y = THREE.MathUtils.lerp(
        particlesRef.current.position.y,
        progress * 5,
        0.04
      );
    }

    // 6. Section-specific lighting shifts
    if (purpleLightRef.current && greenLightRef.current) {
      // Dynamic light movement
      purpleLightRef.current.position.x = Math.sin(elapsedTime * 0.4) * 4 + mouseX * 2;
      purpleLightRef.current.position.y = Math.cos(elapsedTime * 0.3) * 4 - progress * 4;

      greenLightRef.current.position.x = -Math.sin(elapsedTime * 0.4) * 4 - mouseX * 2;
      greenLightRef.current.position.y = -Math.cos(elapsedTime * 0.3) * 4 - progress * 4;

      // Color intensity adjustments per section
      if (sceneState.activeSection === 2 || sceneState.activeSection === 3) {
        // Skills / Projects: extra vibrant emerald green
        greenLightRef.current.intensity = THREE.MathUtils.lerp(greenLightRef.current.intensity, 3.2, 0.05);
        purpleLightRef.current.intensity = THREE.MathUtils.lerp(purpleLightRef.current.intensity, 2.5, 0.05);
      } else {
        // Hero / About / Contact: balanced purple dominance
        purpleLightRef.current.intensity = THREE.MathUtils.lerp(purpleLightRef.current.intensity, 3.8, 0.05);
        greenLightRef.current.intensity = THREE.MathUtils.lerp(greenLightRef.current.intensity, 2.2, 0.05);
      }
    }
  });

  return (
    <>
      {/* Ambient Fill Light */}
      <ambientLight intensity={0.5} />

      {/* Directional Key Highlight */}
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFFFFF" />

      {/* Theme Point Lights */}
      <pointLight
        ref={purpleLightRef}
        position={[4, 3, 2]}
        color="#8B5CF6"
        intensity={3.5}
        distance={18}
      />
      <pointLight
        ref={greenLightRef}
        position={[-4, -2, 2]}
        color="#22C55E"
        intensity={2.2}
        distance={18}
      />

      <group ref={sceneGroupRef}>
        {/* Main Floating Geometric Crystal (Icosahedron) */}
        <mesh ref={crystalRef} position={[2.5, 0.6, -1.2]}>
          <icosahedronGeometry args={[1.3, 0]} />
          <meshPhysicalMaterial
            color="#8B5CF6"
            emissive="#4C1D95"
            emissiveIntensity={0.25}
            roughness={0.15}
            metalness={0.85}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={true}
          />
        </mesh>

        {/* Inner Solid Shimmering Core */}
        <mesh ref={innerCrystalRef} position={[2.5, 0.6, -1.2]}>
          <octahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#15803D"
            emissiveIntensity={0.4}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Torus Knot Accent */}
        <mesh ref={torusRef} position={[-2.6, -1.5, -2.5]}>
          <torusKnotGeometry args={[0.9, 0.22, 90, 16]} />
          <meshStandardMaterial
            color="#A78BFA"
            emissive="#2E1065"
            emissiveIntensity={0.3}
            roughness={0.25}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Floating Satellite Orb */}
        <mesh ref={floatingOrbRef} position={[0, 2, -1.5]}>
          <sphereGeometry args={[0.45, 24, 24]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#166534"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.7}
          />
        </mesh>

        {/* Soft Ambient Floating Particle Starfield */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[particleColors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={isMobile ? 0.055 : 0.075}
            vertexColors={true}
            transparent={true}
            opacity={0.65}
            blending={THREE.AdditiveBlending}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}
