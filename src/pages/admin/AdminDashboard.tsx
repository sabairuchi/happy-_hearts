import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  Users, 
  BookOpen, 
  CreditCard, 
  CalendarCheck, 
  Bell
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const { 
    students, 
    applications, 
    parents, 
    teachers, 
    feePayments, 
    attendance 
  } = useData();

  const pendingApps = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review');
  const pendingFeesCount = feePayments.filter(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE').length;

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  const presentCount = todayAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = todayAttendance.length > 0 ? Math.round((presentCount / todayAttendance.length) * 100) : 100;

  return (
    <DashboardLayout title="Admin Management Executive Dashboard">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* 7 Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Students</span>
              <GraduationCap color="#FF6B6B" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{students.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600 }}>Active in 4 Classes</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>New Applications</span>
              <FileText color="#118AB2" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>{applications.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#118AB2', fontWeight: 600 }}>{pendingApps.length} Needs Review</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Parents</span>
              <Users color="#9B5DE5" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{parents.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Registered Accounts</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Teachers</span>
              <BookOpen color="#06D6A0" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800 }}>{teachers.length}</div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600 }}>100% Active Staff</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Pending Fees</span>
              <CreditCard color="#EE5253" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EE5253' }}>{pendingFeesCount} Invoices</div>
            <div style={{ fontSize: '0.8rem', color: '#EE5253', fontWeight: 600 }}>Payment Pending</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Today's Attendance</span>
              <CalendarCheck color="#06D6A0" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>{attendanceRate}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>School-wide Rate</div>
          </Card>
        </div>

        {/* Quick Admin Navigation Grid */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Administrative Control Modules
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <Link to="/admin/admissions">
              <Button fullWidth variant="primary" icon={<FileText size={16} />}>
                Review Admissions ({pendingApps.length})
              </Button>
            </Link>
            <Link to="/admin/students">
              <Button fullWidth variant="outline" icon={<GraduationCap size={16} />}>
                Student Registry
              </Button>
            </Link>
            <Link to="/admin/teachers">
              <Button fullWidth variant="outline" icon={<BookOpen size={16} />}>
                Teacher Console & Add Staff
              </Button>
            </Link>
            <Link to="/admin/fees">
              <Button fullWidth variant="outline" icon={<CreditCard size={16} />}>
                Fee Structure & Payments
              </Button>
            </Link>
            <Link to="/admin/notifications">
              <Button fullWidth variant="accent" icon={<Bell size={16} />}>
                Broadcast Notification
              </Button>
            </Link>
          </div>
        </Card>

        {/* Recent Applications Requiring Action */}
        <Card hoverEffect={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Recent Admission Applications</h3>
            <Link to="/admin/admissions" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
              Manage All Applications →
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>App ID</th>
                  <th style={{ padding: '12px' }}>Child Name</th>
                  <th style={{ padding: '12px' }}>Program</th>
                  <th style={{ padding: '12px' }}>Parent / Phone</th>
                  <th style={{ padding: '12px' }}>Submitted</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 4).map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{app.id}</td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{app.childFullName}</td>
                    <td style={{ padding: '12px' }}>{app.applyingForProgram}</td>
                    <td style={{ padding: '12px' }}>{app.parentName} ({app.parentMobile})</td>
                    <td style={{ padding: '12px' }}>{app.submittedAt}</td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(255, 107, 107, 0.15)',
                          color: 'var(--color-accent-coral)'
                        }}
                      >
                        {app.status}
                      </span>
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
