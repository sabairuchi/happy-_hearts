import React from 'react';
import { Paintbrush } from 'lucide-react';
import { useCustomCursor } from '../hooks/useCustomCursor';
import styles from './CustomCursor.module.css';

const CustomCursor: React.FC = () => {
  const { position, isHovering, isTouchDevice, dots } = useCustomCursor();

  if (isTouchDevice) return null;

  return (
    <>
      {/* Trail Dots */}
      {dots.map(dot => (
        <div 
          key={dot.id}
          className={styles.trailDot}
          style={{ 
            '--x': `${dot.x}px`,
            '--y': `${dot.y}px`,
            backgroundColor: dot.color
          } as React.CSSProperties}
        />
      ))}
      
      {/* Main Cursor (Paint Brush) */}
      <div 
        className={`${styles.cursorIcon} ${isHovering ? styles.hovering : ''}`}
        style={{ transform: `translate3d(${position.x - 2}px, ${position.y - 14}px, 0)` }}
      >
        <Paintbrush size={18} className={styles.brushSvg} />
      </div>
    </>
  );
};

export default CustomCursor;
