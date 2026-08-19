import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  FileText, 
  Users, 
  BookOpen, 
  CreditCard, 
  CalendarCheck, 
  Megaphone,
  Plus,
  Clock,
  DollarSign
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
    attendance,
    announcements 
  } = useData();

  // Metrics Calculations
  const totalStudents = students.length;
  const totalParents = parents.length;
  const totalTeachers = teachers.length;
  
  const newAdmissionsCount = applications.filter(a => a.status === 'Submitted').length;
  const pendingAdmissionsCount = applications.filter(a => a.status === 'Submitted' || a.status === 'Under Review').length;

  const totalFeesCollected = feePayments.filter(f => f.paymentStatus === 'PAID').reduce((sum, f) => sum + (f.paidAmount || f.totalAmount), 0);
  const pendingFeesTotal = feePayments.filter(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE').reduce((sum, f) => sum + f.pendingAmount, 0);

  const today = new Date().toISOString().split('T')[0];
  const todayAttendanceRecords = attendance.filter(a => a.date === today);
  const presentCount = todayAttendanceRecords.filter(a => a.status === 'Present').length;
  const absentCount = todayAttendanceRecords.filter(a => a.status === 'Absent' || a.status === 'Leave').length;
  const totalMarked = todayAttendanceRecords.length;
  const attendanceRate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 100;

  return (
    <DashboardLayout title="Admin Executive Dashboard & Operations Hub">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* 8 Required Overview Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.25rem' }}>
          {/* 1. Total Students */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Students
              </span>
              <GraduationCap color="#FF6B6B" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2D3142' }}>{totalStudents}</div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600 }}>Active Enrolled Pupils</div>
          </Card>

          {/* 2. Total Parents */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Parents
              </span>
              <Users color="#9B5DE5" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2D3142' }}>{totalParents}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Registered Accounts</div>
          </Card>

          {/* 3. Total Teachers */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Teachers
              </span>
              <BookOpen color="#06D6A0" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#2D3142' }}>{totalTeachers}</div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600 }}>100% Active Educators</div>
          </Card>

          {/* 4. New Admissions */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                New Admissions
              </span>
              <FileText color="#118AB2" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>{newAdmissionsCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#118AB2', fontWeight: 600 }}>Recently Submitted</div>
          </Card>

          {/* 5. Pending Admissions */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pending Admissions
              </span>
              <Clock color="#FFD93D" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#B78103' }}>{pendingAdmissionsCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#B78103', fontWeight: 600 }}>Awaiting Admin Action</div>
          </Card>

          {/* 6. Total Fees Collected */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Fees Collected
              </span>
              <DollarSign color="#06D6A0" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>${totalFeesCollected}</div>
            <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600 }}>Cleared Invoices</div>
          </Card>

          {/* 7. Pending Fees */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Pending Fees
              </span>
              <CreditCard color="#EE5253" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EE5253' }}>${pendingFeesTotal}</div>
            <div style={{ fontSize: '0.8rem', color: '#EE5253', fontWeight: 600 }}>Outstanding Balance</div>
          </Card>

          {/* 8. Today's Attendance */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Today's Attendance
              </span>
              <CalendarCheck color="#6A1B9A" size={20} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6A1B9A' }}>{attendanceRate}%</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{presentCount} Present / {totalMarked || totalStudents} Total</div>
          </Card>
        </div>

        {/* Quick Admin Actions Bar */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1rem', color: '#2D3142' }}>
            ⚡ Executive Quick Actions
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
            <Link to="/admin/students">
              <Button fullWidth variant="primary" icon={<Plus size={16} />}>
                Add New Student
              </Button>
            </Link>
            <Link to="/admin/admissions">
              <Button fullWidth variant="outline" icon={<FileText size={16} />}>
                Review Admissions ({pendingAdmissionsCount})
              </Button>
            </Link>
            <Link to="/admin/teachers">
              <Button fullWidth variant="outline" icon={<BookOpen size={16} />}>
                Manage Teachers
              </Button>
            </Link>
            <Link to="/admin/fees">
              <Button fullWidth variant="outline" icon={<CreditCard size={16} />}>
                Record Fee Payment
              </Button>
            </Link>
            <Link to="/admin/announcements">
              <Button fullWidth variant="accent" icon={<Megaphone size={16} />}>
                Post Announcement
              </Button>
            </Link>
          </div>
        </Card>

        {/* Grid Section: Recent Admissions & Recent Payments */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Recent Admissions */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent Admission Applications</h3>
              <Link to="/admin/admissions" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                View All →
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>App ID</th>
                    <th style={{ padding: '8px' }}>Child</th>
                    <th style={{ padding: '8px' }}>Program</th>
                    <th style={{ padding: '8px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 4).map(app => (
                    <tr key={app.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '8px', fontWeight: 700 }}>{app.id}</td>
                      <td style={{ padding: '8px', fontWeight: 700 }}>{app.childFullName}</td>
                      <td style={{ padding: '8px' }}>{app.applyingForProgram}</td>
                      <td style={{ padding: '8px' }}>
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            backgroundColor:
                              app.status === 'Approved' || app.status === 'Admitted'
                                ? 'rgba(6, 214, 160, 0.15)'
                                : app.status === 'Rejected'
                                ? 'rgba(238, 82, 83, 0.15)'
                                : 'rgba(255, 209, 102, 0.25)',
                            color:
                              app.status === 'Approved' || app.status === 'Admitted'
                                ? '#06D6A0'
                                : app.status === 'Rejected'
                                ? '#EE5253'
                                : '#B78103'
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

          {/* Recent Payments */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent Fee Transactions</h3>
              <Link to="/admin/fees" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                View All →
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                    <th style={{ padding: '8px' }}>Receipt</th>
                    <th style={{ padding: '8px' }}>Student</th>
                    <th style={{ padding: '8px' }}>Amount</th>
                    <th style={{ padding: '8px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feePayments.slice(0, 4).map(pay => (
                    <tr key={pay.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '8px', fontWeight: 700 }}>{pay.receiptNumber}</td>
                      <td style={{ padding: '8px' }}>{pay.studentName}</td>
                      <td style={{ padding: '8px', fontWeight: 700 }}>${pay.totalAmount}</td>
                      <td style={{ padding: '8px' }}>
                        <span
                          style={{
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            backgroundColor: pay.paymentStatus === 'PAID' ? 'rgba(6, 214, 160, 0.15)' : 'rgba(238, 82, 83, 0.15)',
                            color: pay.paymentStatus === 'PAID' ? '#06D6A0' : '#EE5253'
                          }}
                        >
                          {pay.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        {/* Section: Attendance Summary & Announcements */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          
          {/* Attendance Summary */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>School Attendance Overview</h3>
              <Link to="/admin/attendance" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                Detailed Logs →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Present Today</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#06D6A0' }}>{presentCount}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Absent / Leave</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#EE5253' }}>{absentCount}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>School Rate</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#6A1B9A' }}>{attendanceRate}%</div>
                </div>
              </div>

              {/* Progress Bar Indicator */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Daily Attendance Target</span>
                  <span>{attendanceRate}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${attendanceRate}%`, height: '100%', backgroundColor: '#06D6A0', borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Announcements */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Recent Announcements</h3>
              <Link to="/admin/announcements" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                Manage All →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {announcements.slice(0, 3).map(anc => (
                <div key={anc.id} style={{ padding: '10px 12px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid #6A1B9A' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#2D3142' }}>{anc.title}</strong>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: anc.status === 'Published' ? '#E6F9F5' : '#FFF9E6', color: anc.status === 'Published' ? '#06D6A0' : '#B78103' }}>
                      {anc.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Target: {anc.targetAudience} • {anc.date}
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </DashboardLayout>
  );
}
