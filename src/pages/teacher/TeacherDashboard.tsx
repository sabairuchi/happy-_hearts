import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  CalendarCheck, 
  Clock, 
  TrendingUp
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { teachers, getTeacherStudents, attendance, dailyUpdates } = useData();

  const teacher = teachers.find(t => t.id === user?.teacherId || t.email === user?.email) || teachers[0];
  const myStudents = getTeacherStudents(teacher?.id || 'tch-1');

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.markedByTeacherId === teacher?.id && a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'Present').length;

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Welcome Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #118AB2 0%, #06D6A0 100%)',
            color: '#FFF',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <img
              src={teacher?.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
              alt={teacher?.name}
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid rgba(255,255,255,0.8)'
              }}
            />
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.9 }}>
                Class Educator
              </span>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome back, {teacher?.name}!</h2>
              <div style={{ fontSize: '0.9rem', opacity: 0.95, marginTop: '2px' }}>
                Assigned Class: <strong>{teacher?.assignedClassName}</strong> • Qualification: {teacher?.qualification}
              </div>
            </div>
          </div>

          <Link to="/teacher/attendance">
            <Button size="sm" variant="accent">
              Mark Today's Attendance
            </Button>
          </Link>
        </div>

        {/* Quick Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Assigned Students</span>
              <GraduationCap color="#FF6B6B" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{myStudents.length} Children</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{teacher?.assignedClassName}</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Today's Attendance</span>
              <CalendarCheck color="#06D6A0" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>
              {presentCount} / {myStudents.length}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {todayAttendance.length > 0 ? 'Marked for today' : 'Pending attendance entry'}
            </div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Daily Activity Logs</span>
              <Clock color="#118AB2" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>
              {dailyUpdates.filter(u => u.date === today && u.teacherId === teacher?.id).length} Logged
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Nap & meal records</div>
          </Card>
        </div>

        {/* Quick Educator Action Buttons */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Educator Quick Actions</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <Link to="/teacher/attendance">
              <Button fullWidth variant="outline" icon={<CalendarCheck size={16} />}>
                Record Daily Attendance
              </Button>
            </Link>
            <Link to="/teacher/daily-updates">
              <Button fullWidth variant="outline" icon={<Clock size={16} />}>
                Log Meals, Naps & Play
              </Button>
            </Link>
            <Link to="/teacher/progress">
              <Button fullWidth variant="outline" icon={<TrendingUp size={16} />}>
                Evaluate Child Milestones
              </Button>
            </Link>
            <Link to="/teacher/students">
              <Button fullWidth variant="outline" icon={<GraduationCap size={16} />}>
                View Student Roster
              </Button>
            </Link>
          </div>
        </Card>

        {/* Roster Snapshot */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>
            Class Roster — {teacher?.assignedClassName}
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Student</th>
                  <th style={{ padding: '12px' }}>Admission No</th>
                  <th style={{ padding: '12px' }}>DOB</th>
                  <th style={{ padding: '12px' }}>Parent / Contact</th>
                  <th style={{ padding: '12px' }}>Emergency Contact</th>
                </tr>
              </thead>
              <tbody>
                {myStudents.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={student.photo || 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=200'}
                        alt={student.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <strong style={{ fontWeight: 700 }}>{student.name}</strong>
                    </td>
                    <td style={{ padding: '12px' }}>{student.admissionNumber}</td>
                    <td style={{ padding: '12px' }}>{student.dob}</td>
                    <td style={{ padding: '12px' }}>{student.parentName} ({student.parentMobile})</td>
                    <td style={{ padding: '12px', color: 'var(--color-accent-coral)', fontWeight: 600 }}>
                      {student.emergencyPhone}
                    </td>
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
