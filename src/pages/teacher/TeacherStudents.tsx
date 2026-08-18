import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TeacherStudents() {
  const { user } = useAuth();
  const { teachers, getTeacherStudents } = useData();

  const teacher = teachers.find(t => t.id === user?.teacherId || t.email === user?.email) || teachers[0];
  const students = getTeacherStudents(teacher?.id || 'tch-1');

  return (
    <DashboardLayout title="My Assigned Students Roster">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {students.map(student => (
          <Card key={student.id} hoverEffect={false}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <img
                src={student.photo || 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=200'}
                alt={student.name}
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent-coral)' }}
              />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{student.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Admission: {student.admissionNumber} • {student.gender}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Date of Birth:</strong> {student.dob}</div>
              <div><strong>Parent:</strong> {student.parentName} ({student.parentMobile})</div>
              <div><strong>Parent Email:</strong> {student.parentEmail}</div>
              <div><strong>Emergency Contact:</strong> {student.emergencyName} ({student.emergencyPhone})</div>
              {student.medicalNotes && (
                <div style={{ color: '#9B5DE5', fontWeight: 600, marginTop: '4px' }}>
                  <strong>Medical Notes:</strong> {student.medicalNotes}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}
