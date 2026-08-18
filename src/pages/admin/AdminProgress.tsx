import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useData } from '../../context/DataContext';

export default function AdminProgress() {
  const { progressReports } = useData();

  return (
    <DashboardLayout title="Developmental Progress Reports Audit">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {progressReports.map(report => (
          <Card key={report.id} hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(45,49,66,0.08)', paddingBottom: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{report.studentName} — {report.className}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Evaluated on {report.evaluatedDate} by Teacher {report.teacherName} ({report.termPeriod})
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
              <div>Communication: <strong>{report.communication}</strong></div>
              <div>Social: <strong>{report.socialDevelopment}</strong></div>
              <div>Motor Skills: <strong>{report.motorSkills}</strong></div>
              <div>Cognitive: <strong>{report.cognitiveDevelopment}</strong></div>
              <div>Creativity: <strong>{report.creativity}</strong></div>
              <div>Participation: <strong>{report.participation}</strong></div>
              <div>Personal Habits: <strong>{report.personalDevelopment}</strong></div>
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
              <strong>Teacher Remarks:</strong> "{report.teacherRemarks}"
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
