import { useState } from 'react';
import { CalendarCheck, Search, Filter, Calendar, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';
import type { AttendanceStatus } from '../../types';

export default function AdminAttendance() {
  const { attendance, students, classes, markAttendanceBatch } = useData();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  // Batch Marking Modal State
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchClassId, setBatchClassId] = useState(classes[0]?.id || '');
  const [batchDate, setBatchDate] = useState(today);
  const [batchStatusMap, setBatchStatusMap] = useState<{ [studentId: string]: AttendanceStatus }>({});
  const [batchSuccess, setBatchSuccess] = useState('');

  // Attendance Records for selected date & filters
  const recordsForDate = attendance.filter(a => a.date === selectedDate);
  const presentCount = recordsForDate.filter(a => a.status === 'Present').length;
  const leaveCount = recordsForDate.filter(a => a.status === 'Leave').length;
  const absentCount = recordsForDate.filter(a => a.status === 'Absent').length;
  const totalMarked = recordsForDate.length;
  const attendanceRate = totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 100;

  const filteredLogs = attendance.filter(a => {
    const matchesDate = !selectedDate || a.date === selectedDate;
    const matchesClass = filterClass === 'ALL' || a.classId === filterClass;
    const matchesStatus = filterStatus === 'ALL' || a.status === filterStatus;
    const matchesSearch = a.studentName.toLowerCase().includes(search.toLowerCase());
    return matchesDate && matchesClass && matchesStatus && matchesSearch;
  });

  const openBatchMarkModal = () => {
    const selClassId = classes[0]?.id || '';
    setBatchClassId(selClassId);
    setBatchDate(today);

    // Prepopulate students of that class as Present
    const classStds = students.filter(s => s.classId === selClassId);
    const initialMap: { [studentId: string]: AttendanceStatus } = {};
    classStds.forEach(s => {
      initialMap[s.id] = 'Present';
    });
    setBatchStatusMap(initialMap);
    setShowBatchModal(true);
  };

  const handleClassChangeInBatch = (cId: string) => {
    setBatchClassId(cId);
    const classStds = students.filter(s => s.classId === cId);
    const updatedMap: { [studentId: string]: AttendanceStatus } = {};
    classStds.forEach(s => {
      updatedMap[s.id] = 'Present';
    });
    setBatchStatusMap(updatedMap);
  };

  const handleSaveBatchAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    const classStds = students.filter(s => s.classId === batchClassId);

    const records = classStds.map(s => ({
      date: batchDate,
      classId: batchClassId,
      studentId: s.id,
      studentName: s.name,
      status: batchStatusMap[s.id] || 'Present',
      markedByTeacherId: 'admin'
    }));

    markAttendanceBatch(records);
    setShowBatchModal(false);
    setBatchSuccess(`Attendance batch saved for ${records.length} students on ${batchDate}!`);
    setTimeout(() => setBatchSuccess(''), 3000);
  };

  return (
    <DashboardLayout title="School-wide Attendance Management & Analytics">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        
        {/* Today's Summary & Target Indicator */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Present Count
              </span>
              <CheckCircle2 color="#06D6A0" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06D6A0' }}>{presentCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>On Date: {selectedDate}</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Absent Count
              </span>
              <XCircle color="#EE5253" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#EE5253' }}>{absentCount}</div>
            <div style={{ fontSize: '0.8rem', color: '#EE5253', fontWeight: 600 }}>Unexcused Absences</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Approved Leaves
              </span>
              <Clock color="#118AB2" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#118AB2' }}>{leaveCount}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Excused Absence</div>
          </Card>

          <Card hoverEffect={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Attendance Rate
              </span>
              <CalendarCheck color="#6A1B9A" size={22} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6A1B9A' }}>{attendanceRate}%</div>
            
            {/* Progress Indicator */}
            <div style={{ marginTop: '6px', width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: `${attendanceRate}%`, height: '100%', backgroundColor: '#06D6A0', borderRadius: 'var(--radius-full)' }} />
            </div>
          </Card>
        </div>

        {batchSuccess && (
          <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0', padding: '12px 16px', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
            ✓ {batchSuccess}
          </div>
        )}

        {/* Master Attendance Log Table */}
        <Card hoverEffect={false}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', flex: 1 }}>
              <div style={{ position: 'relative', minWidth: '200px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search student name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px 8px 36px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar size={16} color="var(--color-text-muted)" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Filter size={16} color="var(--color-text-muted)" />
                <select
                  value={filterClass}
                  onChange={e => setFilterClass(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
                >
                  <option value="ALL">All Classes / Programs</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>

                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Leave">Leave</option>
                </select>
              </div>
            </div>

            <Button variant="primary" icon={<Plus size={16} />} onClick={openBatchMarkModal}>
              Mark Batch Attendance
            </Button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Student Name</th>
                  <th style={{ padding: '12px' }}>Attendance Status</th>
                  <th style={{ padding: '12px' }}>Remarks / Reason</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No attendance logs recorded for selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '12px', fontWeight: 600 }}>{log.date}</td>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{log.studentName}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor:
                              log.status === 'Present'
                                ? 'rgba(6, 214, 160, 0.15)'
                                : log.status === 'Leave'
                                ? 'rgba(17, 138, 178, 0.15)'
                                : 'rgba(238, 82, 83, 0.15)',
                            color:
                              log.status === 'Present'
                                ? '#06D6A0'
                                : log.status === 'Leave'
                                ? '#118AB2'
                                : '#EE5253'
                          }}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', color: 'var(--color-text-muted)' }}>{log.remarks || 'Standard Check-in'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Batch Mark Attendance Modal */}
        {showBatchModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '580px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <CalendarCheck color="#6A1B9A" size={24} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>Mark Class Attendance Batch</h3>
              </div>

              <form onSubmit={handleSaveBatchAttendance}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Select Class *</label>
                    <select value={batchClassId} onChange={e => handleClassChangeInBatch(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Attendance Date *</label>
                    <input type="date" required value={batchDate} onChange={e => setBatchDate(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Student Attendance List:</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
                    {students.filter(s => s.classId === batchClassId).length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-muted)' }}>No students enrolled in this class.</div>
                    ) : (
                      students.filter(s => s.classId === batchClassId).map(student => (
                        <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{student.name}</span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {(['Present', 'Absent', 'Leave'] as AttendanceStatus[]).map(st => (
                              <label key={st} style={{ fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
                                <input
                                  type="radio"
                                  name={`att-${student.id}`}
                                  checked={(batchStatusMap[student.id] || 'Present') === st}
                                  onChange={() => setBatchStatusMap(prev => ({ ...prev, [student.id]: st }))}
                                  style={{ marginRight: '4px' }}
                                />
                                {st}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setShowBatchModal(false)}>Cancel</Button>
                  <Button variant="accent" type="submit">Save Attendance Batch</Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
