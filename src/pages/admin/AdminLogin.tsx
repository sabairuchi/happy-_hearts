import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Zap, AlertCircle } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login.module.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login, demoLogin, user, sessionExpiredReason, clearSessionExpiredReason } = useAuth();

  const [email, setEmail] = useState('admin@happyhearts.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'ADMIN') {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    clearSessionExpiredReason();
    setLoading(true);

    const result = await login(email, password, 'ADMIN');
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid email or password.');
    }
  };

  const handleDemo = () => {
    demoLogin('ADMIN');
  };

  return (
    <PageWrapper>
      <div className="container">
        <div className={styles.loginContainer}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img
              src="/Happyhearts_logo.png"
              alt="Happy Hearts Logo"
              style={{ height: '50px', objectFit: 'contain', margin: '0 auto 12px auto', display: 'block' }}
            />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Admin Portal Sign In</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Protected Administrative Access Gateway
            </p>
          </div>

          {sessionExpiredReason && (
            <div
              style={{
                backgroundColor: 'rgba(255, 209, 102, 0.25)',
                color: '#B38600',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                marginBottom: '1rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <AlertCircle size={18} /> {sessionExpiredReason}
            </div>
          )}

          {errorMsg && (
            <div
              style={{
                backgroundColor: 'rgba(238, 82, 83, 0.12)',
                color: '#EE5253',
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

          {/* Quick Demo Sign In */}
          <div className={styles.demoBanner}>
            <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={16} color="#B38600" /> Demo Admin Access:
            </div>
            <div className={styles.demoRow}>
              <span>Auto-fill Admin Credentials:</span>
              <Button size="sm" variant="accent" onClick={handleDemo}>
                Sign In as Admin
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label>Email / Username</label>
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
                <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--color-accent-coral)' }}>
                  Forgot Password?
                </Link>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <span>Remember me on this browser session</span>
              </label>
            </div>

            <Button fullWidth variant="primary" type="submit" icon={<LogIn size={18} />} disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
            </Button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
            <Link to="/portal" style={{ fontWeight: 700, color: 'var(--color-text-muted)' }}>
              ← Switch Portal Role
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
