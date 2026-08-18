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
      {/* Organic Wall Paint Splash Droplets */}
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
            aspectRatio: s.aspectRatio,
            boxShadow: `0 2px 5px ${s.color}55`,
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

      {/* Small Wall Painting Brush Cursor (Hotspot at 0,0) */}
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
          {/* Miniature 20px Wall Painting Brush SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={styles.brushSvg}
          >
            {/* Wet Paint Tip on Bristle Edge */}
            <path
              d="M 1 1 C 1 0.5 1.5 0 2.2 0 H 10.8 C 11.5 0 12 0.5 12 1 V 5 H 1 Z"
              fill={currentColor}
            />

            {/* Flat Bristle Base */}
            <rect x="1" y="5" width="11" height="3" fill="#CBD5E1" />

            {/* Metal Ferrule Band */}
            <rect x="1.5" y="8" width="10" height="2.5" fill="#64748B" rx="0.5" />

            {/* Short Wooden Handle */}
            <path
              d="M 5 10.5 V 18 C 5 19 6 19.5 6.5 19.5 C 7 19.5 8 19 8 18 V 10.5 Z"
              fill="#B45309"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
