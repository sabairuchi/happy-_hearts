import { Phone, Shield } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ParentChildren() {
  const { user } = useAuth();
  const { getParentChildren } = useData();

  const parentId = user?.parentId || user?.id || 'prt-1';
  const children = getParentChildren(parentId);

  return (
    <DashboardLayout title="My Children Profiles">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {children.map((child) => (
          <Card key={child.id} hoverEffect={false}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <img
                src={child.photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'}
                alt={child.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400';
                }}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: 'var(--radius-md)',
                  objectFit: 'cover',
                  border: '3px solid var(--color-accent-coral)'
                }}
              />

              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{child.name}</h2>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-coral)', fontWeight: 700 }}>
                      {child.className}
                    </span>
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'rgba(6, 214, 160, 0.12)',
                      color: '#06D6A0',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    {child.status}
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.25rem',
                    marginTop: '1.5rem',
                    backgroundColor: 'var(--color-bg-primary)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Admission Number
                    </span>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{child.admissionNumber}</p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Date of Birth
                    </span>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{child.dob} ({child.gender})</p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Assigned Teacher
                    </span>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{child.teacherName}</p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Joining Date
                    </span>
                    <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{child.joiningDate}</p>
                  </div>
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={14} color="#FF6B6B" /> Emergency Contact
                    </strong>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{child.emergencyName} - {child.emergencyPhone}</p>
                  </div>

                  {child.medicalNotes && (
                    <div>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Shield size={14} color="#9B5DE5" /> Medical / Dietary Notes
                      </strong>
                      <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#9B5DE5' }}>{child.medicalNotes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
