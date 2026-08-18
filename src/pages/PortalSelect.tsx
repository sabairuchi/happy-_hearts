import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, Users, ArrowRight } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

export default function PortalSelect() {
  const { user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return '/portal';
    if (user.role === 'ADMIN') return '/admin/dashboard';
    if (user.role === 'TEACHER') return '/teacher/dashboard';
    return '/parent/dashboard';
  };

  return (
    <PageWrapper>
      <section style={{ padding: '4rem 0 5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <img
              src="/Happyhearts_logo.png"
              alt="Happy Hearts Preschool & Crèche"
              style={{ height: '64px', objectFit: 'contain', margin: '0 auto 1.25rem auto', display: 'block' }}
            />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Select Portal Login
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
              Welcome to the Happy Hearts Preschool & Crèche Private Access Gateway. Select your role to continue to secure login.
            </p>
          </div>

          {user && (
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto 2.5rem auto',
                backgroundColor: 'rgba(6, 214, 160, 0.12)',
                border: '1px solid #06D6A0',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                textAlign: 'center'
              }}
            >
              <p style={{ fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '8px' }}>
                You are currently signed in as {user.name} ({user.role} Role)
              </p>
              <Link to={getDashboardPath()}>
                <Button variant="primary" size="sm" icon={<ArrowRight size={16} />}>
                  Go Directly to {user.role} Dashboard
                </Button>
              </Link>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Parent Card */}
            <Card accentColor="#FF6B6B">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(255,107,107,0.12)', color: '#FF6B6B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Parent Portal</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '54px' }}>
                Access your children's profiles, attendance history, daily logs, early progress reports, and fee payments.
              </p>
              <Link to="/parent/login">
                <Button fullWidth variant="primary" icon={<ArrowRight size={18} />}>
                  Parent Login
                </Button>
              </Link>
            </Card>

            {/* Teacher Card */}
            <Card accentColor="#118AB2">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(17,138,178,0.12)', color: '#118AB2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Teacher Portal</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '54px' }}>
                Record daily attendance, log classroom & crèche activities, and submit developmental milestone reports.
              </p>
              <Link to="/teacher/login">
                <Button fullWidth variant="secondary" icon={<ArrowRight size={18} />}>
                  Teacher Login
                </Button>
              </Link>
            </Card>

            {/* Admin Card */}
            <Card accentColor="#9B5DE5">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(155,93,229,0.12)', color: '#9B5DE5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Portal</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '54px' }}>
                Manage admissions, student & teacher registries, fee structures, revenue oversight, and school notices.
              </p>
              <Link to="/admin/login">
                <Button fullWidth variant="accent" icon={<ArrowRight size={18} />}>
                  Admin Login
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
