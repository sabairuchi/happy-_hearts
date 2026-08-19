import { useState } from 'react';
import { Plus, Search, Filter, Edit, Eye, UserX, CheckCircle, BookOpen, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useData } from '../../context/DataContext';
import type { Teacher } from '../../types';

export default function AdminTeachers() {
  const { teachers, classes, addTeacher, updateTeacher, toggleTeacherStatus, deleteTeacher } = useData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals & Drawers
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [profileTeacher, setProfileTeacher] = useState<Teacher | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [experienceYears, setExperienceYears] = useState(3);
  const [assignedClassId, setAssignedClassId] = useState(classes[0]?.id || '');
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.qualification.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'Active' && t.isActive) ||
      (filterStatus === 'Inactive' && !t.isActive);
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingTeacher(null);
    setName('');
    setEmail('');
    setPhone('');
    setQualification('M.Ed in Early Childhood Education');
    setExperienceYears(4);
    setAssignedClassId(classes[0]?.id || '');
    setBio('');
    setPhoto('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400');
    setShowAddModal(true);
  };

  const openEditModal = (t: Teacher) => {
    setEditingTeacher(t);
    setName(t.name);
    setEmail(t.email);
    setPhone(t.phone);
    setQualification(t.qualification);
    setExperienceYears(t.experienceYears);
    setAssignedClassId(t.assignedClassId || classes[0]?.id || '');
    setBio(t.bio || '');
    setPhoto(t.photo || '');
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selClass = classes.find(c => c.id === assignedClassId);

    if (editingTeacher) {
      updateTeacher({
        ...editingTeacher,
        name,
        email,
        phone,
        qualification,
        experienceYears,
        assignedClassId,
        assignedClassName: selClass?.name || editingTeacher.assignedClassName,
        bio,
        photo: photo || editingTeacher.photo
      });
    } else {
      addTeacher({
        name,
        email,
        phone,
        photo: photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
        qualification,
        experienceYears,
        assignedClassId,
        assignedClassName: selClass?.name || 'Playgroup Sunshine',
        isActive: true,
        bio
      });
    }

    setShowAddModal(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteTeacher(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout title="Teachers Console & Educator Management">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Search, Filter & Add Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap', minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search teachers by name, email, or qualification..."
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
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Educator Statuses</option>
                <option value="Active">Active Staff</option>
                <option value="Inactive">Inactive Staff</option>
              </select>
            </div>
          </div>

          <Button variant="primary" icon={<Plus size={18} />} onClick={openAddModal}>
            Add New Educator
          </Button>
        </div>

        {/* Teachers Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filteredTeachers.length === 0 ? (
            <Card hoverEffect={false}>
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No teachers match search criteria.
              </div>
            </Card>
          ) : (
            filteredTeachers.map(teacher => (
              <Card key={teacher.id} hoverEffect={false}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                  <img
                    src={teacher.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
                    alt={teacher.name}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #06D6A0' }}
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>{teacher.name}</h3>
                    <div style={{ fontSize: '0.8rem', color: '#118AB2', fontWeight: 700, marginTop: '2px' }}>
                      {teacher.assignedClassName || 'Unassigned'}
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, backgroundColor: teacher.isActive ? 'rgba(6, 214, 160, 0.15)' : 'rgba(238, 82, 83, 0.15)', color: teacher.isActive ? '#06D6A0' : '#EE5253' }}>
                        {teacher.isActive ? 'Active Staff' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8F9FA', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                  <div><strong>Qualification:</strong> {teacher.qualification}</div>
                  <div><strong>Experience:</strong> {teacher.experienceYears} Years</div>
                  <div><strong>Contact:</strong> {teacher.email} • {teacher.phone}</div>
                  {teacher.bio && <div style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', marginTop: '4px' }}>"{teacher.bio}"</div>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                  <button
                    title="View Profile Details"
                    onClick={() => setProfileTeacher(teacher)}
                    style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#FFF', cursor: 'pointer' }}
                  >
                    <Eye size={15} color="#118AB2" />
                  </button>
                  <button
                    title="Edit Educator Profile"
                    onClick={() => openEditModal(teacher)}
                    style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#FFF', cursor: 'pointer' }}
                  >
                    <Edit size={15} color="#6A1B9A" />
                  </button>
                  <button
                    title={teacher.isActive ? 'Deactivate Educator' : 'Activate Educator'}
                    onClick={() => toggleTeacherStatus(teacher.id)}
                    style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#FFF', cursor: 'pointer' }}
                  >
                    {teacher.isActive ? <UserX size={15} color="#FF9F43" /> : <CheckCircle size={15} color="#06D6A0" />}
                  </button>
                  <button
                    title="Remove Educator Record"
                    onClick={() => setDeletingId(teacher.id)}
                    style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #FECDD3', backgroundColor: '#FFF1F2', cursor: 'pointer' }}
                  >
                    <Trash2 size={15} color="#EE5253" />
                  </button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Add / Edit Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '540px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <BookOpen color="#06D6A0" size={24} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  {editingTeacher ? `Edit Educator: ${editingTeacher.name}` : 'Add New Educator Profile'}
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name *</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Phone Number *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Qualification *</label>
                    <input type="text" required value={qualification} onChange={e => setQualification(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Experience (Years) *</label>
                    <input type="number" min={0} max={40} required value={experienceYears} onChange={e => setExperienceYears(Number(e.target.value))} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Program / Class *</label>
                  <select value={assignedClassId} onChange={e => setAssignedClassId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                    {classes.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.programType})</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Educator Bio / Philosophy</label>
                  <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="Specializations, teaching approach..." style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontFamily: 'inherit' }} />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">{editingTeacher ? 'Update Profile' : 'Save Educator'}</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Profile Drawer / Modal */}
        {profileTeacher && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '500px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem' }}>
                <img
                  src={profileTeacher.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
                  alt={profileTeacher.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #06D6A0' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{profileTeacher.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: '#118AB2', fontWeight: 700 }}>{profileTeacher.assignedClassName}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Joined: {profileTeacher.joinedDate}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div><strong>Qualification:</strong> {profileTeacher.qualification}</div>
                <div><strong>Experience:</strong> {profileTeacher.experienceYears} Years</div>
                <div><strong>Email:</strong> {profileTeacher.email}</div>
                <div><strong>Phone:</strong> {profileTeacher.phone}</div>
                {profileTeacher.bio && (
                  <div style={{ padding: '10px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)', fontStyle: 'italic' }}>
                    "{profileTeacher.bio}"
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="outline" onClick={() => setProfileTeacher(null)}>Close Profile</Button>
                <Button variant="primary" onClick={() => { const t = profileTeacher; setProfileTeacher(null); openEditModal(t); }}>Edit Educator</Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={!!deletingId}
          title="Delete Teacher Record"
          message="Are you sure you want to delete this teacher record? This action cannot be undone."
          variant="danger"
          confirmText="Delete Permanently"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      </div>
    </DashboardLayout>
  );
}
