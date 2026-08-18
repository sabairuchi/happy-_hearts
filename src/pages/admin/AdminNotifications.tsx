import { useState } from 'react';
import { Send } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { useData } from '../../context/DataContext';

export default function AdminNotifications() {
  const { broadcastNotification, notifications } = useData();

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<'Admission' | 'Fee Reminder' | 'Holiday' | 'Event' | 'PTM' | 'Notice' | 'General'>('Event');
  const [targetAudience, setTargetAudience] = useState<'ALL_PARENTS' | 'TEACHERS' | 'ALL'>('ALL_PARENTS');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    broadcastNotification({
      title,
      message,
      category,
      targetAudience,
      createdBy: 'Admin Director'
    });

    setSentSuccess(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSentSuccess(false), 2000);
  };

  return (
    <DashboardLayout title="Notification & Announcement Broadcast Console">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Create Broadcast */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Compose & Send Announcement
          </h3>

          {sentSuccess && (
            <div style={{ backgroundColor: 'rgba(6, 214, 160, 0.15)', color: '#06D6A0', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', fontWeight: 700 }}>
              Announcement broadcasted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Notice Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Grand Parents Day Celebration"
                value={title}
                onChange={e => setTitle(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Category *
                </label>
                <select value={category} onChange={e => setCategory(e.target.value as any)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                  <option value="Event">Event</option>
                  <option value="Fee Reminder">Fee Reminder</option>
                  <option value="Holiday">Holiday Announcement</option>
                  <option value="PTM">Parent-Teacher Meeting</option>
                  <option value="Notice">School Notice</option>
                  <option value="Admission">Admission Update</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                  Target Audience *
                </label>
                <select value={targetAudience} onChange={e => setTargetAudience(e.target.value as any)} style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}>
                  <option value="ALL_PARENTS">All Registered Parents</option>
                  <option value="TEACHERS">Educators & Teaching Staff</option>
                  <option value="ALL">Entire School Community</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Notice Content Message *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Enter detailed notice message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid rgba(45,49,66,0.12)' }}
              />
            </div>

            <Button variant="primary" type="submit" icon={<Send size={16} />}>
              Broadcast Notification
            </Button>
          </form>
        </Card>

        {/* Sent History */}
        <Card hoverEffect={false}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem' }}>
            Broadcast History
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '500px', overflowY: 'auto' }}>
            {notifications.map(n => (
              <div key={n.id} style={{ backgroundColor: 'var(--color-bg-primary)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>{n.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{n.date}</span>
                </div>
                <strong style={{ fontSize: '0.95rem' }}>{n.title}</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{n.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
