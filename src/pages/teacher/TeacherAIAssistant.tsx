import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function TeacherAIAssistant() {
  const { user } = useAuth();
  const { students, teachers, attendance, announcements } = useData();

  const teacherId = user?.teacherId || user?.id || '';
  const teacherDetails = teachers.find(t => t.id === teacherId || t.email.toLowerCase() === user?.email.toLowerCase());
  const assignedClass = teacherDetails?.assignedClassName || 'Preschool Class';

  // Get students assigned to this teacher
  const classStudents = students.filter(s => s.teacherId === teacherId || s.className === assignedClass);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Hello ${user?.name || 'Educator'}! 🌸 Welcome to your Happy Hearts AI Teaching Assistant.\n\nI can assist you with:\n- 📋 **Classroom Roster & Health Notes**: Student profiles, allergies, and emergency contacts\n- 🎨 **Creative Lesson Planning**: Montessori-inspired sensory play, art, and motor exercises\n- 📝 **Report Card Remarks**: Constructive, encouraging feedback for developmental reports\n- 📊 **Attendance & Daily Logs**: Quick summaries of today's attendance, meals, and naps\n\nWhat would you like assistance with today?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getAIResponseText = (query: string): string => {
    const cleanQuery = query.toLowerCase();

    // 1. Lesson Planning / Curriculum / Activity ideas
    if (
      cleanQuery.includes('lesson') ||
      cleanQuery.includes('plan') ||
      cleanQuery.includes('activity') ||
      cleanQuery.includes('art') ||
      cleanQuery.includes('sensory') ||
      cleanQuery.includes('game') ||
      cleanQuery.includes('play') ||
      cleanQuery.includes('motor') ||
      cleanQuery.includes('craft')
    ) {
      if (cleanQuery.includes('sensory') || cleanQuery.includes('paint') || cleanQuery.includes('art')) {
        return `🎨 **Montessori Sensory & Finger-Painting Activity Plan**\n\n**Age Group**: ${assignedClass} (Toddler & Playgroup)\n**Focus**: Fine motor control, color recognition, tactile exploration\n\n**1. Circle Time Introduction (10 mins)**:\n• Gather students on the sensory rug.\n• Sing the "Rainbow Brush" welcome song and show yellow, blue, and coral paint bottles.\n\n**2. Tactile Exploration (20 mins)**:\n• Place non-toxic washable finger paints on textured cards.\n• Encourage children to mix colors using palms and fingertips.\n\n**3. Clean-Up Routine & Songs (10 mins)**:\n• Sing the "Washy Washy Hands" transition melody.\n\n**Teacher Tip**: Have extra smocks ready and keep damp wipes within arm's reach!`;
      }

      if (cleanQuery.includes('motor') || cleanQuery.includes('outdoor') || cleanQuery.includes('game')) {
        return `🏃 **Gross Motor & Coordination Activity Plan**\n\n**Program**: ${assignedClass}\n**Duration**: 30 Minutes\n\n**Activities**:\n1. **Animal Hop & Freeze**: Imitate frogs, bunnies, and flamingos. Helps balance and auditory response.\n2. **Soft Obstacle Path**: Step over soft foam cylinders and walk through balance ribbons.\n3. **Balloon Catch**: Keep soft balloons afloat using hands and feet.\n\n**Safety Note**: Ensure rubber mats are spaced evenly to cushion active play.`;
      }

      return `📚 **Preschool Curriculum Lesson Plan Template**\n\n**Classroom**: ${assignedClass}\n\n• **Morning Welcome & Rhyme Time** (15m): Alphabet phonics and counting rhymes\n• **Sensory/Fine Motor Stations** (30m): Kinetic sand, wooden shape sorting, threading beads\n• **Snack & Hydration Break** (20m): Organic fruits and whole milk\n• **Story Circle** (20m): Interactive picture book reading with expressive hand puppets\n• **Free Play & Observation** (25m): Peer socialization and teacher notes logging\n\nFeel free to ask for variations in theme (nature, colors, community helpers)!`;
    }

    // 2. Report Card Remarks Generator / Feedback
    if (
      cleanQuery.includes('remark') ||
      cleanQuery.includes('comment') ||
      cleanQuery.includes('feedback') ||
      cleanQuery.includes('report') ||
      cleanQuery.includes('evaluation')
    ) {
      return `✍️ **Child Developmental Report Remarks Generator**\n\nHere are tailored feedback snippets you can adapt for student progress reports:\n\n**For Social & Emotional Development**:\n• *"Shows remarkable empathy and shares playgroup toys eagerly with peers. Enthusiastically participates in morning circle time songs."*\n\n**For Cognitive & Problem Solving**:\n• *"Demonstrates great curiosity during sensory play and shows great dexterity when completing wooden block puzzles independently."*\n\n**For Language & Communication**:\n• *"Expresses needs clearly using expanding vocabulary and loves engaging in interactive storytelling sessions."*\n\n**For Shy or Transitioning Children**:\n• *"Transitioning comfortably into classroom routines. Blossoming in confidence during small-group artistic activities."*`;
    }

    // 3. Allergies & Medical Notes
    if (
      cleanQuery.includes('allergy') ||
      cleanQuery.includes('medical') ||
      cleanQuery.includes('diet') ||
      cleanQuery.includes('health') ||
      cleanQuery.includes('safe')
    ) {
      const allergicKids = classStudents.filter(s => s.medicalNotes && s.medicalNotes.toLowerCase() !== 'none' && s.medicalNotes.toLowerCase() !== 'n/a');
      if (allergicKids.length === 0) {
        return `✅ **Medical & Allergy Audit for ${assignedClass}**:\nNo active dietary restrictions or allergy alerts recorded for enrolled students in your class.`;
      }
      let resp = `⚠️ **Medical & Dietary Alerts for ${assignedClass}**:\n`;
      allergicKids.forEach(k => {
        resp += `\n• **${k.name}** (Adm: ${k.admissionNumber}):\n  - Notes: ${k.medicalNotes}\n  - Emergency Contact: ${k.emergencyName} (${k.emergencyPhone})`;
      });
      return resp;
    }

    // 4. Student Roster & Specific Inquiries
    if (
      cleanQuery.includes('student') ||
      cleanQuery.includes('roster') ||
      cleanQuery.includes('who is') ||
      cleanQuery.includes('class list') ||
      cleanQuery.includes('kids') ||
      cleanQuery.includes('pupil')
    ) {
      if (classStudents.length === 0) {
        return `You currently have 0 enrolled students assigned to ${assignedClass}.`;
      }
      let resp = `📋 **Enrolled Students Roster — ${assignedClass} (${classStudents.length} Students)**:\n`;
      classStudents.forEach((s, idx) => {
        resp += `\n${idx + 1}. **${s.name}** (Adm: ${s.admissionNumber})\n   • DOB: ${s.dob} | Gender: ${s.gender}\n   • Parent: ${s.parentName} (${s.parentMobile})\n   • Status: ${s.status}`;
      });
      return resp;
    }

    // 5. Today's Attendance
    if (
      cleanQuery.includes('attendance') ||
      cleanQuery.includes('absent') ||
      cleanQuery.includes('present')
    ) {
      const today = new Date().toISOString().split('T')[0];
      const todayRecords = attendance.filter(a => classStudents.some(s => s.id === a.studentId) && a.date === today);
      const presentKids = todayRecords.filter(r => r.status === 'Present');
      const absentKids = todayRecords.filter(r => r.status === 'Absent');
      const leaveKids = todayRecords.filter(r => r.status === 'Leave');

      let resp = `📊 **Today's Attendance for ${assignedClass}**:\n`;
      resp += `• Enrolled Class Strength: ${classStudents.length}\n`;
      resp += `• Present: ${presentKids.length}\n`;
      resp += `• Absent: ${absentKids.length}\n`;
      resp += `• On Approved Leave: ${leaveKids.length}\n`;

      if (absentKids.length > 0) {
        resp += `\nAbsent Students today: ` + absentKids.map(a => a.studentName).join(', ');
      }
      return resp;
    }

    // 6. Announcements
    if (cleanQuery.includes('announcement') || cleanQuery.includes('news') || cleanQuery.includes('event')) {
      const activeAnc = announcements.filter(a => a.status === 'Published');
      let resp = `📢 **Active School Bulletins & Announcements**:\n`;
      activeAnc.forEach(a => {
        resp += `\n• **${a.title}** (${a.targetAudience}): ${a.description}`;
      });
      return resp;
    }

    // Default Fallback
    return `I can help you manage your classroom duties effectively. Try asking:\n• *"Show me the student roster for my class"*\n• *"Give me a sensory finger painting lesson plan"*\n• *"Which students have allergy or medical notes?"*\n• *"Draft developmental remarks for my student's report card"*\n• *"What is today's attendance rate for my class?"*`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userMsg = inputText.trim();
    setInputText('');

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userMsg,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const responseText = getAIResponseText(userMsg);
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: responseText,
          timestamp: new Date()
        }
      ]);
    }, 600);
  };

  const quickPrompts = [
    "📋 Classroom student roster",
    "🎨 Montessori sensory lesson plan",
    "📝 Draft report card praise remarks",
    "⚠️ Students with allergy notes",
    "📊 Today's class attendance overview"
  ];

  return (
    <DashboardLayout title="AI Teaching Assistant">
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Quick Classroom Status Banner */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.15) 0%, rgba(255, 230, 109, 0.2) 100%)',
            border: '1.5px solid rgba(78, 205, 196, 0.3)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent-teal)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                {assignedClass} • Educator AI Workspace
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: '2px 0 0 0' }}>
                Instant curriculum assistance, developmental remarks generator & roster intelligence
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', padding: '6px 12px', background: '#FFF', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(45,49,66,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block' }}>Students</span>
              <strong style={{ fontSize: '1rem', color: 'var(--color-accent-teal)' }}>{classStudents.length}</strong>
            </div>
            <div style={{ textAlign: 'center', padding: '6px 12px', background: '#FFF', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(45,49,66,0.08)' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'block' }}>Assigned Class</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-accent-coral)' }}>{assignedClass}</strong>
            </div>
          </div>
        </div>

        {/* Chat Window Panel */}
        <div
          style={{
            backgroundColor: '#FFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(45,49,66,0.08)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            height: '620px',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '1rem 1.5rem',
              borderBottom: '1px solid rgba(45,49,66,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(255, 249, 240, 0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={20} color="var(--color-accent-teal)" />
              <strong style={{ fontSize: '0.95rem' }}>AI Teaching Assistant</strong>
              <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', backgroundColor: '#E8F5E9', color: '#2E7D32', fontWeight: 600 }}>
                Active
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMessages([
                  {
                    id: 'welcome',
                    sender: 'ai',
                    text: `Hello ${user?.name || 'Educator'}! How can I assist you in your classroom today?`,
                    timestamp: new Date()
                  }
                ]);
              }}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              Reset Session
            </Button>
          </div>

          {/* Messages Feed */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backgroundColor: 'var(--color-bg-primary)'
            }}
          >
            {messages.map(msg => {
              const isMe = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                    alignSelf: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '3px', padding: '0 4px' }}>
                    {isMe ? 'You' : 'Happy Hearts Educator AI'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      borderTopRightRadius: isMe ? '4px' : 'var(--radius-sm)',
                      borderTopLeftRadius: isMe ? 'var(--radius-sm)' : '4px',
                      backgroundColor: isMe ? 'var(--color-accent-teal)' : '#FFF',
                      color: isMe ? '#FFF' : 'var(--color-text-main)',
                      fontSize: '0.88rem',
                      lineHeight: '1.5',
                      boxShadow: 'var(--shadow-sm)',
                      whiteSpace: 'pre-wrap',
                      border: isMe ? 'none' : '1px solid rgba(45,49,66,0.06)'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '3px' }}>
                  Educator AI is crafting response...
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
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-teal)', borderRadius: '50%', display: 'inline-block' }}></span>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-teal)', borderRadius: '50%', display: 'inline-block' }}></span>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-teal)', borderRadius: '50%', display: 'inline-block' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div
            style={{
              padding: '8px 1.5rem',
              backgroundColor: '#FFF',
              borderTop: '1px solid rgba(45,49,66,0.06)',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInputText(prompt)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(78, 205, 196, 0.35)',
                  backgroundColor: 'rgba(78, 205, 196, 0.08)',
                  color: 'var(--color-accent-teal)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-teal)';
                  e.currentTarget.style.color = '#FFF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(78, 205, 196, 0.08)';
                  e.currentTarget.style.color = 'var(--color-accent-teal)';
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(45,49,66,0.08)',
              display: 'flex',
              gap: '10px',
              backgroundColor: '#FFF'
            }}
          >
            <input
              type="text"
              placeholder="Ask for lesson plans, remark suggestions, attendance checks, or student info..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
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
              Ask Assistant
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
