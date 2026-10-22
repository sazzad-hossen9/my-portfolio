'use client';

import React, { useRef, useState, useCallback } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

/**
 * 3D Tilt Card with dynamic cursor-following soft glare highlight.
 * GPU-accelerated and automatically disables when user prefers reduced motion.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 7,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-maxTilt to +maxTilt)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.08s ease-out',
      });

      if (glare) {
        setGlareStyle({
          opacity: 0.22,
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(139, 92, 246, 0.4), rgba(34, 197, 94, 0.2) 35%, transparent 75%)`,
          transition: 'opacity 0.15s ease-out',
        });
      }
    },
    [maxTilt, glare]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`relative transform-gpu will-change-transform ${className}`}
    >
      {glare && (
        <div
          aria-hidden="true"
          style={glareStyle}
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-10"
        />
      )}
      {children}
    </div>
  );
}
