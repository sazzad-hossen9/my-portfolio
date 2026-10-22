'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sceneState, initMouseTracking } from '@/lib/sceneState';

// Register GSAP ScrollTrigger plugin on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize global mouse tracking
    initMouseTracking();

    // Respect user's motion preference: if reduced motion requested, skip Lenis
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      sceneState.reducedMotion = true;
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', (e: { progress: number; scroll: number; limit: number }) => {
      ScrollTrigger.update();
      // Track normalized scroll progress (0 to 1) for 3D scene
      const limit = e.limit || (document.documentElement.scrollHeight - window.innerHeight);
      if (limit > 0) {
        sceneState.scrollProgress = Math.max(0, Math.min(1, e.scroll / limit));
      }
    });

    // Update ScrollTrigger using GSAP ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Track sections for section-specific 3D transitions
    const sections = ['#home', '#about', '#skills', '#projects', '#experience', '#contact'];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((selector, index) => {
      const el = document.querySelector(selector);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            sceneState.activeSection = index;
          },
          onEnterBack: () => {
            sceneState.activeSection = index;
          },
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
