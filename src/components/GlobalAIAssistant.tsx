import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useAIAssistant } from '../context/AIAssistantContext';
import styles from './GlobalAIAssistant.module.css';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function GlobalAIAssistant() {
  const { user } = useAuth();
  const data = useData();
  const { isOpen, closeAssistant, openAssistant } = useAIAssistant();
  const location = useLocation();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hi! I'm the Happy Hearts AI Assistant. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determine if we are currently browsing an authenticated portal dashboard route
  const isDashboardRoute = location.pathname.startsWith('/parent') || 
                            location.pathname.startsWith('/teacher') || 
                            location.pathname.startsWith('/admin');

  // Auto-scroll messages container to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when drawer is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Generate context string for the AI backend based on current user role
  const buildUserContext = () => {
    if (!user) {
      return 'User is a Public Visitor (Guest). Only answer using general public school information. Do not share private student, teacher, or administrative details.';
    }

    const { role } = user;

    if (role === 'PARENT') {
      const parentId = user.parentId || user.id;
      const children = data.getParentChildren(parentId) || [];
      
      const childrenContext = children.map((c: any) => {
        // Calculate attendance percent
        const childAttendance = data.attendance?.filter((r: any) => r.studentId === c.id) || [];
        const presentCount = childAttendance.filter((r: any) => r.status === 'Present').length;
        const totalDays = childAttendance.length;
        const attendancePercent = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : '100';

        // Calculate fee invoice pending/paid amounts
        const childFees = data.feePayments?.filter((f: any) => f.studentId === c.id) || [];
        const pendingAmount = childFees.reduce((sum: number, f: any) => sum + (f.pendingAmount || 0), 0);
        const paidAmount = childFees.reduce((sum: number, f: any) => sum + (f.paidAmount || 0), 0);

        // Retrieve daily updates
        const childUpdates = data.dailyUpdates?.filter((u: any) => u.studentId === c.id) || [];
        const latestUpdate = childUpdates[0] ? `${childUpdates[0].date}: Activities: ${childUpdates[0].todayActivities?.join(', ') || 'None'}, Learning: ${childUpdates[0].learningActivities || 'None'}, Meal: ${childUpdates[0].mealsSnacks || 'None'}, Nap: ${childUpdates[0].napRestTime || 'None'}, Remarks: ${childUpdates[0].teacherRemarks || 'None'}` : 'No updates logged today.';

        return `- Child Name: ${c.name}
  Admission Number: ${c.admissionNumber}
  Classroom: ${c.className}
  Assigned Educator: ${c.teacherName}
  Status: ${c.status}
  Attendance Rate: ${attendancePercent}% (${presentCount} present out of ${totalDays} classes)
  Outstanding Fee Balance: $${pendingAmount} (Total Paid: $${paidAmount})
  Latest Daily Update: ${latestUpdate}`;
      }).join('\n\n');

      return `Logged-in Parent: ${user.name} (Email: ${user.email}, Phone: ${user.mobile}, Parent ID: ${parentId}).
Authorized Children Details:\n${childrenContext || 'No student profiles associated with this parent account yet.'}`;
    }

    if (role === 'TEACHER') {
      const teacherId = user.id;
      const students = data.getTeacherStudents(teacherId) || [];
      const teacherDetails = data.teachers?.find((t: any) => t.id === teacherId || t.email === user.email);
      const assignedClassName = teacherDetails?.assignedClassName || 'Assigned Class';

      const studentsContext = students.map((s: any) => `- Student: ${s.name} (Admission #: ${s.admissionNumber}, Class: ${s.className}, Parent Name: ${s.parentName}, Status: ${s.status})`).join('\n');

      return `Logged-in Teacher: ${user.name} (Email: ${user.email}, Teacher ID: ${teacherId}).
Classroom Assignment: ${assignedClassName}
Authorized Students List in class:\n${studentsContext || 'No students assigned to your class yet.'}`;
    }

    if (role === 'ADMIN') {
      const totalStudents = data.students?.length || 0;
      const totalParents = data.parents?.length || 0;
      const totalTeachers = data.teachers?.length || 0;
      const pendingAdmissions = data.applications?.filter((a: any) => a.status === 'Submitted' || a.status === 'Under Review').length || 0;
      const collectedRevenue = data.feePayments?.reduce((sum: number, f: any) => sum + (f.paidAmount || 0), 0) || 0;
      const outstandingFees = data.feePayments?.reduce((sum: number, f: any) => sum + (f.pendingAmount || 0), 0) || 0;

      return `Logged-in Admin: ${user.name} (Email: ${user.email}, Role: School Administrator).
Executive System Access:
- Total Enrolled Students: ${totalStudents}
- Total Parent Accounts: ${totalParents}
- Active Educator Staff: ${totalTeachers}
- Pending Admission Applications: ${pendingAdmissions}
- Total Dues Collected: $${collectedRevenue}
- Total Outstanding Balance: $${outstandingFees}`;
    }

    return 'User role: Guest';
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'model',
        content: "Hi! I'm the Happy Hearts AI Assistant. How can I help you today?"
      }
    ]);
  };

  const generateOfflineAIResponse = (userMsg: string, role: string, userContext: string): string => {
    const msg = userMsg.toLowerCase().trim();

    // Guard check for Public visitors
    if (role === 'PUBLIC' && (
      msg.includes('attendance') || 
      msg.includes('grade') || 
      msg.includes('report') || 
      msg.includes('child') || 
      msg.includes('my son') || 
      msg.includes('my daughter') ||
      msg.includes('fee invoice') ||
      msg.includes('my payment')
    )) {
      return "Hi there! 👋 To view student attendance, progress reports, fees, or other personal dashboard details, please log in to the Parent or Teacher Portal. Public visitors do not have access to private student records.";
    }

    // Role-based Parent specific questions
    if (role === 'PARENT' && userContext) {
      if (msg.includes('attendance') || msg.includes('present') || msg.includes('absent')) {
        return `Here is your child's attendance record from the Parent Portal:\n\n${userContext.split('\n\n')[1] || userContext}\n\nYou can view full monthly logs under 'Attendance' on your dashboard.`;
      }
      if (msg.includes('fee') || msg.includes('balance') || msg.includes('pay') || msg.includes('due') || msg.includes('invoice')) {
        return `Here is the current fee overview for your registered child(ren):\n\n${userContext}\n\nYou can settle pending invoices directly via the 'Fees & Payments' section.`;
      }
      if (msg.includes('update') || msg.includes('meal') || msg.includes('food') || msg.includes('nap') || msg.includes('activity')) {
        return `Here is today's daily log update from the classroom educator:\n\n${userContext}\n\nCheck 'Daily Updates' for activity photo attachments and educator remarks!`;
      }
      if (msg.includes('child') || msg.includes('student') || msg.includes('profile')) {
        return `Here are your authorized child profile records:\n\n${userContext}`;
      }
    }

    // Role-based Teacher specific questions
    if (role === 'TEACHER' && userContext) {
      if (msg.includes('student') || msg.includes('class') || msg.includes('roster') || msg.includes('who')) {
        return `Here is your assigned classroom student overview:\n\n${userContext}`;
      }
      if (msg.includes('activity') || msg.includes('lesson') || msg.includes('plan')) {
        return `🎨 **Montessori Lesson Plan Suggestion**:\n• Sensory finger-painting & color mixing station (25m)\n• Tactile kinetic sand exploration (20m)\n• Rhyme circle & alphabet story time (15m)\n\nTip: You can log notes in 'Daily Activity Logs' in your sidebar menu!`;
      }
    }

    // Role-based Admin specific questions
    if (role === 'ADMIN' && userContext) {
      if (msg.includes('stat') || msg.includes('total') || msg.includes('count') || msg.includes('revenue') || msg.includes('summary')) {
        return `Here is the executive system overview from your Admin Dashboard:\n\n${userContext}`;
      }
    }

    // Admissions & Programs general
    if (msg.includes('admission') || msg.includes('apply') || msg.includes('enroll') || msg.includes('register')) {
      return "Applying to Happy Hearts is quick and fully digital! 🎒\n1. Visit our Admission page (/admission) or start the application form directly at /admission/apply.\n2. Complete the 4-step wizard (Child Info, Parent Info, Emergency Contacts, Document Uploads).\n3. Submit and track status anytime at /admission/status using your Application ID.";
    }

    if (msg.includes('program') || msg.includes('class') || msg.includes('age') || msg.includes('creche') || msg.includes('toddler')) {
      return "Happy Hearts offers 4 age-appropriate programs:\n• **Toddler Crèche & Daycare** (6 Mos - 2 Yrs): Sensory play, loving daycare caregivers ($200/mo).\n• **Playgroup Sunshine** (1.5 - 2.5 Yrs): Social play, language & fine motor skills ($250/mo).\n• **Nursery Explorers** (2.5 - 3.5 Yrs): Early literacy, numbers, story circles ($280/mo).\n• **Kindergarten Stars** (3.5 - 5 Yrs): Academic readiness, early math & writing ($300/mo).";
    }

    if (msg.includes('fee') || msg.includes('cost') || msg.includes('price') || msg.includes('discount')) {
      return "Our monthly tuition fees are:\n• Toddler Crèche: $200/mo\n• Playgroup: $250/mo\n• Nursery: $280/mo\n• Kindergarten: $300/mo\n\n🎉 **Sibling Discount**: We automatically apply a 15% discount for second siblings enrolled!";
    }

    if (msg.includes('timing') || msg.includes('hour') || msg.includes('schedule') || msg.includes('time')) {
      return "Our operating hours are:\n• 🏫 **Preschool Program**: 8:00 AM – 2:00 PM (Monday – Friday)\n• 🧸 **Daycare Service**: 7:30 AM – 6:00 PM (Monday – Friday)\n• 🗺️ **Campus Tours**: Monday – Saturday, 9 AM – 3 PM.";
    }

    if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('address') || msg.includes('visit') || msg.includes('tour')) {
      return "Reach out to our campus team anytime:\n• 📧 Email: hello@happyhearts.edu\n• 📞 Phone: +1 (234) 567-890\n• 📍 Address: 123 Sunny Lane, Happyville, ST 12345\n• 🕒 Campus Visits: Mon-Sat 9 AM - 3 PM.";
    }

    if (msg.includes('meal') || msg.includes('food') || msg.includes('lunch') || msg.includes('snack')) {
      return "🍎 We provide pediatrician-approved organic morning snacks and warm, balanced lunches for full-day students. All allergies and dietary preferences are strictly observed.";
    }

    return "I'm the Happy Hearts AI Assistant! 🧸 I can help you with:\n• 🏫 Programs and age requirements\n• 📝 Admission steps and required documentation\n• 💰 Tuition fees and 15% sibling discount\n• ⏰ School and daycare operating timings\n• 📍 Campus address and visit schedules\n\nHow can I help you today?";
  };

  const getQuickPrompts = () => {
    if (!user) {
      return [
        "🎒 Admission fees & sibling discounts",
        "🧸 Programs & age criteria",
        "⏰ Operating timings & daycare hours",
        "📍 Campus tour & contact details"
      ];
    }
    if (user.role === 'PARENT') {
      return [
        "📊 Check Emma's attendance rate",
        "💰 Outstanding fee balance",
        "🍎 Today's meal & snack update",
        "📝 Daily learning activities log"
      ];
    }
    if (user.role === 'TEACHER') {
      return [
        "📋 Assigned class student roster",
        "🎨 Montessori sensory lesson plan",
        "⚠️ Student dietary & allergy notes",
        "📊 Today's class attendance summary"
      ];
    }
    if (user.role === 'ADMIN') {
      return [
        "📊 Executive system metrics",
        "👥 Total enrolled students count",
        "💳 Total fee revenue collected",
        "📝 Pending admission applications"
      ];
    }
    return [
      "🎒 Admission process",
      "🧸 Preschool programs"
    ];
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Append user message to state
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    const userRole = user ? user.role : 'PUBLIC';
    const userContext = buildUserContext();

    try {
      // Map message history
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMessage,
          history: historyPayload,
          userRole,
          context: userContext
        })
      });

      if (!response.ok) {
        throw new Error('AI service returned non-OK status');
      }

      const result = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: result.response || generateOfflineAIResponse(userMessage, userRole, userContext)
        }
      ]);
    } catch {
      // Graceful offline fallback
      const offlineReply = generateOfflineAIResponse(userMessage, userRole, userContext);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: offlineReply
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Sparkle Action Button (ONLY on public pages) */}
      {!isDashboardRoute && !isOpen && (
        <button
          className={styles.publicFloatBtn}
          onClick={openAssistant}
          aria-label="Open AI Assistant"
        >
          <span className={styles.tooltip}>AI Assistant</span>
          <Sparkles size={20} />
        </button>
      )}

      {/* Slide-out AI Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeAssistant}
            />

            {/* Right Sliding Panel */}
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              role="dialog"
              aria-label="Happy Hearts AI Chat Assistant"
            >
              {/* Header */}
              <div className={styles.drawerHeader}>
                <div className={styles.headerTitle}>
                  <Sparkles size={20} />
                  <span>AI Assistant</span>
                </div>
                <div className={styles.headerActions}>
                  <button
                    className={styles.headerBtn}
                    onClick={handleClearChat}
                    title="Clear Conversation"
                    aria-label="Clear Conversation"
                  >
                    <Trash2 size={13} />
                    <span>Clear</span>
                  </button>
                  <button
                    className={styles.closeBtn}
                    onClick={closeAssistant}
                    title="Close Assistant"
                    aria-label="Close Assistant"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Message List */}
              <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.messageWrapper} ${
                      msg.role === 'user' ? styles.userWrapper : styles.aiWrapper
                    }`}
                  >
                    <div
                      className={`${styles.bubble} ${
                        msg.role === 'user' ? styles.userBubble : styles.aiBubble
                      }`}
                    >
                      {msg.role === 'model' ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: msg.content
                              .replace(
                                /\/admission\/apply/g,
                                '<a href="/admission/apply" class="interactive">Apply Page</a>'
                              )
                              .replace(
                                /\/admission\/status/g,
                                '<a href="/admission/status" class="interactive">Track Status Page</a>'
                              )
                              .replace(
                                /\/admission/g,
                                '<a href="/admission" class="interactive">Admissions Page</a>'
                              )
                              .replace(
                                /\/contact/g,
                                '<a href="/contact" class="interactive">Contact Page</a>'
                              )
                              .replace(
                                /\/parent\/fees/g,
                                '<a href="/parent/fees" class="interactive">Fees Page</a>'
                              )
                              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/\n/g, '<br />')
                          }}
                        />
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading typing bubble */}
                {isLoading && (
                  <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
                    <div className={`${styles.bubble} ${styles.aiBubble} ${styles.typingBubble}`}>
                      <span className={styles.dot}></span>
                      <span className={styles.dot}></span>
                      <span className={styles.dot}></span>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className={styles.suggestionsContainer}>
                {getQuickPrompts().map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={styles.suggestionChip}
                    onClick={() => {
                      setInputValue(chip);
                      inputRef.current?.focus();
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className={styles.inputForm}>
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.textInput}
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isLoading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  className={styles.sendBtn}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
