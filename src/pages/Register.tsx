import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { registerParent } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [relationship, setRelationship] = useState('Mother');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerParent({ name, email, mobile, relationship });
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/parent/dashboard');
    }, 1500);
  };

  return (
    <PageWrapper>
      <div className="container">
        <div
          style={{
            maxWidth: '480px',
            margin: '3rem auto',
            backgroundColor: 'var(--color-bg-white)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: '2.5rem'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img
              src="/Happyhearts_logo.png"
              alt="Happy Hearts Logo"
              style={{ height: '50px', objectFit: 'contain', margin: '0 auto 12px auto', display: 'block' }}
            />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Create Parent Account</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Register your parent account to track children, pay fees, and view daily logs
            </p>
          </div>

          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <CheckCircle size={48} color="#06D6A0" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Account Registered Successfully!</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '6px' }}>
                Redirecting to Parent Dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emily Watson"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Relationship to Child *
                </label>
                <select
                  value={relationship}
                  onChange={e => setRelationship(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                >
                  <option value="Mother">Mother</option>
                  <option value="Father">Father</option>
                  <option value="Guardian">Legal Guardian</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Set account password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                />
              </div>

              <Button fullWidth variant="primary" type="submit" icon={<UserPlus size={18} />}>
                Register & Sign In
              </Button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Already have a parent account?{' '}
            <Link to="/login?role=PARENT" style={{ fontWeight: 700, color: 'var(--color-accent-coral)' }}>
              Log In
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
