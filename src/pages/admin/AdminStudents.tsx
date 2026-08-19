import { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, UserX, Trash2, GraduationCap, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useData } from '../../context/DataContext';
import type { Student } from '../../types';

export default function AdminStudents() {
  const { students, classes, teachers, parents, addStudent, updateStudent, deleteStudent, toggleStudentStatus } = useData();

  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals & Drawers
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [profileStudent, setProfileStudent] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'Boy' | 'Girl' | 'Other'>('Boy');
  const [classId, setClassId] = useState(classes[0]?.id || '');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [parentId, setParentId] = useState(parents[0]?.id || '');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalNotes, setMedicalNotes] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive' | 'Graduated'>('Active');

  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber.toLowerCase().includes(search.toLowerCase()) ||
      s.parentName.toLowerCase().includes(search.toLowerCase());
    const matchesClass = filterClass === 'ALL' || s.classId === filterClass;
    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const openAddModal = () => {
    setEditingStudent(null);
    setName('');
    setDob('2023-01-15');
    setGender('Boy');
    setClassId(classes[0]?.id || '');
    setTeacherId(teachers[0]?.id || '');
    setParentId(parents[0]?.id || '');
    setEmergencyName('');
    setEmergencyPhone('');
    setMedicalNotes('');
    setStatus('Active');
    setShowAddModal(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setName(student.name);
    setDob(student.dob);
    setGender(student.gender);
    setClassId(student.classId);
    setTeacherId(student.teacherId);
    setParentId(student.parentId);
    setEmergencyName(student.emergencyName || '');
    setEmergencyPhone(student.emergencyPhone || '');
    setMedicalNotes(student.medicalNotes || '');
    setStatus(student.status);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selClass = classes.find(c => c.id === classId);
    const selTeacher = teachers.find(t => t.id === teacherId);
    const selParent = parents.find(p => p.id === parentId);

    if (editingStudent) {
      updateStudent({
        ...editingStudent,
        name,
        dob,
        gender,
        classId,
        className: selClass?.name || editingStudent.className,
        teacherId,
        teacherName: selTeacher?.name || editingStudent.teacherName,
        parentId,
        parentName: selParent?.name || editingStudent.parentName,
        parentEmail: selParent?.email || editingStudent.parentEmail,
        parentMobile: selParent?.mobile || editingStudent.parentMobile,
        emergencyName: emergencyName || selParent?.name || 'Emergency Contact',
        emergencyPhone: emergencyPhone || selParent?.mobile || '',
        medicalNotes,
        status
      });
    } else {
      addStudent({
        name,
        dob,
        gender,
        classId,
        className: selClass?.name || 'Playgroup Sunshine',
        teacherId,
        teacherName: selTeacher?.name || 'Sarah Jenkins',
        parentId,
        parentName: selParent?.name || 'Parent Guardian',
        parentEmail: selParent?.email || 'parent@happyhearts.com',
        parentMobile: selParent?.mobile || '+1 (555) 018-9922',
        emergencyName: emergencyName || selParent?.name || 'Emergency Contact',
        emergencyPhone: emergencyPhone || selParent?.mobile || '+1 (555) 018-9922',
        joiningDate: new Date().toISOString().split('T')[0],
        medicalNotes,
        status
      });
    }

    setShowAddModal(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteStudent(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout title="Central Student Registry & Student Profiles">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Search, Filter & Add Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap', minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search by student name, admission ID, or parent..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Filter size={16} color="var(--color-text-muted)" />
              <select
                value={filterClass}
                onChange={e => setFilterClass(e.target.value)}
                style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Classes / Programs</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>
          </div>

          <Button variant="primary" icon={<Plus size={18} />} onClick={openAddModal}>
            Add New Student
          </Button>
        </div>

        {/* Student Table */}
        <Card hoverEffect={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Student</th>
                  <th style={{ padding: '12px' }}>Admission ID</th>
                  <th style={{ padding: '12px' }}>Class / Program</th>
                  <th style={{ padding: '12px' }}>Educator</th>
                  <th style={{ padding: '12px' }}>Parent Link</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No students found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map(student => (
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
                            backgroundColor:
                              student.status === 'Active'
                                ? 'rgba(6, 214, 160, 0.15)'
                                : student.status === 'Graduated'
                                ? 'rgba(155, 93, 229, 0.15)'
                                : 'rgba(238, 82, 83, 0.15)',
                            color:
                              student.status === 'Active'
                                ? '#06D6A0'
                                : student.status === 'Graduated'
                                ? '#9B5DE5'
                                : '#EE5253'
                          }}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            title="View Profile"
                            onClick={() => setProfileStudent(student)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            <Eye size={15} color="#118AB2" />
                          </button>
                          <button
                            title="Edit Record"
                            onClick={() => openEditModal(student)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            <Edit size={15} color="#6A1B9A" />
                          </button>
                          <button
                            title={student.status === 'Active' ? 'Deactivate Student' : 'Activate Student'}
                            onClick={() => toggleStudentStatus(student.id, student.status === 'Active' ? 'Inactive' : 'Active')}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            {student.status === 'Active' ? <UserX size={15} color="#FF9F43" /> : <CheckCircle size={15} color="#06D6A0" />}
                          </button>
                          <button
                            title="Delete Student"
                            onClick={() => setDeletingId(student.id)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #FECDD3', backgroundColor: '#FFF1F2', cursor: 'pointer' }}
                          >
                            <Trash2 size={15} color="#EE5253" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add / Edit Student Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '560px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <GraduationCap color="#FF6B6B" size={24} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  {editingStudent ? `Edit Student: ${editingStudent.name}` : 'Add New Student Record'}
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
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
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Gender *</label>
                    <select value={gender} onChange={e => setGender(e.target.value as any)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      <option value="Boy">Boy</option>
                      <option value="Girl">Girl</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Enrollment Status *</label>
                    <select value={status} onChange={e => setStatus(e.target.value as any)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Graduated">Graduated</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Class / Program *</label>
                    <select value={classId} onChange={e => setClassId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Teacher *</label>
                    <select value={teacherId} onChange={e => setTeacherId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      {teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Link Parent Account *</label>
                  <select value={parentId} onChange={e => setParentId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                    {parents.map(p => <option key={p.id} value={p.id}>{p.name} ({p.email})</option>)}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Emergency Contact Name</label>
                    <input type="text" value={emergencyName} onChange={e => setEmergencyName(e.target.value)} placeholder="e.g. David Watson" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Emergency Contact Phone</label>
                    <input type="text" value={emergencyPhone} onChange={e => setEmergencyPhone(e.target.value)} placeholder="e.g. +1 (555) 018-9923" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Medical / Special Care Notes</label>
                  <textarea rows={3} value={medicalNotes} onChange={e => setMedicalNotes(e.target.value)} placeholder="Allergies, dietary requirements, or special observations..." style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">{editingStudent ? 'Update Profile' : 'Save Student'}</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Profile Drawer / Modal */}
        {profileStudent && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem' }}>
                <img
                  src={profileStudent.photo || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200'}
                  alt={profileStudent.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FF6B6B' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{profileStudent.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Admission Number: {profileStudent.admissionNumber}</div>
                  <div style={{ marginTop: '4px' }}>
                    <span style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0' }}>
                      {profileStudent.status}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div><strong>Class / Program:</strong> {profileStudent.className}</div>
                <div><strong>Assigned Teacher:</strong> {profileStudent.teacherName}</div>
                <div><strong>Date of Birth & Gender:</strong> {profileStudent.dob} ({profileStudent.gender})</div>
                <div><strong>Joined Date:</strong> {profileStudent.joiningDate}</div>
                <div style={{ padding: '10px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)' }}>
                  <strong>Linked Parent:</strong> {profileStudent.parentName} ({profileStudent.parentEmail} / {profileStudent.parentMobile})
                </div>
                <div style={{ padding: '10px', backgroundColor: '#FFF5F5', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #EE5253' }}>
                  <strong>Emergency Contact:</strong> {profileStudent.emergencyName} ({profileStudent.emergencyPhone})
                </div>
                {profileStudent.medicalNotes && (
                  <div style={{ padding: '10px', backgroundColor: '#FFF9E6', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #FFD93D' }}>
                    <strong>Medical Notes:</strong> {profileStudent.medicalNotes}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="outline" onClick={() => setProfileStudent(null)}>Close Profile</Button>
                <Button variant="primary" onClick={() => { const s = profileStudent; setProfileStudent(null); openEditModal(s); }}>Edit Profile</Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={!!deletingId}
          title="Delete Student Record"
          message="Are you sure you want to permanently delete this student record? This action cannot be undone."
          variant="danger"
          confirmText="Delete Record"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      </div>
    </DashboardLayout>
  );
}
