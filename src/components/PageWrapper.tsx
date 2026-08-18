import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';

interface PageWrapperProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ minHeight: '100vh', paddingTop: '80px' }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
};
