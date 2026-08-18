import { useCustomCursor } from '../hooks/useCustomCursor';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const { position, isHovering, isMouseDown, isEnabled, currentColor, splashes, clickSplatters } =
    useCustomCursor();

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Wall Paint Splash Droplets */}
      {splashes.map((s) => (
        <div
          key={s.id}
          className={styles.splashBlob}
          style={{
            transform: `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.rotation}deg)`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            borderRadius: s.borderRadius,
            boxShadow: `0 2px 6px ${s.color}66`,
          }}
        />
      ))}

      {/* Click Splatters */}
      {clickSplatters.map((s) => (
        <div
          key={s.id}
          className={styles.clickSplatter}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            ['--dx' as string]: `${s.dx}px`,
            ['--dy' as string]: `${s.dy}px`,
          }}
        />
      ))}

      {/* Small Wall Painting Brush Cursor */}
      <div
        className={styles.wallBrushContainer}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`${styles.wallBrushWrapper} ${isHovering ? styles.hovering : ''} ${
            isMouseDown ? styles.clicking : ''
          }`}
        >
          {/* Authentic Small Wall Paint Brush SVG (24px, flat bristles, ferrule, small handle) */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.brushSvg}
          >
            {/* Wet Wall Paint Tip on Bristle Edge */}
            <path
              d="M 2 2 C 2 1.2 2.8 0.5 3.8 0.5 H 12.2 C 13.2 0.5 14 1.2 14 2 V 6 H 2 Z"
              fill={currentColor}
            />

            {/* Flat Wall Brush Bristles */}
            <rect x="2" y="6" width="12" height="4" fill="#CBD5E1" />

            {/* Metal Ferrule Band */}
            <rect x="2.5" y="10" width="11" height="3" fill="#64748B" rx="0.5" />

            {/* Small Wooden Handle */}
            <path
              d="M 6 13 V 21 C 6 22 7 23 8 23 C 9 23 10 22 10 21 V 13 Z"
              fill="#B45309"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
