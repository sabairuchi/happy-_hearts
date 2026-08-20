import { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function TeacherChat() {
  const { user } = useAuth();
  const { students, parents, chatMessages, sendChatMessage } = useData();

  const teacherId = user?.teacherId || '';

  // Get active students assigned to this teacher
  const teacherStudents = students.filter(s => s.teacherId === teacherId);

  // Identify unique parent records for these students
  const teacherParents = parents.filter(p =>
    teacherStudents.some(s => s.parentId === p.id || s.parentEmail.toLowerCase() === p.email.toLowerCase())
  );

  const [activeParentId, setActiveParentId] = useState<string>(teacherParents[0]?.id || '');
  const activeParent = parents.find(p => p.id === activeParentId) || teacherParents[0];

  // Map parent user object to chat sender/receiver IDs
  // In AuthContext, a parent user has id like `usr-parent-1` and parentId like `prt-1`.
  // The DataContext initialParent lists email and mobile matching usr-parent-1.
  // We need to resolve the User ID of the parent to map chat messages.
  // Let's resolve parent user record by matching email.
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // We find parent user ID by email to match sender/receiver references
  const parentEmail = activeParent?.email.toLowerCase();
  
  // Hardcoded mapping for demo users, fallback based on pattern
  const parentUserId = parentEmail === 'parent@happyhearts.com' ? 'usr-parent-1' : 
                       (parentEmail === 'robert.g@happyhearts.com' ? 'usr-parent-2' : `usr-${activeParent?.id}`);

  // Filter messages between this teacher and the active parent
  const activeChat = chatMessages.filter(
    m =>
      (m.senderId === teacherId && m.receiverId === parentUserId) ||
      (m.senderId === parentUserId && m.receiverId === teacherId)
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeParent || !user) return;

    const typedMessage = messageText.trim();
    setMessageText('');

    sendChatMessage(
      teacherId,
      user.name,
      'TEACHER',
      parentUserId,
      activeParent.name,
      'PARENT',
      typedMessage
    );
  };

  return (
    <DashboardLayout title="Parent Communication Portal">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '1.25rem',
          height: 'calc(100vh - 150px)',
          backgroundColor: '#FFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          border: '1px solid rgba(45,49,66,0.08)'
        }}
      >
        {/* Sidebar - Parents List */}
        <div style={{ borderRight: '1px solid rgba(45,49,66,0.08)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(45,49,66,0.08)', backgroundColor: '#FFF' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Student Parents</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Select a parent to start messaging
            </p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {teacherParents.length > 0 ? (
              teacherParents.map(parent => {
                const isActive = parent.id === activeParentId;
                const childOfParent = teacherStudents.find(s => s.parentId === parent.id || s.parentEmail.toLowerCase() === parent.email.toLowerCase());
                return (
                  <button
                    key={parent.id}
                    onClick={() => setActiveParentId(parent.id)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      backgroundColor: isActive ? 'var(--color-bg-white)' : 'transparent',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      marginBottom: '4px',
                      borderLeft: isActive ? '4px solid var(--color-accent-sky)' : '4px solid transparent',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent-coral)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700
                      }}
                    >
                      {parent.name[0]}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', display: 'block' }}>{parent.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Relation: {parent.relationship}
                      </span>
                      {childOfParent && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-accent-sky)', fontWeight: 600 }}>
                          Student: {childOfParent.name}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                No parent records found for your assigned students.
              </div>
            )}
          </div>
        </div>

        {/* Chat Thread Panel */}
        {activeParent ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFF' }}>
            {/* Header info */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(45,49,66,0.08)',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 249, 240, 0.5)'
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{activeParent.name}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', gap: '8px' }}>
                  <span>{activeParent.mobile}</span>
                  <span>•</span>
                  <span>{activeParent.email}</span>
                </div>
              </div>
            </div>

            {/* Chat history list */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-bg-primary)' }}>
              {activeChat.map((msg) => {
                const isMe = msg.senderId === user?.id;
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMe ? 'flex-end' : 'flex-start',
                      maxWidth: '75%',
                      alignSelf: isMe ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '3px', padding: '0 4px' }}>
                      {isMe ? 'You (Teacher)' : msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div
                      style={{
                        padding: '10px 15px',
                        borderRadius: 'var(--radius-sm)',
                        borderTopRightRadius: isMe ? '4px' : 'var(--radius-sm)',
                        borderTopLeftRadius: isMe ? 'var(--radius-sm)' : '4px',
                        backgroundColor: isMe ? 'var(--color-accent-sky)' : '#FFF',
                        color: isMe ? '#FFF' : 'var(--color-text-main)',
                        fontSize: '0.9rem',
                        boxShadow: 'var(--shadow-sm)',
                        lineHeight: '1.4'
                      }}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={handleSendMessage}
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid rgba(45,49,66,0.08)',
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                backgroundColor: '#FFF'
              }}
            >
              <input
                type="text"
                placeholder={`Type a reply to ${activeParent.name}...`}
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <Button type="submit" variant="primary" icon={<Send size={16} />} style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)' }}>
                Send Reply
              </Button>
            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-text-muted)' }}>
            <Smile size={44} color="var(--color-accent-sky)" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontWeight: 700 }}>Select a Conversation</h4>
            <p style={{ fontSize: '0.85rem' }}>Select a parent from the left sidebar to communicate with them.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
