import { useCustomCursor } from '../hooks/useCustomCursor';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const { position, isHovering, isMouseDown, isEnabled, trail, splatters } = useCustomCursor();

  if (!isEnabled) {
    return null;
  }

  return (
    <>
      {/* Trail Particles */}
      {trail.map((particle) => (
        <div
          key={particle.id}
          className={styles.trailParticle}
          style={{
            transform: `translate3d(${particle.x}px, ${particle.y}px, 0)`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: particle.shape === 'splash' ? '40% 60% 70% 30% / 50% 40% 60% 50%' : '50%',
            boxShadow: `0 2px 6px ${particle.color}66`,
          }}
        />
      ))}

      {/* Click Splatters */}
      {splatters.map((s) => (
        <div
          key={s.id}
          className={styles.clickSplatter}
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            borderRadius: '45% 55% 65% 35% / 55% 45% 55% 45%',
            ['--dx' as string]: `${s.dx}px`,
            ['--dy' as string]: `${s.dy}px`,
          }}
        />
      ))}

      {/* Main Paintbrush Cursor */}
      <div
        className={styles.paintbrushContainer}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        <div
          className={`${styles.paintbrushWrapper} ${isHovering ? styles.hovering : ''} ${
            isMouseDown ? styles.clicking : ''
          }`}
        >
          {/* Preschool Paintbrush SVG (Hotspot aligned at top-left tip 0,0) */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.brushSvg}
          >
            {/* Paint tip glow blob */}
            <circle cx="4" cy="4" r="3.5" fill="#FF6B6B" opacity="0.9" />

            {/* Paintbrush Bristles */}
            <path
              d="M3.5 2.5C2.5 2.5 1.5 3.5 1.5 5C1.5 7 4 9.5 6 11L9.5 7.5C8 5.5 5.5 2.5 3.5 2.5Z"
              fill="#FF6B6B"
            />

            {/* Metal Ferrule */}
            <path
              d="M6 11L9.5 7.5L11.5 9.5L8 13L6 11Z"
              fill="#CBD5E1"
            />

            {/* Wooden Handle */}
            <path
              d="M11.5 9.5L8 13L18 23C18.5 23.5 19.5 23.5 20 23L21.5 21.5C22 21 22 20 21.5 19.5L11.5 9.5Z"
              fill="#D97706"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
