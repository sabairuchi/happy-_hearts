import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  CalendarCheck, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  AlertCircle
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { PaymentModal } from '../../components/PaymentModal';
import type { FeePayment } from '../../types';

export default function ParentDashboard() {
  const { user } = useAuth();
  const { getParentChildren, feePayments, attendance, dailyUpdates, progressReports } = useData();

  const parentId = user?.parentId || user?.id || 'prt-1';
  const myChildren = getParentChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState<string>(myChildren[0]?.id || 'std-1');

  const selectedChild = myChildren.find(c => c.id === selectedChildId) || myChildren[0];

  const childFees = feePayments.filter(f => f.studentId === selectedChild?.id);
  const pendingFee = childFees.find(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE');

  const childAttendance = attendance.filter(a => a.studentId === selectedChild?.id);
  const presentDays = childAttendance.filter(a => a.status === 'Present').length;
  const attendanceRate = childAttendance.length > 0 ? Math.round((presentDays / childAttendance.length) * 100) : 100;

  const latestUpdate = dailyUpdates.find(u => u.studentId === selectedChild?.id);
  const latestProgress = progressReports.find(p => p.studentId === selectedChild?.id);

  const [payModalFee, setPayModalFee] = useState<FeePayment | null>(null);

  return (
    <DashboardLayout title="Parent Overview">
      {/* Multi-Child Selector Banner */}
      {myChildren.length > 1 && (
        <div
          style={{
            backgroundColor: 'var(--color-bg-white)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users color="#FF6B6B" size={22} />
            <div>
              <strong style={{ fontSize: '0.95rem' }}>Select Child Profile:</strong>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                You have {myChildren.length} children enrolled at Happy Hearts
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {myChildren.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChildId(child.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  backgroundColor: selectedChildId === child.id ? 'var(--color-accent-coral)' : 'var(--color-bg-secondary)',
                  color: selectedChildId === child.id ? '#FFF' : 'var(--color-text-main)',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {child.name} ({child.className})
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedChild && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Hero Card for Selected Child */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF5E6 0%, #FFFFFF 100%)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.75rem',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid rgba(255, 107, 107, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <img
                src={selectedChild.photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400'}
                alt={selectedChild.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400';
                }}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--color-accent-coral)'
                }}
              />
              <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-accent-coral)', textTransform: 'uppercase' }}>
                  Enrolled Student
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{selectedChild.name}</h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                  <span>Class: <strong>{selectedChild.className}</strong></span>
                  <span>•</span>
                  <span>Teacher: <strong>{selectedChild.teacherName}</strong></span>
                  <span>•</span>
                  <span>Admission ID: <strong>{selectedChild.admissionNumber}</strong></span>
                </div>
              </div>
            </div>

            <Link to="/parent/children">
              <Button variant="outline" size="sm" icon={<ChevronRight size={16} />}>
                View Child Profile
              </Button>
            </Link>
          </div>

          {/* Quick Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <Card hoverEffect={false}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Attendance Rate</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(6, 214, 160, 0.12)', color: '#06D6A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CalendarCheck size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{attendanceRate}%</div>
              <div style={{ fontSize: '0.8rem', color: '#06D6A0', fontWeight: 600, marginTop: '4px' }}>
                {presentDays} of {childAttendance.length || 1} sessions attended
              </div>
            </Card>

            <Card hoverEffect={false}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Fee Status</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: pendingFee ? 'rgba(238, 82, 83, 0.12)' : 'rgba(6, 214, 160, 0.12)', color: pendingFee ? '#EE5253' : '#06D6A0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: pendingFee ? '#EE5253' : '#06D6A0' }}>
                {pendingFee ? `$${pendingFee.pendingAmount}` : 'Clear ($0)'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                {pendingFee ? `Due on ${pendingFee.dueDate}` : 'All dues paid for August'}
              </div>
            </Card>

            <Card hoverEffect={false}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Latest Progress</span>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(17, 138, 178, 0.12)', color: '#118AB2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#118AB2' }}>
                {latestProgress ? latestProgress.communication : 'Excellent'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                Term 1 Overall Evaluation
              </div>
            </Card>
          </div>

          {/* Pending Fee Banner if applicable */}
          {pendingFee && (
            <div
              style={{
                backgroundColor: 'rgba(255, 107, 107, 0.08)',
                borderLeft: '5px solid var(--color-accent-coral)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertCircle color="#EE5253" size={24} />
                <div>
                  <strong style={{ fontSize: '1rem', color: '#EE5253' }}>Pending Tuition & Activity Fee</strong>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                    ${pendingFee.pendingAmount} due for {pendingFee.monthYear} by {pendingFee.dueDate}
                  </div>
                </div>
              </div>
              <Button variant="primary" size="sm" onClick={() => setPayModalFee(pendingFee)}>
                Pay Online Now (${pendingFee.pendingAmount})
              </Button>
            </div>
          )}

          {/* Daily Log Snapshot */}
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock color="#118AB2" size={20} /> Today's Crèche & Classroom Activities
              </h3>
              <Link to="/parent/daily-updates" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-accent-coral)' }}>
                View Full Log →
              </Link>
            </div>

            {latestUpdate ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', background: 'var(--color-bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Activities Done</span>
                  <ul style={{ listStyle: 'disc', paddingLeft: '1.2rem', marginTop: '6px', fontSize: '0.85rem' }}>
                    {latestUpdate.todayActivities.map((act, i) => <li key={i}>{act}</li>)}
                  </ul>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Meals & Snacks</span>
                  <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>{latestUpdate.mealsSnacks}</p>
                  
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', display: 'block', marginTop: '12px' }}>Nap & Rest</span>
                  <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>{latestUpdate.napRestTime}</p>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Teacher Remarks</span>
                  <p style={{ fontSize: '0.85rem', marginTop: '6px', fontStyle: 'italic', color: 'var(--color-text-main)' }}>
                    "{latestUpdate.teacherRemarks}"
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                No activity log recorded for today yet.
              </div>
            )}
          </Card>
        </div>
      )}

      {payModalFee && (
        <PaymentModal
          payment={payModalFee}
          onClose={() => setPayModalFee(null)}
          onSuccess={() => setPayModalFee(null)}
        />
      )}
    </DashboardLayout>
  );
}
