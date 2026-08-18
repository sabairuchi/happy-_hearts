import { useState } from 'react';
import { Clock, Utensils, Moon, BookOpen, Smile } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ParentDailyUpdates() {
  const { user } = useAuth();
  const { getParentChildren, dailyUpdates } = useData();

  const parentId = user?.parentId || user?.id || 'prt-1';
  const myChildren = getParentChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState<string>(myChildren[0]?.id || 'std-1');
  const selectedChild = myChildren.find(c => c.id === selectedChildId) || myChildren[0];

  const logs = dailyUpdates.filter(u => u.studentId === selectedChild?.id);

  return (
    <DashboardLayout title="Daily Preschool & Crèche Updates">
      {myChildren.length > 1 && (
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '8px' }}>
          {myChildren.map(c => (
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
          {logs.length === 0 ? (
            <Card hoverEffect={false}>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No daily activity log entries recorded for {selectedChild.name} yet.
              </div>
            </Card>
          ) : (
            logs.map(log => (
              <Card key={log.id} hoverEffect={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(45,49,66,0.08)', paddingBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(17, 138, 178, 0.12)', color: '#118AB2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Daily Log for {log.date}</h3>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Recorded by {log.teacherName} ({log.className})</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                  <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--color-accent-coral)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Smile size={18} /> Today's Activities
                    </strong>
                    <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', fontSize: '0.85rem', lineHeight: '1.5' }}>
                      {log.todayActivities.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#06D6A0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <Utensils size={18} /> Meals & Snacks Intake
                    </strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                      {log.mealsSnacks}
                    </p>

                    <strong style={{ fontSize: '0.9rem', color: '#118AB2', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1rem', marginBottom: '8px' }}>
                      <Moon size={18} /> Nap & Rest Schedule
                    </strong>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                      {log.napRestTime}
                    </p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#9B5DE5', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                      <BookOpen size={18} /> Learning & Special Observations
                    </strong>
                    <p style={{ fontSize: '0.85rem', marginBottom: '10px' }}>
                      {log.learningActivities}
                    </p>
                    {log.specialObservations && (
                      <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                        Observed: {log.specialObservations}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
