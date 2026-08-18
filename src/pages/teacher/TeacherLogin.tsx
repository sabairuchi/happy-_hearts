import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Zap, AlertCircle, BookOpen } from 'lucide-react';
import { PageWrapper } from '../../components/PageWrapper';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login.module.css';

export default function TeacherLogin() {
  const navigate = useNavigate();
  const { login, demoLogin, user, sessionExpiredReason, clearSessionExpiredReason } = useAuth();

  const [email, setEmail] = useState('teacher@happyhearts.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.role === 'TEACHER') {
      navigate('/teacher/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    clearSessionExpiredReason();
    setLoading(true);

    const result = await login(email, password, 'TEACHER');
    setLoading(false);

    if (!result.success) {
      setErrorMsg(result.error || 'Invalid email or password.');
    }
  };

  const handleDemo = () => {
    demoLogin('TEACHER');
  };

  return (
    <PageWrapper>
      <section className={styles.loginPageSection}>
        {/* Floating Playful Stickers */}
        <span className="floating-sticker" style={{ top: '8%', left: '4%', animationDelay: '0s' }}>👩‍🏫</span>
        <span className="floating-sticker" style={{ top: '15%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '5%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '6%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container">
          <div className={styles.loginContainer} style={{ borderColor: '#4D96FF', borderTopColor: '#1565C0', boxShadow: '0 20px 48px rgba(77, 150, 255, 0.22)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  backgroundColor: '#EBF5FF', 
                  color: '#1565C0', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  margin: '0 auto 12px auto',
                  border: '2px solid #4D96FF'
                }}
              >
                <BookOpen size={28} />
              </div>
              <span className="badge-pill badge-sky" style={{ marginBottom: '8px' }}>👩‍🏫 Educator & Staff Portal</span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Teacher Portal Sign In</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Secure access for Happy Hearts teachers & daycare staff
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
                <Zap size={16} color="#B78103" /> Demo Teacher Access:
              </div>
              <div className={styles.demoRow}>
                <span style={{ fontWeight: 600 }}>Auto-fill Teacher Credentials:</span>
                <Button size="sm" variant="secondary" onClick={handleDemo}>
                  Sign In as Teacher
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
                  <Link to="/forgot-password" style={{ fontSize: '0.8rem', color: '#1565C0', fontWeight: 700 }}>
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

              <Button fullWidth variant="secondary" type="submit" icon={<LogIn size={18} />} disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In to Teacher Dashboard →'}
              </Button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem' }}>
              <Link to="/portal" style={{ fontWeight: 700, color: 'var(--color-text-muted)' }}>
                ← Switch Portal Role
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
