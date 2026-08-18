import { useState } from 'react';
import { Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';
import type { Teacher } from '../../types';

export default function AdminTeachers() {
  const { teachers, classes, addTeacher, updateTeacher } = useData();

  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('M.Ed Early Childhood');
  const [experienceYears] = useState(5);
  const [assignedClassId, setAssignedClassId] = useState(classes[0]?.id || 'cls-1');
  const [bio] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selClass = classes.find(c => c.id === assignedClassId);

    addTeacher({
      name,
      email,
      phone,
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
      qualification,
      experienceYears,
      assignedClassId,
      assignedClassName: selClass?.name || 'Playgroup Sunshine',
      isActive: true,
      bio
    });

    setShowAddModal(false);
    setName('');
  };

  const toggleTeacherStatus = (t: Teacher) => {
    updateTeacher({ ...t, isActive: !t.isActive });
  };

  return (
    <DashboardLayout title="Teachers Console & Educator Management">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" icon={<Plus size={18} />} onClick={() => setShowAddModal(true)}>
            Add New Teacher
          </Button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {teachers.map(t => (
            <Card key={t.id} hoverEffect={false}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                <img
                  src={t.photo || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'}
                  alt={t.name}
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent-coral)' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>{t.name}</h3>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-coral)', fontWeight: 700 }}>
                    {t.assignedClassName}
                  </div>
                </div>
                <button
                  onClick={() => toggleTeacherStatus(t)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.isActive ? '#06D6A0' : '#EE5253' }}
                  title="Toggle Active Status"
                >
                  {t.isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                </button>
              </div>

              <div style={{ backgroundColor: 'var(--color-bg-primary)', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div><strong>Qualification:</strong> {t.qualification}</div>
                <div><strong>Experience:</strong> {t.experienceYears} Years</div>
                <div><strong>Email:</strong> {t.email}</div>
                <div><strong>Phone:</strong> {t.phone}</div>
                {t.bio && <div style={{ fontStyle: 'italic', marginTop: '4px' }}>"{t.bio}"</div>}
              </div>
            </Card>
          ))}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem' }}>Add New Teacher</h3>

              <form onSubmit={handleAddSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name *</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Phone *</label>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Qualification *</label>
                    <input type="text" required value={qualification} onChange={e => setQualification(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Assign Class *</label>
                    <select value={assignedClassId} onChange={e => setAssignedClassId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button variant="primary" type="submit">Save Educator</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
