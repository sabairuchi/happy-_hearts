import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Admission', path: '/admission' },
    { name: 'Our Teachers', path: '/teachers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'TEACHER') return '/teacher/dashboard';
    return '/parent/dashboard';
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Top Scroll Progress Indicator */}
      <motion.div
        style={{
          scaleX,
          transformOrigin: '0%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #FF6B6B 0%, #FF9800 50%, #845EC2 100%)',
          zIndex: 2000
        }}
      />
      <div className={`container ${styles.container}`}>
        <Link to="/" className={`${styles.logo} interactive`}>
          <img
            src="/Happyhearts_logo.png"
            alt="Happy Hearts Preschool & Crèche"
            style={{ height: '46px', objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} interactive ${
                    location.pathname === link.path ? styles.active : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.ctaWrapper}>

          {/* Portal Dropdown Button */}
          <div style={{ position: 'relative' }}>
            {user ? (
              <Link to={getDashboardPath()}>
                <Button size="sm" variant="accent" icon={<User size={16} />}>
                  {user.name.split(' ')[0]} ({user.role})
                </Button>
              </Link>
            ) : (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Link to="/parent/login">
                  <Button size="sm" variant="outline">
                    👨‍👩‍👧 Parent Portal
                  </Button>
                </Link>
                <Link to="/teacher/login">
                  <Button size="sm" variant="outline">
                    👩‍🏫 Teacher Portal
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Link to="/admission/apply">
            <Button size="sm" variant="primary">Apply Now</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${styles.mobileToggle} interactive`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileNav} ${mobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`${styles.mobileNavLink} ${
                  location.pathname === link.path ? styles.active : ''
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li style={{ width: '100%', maxWidth: '320px', borderTop: '1px solid rgba(45,49,66,0.1)', paddingTop: '16px' }}>
            {user ? (
              <Link to={getDashboardPath()} style={{ width: '100%' }}>
                <Button fullWidth size="lg" variant="accent">
                  Go to {user.role} Dashboard
                </Button>
              </Link>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <Link to="/parent/login" style={{ width: '100%' }}>
                  <Button fullWidth variant="outline" size="md">Parent Portal Login</Button>
                </Link>
                <Link to="/teacher/login" style={{ width: '100%' }}>
                  <Button fullWidth variant="outline" size="md">Teacher Portal Login</Button>
                </Link>
              </div>
            )}
          </li>

          <li className={styles.mobileNavCTA}>
            <Link to="/admission/apply" style={{ width: '100%' }}>
              <Button fullWidth size="lg">Apply for Admission</Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
