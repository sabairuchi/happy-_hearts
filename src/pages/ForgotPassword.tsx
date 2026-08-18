import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Button } from '../components/Button';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSent(true);
    }
  };

  return (
    <PageWrapper>
      <div className="container">
        <div
          style={{
            maxWidth: '440px',
            margin: '4rem auto',
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Reset Password</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              Enter your account email to receive a password reset link
            </p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <CheckCircle size={44} color="#06D6A0" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Reset Email Sent!</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '6px', marginBottom: '1.5rem' }}>
                We have sent instructions to <strong>{email}</strong>. Check your inbox to set a new password.
              </p>
              <Link to="/login">
                <Button variant="primary">Return to Sign In</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@happyhearts.com"
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

              <Button fullWidth variant="primary" type="submit">
                Send Recovery Link
              </Button>
            </form>
          )}

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/login" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <ArrowLeft size={16} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
