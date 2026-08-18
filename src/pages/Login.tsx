import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { LogIn, Heart, Zap } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';
import styles from './Login.module.css';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, demoLogin, user } = useAuth();

  const roleParam = (searchParams.get('role') as Role) || 'PARENT';
  const [role, setRole] = useState<Role>(roleParam);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (role === 'PARENT') setEmail('parent@happyhearts.com');
    if (role === 'TEACHER') setEmail('teacher@happyhearts.com');
    if (role === 'ADMIN') setEmail('admin@happyhearts.com');
    setPassword('password123');
  }, [role]);

  useEffect(() => {
    if (user) {
      if (user.role === 'ADMIN') navigate('/admin/dashboard');
      else if (user.role === 'TEACHER') navigate('/teacher/dashboard');
      else navigate('/parent/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const success = login(email, role);
    if (!success) {
      setErrorMsg(`No account found for ${email} with role ${role}. Please check email or register.`);
    }
  };

  const handleQuickDemo = (targetRole: Role) => {
    demoLogin(targetRole);
  };

  return (
    <PageWrapper>
      <section className={styles.loginPageSection}>
        {/* Floating Playful Stickers */}
        <span className="floating-sticker" style={{ top: '8%', left: '4%', animationDelay: '0s' }}>🎈</span>
        <span className="floating-sticker" style={{ top: '15%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '5%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '6%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container">
          <div className={styles.loginContainer}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#FFE5E5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px auto',
                  border: '2px solid #FF6B6B'
                }}
              >
                <Heart size={28} fill="#FF5252" color="#FF5252" />
              </div>
              <span className="badge-pill badge-yellow" style={{ marginBottom: '8px' }}>🔐 Portal Access Gateway</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Portal Sign In</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Sign in to access your customized portal experience
              </p>
            </div>

            {/* Role Tabs */}
            <div className={styles.roleTabs}>
              <button
                type="button"
                className={`${styles.tabBtn} ${role === 'PARENT' ? styles.active : ''}`}
                onClick={() => setRole('PARENT')}
              >
                Parent Portal
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${role === 'TEACHER' ? styles.active : ''}`}
                onClick={() => setRole('TEACHER')}
              >
                Teacher Portal
              </button>
              <button
                type="button"
                className={`${styles.tabBtn} ${role === 'ADMIN' ? styles.active : ''}`}
                onClick={() => setRole('ADMIN')}
              >
                Admin Portal
              </button>
            </div>

            {/* Demo Quick Logins Box */}
            <div className={styles.demoBanner}>
              <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: '#B78103' }}>
                <Zap size={16} color="#B78103" /> One-Click Quick Demo Sign In:
              </div>
              <div className={styles.demoRow}>
                <span style={{ fontWeight: 600 }}>Demo Parent:</span>
                <Button size="sm" variant="accent" onClick={() => handleQuickDemo('PARENT')}>
                  Sign In as Parent
                </Button>
              </div>
              <div className={styles.demoRow}>
                <span style={{ fontWeight: 600 }}>Demo Teacher:</span>
                <Button size="sm" variant="secondary" onClick={() => handleQuickDemo('TEACHER')}>
                  Sign In as Teacher
                </Button>
              </div>
              <div className={styles.demoRow}>
                <span style={{ fontWeight: 600 }}>Demo Admin:</span>
                <Button size="sm" variant="outline" onClick={() => handleQuickDemo('ADMIN')}>
                  Sign In as Admin
                </Button>
              </div>
            </div>

            {errorMsg && (
              <div
                style={{
                  backgroundColor: '#FFE5E5',
                  color: '#FF5252',
                  border: '2px solid #FF6B6B',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}
              >
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Password</span>
                  <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: '#FF5252', fontWeight: 700 }}>
                    Forgot?
                  </Link>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <Button fullWidth variant="primary" type="submit" icon={<LogIn size={18} />}>
                Sign In as {role} →
              </Button>
            </form>

            {role === 'PARENT' && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Don't have a parent account yet?{' '}
                <Link to="/register" style={{ fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                  Register Parent Account
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
