import { useState } from 'react';
import { Save } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';

export default function ParentProfile() {
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [mobile, setMobile] = useState(user?.mobile || '+1 (555) 018-9922');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Parent Profile Settings">
      <div style={{ maxWidth: '640px' }}>
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Personal Account Information
          </h3>

          {saved && (
            <div
              style={{
                backgroundColor: 'rgba(6, 214, 160, 0.12)',
                color: '#06D6A0',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              Profile settings updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Full Name
              </label>
              <input
                type="text"
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
                Email Address (Read only)
              </label>
              <input
                type="email"
                disabled
                value={email}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  backgroundColor: 'rgba(45,49,66,0.05)',
                  color: 'var(--color-text-muted)'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Mobile Phone
              </label>
              <input
                type="tel"
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

            <Button variant="primary" type="submit" icon={<Save size={16} />}>
              Save Profile Changes
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
