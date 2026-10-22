'use client';

import React, { useRef, useState, useCallback, useId } from 'react';

interface UnderwaterCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  bobPhase?: number; // Phase offset in seconds for bobbing
  bubbles?: boolean;
}

/**
 * UnderwaterCard: A submerged frosted-glass card featuring:
 * - Animated shifting light caustics (cyan/purple bioluminescence)
 * - Slow buoyant floating/bobbing motion with staggered phase
 * - Rising micro-bubbles with soft translucent sheen
 * - 3D cursor tilt with interactive radiating water ripple
 * - 100% crisp, contrast-checked legible text
 */
export default function UnderwaterCard({
  children,
  className = '',
  maxTilt = 7,
  bobPhase = 0,
  bubbles = true,
}: UnderwaterCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const filterId = useId().replace(/:/g, '');

  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [ripple, setRipple] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

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

      // 3D tilt angles
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.08s ease-out',
      });

      // Glare highlight following cursor with underwater aqua-purple tint
      setGlareStyle({
        opacity: 0.28,
        background: `radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.45), rgba(139, 92, 246, 0.25) 35%, transparent 75%)`,
        transition: 'opacity 0.15s ease-out',
      });
    },
    [maxTilt]
  );

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipple({ x, y, active: true });
    setTimeout(() => {
      setRipple((prev) => ({ ...prev, active: false }));
    }, 800);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    });
    setGlareStyle({
      opacity: 0,
      transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        animation: `underwater-bob 6s ease-in-out infinite`,
        animationDelay: `${bobPhase}s`,
      }}
      className={`relative transform-gpu will-change-transform rounded-3xl overflow-hidden group ${className}`}
    >
      {/* SVG Water Refraction Filter definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <filter id={`caustic-filter-${filterId}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.03"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Refined Translucent Dark Navy Glass Base Layer */}
      <div className="absolute inset-0 bg-white/75 dark:bg-[#0A111E]/75 backdrop-blur-md border border-cyan-500/20 dark:border-[#8B5CF6]/30 rounded-3xl -z-10 transition-colors group-hover:border-cyan-400/50 shadow-lg shadow-black/20" />

      {/* Moving Light Caustics Shimmer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl underwater-caustics pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-0"
      />

      {/* Cursor Radial Ripple Wave on Enter */}
      {ripple.active && (
        <span
          aria-hidden="true"
          style={{
            top: ripple.y,
            left: ripple.x,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-400/40 bg-cyan-400/10 pointer-events-none animate-ping duration-700 z-10"
        />
      )}

      {/* Soft Glare Layer */}
      <div
        aria-hidden="true"
        style={glareStyle}
        className="absolute inset-0 rounded-3xl pointer-events-none z-10 transition-opacity"
      />

      {/* Rising Ambient Micro-Bubbles */}
      {bubbles && (
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          <span
            style={{
              left: '18%',
              bottom: '10px',
              animation: 'bubble-float 4.5s ease-in infinite',
              animationDelay: `${(bobPhase * 0.7) % 3}s`,
            }}
            className="absolute w-2 h-2 rounded-full border border-cyan-300/50 bg-cyan-200/20 backdrop-blur-xs"
          />
          <span
            style={{
              left: '82%',
              bottom: '15px',
              animation: 'bubble-float 5.2s ease-in infinite',
              animationDelay: `${((bobPhase + 1.2) * 0.8) % 3.5}s`,
            }}
            className="absolute w-2.5 h-2.5 rounded-full border border-teal-300/50 bg-teal-200/20 backdrop-blur-xs"
          />
          <span
            style={{
              left: '48%',
              bottom: '5px',
              animation: 'bubble-float 6s ease-in infinite',
              animationDelay: `${((bobPhase + 2.1) * 0.5) % 4}s`,
            }}
            className="absolute w-1.5 h-1.5 rounded-full border border-purple-300/50 bg-purple-200/20 backdrop-blur-xs"
          />
        </div>
      )}

      {/* Crisp Foreground Content (high z-index ensures crystal-clear readability) */}
      <div className="relative z-20 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}
