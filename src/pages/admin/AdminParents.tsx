import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useData } from '../../context/DataContext';

export default function AdminParents() {
  const { parents, students } = useData();

  return (
    <DashboardLayout title="Parent Accounts Directory">
      <Card hoverEffect={false}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Parent Name</th>
                <th style={{ padding: '12px' }}>Email & Mobile</th>
                <th style={{ padding: '12px' }}>Relationship</th>
                <th style={{ padding: '12px' }}>Linked Children</th>
                <th style={{ padding: '12px' }}>Address</th>
              </tr>
            </thead>
            <tbody>
              {parents.map(p => {
                const linkedChildren = students.filter(s => p.childrenIds.includes(s.id) || s.parentId === p.id);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{p.name}</td>
                    <td style={{ padding: '12px' }}>
                      <div>{p.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{p.mobile}</div>
                    </td>
                    <td style={{ padding: '12px' }}>{p.relationship}</td>
                    <td style={{ padding: '12px' }}>
                      {linkedChildren.length > 0 ? (
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          {linkedChildren.map(c => (
                            <span key={c.id} style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(255,107,107,0.12)', color: 'var(--color-accent-coral)', fontSize: '0.75rem', fontWeight: 700 }}>
                              {c.name} ({c.className})
                            </span>
                          ))}
                        </div>
                      ) : <span style={{ color: 'var(--color-text-muted)' }}>None linked</span>}
                    </td>
                    <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{p.address}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
