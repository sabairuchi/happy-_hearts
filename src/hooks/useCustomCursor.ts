import { useEffect, useState, useRef } from 'react';

export interface WallPaintSplash {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  borderRadius: string;
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

const HAPPY_HEARTS_PALETTE = [
  '#FF6B6B', // Coral Red
  '#FFD93D', // Sunshine Yellow
  '#6BCB77', // Mint Green
  '#4D96FF', // Sky Blue
  '#845EC2'  // Playful Purple
];

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentColor, setCurrentColor] = useState(HAPPY_HEARTS_PALETTE[0]);
  const [splashes, setSplashes] = useState<WallPaintSplash[]>([]);
  const [clickSplatters, setClickSplatters] = useState<ClickSplatter[]>([]);

  const lastPos = useRef({ x: -100, y: -100 });
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

      // Calculate distance moved since last splash
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const distance = Math.hypot(dx, dy);

      // Create a wall paint splash ONLY after ~20px of movement
      if (distance > 20) {
        lastPos.current = { x: clientX, y: clientY };

        const color = HAPPY_HEARTS_PALETTE[colorIdx.current % HAPPY_HEARTS_PALETTE.length];
        colorIdx.current++;
        setCurrentColor(color);

        // Irregular wet wall paint droplet shapes
        const shapes = [
          '50%',
          '40% 60% 70% 30% / 50% 40% 60% 50%',
          '60% 40% 30% 70% / 40% 60% 40% 60%',
          '35% 65% 55% 45% / 60% 40% 60% 40%',
        ];

        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10 + 4;

        const newSplash: WallPaintSplash = {
          id: particleId.current++,
          x: clientX + offsetX,
          y: clientY + offsetY,
          size: Math.floor(Math.random() * 6) + 4, // 4px to 10px wet paint blob
          color,
          rotation: Math.floor(Math.random() * 360),
          borderRadius: randomShape,
        };

        setSplashes((prev) => {
          const updated = [...prev, newSplash];
          // Keep maximum 22 active paint splashes for 60fps lightweight performance
          return updated.length > 22 ? updated.slice(updated.length - 22) : updated;
        });

        // Splash disappears after 700ms (500–900ms range)
        setTimeout(() => {
          setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
        }, 700);
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

      // Create a wall-paint click splatter at click location (6-8 tiny droplets)
      const count = Math.floor(Math.random() * 3) + 6;
      const newSplatters: ClickSplatter[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const distance = Math.random() * 16 + 6;
        const color = HAPPY_HEARTS_PALETTE[(colorIdx.current + i) % HAPPY_HEARTS_PALETTE.length];

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

      setClickSplatters((prev) => [...prev, ...newSplatters]);

      setTimeout(() => {
        setClickSplatters((prev) => prev.filter((s) => !newSplatters.some((ns) => ns.id === s.id)));
      }, 400);
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

  return { position, isHovering, isMouseDown, isEnabled, currentColor, splashes, clickSplatters };
};
