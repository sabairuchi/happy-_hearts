import { useEffect, useState, useRef } from 'react';

export interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  shape: 'dot' | 'splash';
}

export interface ClickSplatter {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  dx: number;
  dy: number;
}

const BRAND_PALETTE = [
  '#FF6B6B', // Coral
  '#FFD93D', // Yellow
  '#6BCB77', // Mint Green
  '#4D96FF', // Sky Blue
  '#845EC2'  // Purple
];

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [trail, setTrail] = useState<TrailParticle[]>([]);
  const [splatters, setSplatters] = useState<ClickSplatter[]>([]);

  const lastTrailTime = useRef(0);
  const particleId = useRef(0);
  const colorIdx = useRef(0);

  useEffect(() => {
    // Check coarse pointer (touch devices) or prefers-reduced-motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      // Generate subtle trail of tiny paint particles
      const now = Date.now();
      if (now - lastTrailTime.current > 45) {
        lastTrailTime.current = now;

        const color = BRAND_PALETTE[colorIdx.current % BRAND_PALETTE.length];
        colorIdx.current++;

        // Small offset behind the brush tip
        const offsetX = (Math.random() - 0.5) * 12;
        const offsetY = (Math.random() - 0.5) * 12 + 6;

        const newParticle: TrailParticle = {
          id: particleId.current++,
          x: clientX + offsetX,
          y: clientY + offsetY,
          size: Math.floor(Math.random() * 5) + 3, // 3px to 8px
          color,
          rotation: Math.floor(Math.random() * 360),
          shape: Math.random() > 0.6 ? 'splash' : 'dot',
        };

        setTrail((prev) => {
          const updated = [...prev, newParticle];
          // Limit active particles to 25 maximum for lightweight performance
          return updated.length > 25 ? updated.slice(updated.length - 25) : updated;
        });

        setTimeout(() => {
          setTrail((prev) => prev.filter((p) => p.id !== newParticle.id));
        }, 600);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'select' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('interactive') ||
        target.getAttribute('role') === 'button';

      setIsHovering(isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);

      // Create a tiny paint splash at click location (5-8 particles)
      const splashCount = Math.floor(Math.random() * 4) + 5;
      const newSplatters: ClickSplatter[] = [];

      for (let i = 0; i < splashCount; i++) {
        const angle = (i / splashCount) * Math.PI * 2 + Math.random() * 0.5;
        const distance = Math.random() * 18 + 8;
        const color = BRAND_PALETTE[(colorIdx.current + i) % BRAND_PALETTE.length];

        newSplatters.push({
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.floor(Math.random() * 4) + 3,
          color,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
        });
      }

      setSplatters((prev) => [...prev, ...newSplatters]);

      setTimeout(() => {
        setSplatters((prev) => prev.filter((s) => !newSplatters.some((ns) => ns.id === s.id)));
      }, 450);
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return { position, isHovering, isMouseDown, isEnabled, trail, splatters };
};
