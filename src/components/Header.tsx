import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone } from 'lucide-react';
import { Button } from './Button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
    { name: 'Our Teachers', path: '/teachers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        <Link to="/" className={`${styles.logo} interactive`}>
          <span className={styles.logoBadge}>
            <Heart size={20} fill="#FF6B6B" color="#FF6B6B" />
          </span>
          <div className={styles.logoTextGroup}>
            <span className={styles.logoTitle}>Happy Hearts</span>
            <span className={styles.logoSub}>Preschool & Crèche</span>
          </div>
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
          <a href="tel:+1234567890" className={styles.phoneQuickLink}>
            <Phone size={16} />
            <span>+1 (234) 567-890</span>
          </a>
          <Link to="/contact">
            <Button size="sm" variant="primary">Enrol Today</Button>
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
          <li className={styles.mobileNavCTA}>
            <Link to="/contact" style={{ width: '100%' }}>
              <Button fullWidth size="lg">Book a School Tour</Button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
