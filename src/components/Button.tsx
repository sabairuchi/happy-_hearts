import type { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'
>;

interface ButtonProps extends NativeButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  icon?: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  fullWidth = false,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ''
      } ${className} interactive`}
      {...props}
    >
      <span className={styles.content}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};
