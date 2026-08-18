import { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import type { AttendanceStatus } from '../../types';

export default function TeacherAttendance() {
  const { user } = useAuth();
  const { teachers, getTeacherStudents, markAttendanceBatch } = useData();

  const teacher = teachers.find(t => t.id === user?.teacherId || t.email === user?.email) || teachers[0];
  const students = getTeacherStudents(teacher?.id || 'tch-1');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [statuses, setStatuses] = useState<{ [studentId: string]: AttendanceStatus }>(() => {
    const initial: { [studentId: string]: AttendanceStatus } = {};
    students.forEach(s => {
      initial[s.id] = 'Present';
    });
    return initial;
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setStatuses(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    const records = students.map(s => ({
      date,
      classId: teacher?.assignedClassId || 'cls-1',
      studentId: s.id,
      studentName: s.name,
      status: statuses[s.id] || 'Present',
      markedByTeacherId: teacher?.id || 'tch-1'
    }));

    markAttendanceBatch(records);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <DashboardLayout title="Daily Attendance Entry Sheet">
      <Card hoverEffect={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              Class Attendance — {teacher?.assignedClassName}
            </h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Mark attendance for all assigned students for the selected date
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid rgba(45,49,66,0.15)',
                fontWeight: 600
              }}
            />
          </div>
        </div>

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
            <CheckCircle size={20} /> Attendance batch saved successfully for {date}!
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Student</th>
                <th style={{ padding: '12px' }}>Admission No</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Present</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Absent</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Leave</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const current = statuses[s.id] || 'Present';
                return (
                  <tr key={s.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={s.photo || 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=200'}
                        alt={s.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <strong style={{ fontWeight: 700 }}>{s.name}</strong>
                    </td>
                    <td style={{ padding: '12px' }}>{s.admissionNumber}</td>

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <input
                        type="radio"
                        name={`att-${s.id}`}
                        checked={current === 'Present'}
                        onChange={() => handleStatusChange(s.id, 'Present')}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </td>

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <input
                        type="radio"
                        name={`att-${s.id}`}
                        checked={current === 'Absent'}
                        onChange={() => handleStatusChange(s.id, 'Absent')}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </td>

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <input
                        type="radio"
                        name={`att-${s.id}`}
                        checked={current === 'Leave'}
                        onChange={() => handleStatusChange(s.id, 'Leave')}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" icon={<Save size={18} />} onClick={handleSave}>
            Save Class Attendance
          </Button>
        </div>
      </Card>
    </DashboardLayout>
  );
}
