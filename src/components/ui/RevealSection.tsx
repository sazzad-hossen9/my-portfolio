'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'left' | 'right' | 'up';
}

/**
 * Unified, consistent scroll-reveal container for all portfolio sections.
 * Features a silky fade-and-slide (alternating left/right to match room-to-room navigation).
 * Automatically respects prefers-reduced-motion.
 */
export default function RevealSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: RevealSectionProps) {
  const initialOffset = {
    up: { opacity: 0, x: 0, y: 32 },
    left: { opacity: 0, x: -36, y: 16 },
    right: { opacity: 0, x: 36, y: 16 },
  }[direction];

  return (
    <motion.div
      initial={initialOffset}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
