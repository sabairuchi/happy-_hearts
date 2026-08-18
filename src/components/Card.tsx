import { motion } from 'framer-motion';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
  accentColor?: string;
}

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  delay = 0,
  accentColor,
}: CardProps) => {
  return (
    <motion.div
      className={`${styles.card} ${hoverEffect ? styles.hoverable : ''} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        borderTopColor: accentColor || undefined,
      }}
    >
      {children}
    </motion.div>
  );
};
