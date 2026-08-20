import { useState, useEffect, useRef } from 'react';
import { Send, Smile } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ParentChat() {
  const { user } = useAuth();
  const { getParentChildren, teachers, chatMessages, sendChatMessage } = useData();

  const parentId = user?.parentId || user?.id || '';
  const myChildren = getParentChildren(parentId);

  // Identify unique teachers assigned to this parent's children
  const assignedTeachers = teachers.filter(t => 
    myChildren.some(c => c.teacherId === t.id)
  );

  const [activeTeacherId, setActiveTeacherId] = useState<string>(assignedTeachers[0]?.id || '');
  const activeTeacher = teachers.find(t => t.id === activeTeacherId) || assignedTeachers[0];

  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Filter messages between this parent and the active teacher
  const activeChat = chatMessages.filter(
    m =>
      (m.senderId === user?.id && m.receiverId === activeTeacher?.id) ||
      (m.senderId === activeTeacher?.id && m.receiverId === user?.id)
  );

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeTeacher || !user) return;

    const typedMessage = messageText.trim();
    setMessageText('');

    // Save message to context
    sendChatMessage(
      user.id,
      user.name,
      'PARENT',
      activeTeacher.id,
      activeTeacher.name,
      'TEACHER',
      typedMessage
    );

    // Trigger simulated teacher response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let responseText = "Thank you for your note! I will check on this and get back to you during class break. Have a great day!";
      
      const lowerMsg = typedMessage.toLowerCase();
      if (lowerMsg.includes('sick') || lowerMsg.includes('attendance') || lowerMsg.includes('absent') || lowerMsg.includes('leave')) {
        responseText = `Thank you for letting me know. I hope your child recovers quickly! I will make sure the attendance register reflects this. Let me know if they need any home exercises.`;
      } else if (lowerMsg.includes('progress') || lowerMsg.includes('report') || lowerMsg.includes('performance') || lowerMsg.includes('grade')) {
        responseText = `Your child is doing wonderful! They are very active during group games and sensory play. I will update the detailed progress report in your portal by next week.`;
      } else if (lowerMsg.includes('eat') || lowerMsg.includes('food') || lowerMsg.includes('lunch') || lowerMsg.includes('snack') || lowerMsg.includes('meal')) {
        responseText = `They have been eating very well! Today they finished their whole fruit bowl and drank all of their milk. I record all meals in the daily log!`;
      } else if (lowerMsg.includes('nap') || lowerMsg.includes('sleep') || lowerMsg.includes('rest')) {
        responseText = `Yes, they slept peacefully during the afternoon nap period (usually 1:00 PM to 2:20 PM) and woke up refreshed and cheerful!`;
      } else if (lowerMsg.includes('pick') || lowerMsg.includes('late') || lowerMsg.includes('bus')) {
        responseText = `Got it! I will make sure they are ready at the pickup lobby at the requested time. Thank you for notifying me!`;
      }

      sendChatMessage(
        activeTeacher.id,
        activeTeacher.name,
        'TEACHER',
        user.id,
        user.name,
        'PARENT',
        responseText
      );
    }, 1800);
  };

  return (
    <DashboardLayout title="Secure Teacher-Parent Chat Console">
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
        {/* Sidebar - Teachers List */}
        <div style={{ borderRight: '1px solid rgba(45,49,66,0.08)', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-primary)' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid rgba(45,49,66,0.08)', backgroundColor: '#FFF' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>My Childrens Teachers</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              Select a teacher to start a secure conversation
            </p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
            {assignedTeachers.length > 0 ? (
              assignedTeachers.map(teacher => {
                const isActive = teacher.id === activeTeacherId;
                const childForTeacher = myChildren.find(c => c.teacherId === teacher.id);
                return (
                  <button
                    key={teacher.id}
                    onClick={() => setActiveTeacherId(teacher.id)}
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
                      borderLeft: isActive ? '4px solid var(--color-accent-coral)' : '4px solid transparent',
                      boxShadow: isActive ? 'var(--shadow-sm)' : 'none'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent-sky)',
                        color: '#FFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        backgroundImage: `url(${teacher.photo})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {!teacher.photo && teacher.name[0]}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', display: 'block' }}>{teacher.name}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-accent-coral)', fontWeight: 600 }}>
                        {teacher.assignedClassName || 'Class Educator'}
                      </span>
                      {childForTeacher && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                          Child: {childForTeacher.name}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                No active class teachers assigned to your child profile yet.
              </div>
            )}
          </div>
        </div>

        {/* Chat Thread Panel */}
        {activeTeacher ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#FFF' }}>
            {/* Header info */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid rgba(45,49,66,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'rgba(255, 249, 240, 0.5)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src={activeTeacher.photo}
                  alt={activeTeacher.name}
                  style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid var(--color-accent-sky)' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{activeTeacher.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', gap: '8px' }}>
                    <span>{activeTeacher.qualification}</span>
                    <span>•</span>
                    <span style={{ color: '#06D6A0', fontWeight: 600 }}>Online</span>
                  </div>
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
                      {isMe ? 'You' : msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div
                      style={{
                        padding: '10px 15px',
                        borderRadius: 'var(--radius-sm)',
                        borderTopRightRadius: isMe ? '4px' : 'var(--radius-sm)',
                        borderTopLeftRadius: isMe ? 'var(--radius-sm)' : '4px',
                        backgroundColor: isMe ? 'var(--color-accent-coral)' : '#FFF',
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

              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '3px' }}>
                    {activeTeacher.name} is typing...
                  </span>
                  <div
                    style={{
                      padding: '10px 18px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#FFF',
                      boxShadow: 'var(--shadow-sm)',
                      display: 'flex',
                      gap: '4px',
                      alignItems: 'center',
                      width: '60px'
                    }}
                  >
                    <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulseGlow 1s infinite alternate' }}></span>
                    <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulseGlow 1s infinite alternate', animationDelay: '0.2s' }}></span>
                    <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulseGlow 1s infinite alternate', animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
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
                placeholder={`Send a secure message to ${activeTeacher.name}...`}
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-full)',
                  border: '1.5px solid rgba(45,49,66,0.12)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border 0.2s ease'
                }}
              />
              <Button type="submit" variant="primary" icon={<Send size={16} />} style={{ padding: '12px 20px', borderRadius: 'var(--radius-full)' }}>
                Send
              </Button>
            </form>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: 'var(--color-text-muted)' }}>
            <Smile size={44} color="var(--color-accent-coral)" style={{ marginBottom: '12px' }} />
            <h4 style={{ fontWeight: 700 }}>Choose a Conversation</h4>
            <p style={{ fontSize: '0.85rem' }}>Select a teacher from the left sidebar to start messaging.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
