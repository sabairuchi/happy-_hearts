import { motion } from 'framer-motion';

interface FloatingDecorationsProps {
  variant?: 'hero' | 'section' | 'subtle';
  className?: string;
}

export const FloatingDecorations = ({ variant = 'section', className = '' }: FloatingDecorationsProps) => {
  return (
    <div
      className={`floating-decorations-container ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      {/* SVG Cloud Left */}
      <motion.div
        style={{ position: 'absolute', top: '8%', left: '2%', opacity: 0.75 }}
        animate={{ x: [0, 20, 0], y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="68" height="42" viewBox="0 0 68 42" fill="none">
          <path
            d="M52 28C56.4 28 60 24.4 60 20C60 15.8 56.7 12.3 52.5 12C50.6 6.9 45.7 3.2 40 3.2C34.8 3.2 30.2 6.3 28 10.8C26.5 9.7 24.6 9 22.5 9C17.3 9 13 13.3 13 18.5C13 19.3 13.1 20.1 13.4 20.9C9.7 21.8 7 25.1 7 29C7 33.4 10.6 37 15 37H52C57.5 37 62 32.5 62 27"
            fill="#FFFFFF"
            fillOpacity="0.85"
          />
        </svg>
      </motion.div>

      {/* Floating Heart Top Right */}
      <motion.div
        style={{ position: 'absolute', top: '15%', right: '4%', opacity: 0.8 }}
        animate={{ y: [0, -12, 0], rotate: [-4, 6, -4] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#FF6B6B"
            fillOpacity="0.75"
          />
        </svg>
      </motion.div>

      {/* Floating Yellow Star */}
      <motion.div
        style={{ position: 'absolute', top: '45%', left: '3%', opacity: 0.85 }}
        animate={{ scale: [1, 1.18, 1], rotate: [0, 15, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill="#FFD93D"
          />
        </svg>
      </motion.div>

      {/* Sky Blue Bubble Bottom Right */}
      <motion.div
        style={{ position: 'absolute', bottom: '12%', right: '5%', opacity: 0.7 }}
        animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
          <circle cx="17" cy="17" r="15" fill="#4D96FF" fillOpacity="0.25" stroke="#4D96FF" strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="4" fill="#FFFFFF" fillOpacity="0.7" />
        </svg>
      </motion.div>

      {/* Mint Leaf / Flower Shape Left */}
      <motion.div
        style={{ position: 'absolute', bottom: '25%', left: '4%', opacity: 0.75 }}
        animate={{ rotate: [-6, 10, -6], y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 21l3.39-.62C9.27 21.26 10.59 21.6 12 21.6c4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9z"
            fill="#6BCB77"
            fillOpacity="0.6"
          />
        </svg>
      </motion.div>

      {variant === 'hero' && (
        <>
          {/* Playful Balloon Center-Right */}
          <motion.div
            style={{ position: 'absolute', top: '28%', right: '12%', opacity: 0.85 }}
            animate={{ y: [0, -18, 0], rotate: [-3, 4, -3] }}
            transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <svg width="36" height="48" viewBox="0 0 36 48" fill="none">
              <path
                d="M18 0C8.06 0 0 7.83 0 17.5C0 27.17 18 42 18 42C18 42 36 27.17 36 17.5C36 7.83 27.94 0 18 0Z"
                fill="#FF6B6B"
                fillOpacity="0.8"
              />
              <path d="M18 42V48" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>

          {/* Paper Plane Top Center */}
          <motion.div
            style={{ position: 'absolute', top: '12%', left: '42%', opacity: 0.65 }}
            animate={{ x: [0, 30, 0], y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#845EC2" fillOpacity="0.75" />
            </svg>
          </motion.div>
        </>
      )}
    </div>
  );
};
