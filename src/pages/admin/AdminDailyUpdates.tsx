import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useData } from '../../context/DataContext';

export default function AdminDailyUpdates() {
  const { dailyUpdates } = useData();

  return (
    <DashboardLayout title="Preschool & Crèche Daily Activity Log Audit">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {dailyUpdates.map(log => (
          <Card key={log.id} hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{log.studentName} ({log.className})</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Date: {log.date}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              <div>
                <strong>Activities:</strong> {log.todayActivities.join(', ')}
              </div>
              <div>
                <strong>Meals & Snacks:</strong> {log.mealsSnacks}
              </div>
              <div>
                <strong>Nap Schedule:</strong> {log.napRestTime}
              </div>
              <div>
                <strong>Educator:</strong> {log.teacherName}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
