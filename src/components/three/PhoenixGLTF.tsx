'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { sceneState } from '@/lib/sceneState';

interface PhoenixGLTFProps {
  isMobile: boolean;
}

const PHOENIX_MODEL_PATH = '/models/phoenix.glb';

// Waypoints along scroll path
const FLIGHT_WAYPOINTS = [
  // 0. Hero: Behind and below profile portrait (X: 1.1, Y: -1.8, Z: -0.4)
  { progress: 0.0, pos: new THREE.Vector3(1.1, -1.8, -0.4) },
  // Hero transition
  { progress: 0.15, pos: new THREE.Vector3(0.5, -2.1, -0.6) },
  // About: Glides toward left
  { progress: 0.32, pos: new THREE.Vector3(-1.8, -0.5, -0.8) },
  // Skills: Sweeps gracefully across background
  { progress: 0.52, pos: new THREE.Vector3(1.5, 0.1, -1.0) },
  // Projects: Visible through translucent cards
  { progress: 0.72, pos: new THREE.Vector3(-1.4, -0.3, -0.8) },
  // Contact: Ascends and hovers near bottom
  { progress: 1.0, pos: new THREE.Vector3(0.4, -1.2, -0.5) },
];

function enhanceMaterial(mat: THREE.Material) {
  if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
    // Subtle blue-violet edge glow without washing out textures
    mat.emissive = new THREE.Color('#38BDF8');
    mat.emissiveIntensity = 0.35;
    mat.roughness = 0.3;
    mat.metalness = 0.5;
  }
}

/**
 * Inner component that loads the real animated GLB model with useGLTF and useAnimations
 */
function Model({ isMobile }: PhoenixGLTFProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(PHOENIX_MODEL_PATH);
  const { actions, names } = useAnimations(animations, groupRef);

  // Auto-play the flying/wing-flapping animation
  useEffect(() => {
    if (names.length > 0 && actions) {
      const firstAction = actions[names[0]];
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play();
        firstAction.setLoop(THREE.LoopRepeat, Infinity);
      }
    }
  }, [actions, names]);

  // Apply subtle blue-violet bioluminescent glow
  useEffect(() => {
    if (!scene) return;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(enhanceMaterial);
          } else {
            enhanceMaterial(mesh.material);
          }
        }
      }
    });
  }, [scene]);

  const currentPosRef = useRef(new THREE.Vector3(1.1, -1.8, -0.4));
  const prevPosRef = useRef(new THREE.Vector3(1.1, -1.8, -0.4));
  const velocityRef = useRef(new THREE.Vector3(0, 0, 0));
  const animTimeRef = useRef(0);

  useFrame((_, delta) => {
    if (!sceneState.isVisible || !groupRef.current) return;
    const safeDelta = Math.min(delta, 0.05);
    animTimeRef.current += safeDelta;
    const t = animTimeRef.current;

    const progress = Math.max(0, Math.min(1, sceneState.scrollProgress));
    const reducedMotion = sceneState.reducedMotion;

    // Interpolate waypoints
    let p0 = FLIGHT_WAYPOINTS[0];
    let p1 = FLIGHT_WAYPOINTS[FLIGHT_WAYPOINTS.length - 1];
    for (let i = 0; i < FLIGHT_WAYPOINTS.length - 1; i++) {
      if (progress >= FLIGHT_WAYPOINTS[i].progress && progress <= FLIGHT_WAYPOINTS[i + 1].progress) {
        p0 = FLIGHT_WAYPOINTS[i];
        p1 = FLIGHT_WAYPOINTS[i + 1];
        break;
      }
    }

    const segProgress = p1.progress === p0.progress
      ? 0
      : (progress - p0.progress) / (p1.progress - p0.progress);
    const easeSeg = segProgress * segProgress * (3 - 2 * segProgress);

    const targetPos = new THREE.Vector3().lerpVectors(p0.pos, p1.pos, easeSeg);

    if (isMobile) {
      targetPos.x *= 0.6;
      targetPos.y += 0.2;
      targetPos.z -= 0.6;
    }

    if (!reducedMotion) {
      // Gentle natural hovering
      targetPos.y += Math.sin(t * 1.6) * 0.12;
      targetPos.x += Math.cos(t * 1.1) * 0.08;

      // Mouse parallax
      targetPos.x += sceneState.mouse.x * 0.3;
      targetPos.y += sceneState.mouse.y * 0.2;
    }

    currentPosRef.current.lerp(targetPos, 0.05);

    velocityRef.current.subVectors(currentPosRef.current, prevPosRef.current);
    prevPosRef.current.copy(currentPosRef.current);

    groupRef.current.position.copy(currentPosRef.current);

    if (reducedMotion) {
      groupRef.current.rotation.set(0, 0, 0);
    } else {
      // Natural banking & pitch based on movement velocity
      const targetPitch = Math.max(-0.35, Math.min(0.35, -velocityRef.current.y * 4));
      const targetRoll = Math.max(-0.45, Math.min(0.45, -velocityRef.current.x * 6 - sceneState.mouse.x * 0.15));
      const targetYaw = Math.sin(t * 0.5) * 0.12 + sceneState.mouse.x * 0.15;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetPitch, 0.08);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetYaw, 0.08);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRoll, 0.08);
    }
  });

  // Medium scale proportioned to sit elegantly behind and below profile portrait
  const baseScale = isMobile ? 0.0035 : 0.0055;

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={[baseScale, baseScale, baseScale]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
}

// Error Boundary to prevent crashes if model is missing or corrupt
class ModelErrorBoundary extends React.Component<
  { fallback?: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback?: React.ReactNode; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn('3D Phoenix Model not available:', error.message);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

/**
 * PhoenixGLTF: Real 3D Phoenix integration component
 * - Tests file availability before mounting
 * - Plays skeletal wing-flapping animations
 * - Coordinated scroll movement across portfolio sections
 * - Safe fallback with zero hydration or build errors
 */
export default function PhoenixGLTF({ isMobile }: PhoenixGLTFProps) {
  const [modelAvailable, setModelAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if /models/phoenix.glb exists in /public/models
    fetch(PHOENIX_MODEL_PATH, { method: 'HEAD' })
      .then((res) => {
        setModelAvailable(res.ok);
      })
      .catch(() => {
        setModelAvailable(false);
      });
  }, []);

  if (!modelAvailable) {
    return null;
  }

  return (
    <ModelErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <Model isMobile={isMobile} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
