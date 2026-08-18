import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, LogOut, Home } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function AccessDenied() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (!user) return '/portal';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'TEACHER') return '/teacher/dashboard';
    return '/parent/dashboard';
  };

  const handleLogout = () => {
    logout();
    navigate('/portal');
  };

  return (
    <PageWrapper>
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div
          style={{
            maxWidth: '520px',
            margin: '0 auto',
            backgroundColor: '#FFF',
            padding: '3rem 2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <img
            src="/Happyhearts_logo.png"
            alt="Happy Hearts Logo"
            style={{ height: '48px', objectFit: 'contain', margin: '0 auto 1.5rem auto', display: 'block' }}
          />

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'rgba(238, 82, 83, 0.12)',
              color: '#EE5253',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem auto'
            }}
          >
            <ShieldAlert size={40} />
          </div>

          <span
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(238, 82, 83, 0.12)',
              color: '#EE5253',
              fontSize: '0.8rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            HTTP 403 Forbidden
          </span>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '1rem', marginBottom: '0.5rem' }}>
            Access Denied
          </h1>

          <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
            You do not have administrative or authorization permissions to access this private portal page.
            {user && (
              <span style={{ display: 'block', marginTop: '8px' }}>
                Currently authenticated as <strong>{user.name}</strong> ({user.role} Role).
              </span>
            )}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
            {user ? (
              <Link to={getDashboardPath()}>
                <Button variant="primary" icon={<Home size={18} />}>
                  Go to My {user.role} Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/portal">
                <Button variant="primary">Portal Login Selection</Button>
              </Link>
            )}

            {user && (
              <Button variant="outline" icon={<LogOut size={18} />} onClick={handleLogout}>
                Sign Out
              </Button>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
