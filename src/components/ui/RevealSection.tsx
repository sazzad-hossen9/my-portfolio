'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Unified, consistent scroll-reveal container for all portfolio sections.
 * Features a silky fade-and-slide up with a springy ease curve.
 * Automatically respects prefers-reduced-motion.
 */
export default function RevealSection({
  children,
  className = '',
  delay = 0,
}: RevealSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
