import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useData } from '../../context/DataContext';

export default function TeacherNotifications() {
  const { notifications, markNotificationRead } = useData();

  const teacherNotifs = notifications.filter(n => n.targetAudience === 'ALL' || n.targetAudience === 'TEACHERS');

  return (
    <DashboardLayout title="Teacher Staff Announcements">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {teacherNotifs.map(n => (
          <Card key={n.id} hoverEffect={false}>
            <div
              onClick={() => markNotificationRead(n.id)}
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(17,138,178,0.12)', color: '#118AB2' }}>
                    {n.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{n.date}</span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '4px' }}>{n.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{n.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
