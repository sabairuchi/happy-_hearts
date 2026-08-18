import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Zap, AlertCircle, Users } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login.module.css';

export default function ParentLogin() {
  const navigate = useNavigate();
  const { login, demoLogin, user, sessionExpiredReason, clearSessionExpiredReason } = useAuth();

  const [email, setEmail] = useState('parent@happyhearts.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'PARENT') {
      navigate('/parent/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    clearSessionExpiredReason();
    setLoading(true);

    const result = await login(email, password, 'PARENT');
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid email or password.');
    }
  };

  const handleDemo = () => {
    demoLogin('PARENT');
  };

  return (
    <PageWrapper>
      <section className={styles.loginPageSection}>
        {/* Floating Playful Stickers */}
        <span className="floating-sticker" style={{ top: '8%', left: '4%', animationDelay: '0s' }}>👨‍👩‍👧</span>
        <span className="floating-sticker" style={{ top: '15%', right: '5%', animationDelay: '1.2s' }}>🎈</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '5%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '6%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container">
          <div className={styles.loginContainer} style={{ borderColor: '#FF6B6B', borderTopColor: '#FF5252', boxShadow: '0 20px 48px rgba(255, 107, 107, 0.22)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  backgroundColor: '#FFE5E5', 
                  color: '#FF5252', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 12px auto',
                  border: '2px solid #FF6B6B'
                }}
              >
                <Users size={28} />
              </div>
              <span className="badge-pill badge-yellow" style={{ marginBottom: '8px' }}>👨‍👩‍👧 Parent & Family Portal</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Parent Portal Sign In</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Access children's profiles, attendance, daily logs & online fee payment
              </p>
            </div>

            {sessionExpiredReason && (
              <div
                style={{
                  backgroundColor: '#FFF3E0',
                  color: '#B78103',
                  border: '2px solid #FFD93D',
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

            {/* Quick Demo Sign In */}
            <div className={styles.demoBanner}>
              <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: '#B78103' }}>
                <Zap size={16} color="#B78103" /> Demo Parent Access:
              </div>
              <div className={styles.demoRow}>
                <span style={{ fontWeight: 600 }}>Auto-fill Parent Credentials:</span>
                <Button size="sm" variant="accent" onClick={handleDemo}>
                  Sign In as Parent
                </Button>
              </div>
            </div>

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

              <Button fullWidth variant="primary" type="submit" icon={<LogIn size={18} />} disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In to Parent Dashboard →'}
              </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Don't have a parent account yet?{' '}
              <Link to="/register" style={{ fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                Register Parent Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
