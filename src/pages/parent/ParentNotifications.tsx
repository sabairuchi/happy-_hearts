import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ParentNotifications() {
  const { user } = useAuth();
  const { notifications, markNotificationRead } = useData();

  const userNotifications = notifications.filter(n => {
    if (!user) return false;
    return (
      n.targetAudience === 'ALL' ||
      n.targetAudience === 'ALL_PARENTS' ||
      (n.targetAudience === 'SPECIFIC_PARENT' && n.targetParentId === user.parentId)
    );
  });

  return (
    <DashboardLayout title="Parent Notifications & Notices">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {userNotifications.length === 0 ? (
          <Card hoverEffect={false}>
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No notifications available right now.
            </div>
          </Card>
        ) : (
          userNotifications.map(n => (
            <Card key={n.id} hoverEffect={false}>
              <div
                onClick={() => markNotificationRead(n.id)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(255,107,107,0.12)',
                        color: 'var(--color-accent-coral)'
                      }}
                    >
                      {n.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{n.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>{n.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    {n.message}
                  </p>
                </div>

                {!n.isRead && (
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--color-accent-coral)', flexShrink: 0 }} />
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
