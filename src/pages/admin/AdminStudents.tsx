import { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';

export default function AdminStudents() {
  const { students, classes, teachers, parents, addStudent } = useData();

  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Add Form State
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender] = useState<'Boy' | 'Girl' | 'Other'>('Boy');
  const [classId, setClassId] = useState(classes[0]?.id || 'cls-1');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || 'tch-1');
  const [parentId, setParentId] = useState(parents[0]?.id || 'prt-1');
  const [emergencyName] = useState('');
  const [emergencyPhone] = useState('');
  const [medicalNotes] = useState('');

  const filteredStudents = students.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) || s.admissionNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selClass = classes.find(c => c.id === classId);
    const selTeacher = teachers.find(t => t.id === teacherId);
    const selParent = parents.find(p => p.id === parentId);

    addStudent({
      name,
      dob,
      gender,
      classId: classId,
      className: selClass?.name || 'Playgroup Sunshine',
      teacherId: teacherId,
      teacherName: selTeacher?.name || 'Sarah Jenkins',
      parentId: parentId,
      parentName: selParent?.name || 'Emily Watson',
      parentEmail: selParent?.email || 'parent@happyhearts.com',
      parentMobile: selParent?.mobile || '+1 (555) 018-9922',
      emergencyName: emergencyName || 'Parent Emergency',
      emergencyPhone: emergencyPhone || selParent?.mobile || '+1 (555) 018-9922',
      joiningDate: new Date().toISOString().split('T')[0],
      medicalNotes,
      status: 'Active'
    });

    setShowAddModal(false);
    setName('');
  };

  return (
    <DashboardLayout title="Central Student Registry & Profile Hub">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, maxWidth: '400px' }}>
            <input
              type="text"
              placeholder="Search student by name or admission number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1.5px solid rgba(45,49,66,0.12)',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <Button variant="primary" icon={<Plus size={18} />} onClick={() => setShowAddModal(true)}>
            Add New Student Record
          </Button>
        </div>

        <Card hoverEffect={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Student</th>
                  <th style={{ padding: '12px' }}>Admission ID</th>
                  <th style={{ padding: '12px' }}>Class / Program</th>
                  <th style={{ padding: '12px' }}>Assigned Educator</th>
                  <th style={{ padding: '12px' }}>Parent Link</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={student.photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'}
                        alt={student.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200';
                        }}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ fontWeight: 700 }}>{student.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>DOB: {student.dob} ({student.gender})</div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 700 }}>{student.admissionNumber}</td>
                    <td style={{ padding: '12px' }}>{student.className}</td>
                    <td style={{ padding: '12px' }}>{student.teacherName}</td>
                    <td style={{ padding: '12px' }}>
                      <div>{student.parentName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{student.parentMobile}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span
                        style={{
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          backgroundColor: 'rgba(6, 214, 160, 0.15)',
                          color: '#06D6A0'
                        }}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add Student Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '560px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add New Student Profile</h3>

              <form onSubmit={handleAddSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Child Full Name *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Date of Birth *</label>
                    <input type="date" required value={dob} onChange={e => setDob(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Class *</label>
                    <select value={classId} onChange={e => setClassId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Teacher *</label>
                    <select value={teacherId} onChange={e => setTeacherId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.assignedClassName})</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Link Parent Account *</label>
                  <select value={parentId} onChange={e => setParentId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                    {parents.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">Create Student</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
