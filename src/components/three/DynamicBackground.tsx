'use client';

import dynamic from 'next/dynamic';

// Dynamically load 3D Canvas with ssr: false to prevent hydration errors and keep initial load fast
const CanvasContainer = dynamic(
  () => import('./CanvasContainer'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function DynamicBackground() {
  return <CanvasContainer />;
}
