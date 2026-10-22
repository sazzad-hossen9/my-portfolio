/**
 * Shared state for 3D scene and scroll/mouse interactions.
 * Uses a plain object with getters/setters and listener callbacks
 * to avoid unnecessary React re-renders while feeding 60fps useFrame updates.
 */

export interface SceneState {
  // Global scroll progress from 0 (top) to 1 (bottom)
  scrollProgress: number;
  // Normalized mouse coordinates: x from -1 to 1, y from -1 to 1
  mouse: {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
  };
  // Current active section index (0: Home, 1: About, 2: Skills, 3: Projects, 4: Experience, 5: Contact)
  activeSection: number;
  // Whether user prefers reduced motion
  reducedMotion: boolean;
  // Whether canvas is on-screen and tab is visible
  isVisible: boolean;
}

export const sceneState: SceneState = {
  scrollProgress: 0,
  mouse: {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  },
  activeSection: 0,
  reducedMotion: false,
  isVisible: true,
};

// Global mouse listener setup (called once on client)
let mouseListenerAttached = false;

export function initMouseTracking() {
  if (typeof window === 'undefined' || mouseListenerAttached) return;
  mouseListenerAttached = true;

  // Check prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  sceneState.reducedMotion = mediaQuery.matches;
  mediaQuery.addEventListener('change', (e) => {
    sceneState.reducedMotion = e.matches;
  });

  const handleMouseMove = (event: MouseEvent) => {
    // Normalize coordinates between -1 and 1
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    sceneState.mouse.targetX = x;
    sceneState.mouse.targetY = y;
  };

  const handleVisibilityChange = () => {
    sceneState.isVisible = !document.hidden;
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
