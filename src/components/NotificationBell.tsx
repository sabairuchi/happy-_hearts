import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

export const NotificationBell = () => {
  const { notifications, markNotificationRead } = useData();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Filter relevant notifications for current user role
  const userNotifications = notifications.filter(n => {
    if (!user) return false;
    if (user.role === 'ADMIN') return true;
    if (user.role === 'TEACHER') {
      return n.targetAudience === 'ALL' || n.targetAudience === 'TEACHERS';
    }
    if (user.role === 'PARENT') {
      return (
        n.targetAudience === 'ALL' ||
        n.targetAudience === 'ALL_PARENTS' ||
        (n.targetAudience === 'SPECIFIC_PARENT' && n.targetParentId === user.parentId)
      );
    }
    return false;
  });

  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'var(--color-bg-white)',
          border: '1px solid rgba(45, 49, 66, 0.12)',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--color-text-main)',
          boxShadow: 'var(--shadow-sm)'
        }}
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              backgroundColor: 'var(--color-accent-coral)',
              color: '#FFF',
              borderRadius: '999px',
              width: '18px',
              height: '18px',
              fontSize: '0.7rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '50px',
            width: '320px',
            backgroundColor: 'var(--color-bg-white)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(45, 49, 66, 0.08)',
            zIndex: 1000,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(45, 49, 66, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '0.95rem' }}>
              Notifications
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {unreadCount} unread
            </span>
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {userNotifications.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                No notifications right now.
              </div>
            ) : (
              userNotifications.slice(0, 5).map(n => (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(45, 49, 66, 0.04)',
                    backgroundColor: n.isRead ? 'transparent' : 'rgba(255, 107, 107, 0.05)',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent-coral)' }}>
                      {n.category}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{n.date}</span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-main)', marginBottom: '2px' }}>
                    {n.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.3' }}>
                    {n.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
