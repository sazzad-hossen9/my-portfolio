'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

export default function CanvasContainer() {
  // Pure client hydration check recommended by React 19
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [isMobile, setIsMobile] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    if (!isMounted) return;

    // Check mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Tab visibility optimization: pause rendering when tab is hidden
    const handleVisibility = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isMounted]);

  // Graceful fallback: if WebGL is unsupported or SSR, render nothing
  if (!isMounted || !isWebGLAvailable()) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, Math.min(1.8, typeof window !== 'undefined' ? window.devicePixelRatio || 1.5 : 1)]}
        frameloop={tabVisible ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
