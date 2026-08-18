import { useState } from 'react';
import { Save } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TeacherProfile() {
  const { user } = useAuth();
  const { teachers } = useData();

  const teacher = teachers.find(t => t.id === user?.teacherId || t.email === user?.email) || teachers[0];

  const [name, setName] = useState(teacher?.name || '');
  const [phone, setPhone] = useState(teacher?.phone || '');
  const [bio, setBio] = useState(teacher?.bio || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Educator Profile Settings">
      <div style={{ maxWidth: '640px' }}>
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Teacher Information
          </h3>

          {saved && (
            <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.12)', color: '#06D6A0', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontWeight: 600, fontSize: '0.85rem' }}>
              Profile updated successfully!
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
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Assigned Class
              </label>
              <input
                type="text"
                disabled
                value={teacher?.assignedClassName}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'rgba(45,49,66,0.05)' }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Phone Contact
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Bio & Teaching Philosophy
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', backgroundColor: 'var(--color-bg-primary)' }}
              />
            </div>

            <Button variant="primary" type="submit" icon={<Save size={16} />}>
              Save Profile
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
