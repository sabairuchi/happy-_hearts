import { useEffect, useState, useRef } from 'react';

export interface WallPaintSplash {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  borderRadius: string;
  aspectRatio: string;
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
  const strokeCount = useRef(0);

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

      // Calculate distance moved since last paint dab
      const dx = clientX - lastPos.current.x;
      const dy = clientY - lastPos.current.y;
      const distance = Math.hypot(dx, dy);

      // Create a paint dab ONLY after 28px of cursor movement
      if (distance > 28) {
        lastPos.current = { x: clientX, y: clientY };

        // Keep 3-4 dabs of one color before switching to create natural paint strokes
        strokeCount.current++;
        if (strokeCount.current % 4 === 0) {
          colorIdx.current++;
        }

        const activeColor = HAPPY_HEARTS_PALETTE[colorIdx.current % HAPPY_HEARTS_PALETTE.length];
        setCurrentColor(activeColor);

        // Organic shapes: droplets, blobs, elongated dabs
        const organicShapes = [
          '50%',
          '40% 60% 70% 30% / 50% 40% 60% 50%',
          '60% 40% 30% 70% / 40% 60% 40% 60%',
          '35% 65% 55% 45% / 60% 40% 60% 40%',
          '70% 30% 50% 50% / 30% 70% 50% 50%',
        ];

        const randomShape = organicShapes[Math.floor(Math.random() * organicShapes.length)];
        const offsetX = (Math.random() - 0.5) * 8;
        const offsetY = (Math.random() - 0.5) * 8 + 4;

        // Size distribution: Most 3-7px, some 8-12px, max 14px
        const randVal = Math.random();
        let particleSize = 5;
        if (randVal < 0.6) {
          particleSize = Math.floor(Math.random() * 5) + 3; // 3-7px
        } else if (randVal < 0.9) {
          particleSize = Math.floor(Math.random() * 5) + 8; // 8-12px
        } else {
          particleSize = 14;
        }

        const newSplash: WallPaintSplash = {
          id: particleId.current++,
          x: clientX + offsetX,
          y: clientY + offsetY,
          size: particleSize,
          color: activeColor,
          rotation: Math.floor(Math.random() * 360),
          borderRadius: randomShape,
          aspectRatio: Math.random() > 0.6 ? '1 / 1.4' : '1 / 1',
        };

        setSplashes((prev) => {
          const updated = [...prev, newSplash];
          // Limit maximum active splashes to 22 for lightweight 60fps performance
          return updated.length > 22 ? updated.slice(updated.length - 22) : updated;
        });

        // Softly fade away after 750ms (600–1000ms specification range)
        setTimeout(() => {
          setSplashes((prev) => prev.filter((s) => s.id !== newSplash.id));
        }, 750);
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

      // Create a small paint dab at click location (5-7 tiny droplets)
      const count = Math.floor(Math.random() * 3) + 5;
      const newSplatters: ClickSplatter[] = [];

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const distance = Math.random() * 12 + 6;
        const color = HAPPY_HEARTS_PALETTE[(colorIdx.current + i) % HAPPY_HEARTS_PALETTE.length];

        newSplatters.push({
          id: particleId.current++,
          x: e.clientX,
          y: e.clientY,
          size: Math.floor(Math.random() * 3) + 3,
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
