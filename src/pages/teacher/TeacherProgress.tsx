import { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TeacherProgress() {
  const { user } = useAuth();
  const { teachers, getTeacherStudents, saveProgressReport } = useData();

  const teacher = teachers.find(t => t.id === user?.teacherId || t.email === user?.email) || teachers[0];
  const students = getTeacherStudents(teacher?.id || 'tch-1');

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'std-1');
  const [termPeriod, setTermPeriod] = useState('Term 1 - 2026');

  const [communication, setCommunication] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Excellent');
  const [socialDev, setSocialDev] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Excellent');
  const [motorSkills, setMotorSkills] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Good');
  const [cognitive, setCognitive] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Excellent');
  const [creativity, setCreativity] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Excellent');
  const [participation, setParticipation] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Good');
  const [personalDev, setPersonalDev] = useState<'Excellent' | 'Good' | 'Developing' | 'Needs Support'>('Excellent');

  const [remarks, setRemarks] = useState('Active, cheerful, and expresses ideas with great confidence.');
  const [notes, setNotes] = useState('Continuing to focus on scissor cutting and complex puzzle building.');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    saveProgressReport({
      studentId: student.id,
      studentName: student.name,
      className: teacher?.assignedClassName || 'Playgroup Sunshine',
      termPeriod,
      teacherId: teacher?.id || 'tch-1',
      teacherName: teacher?.name || 'Sarah Jenkins',
      communication,
      socialDevelopment: socialDev,
      motorSkills,
      cognitiveDevelopment: cognitive,
      creativity,
      participation,
      personalDevelopment: personalDev,
      teacherRemarks: remarks,
      developmentNotes: notes
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout title="Child Progress & Developmental Report Builder">
      <div style={{ maxWidth: '760px' }}>
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Submit Early Childhood Progress Assessment
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
              <CheckCircle size={20} /> Developmental Progress Report published to Parent Dashboard!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
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

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Assessment Period *
                </label>
                <input
                  type="text"
                  value={termPeriod}
                  onChange={e => setTermPeriod(e.target.value)}
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

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Communication & Speech', val: communication, setVal: setCommunication },
                { label: 'Social Development', val: socialDev, setVal: setSocialDev },
                { label: 'Motor Skills & Physical', val: motorSkills, setVal: setMotorSkills },
                { label: 'Cognitive Development', val: cognitive, setVal: setCognitive },
                { label: 'Creativity & Arts', val: creativity, setVal: setCreativity },
                { label: 'Class Participation', val: participation, setVal: setParticipation },
                { label: 'Personal Habits', val: personalDev, setVal: setPersonalDev }
              ].map((domain, idx) => (
                <div key={idx} style={{ backgroundColor: 'var(--color-bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>
                    {domain.label}
                  </label>
                  <select
                    value={domain.val}
                    onChange={e => domain.setVal(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(45,49,66,0.12)',
                      fontWeight: 600
                    }}
                  >
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Developing">Developing</option>
                    <option value="Needs Support">Needs Support</option>
                  </select>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Overall Teacher Remarks *
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

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Developmental Goals & Recommendation Notes
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={e => setNotes(e.target.value)}
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
              Save Progress Report
            </Button>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
