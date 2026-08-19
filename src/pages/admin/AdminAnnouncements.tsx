import { useState } from 'react';
import { Megaphone, Plus, Search, Filter, Trash2, Edit, Eye, CheckCircle2, EyeOff } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ConfirmationModal } from '../../components/ConfirmationModal';
import { useData } from '../../context/DataContext';
import type { Announcement } from '../../types';

export default function AdminAnnouncements() {
  const { announcements, classes, addAnnouncement, updateAnnouncement, deleteAnnouncement, togglePublishAnnouncement } = useData();

  const [search, setSearch] = useState('');
  const [filterAudience, setFilterAudience] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [viewingAnnouncement, setViewingAnnouncement] = useState<Announcement | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState<'All Parents' | 'Teachers' | 'Specific Program' | 'Everyone'>('Everyone');
  const [programName, setProgramName] = useState(classes[0]?.name || '');
  const [status, setStatus] = useState<'Published' | 'Draft' | 'Unpublished'>('Published');

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase());
    const matchesAudience = filterAudience === 'ALL' || a.targetAudience === filterAudience;
    const matchesStatus = filterStatus === 'ALL' || a.status === filterStatus;
    return matchesSearch && matchesAudience && matchesStatus;
  });

  const openCreate = () => {
    setEditingAnnouncement(null);
    setTitle('');
    setDescription('');
    setTargetAudience('Everyone');
    setProgramName(classes[0]?.name || '');
    setStatus('Published');
    setShowCreateModal(true);
  };

  const openEdit = (anc: Announcement) => {
    setEditingAnnouncement(anc);
    setTitle(anc.title);
    setDescription(anc.description);
    setTargetAudience(anc.targetAudience);
    setProgramName(anc.programName || classes[0]?.name || '');
    setStatus(anc.status);
    setShowCreateModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    if (editingAnnouncement) {
      updateAnnouncement({
        ...editingAnnouncement,
        title,
        description,
        targetAudience,
        programName: targetAudience === 'Specific Program' ? programName : undefined,
        status,
        publishedAt: status === 'Published' ? new Date().toISOString().split('T')[0] : editingAnnouncement.publishedAt
      });
    } else {
      addAnnouncement({
        title,
        description,
        targetAudience,
        programName: targetAudience === 'Specific Program' ? programName : undefined,
        status,
        author: 'Admin Director'
      });
    }

    setShowCreateModal(false);
  };

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteAnnouncement(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <DashboardLayout title="Announcements & Communication Management">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Top Action Bar & Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, flexWrap: 'wrap', minWidth: '280px' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search announcements by title or description..."
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
                value={filterAudience}
                onChange={e => setFilterAudience(e.target.value)}
                style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Audiences</option>
                <option value="Everyone">Everyone</option>
                <option value="All Parents">All Parents</option>
                <option value="Teachers">Teachers</option>
                <option value="Specific Program">Specific Program</option>
              </select>

              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                style={{ padding: '9px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontSize: '0.85rem' }}
              >
                <option value="ALL">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Unpublished">Unpublished</option>
              </select>
            </div>
          </div>

          <Button variant="primary" icon={<Plus size={18} />} onClick={openCreate}>
            Create Announcement
          </Button>
        </div>

        {/* Announcements Table */}
        <Card hoverEffect={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(45,49,66,0.08)', textAlign: 'left' }}>
                  <th style={{ padding: '12px' }}>Title & Content</th>
                  <th style={{ padding: '12px' }}>Target Audience</th>
                  <th style={{ padding: '12px' }}>Date</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAnnouncements.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      No announcements found matching the criteria.
                    </td>
                  </tr>
                ) : (
                  filteredAnnouncements.map(anc => (
                    <tr key={anc.id} style={{ borderBottom: '1px solid rgba(45,49,66,0.05)' }}>
                      <td style={{ padding: '12px', maxWidth: '320px' }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{anc.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {anc.description}
                        </div>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600, backgroundColor: '#EBF4FF', color: '#1E40AF' }}>
                          {anc.targetAudience} {anc.programName ? `(${anc.programName})` : ''}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '0.85rem' }}>{anc.date}</td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            backgroundColor:
                              anc.status === 'Published'
                                ? 'rgba(6, 214, 160, 0.15)'
                                : anc.status === 'Draft'
                                ? 'rgba(255, 209, 102, 0.25)'
                                : 'rgba(238, 82, 83, 0.15)',
                            color:
                              anc.status === 'Published'
                                ? '#06D6A0'
                                : anc.status === 'Draft'
                                ? '#B78103'
                                : '#EE5253'
                          }}
                        >
                          {anc.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            title={anc.status === 'Published' ? 'Unpublish' : 'Publish'}
                            onClick={() => togglePublishAnnouncement(anc.id)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            {anc.status === 'Published' ? <EyeOff size={15} color="#64748B" /> : <CheckCircle2 size={15} color="#06D6A0" />}
                          </button>
                          <button
                            title="View Announcement"
                            onClick={() => setViewingAnnouncement(anc)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            <Eye size={15} color="#118AB2" />
                          </button>
                          <button
                            title="Edit Announcement"
                            onClick={() => openEdit(anc)}
                            style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', cursor: 'pointer' }}
                          >
                            <Edit size={15} color="#6A1B9A" />
                          </button>
                          <button
                            title="Delete Announcement"
                            onClick={() => setDeletingId(anc.id)}
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

        {/* Create / Edit Modal */}
        {showCreateModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '580px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <Megaphone color="#6A1B9A" size={24} />
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0 }}>
                  {editingAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
                </h3>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Annual Sports & Family Fun Day 2026"
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Target Audience *</label>
                    <select
                      value={targetAudience}
                      onChange={e => setTargetAudience(e.target.value as any)}
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                    >
                      <option value="Everyone">Everyone</option>
                      <option value="All Parents">All Parents</option>
                      <option value="Teachers">Teachers</option>
                      <option value="Specific Program">Specific Program</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Publish Status *</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value as any)}
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                    >
                      <option value="Published">Published Now</option>
                      <option value="Draft">Save as Draft</option>
                      <option value="Unpublished">Unpublished</option>
                    </select>
                  </div>
                </div>

                {targetAudience === 'Specific Program' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Select Target Program *</label>
                    <select
                      value={programName}
                      onChange={e => setProgramName(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
                    >
                      {classes.map(c => (
                        <option key={c.id} value={c.name}>
                          {c.name} ({c.programType})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Description / Notice Details *</label>
                  <textarea
                    required
                    rows={5}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Write detailed announcement content here..."
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <Button variant="outline" type="button" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="accent" type="submit">
                    {editingAnnouncement ? 'Save Changes' : 'Post Announcement'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Modal */}
        {viewingAnnouncement && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(45,49,66,0.65)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(3px)' }}>
            <div style={{ backgroundColor: '#FFF', width: '100%', maxWidth: '520px', borderRadius: 'var(--radius-lg)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <span style={{ padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700, backgroundColor: '#EBF4FF', color: '#1E40AF' }}>
                    {viewingAnnouncement.targetAudience}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '8px' }}>{viewingAnnouncement.title}</h3>
                </div>
                <button onClick={() => setViewingAnnouncement(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>✕</button>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem' }}>
                Posted on {viewingAnnouncement.date} by {viewingAnnouncement.author}
              </div>

              <div style={{ padding: '1rem', backgroundColor: '#F8F9FA', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: '1.5rem' }}>
                {viewingAnnouncement.description}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="outline" onClick={() => setViewingAnnouncement(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={!!deletingId}
          title="Delete Announcement"
          message="Are you sure you want to permanently delete this announcement? This action cannot be undone."
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
