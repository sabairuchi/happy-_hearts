import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const { user } = useAuth();
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
    setPortalDropdownOpen(false);
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
              <div>
                <Button
                  size="sm"
                  variant="outline"
                  icon={<User size={16} />}
                  onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                >
                  Portal Access <ChevronDown size={14} style={{ marginLeft: '4px' }} />
                </Button>

                {portalDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '44px',
                      backgroundColor: 'var(--color-bg-white)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid rgba(45, 49, 66, 0.08)',
                      padding: '8px',
                      width: '180px',
                      zIndex: 1000,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}
                  >
                    <Link
                      to="/portal"
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        color: 'var(--color-accent-coral)',
                        textDecoration: 'none',
                        borderBottom: '1px solid rgba(45,49,66,0.06)'
                      }}
                      onClick={() => setPortalDropdownOpen(false)}
                    >
                      🚪 Select Portal Role
                    </Link>
                    <Link
                      to="/parent/login"
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        textDecoration: 'none'
                      }}
                      onClick={() => setPortalDropdownOpen(false)}
                    >
                      👨‍👩‍👧 Parent Login
                    </Link>
                    <Link
                      to="/teacher/login"
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        textDecoration: 'none'
                      }}
                      onClick={() => setPortalDropdownOpen(false)}
                    >
                      👩‍🏫 Teacher Login
                    </Link>
                    <Link
                      to="/admin/login"
                      style={{
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--color-text-main)',
                        textDecoration: 'none'
                      }}
                      onClick={() => setPortalDropdownOpen(false)}
                    >
                      🔑 Admin Login
                    </Link>
                  </div>
                )}
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
                <Link to="/login?role=PARENT" style={{ width: '100%' }}>
                  <Button fullWidth variant="outline" size="md">Parent Portal Login</Button>
                </Link>
                <Link to="/login?role=TEACHER" style={{ width: '100%' }}>
                  <Button fullWidth variant="outline" size="md">Teacher Portal Login</Button>
                </Link>
                <Link to="/login?role=ADMIN" style={{ width: '100%' }}>
                  <Button fullWidth variant="text" size="sm">Admin Login</Button>
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
