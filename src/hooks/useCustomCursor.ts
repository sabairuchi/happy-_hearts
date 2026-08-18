import { useEffect, useState, useRef } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  color: string;
}

const colors = ['#FF7B7B', '#FFD93D', '#4D96FF', '#6BCB77']; // coral, yellow, sky, mint

export const useCustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [dots, setDots] = useState<Dot[]>([]);
  
  const lastDotTime = useRef(0);
  const dotIdCounter = useRef(0);
  const colorIndex = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const now = Date.now();
      // Only drop a dot every 40ms to avoid too many DOM nodes
      if (now - lastDotTime.current > 40) {
        lastDotTime.current = now;
        const newDot: Dot = {
          id: dotIdCounter.current++,
          x: e.clientX,
          y: e.clientY,
          color: colors[colorIndex.current % colors.length]
        };
        colorIndex.current++;
        
        setDots(prev => [...prev, newDot]);

        // Remove the dot after 600ms
        setTimeout(() => {
          setDots(prev => prev.filter(d => d.id !== newDot.id));
        }, 600);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return { position, isHovering, isTouchDevice, dots };
};
