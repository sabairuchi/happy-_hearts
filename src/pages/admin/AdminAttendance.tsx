import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useData } from '../../context/DataContext';

export default function AdminAttendance() {
  const { attendance } = useData();

  const presentCount = attendance.filter(a => a.status === 'Present').length;
  const leaveCount = attendance.filter(a => a.status === 'Leave').length;
  const absentCount = attendance.filter(a => a.status === 'Absent').length;

  return (
    <DashboardLayout title="School-wide Attendance Reports">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <Card hoverEffect={false}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Total Records Logged</div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{attendance.length} Logs</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Present Students</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>{presentCount}</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Approved Leaves</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>{leaveCount}</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Unexcused Absences</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EE5253' }}>{absentCount}</div>
          </Card>
        </div>

        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Daily Attendance Logs Master</h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Student</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {attendance.map(a => (
                  <tr key={a.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{a.date}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{a.studentName}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: a.status === 'Present' ? 'rgba(6,214,160,0.15)' : 'rgba(238,82,83,0.15)', color: a.status === 'Present' ? '#06D6A0' : '#EE5253' }}>
                        {a.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{a.remarks || 'Normal'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
