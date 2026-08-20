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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Append user message to state
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

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
          userRole: user ? user.role : 'PUBLIC',
          context: buildUserContext()
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
          content: result.response || "I'm sorry, I couldn't formulate a response right now. Please try again."
        }
      ]);
    } catch (err) {
      console.error('Error fetching AI response:', err);
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          content: "I'm sorry, I am experiencing connection issues. Please check your network and try again. You can also visit our Contact Page (/contact) if you need immediate assistance."
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
