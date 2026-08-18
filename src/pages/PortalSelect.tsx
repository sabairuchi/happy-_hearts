import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, Users, ArrowRight, Sparkles } from 'lucide-react';
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
      <section style={{ padding: '4rem 0 5rem 0', background: 'linear-gradient(180deg, #FFF0D6 0%, #FFE6EC 40%, #E6F3FF 80%, #EAFAF1 100%)', minHeight: '82vh', position: 'relative' }}>
        {/* Floating Playful Stickers */}
        <span className="floating-sticker" style={{ top: '8%', left: '4%', animationDelay: '0s' }}>🎈</span>
        <span className="floating-sticker" style={{ top: '15%', right: '5%', animationDelay: '1.2s' }}>🎨</span>
        <span className="floating-sticker" style={{ bottom: '15%', left: '5%', animationDelay: '2.4s' }}>🧸</span>
        <span className="floating-sticker" style={{ bottom: '10%', right: '6%', animationDelay: '0.8s' }}>⭐</span>

        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem auto' }}>
            <span className="badge-pill badge-yellow" style={{ marginBottom: '12px' }}>
              <Sparkles size={16} /> 🔐 Secure Portal Access
            </span>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '0.75rem' }}>
              Select Portal Login 🌈
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.5 }}>
              Welcome to the Happy Hearts Preschool & Crèche Gateway. Select your portal role below to continue to your interactive dashboard.
            </p>
          </div>

          {user && (
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto 2.5rem auto',
                backgroundColor: '#EAFAF1',
                border: '2.5px solid #6BCB77',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(107, 203, 119, 0.25)'
              }}
            >
              <p style={{ fontWeight: 800, color: '#059669', marginBottom: '10px', fontSize: '1.05rem' }}>
                👋 You are currently signed in as {user.name} ({user.role} Role)
              </p>
              <Link to={getDashboardPath()}>
                <Button variant="primary" size="sm" icon={<ArrowRight size={16} />}>
                  Go Directly to {user.role} Dashboard
                </Button>
              </Link>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1020px', margin: '0 auto' }}>
            {/* Parent Card */}
            <Card
              hoverEffect={true}
              style={{
                backgroundColor: '#FFE5E5',
                border: '2.5px solid #FF6B6B',
                borderTop: '6px solid #FF5252',
                padding: '2.25rem 1.75rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(255,107,107,0.18)', color: '#FF5252', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '2px solid #FF6B6B' }}>
                <Users size={28} />
              </div>
              <span className="badge-pill badge-yellow" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>👨‍👩‍👧 Family Access</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Parent Portal</h3>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '54px', lineHeight: 1.5 }}>
                Access children's profiles, attendance history, daily logs, milestone progress evaluations, and online fee payments.
              </p>
              <Link to="/parent/login">
                <Button fullWidth variant="primary" icon={<ArrowRight size={18} />}>
                  Parent Login →
                </Button>
              </Link>
            </Card>

            {/* Teacher Card */}
            <Card
              hoverEffect={true}
              style={{
                backgroundColor: '#EBF5FF',
                border: '2.5px solid #4D96FF',
                borderTop: '6px solid #1565C0',
                padding: '2.25rem 1.75rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(77,150,255,0.18)', color: '#1565C0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '2px solid #4D96FF' }}>
                <BookOpen size={28} />
              </div>
              <span className="badge-pill badge-sky" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>👩‍🏫 Educator Hub</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Teacher Portal</h3>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '54px', lineHeight: 1.5 }}>
                Record daily attendance, log classroom & crèche activities, manage student rosters, and post parent announcements.
              </p>
              <Link to="/teacher/login">
                <Button fullWidth variant="secondary" icon={<ArrowRight size={18} />}>
                  Teacher Login →
                </Button>
              </Link>
            </Card>

            {/* Admin Card */}
            <Card
              hoverEffect={true}
              style={{
                backgroundColor: '#F3E8FF',
                border: '2.5px solid #845EC2',
                borderTop: '6px solid #6A1B9A',
                padding: '2.25rem 1.75rem'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(132,94,194,0.18)', color: '#6A1B9A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '2px solid #845EC2' }}>
                <ShieldCheck size={28} />
              </div>
              <span className="badge-pill badge-purple" style={{ fontSize: '0.75rem', marginBottom: '8px' }}>🔑 Director Gateway</span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Admin Portal</h3>
              <p style={{ color: 'var(--color-text-main)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '54px', lineHeight: 1.5 }}>
                Manage admissions applications, student & teacher registries, fee structures, revenue oversight, and school notices.
              </p>
              <Link to="/admin/login">
                <Button fullWidth variant="accent" icon={<ArrowRight size={18} />}>
                  Admin Login →
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
