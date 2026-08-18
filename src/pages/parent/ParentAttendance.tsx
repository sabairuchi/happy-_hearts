import { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ParentAttendance() {
  const { user } = useAuth();
  const { getParentChildren, attendance } = useData();

  const parentId = user?.parentId || user?.id || 'prt-1';
  const children = getParentChildren(parentId);
  const [selectedChildId, setSelectedChildId] = useState<string>(children[0]?.id || 'std-1');

  const selectedChild = children.find(c => c.id === selectedChildId) || children[0];
  const logs = attendance.filter(a => a.studentId === selectedChild?.id);

  const presentCount = logs.filter(l => l.status === 'Present').length;
  const absentCount = logs.filter(l => l.status === 'Absent').length;
  const leaveCount = logs.filter(l => l.status === 'Leave').length;

  const total = logs.length || 1;
  const rate = Math.round((presentCount / total) * 100);

  return (
    <DashboardLayout title="Child Attendance Calendar">
      {children.length > 1 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px' }}>
          {children.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedChildId(c.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                backgroundColor: selectedChildId === c.id ? 'var(--color-accent-coral)' : 'var(--color-bg-white)',
                color: selectedChildId === c.id ? '#FFF' : 'var(--color-text-main)',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      {selectedChild && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <Card hoverEffect={false}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Attendance Rate</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent-coral)' }}>{rate}%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>August 2026 Academic Term</div>
            </Card>

            <Card hoverEffect={false}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Days Present</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>{presentCount} Days</div>
              <div style={{ fontSize: '0.8rem', color: '#06D6A0' }}>Attended class actively</div>
            </Card>

            <Card hoverEffect={false}>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Leaves & Absences</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>{leaveCount + absentCount} Days</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{leaveCount} Approved Leave</div>
            </Card>
          </div>

          <Card hoverEffect={false}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
              Attendance History Log — {selectedChild.name}
            </h3>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                    <th style={{ padding: '12px' }}>Date</th>
                    <th style={{ padding: '12px' }}>Class</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{log.date}</td>
                      <td style={{ padding: '12px' }}>{selectedChild.className}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            backgroundColor: log.status === 'Present' ? 'rgba(6, 214, 160, 0.15)' : log.status === 'Leave' ? 'rgba(17, 138, 178, 0.15)' : 'rgba(238, 82, 83, 0.15)',
                            color: log.status === 'Present' ? '#06D6A0' : log.status === 'Leave' ? '#118AB2' : '#EE5253'
                          }}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>
                        {log.remarks || 'Regular attendance'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
