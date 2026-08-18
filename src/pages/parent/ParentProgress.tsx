import { useState } from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ParentProgress() {
  const { user } = useAuth();
  const { getParentChildren, progressReports } = useData();

  const parentId = user?.parentId || user?.id || 'prt-1';
  const myChildren = getParentChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState<string>(myChildren[0]?.id || 'std-1');
  const selectedChild = myChildren.find(c => c.id === selectedChildId) || myChildren[0];

  const reports = progressReports.filter(p => p.studentId === selectedChild?.id);

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return '#06D6A0';
      case 'Good': return '#118AB2';
      case 'Developing': return '#FFD166';
      default: return '#FF6B6B';
    }
  };

  return (
    <DashboardLayout title="Early Child Progress Reports">
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
          {reports.length === 0 ? (
            <Card hoverEffect={false}>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No progress evaluation reports published for {selectedChild.name} yet.
              </div>
            </Card>
          ) : (
            reports.map(r => (
              <Card key={r.id} hoverEffect={false}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(45,49,66,0.08)', paddingBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-accent-coral)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {r.termPeriod}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Developmental Milestone Assessment</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      Evaluated on {r.evaluatedDate} by Teacher {r.teacherName}
                    </div>
                  </div>
                </div>

                {/* 7 Core Preschool Domains Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                  {[
                    { label: 'Communication & Speech', value: r.communication },
                    { label: 'Social Development', value: r.socialDevelopment },
                    { label: 'Motor Skills & Physical', value: r.motorSkills },
                    { label: 'Cognitive Development', value: r.cognitiveDevelopment },
                    { label: 'Creativity & Arts', value: r.creativity },
                    { label: 'Classroom Participation', value: r.participation },
                    { label: 'Personal Habits & Care', value: r.personalDevelopment }
                  ].map((domain, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: 'var(--color-bg-primary)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        {domain.label}
                      </span>
                      <strong style={{ fontSize: '1.1rem', color: getRatingColor(domain.value) }}>
                        {domain.value}
                      </strong>
                    </div>
                  ))}
                </div>

                {/* Teacher Remarks & Notes */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: 'var(--color-bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={16} color="#FF6B6B" /> Teacher Remarks
                    </strong>
                    <p style={{ fontSize: '0.9rem', marginTop: '6px', fontStyle: 'italic' }}>
                      "{r.teacherRemarks}"
                    </p>
                  </div>

                  <div>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={16} color="#118AB2" /> Next Learning Goals & Notes
                    </strong>
                    <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>
                      {r.developmentNotes}
                    </p>
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
