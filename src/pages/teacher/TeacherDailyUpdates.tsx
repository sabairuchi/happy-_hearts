import { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TeacherDailyUpdates() {
  const { user } = useAuth();
  const { teachers, getTeacherStudents, saveDailyUpdate } = useData();

  const teacher = teachers.find(t => t.id === user?.teacherId || t.email === user?.email) || teachers[0];
  const students = getTeacherStudents(teacher?.id || 'tch-1');

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'std-1');
  const [activitiesInput, setActivitiesInput] = useState('Finger Painting, Story Circle, Outdoor Garden Walk');
  const [learningActivities, setLearningActivities] = useState('Practiced sensory textures and color identification.');
  const [mealsSnacks, setMealsSnacks] = useState('Ate full lunch (soup & rice), drank whole glass of milk.');
  const [napRestTime, setNapRestTime] = useState('Rested 1.5 hours peacefully from 1:00 PM to 2:30 PM.');
  const [specialObs, setSpecialObs] = useState('Showed high enthusiasm during rhyme time.');
  const [remarks, setRemarks] = useState('Happy and active throughout the day.');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.id === selectedStudentId);
    if (!targetStudent) return;

    saveDailyUpdate({
      date: new Date().toISOString().split('T')[0],
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      className: teacher?.assignedClassName || 'Playgroup Sunshine',
      teacherId: teacher?.id || 'tch-1',
      teacherName: teacher?.name || 'Sarah Jenkins',
      todayActivities: activitiesInput.split(',').map(a => a.trim()),
      learningActivities,
      mealsSnacks,
      napRestTime,
      specialObservations: specialObs,
      teacherRemarks: remarks
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout title="Daily Preschool & Crèche Activity Logger">
      <div style={{ maxWidth: '720px' }}>
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Record Daily Activity Log for Student
          </h3>

          {savedSuccess && (
            <div
              style={{
                backgroundColor: 'rgba(6, 214, 160, 0.15)',
                color: '#06D6A0',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <CheckCircle size={20} /> Daily activity log recorded & published to Parent Dashboard!
            </div>
          )}

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Select Student *
              </label>
              <select
                value={selectedStudentId}
                onChange={e => setSelectedStudentId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  backgroundColor: 'var(--color-bg-primary)',
                  fontWeight: 700
                }}
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.admissionNumber})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Today's Activities (Comma separated) *
              </label>
              <input
                type="text"
                value={activitiesInput}
                onChange={e => setActivitiesInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Learning & Educational Focus
              </label>
              <textarea
                rows={2}
                value={learningActivities}
                onChange={e => setLearningActivities(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Meals & Snacks Log
                </label>
                <input
                  type="text"
                  value={mealsSnacks}
                  onChange={e => setMealsSnacks(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Nap / Rest Time
                </label>
                <input
                  type="text"
                  value={napRestTime}
                  onChange={e => setNapRestTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid rgba(45,49,66,0.12)',
                    backgroundColor: 'var(--color-bg-primary)'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Special Observations / Mood
              </label>
              <input
                type="text"
                value={specialObs}
                onChange={e => setSpecialObs(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Teacher Remarks to Parent
              </label>
              <textarea
                rows={2}
                value={remarks}
                onChange={e => setRemarks(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  backgroundColor: 'var(--color-bg-primary)'
                }}
              />
            </div>

            <Button variant="primary" type="submit" icon={<Save size={18} />}>
              Publish Daily Log
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
