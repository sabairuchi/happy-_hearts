import { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Eye, UserX, CheckCircle } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';
import type { Parent } from '../../types';

export default function AdminParents() {
  const { parents, students, addParent, updateParent, toggleParentStatus } = useData();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingParent, setEditingParent] = useState<Parent | null>(null);
  const [profileParent, setProfileParent] = useState<Parent | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [altPhone, setAltPhone] = useState('');
  const [relationship, setRelationship] = useState('Mother');
  const [occupation, setOccupation] = useState('');
  const [address, setAddress] = useState('');
  const [selectedChildrenIds, setSelectedChildrenIds] = useState<string[]>([]);

  const filteredParents = parents.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.mobile.toLowerCase().includes(search.toLowerCase());
    const isParentActive = p.isActive !== false;
    const matchesStatus =
      filterStatus === 'ALL' ||
      (filterStatus === 'Active' && isParentActive) ||
      (filterStatus === 'Inactive' && !isParentActive);
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    setEditingParent(null);
    setName('');
    setEmail('');
    setMobile('');
    setAltPhone('');
    setRelationship('Mother');
    setOccupation('');
    setAddress('');
    setSelectedChildrenIds([]);
    setShowAddModal(true);
  };

  const openEditModal = (parent: Parent) => {
    setEditingParent(parent);
    setName(parent.name);
    setEmail(parent.email);
    setMobile(parent.mobile);
    setAltPhone(parent.altPhone || '');
    setRelationship(parent.relationship);
    setOccupation(parent.occupation || '');
    setAddress(parent.address);
    setSelectedChildrenIds(parent.childrenIds || []);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    if (editingParent) {
      updateParent({
        ...editingParent,
        name,
        email,
        mobile,
        altPhone,
        relationship,
        occupation,
        address,
        childrenIds: selectedChildrenIds
      });
    } else {
      addParent({
        userId: `usr-prt-${Date.now()}`,
        name,
        email,
        mobile,
        altPhone,
        relationship,
        occupation,
        address,
        isActive: true
      });
    }

    setShowAddModal(false);
  };

  return (
    <DashboardLayout title="Parent Accounts Management & Family Links">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Search & Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap', minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search parents by name, email, or mobile..."
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
                <option value="ALL">All Account Statuses</option>
                <option value="Active">Active Accounts</option>
                <option value="Inactive">Deactivated Accounts</option>
              </select>
            </div>
          </div>

          <Button variant="primary" icon={<Plus size={18} />} onClick={openAddModal}>
            Register Parent Account
          </Button>
        </div>

        {/* Parents Table */}
        <Card hoverEffect={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Parent Name</th>
                  <th style={{ padding: '12px' }}>Contact Info</th>
                  <th style={{ padding: '12px' }}>Relationship & Occupation</th>
                  <th style={{ padding: '12px' }}>Linked Children</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No parent records match search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredParents.map(parent => {
                    const linkedChildren = students.filter(s => parent.childrenIds?.includes(s.id) || s.parentId === parent.id || s.parentEmail === parent.email);
                    const isActive = parent.isActive !== false;
                    return (
                      <tr key={parent.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                        <td style={{ padding: '12px', fontWeight: 700 }}>{parent.name}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: 600 }}>{parent.email}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{parent.mobile}</div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div>{parent.relationship}</div>
                          {parent.occupation && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{parent.occupation}</div>}
                        </td>
                        <td style={{ padding: '12px' }}>
                          {linkedChildren.length > 0 ? (
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {linkedChildren.map(c => (
                                <span key={c.id} style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', backgroundColor: 'rgba(155, 93, 229, 0.12)', color: '#9B5DE5', fontSize: '0.75rem', fontWeight: 700 }}>
                                  {c.name} ({c.className})
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>No children linked</span>
                          )}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span
                            style={{
                              padding: '4px 12px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              backgroundColor: isActive ? 'rgba(6, 214, 160, 0.15)' : 'rgba(238, 82, 83, 0.15)',
                              color: isActive ? '#06D6A0' : '#EE5253'
                            }}
                          >
                            {isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                            <button
                              title="View Parent Profile & Children"
                              onClick={() => setProfileParent(parent)}
                              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                            >
                              <Eye size={15} color="#118AB2" />
                            </button>
                            <button
                              title="Edit Parent Details"
                              onClick={() => openEditModal(parent)}
                              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                            >
                              <Edit size={15} color="#6A1B9A" />
                            </button>
                            <button
                              title={isActive ? 'Deactivate Parent Account' : 'Activate Parent Account'}
                              onClick={() => toggleParentStatus(parent.id)}
                              style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                            >
                              {isActive ? <UserX size={15} color="#FF9F43" /> : <CheckCircle size={15} color="#06D6A0" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Add / Edit Parent Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '560px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <Users color="#9B5DE5" size={24} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  {editingParent ? `Edit Parent: ${editingParent.name}` : 'Register New Parent Account'}
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Parent Full Name *</label>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address *</label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Mobile Phone *</label>
                    <input type="text" required value={mobile} onChange={e => setMobile(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Alternate Phone</label>
                    <input type="text" value={altPhone} onChange={e => setAltPhone(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Relationship *</label>
                    <select value={relationship} onChange={e => setRelationship(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Grandparent">Grandparent</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Occupation</label>
                    <input type="text" value={occupation} onChange={e => setOccupation(e.target.value)} placeholder="e.g. Software Engineer" style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Residential Address *</label>
                  <input type="text" required value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }} />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '6px' }}>Link Children Profiles</label>
                  <div style={{ maxHeight: '120px', overflowY: 'auto', border: '1.5px solid rgba(45,49,66,0.12)', borderRadius: 'var(--radius-sm)', padding: '8px' }}>
                    {students.map(std => (
                      <label key={std.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <input
                          type="checkbox"
                          checked={selectedChildrenIds.includes(std.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedChildrenIds(prev => [...prev, std.id]);
                            } else {
                              setSelectedChildrenIds(prev => prev.filter(id => id !== std.id));
                            }
                          }}
                        />
                        <span>{std.name} ({std.className})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
                  <Button variant="accent" type="submit">{editingParent ? 'Save Changes' : 'Register Parent'}</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Profile Drawer / Modal */}
        {profileParent && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '1rem' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#F3E8FF', color: '#9B5DE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 800 }}>
                  {profileParent.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>{profileParent.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{profileParent.relationship} • {profileParent.occupation || 'Parent Account'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <div><strong>Email:</strong> {profileParent.email}</div>
                <div><strong>Mobile Phone:</strong> {profileParent.mobile} {profileParent.altPhone ? `(Alt: ${profileParent.altPhone})` : ''}</div>
                <div><strong>Residential Address:</strong> {profileParent.address}</div>
                
                <div style={{ marginTop: '8px' }}>
                  <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}>Linked Children ({students.filter(s => profileParent.childrenIds?.includes(s.id) || s.parentId === profileParent.id).length}):</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {students.filter(s => profileParent.childrenIds?.includes(s.id) || s.parentId === profileParent.id).map(child => (
                      <div key={child.id} style={{ padding: '8px 12px', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ fontSize: '0.9rem' }}>{child.name}</strong>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Class: {child.className} • DOB: {child.dob}</div>
                        </div>
                        <span style={{ padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0' }}>
                          {child.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <Button variant="outline" onClick={() => setProfileParent(null)}>Close Profile</Button>
                <Button variant="accent" onClick={() => { const p = profileParent; setProfileParent(null); openEditModal(p); }}>Edit Account</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
}
