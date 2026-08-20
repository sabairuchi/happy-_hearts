import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Shield } from 'lucide-react';
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

export default function ParentAIAssistant() {
  const { user } = useAuth();
  const { announcements, feeStructures, feePayments, getParentChildren, dailyUpdates, progressReports, attendance } = useData();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Hello ${user?.name || 'Parent'}! Welcome to the Happy Hearts AI Assistant. 🧸✨\n\nI can help answer questions about admissions, fees, sibling discounts, outstanding payments, schedules, and active school announcements. What would you like to know today?`,
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
    
    // Safety check - block trying to query other users or secret data
    if (cleanQuery.includes('password') || cleanQuery.includes('credentials') || cleanQuery.includes('secret') || cleanQuery.includes('database')) {
      return "For security and privacy reasons, I cannot disclose credentials or private database details. Please contact the administrative desk directly for password resets or security inquiries.";
    }

    const parentId = user?.parentId || user?.id || '';
    const children = getParentChildren(parentId);

    // 1. Child Daily Updates: Meals / Food / Snack / Eat
    if (cleanQuery.includes('meal') || cleanQuery.includes('food') || cleanQuery.includes('snack') || cleanQuery.includes('lunch') || cleanQuery.includes('eat') || cleanQuery.includes('eating') || cleanQuery.includes('diet')) {
      if (children.length === 0) {
        return "I couldn't find any children linked to your parent account in our records.";
      }
      let response = "Here is the meal and snack log for today:\n";
      children.forEach(child => {
        const update = dailyUpdates.find(u => u.studentId === child.id);
        if (update) {
          response += `\n• **${child.name}** (${child.className}): ${update.mealsSnacks}`;
        } else {
          response += `\n• **${child.name}** (${child.className}): No meal records entered for today yet.`;
        }
      });
      return response;
    }

    // 2. Child Daily Updates: Nap / Sleep / Rest
    if (cleanQuery.includes('nap') || cleanQuery.includes('sleep') || cleanQuery.includes('rest') || cleanQuery.includes('napping')) {
      if (children.length === 0) {
        return "I couldn't find any children linked to your parent account in our records.";
      }
      let response = "Here is the nap and rest log for today:\n";
      children.forEach(child => {
        const update = dailyUpdates.find(u => u.studentId === child.id);
        if (update) {
          response += `\n• **${child.name}** (${child.className}): ${update.napRestTime}`;
        } else {
          response += `\n• **${child.name}** (${child.className}): No nap logs recorded for today yet.`;
        }
      });
      return response;
    }

    // 3. Child Daily Updates: Activities / Play / Learn
    if (cleanQuery.includes('activity') || cleanQuery.includes('activities') || cleanQuery.includes('play') || cleanQuery.includes('learn') || cleanQuery.includes('learning') || cleanQuery.includes('game') || cleanQuery.includes('lesson')) {
      if (children.length === 0) {
        return "I couldn't find any children linked to your parent account in our records.";
      }
      let response = "Here are today's activities and learning focus:\n";
      children.forEach(child => {
        const update = dailyUpdates.find(u => u.studentId === child.id);
        if (update) {
          response += `\n• **${child.name}** (${child.className}):\n  - **Activities**: ${update.todayActivities.join(', ')}\n  - **Learning Focus**: ${update.learningActivities}`;
        } else {
          response += `\n• **${child.name}** (${child.className}): No activities logged for today yet.`;
        }
      });
      return response;
    }

    // 4. Child Daily Updates: Remarks / Teacher notes
    if (cleanQuery.includes('remark') || cleanQuery.includes('teacher note') || cleanQuery.includes('notes') || cleanQuery.includes('observation')) {
      if (children.length === 0) {
        return "I couldn't find any children linked to your parent account in our records.";
      }
      let response = "Here are today's notes and observations from the educator:\n";
      children.forEach(child => {
        const update = dailyUpdates.find(u => u.studentId === child.id);
        if (update) {
          response += `\n• **${child.name}** (${child.className}):\n  - **Observations**: ${update.specialObservations || 'No special observations.'}\n  - **Remarks**: "${update.teacherRemarks || 'Doing great!'}"`;
        } else {
          response += `\n• **${child.name}** (${child.className}): No remarks logged for today yet.`;
        }
      });
      return response;
    }

    // 5. Child Progress Report / Evaluation
    if (cleanQuery.includes('progress') || cleanQuery.includes('report') || cleanQuery.includes('evaluation') || cleanQuery.includes('development') || cleanQuery.includes('skills') || cleanQuery.includes('how is my child doing') || cleanQuery.includes('grade')) {
      if (children.length === 0) {
        return "I couldn't find any children linked to your parent account in our records.";
      }
      let response = "Here is the latest progress report evaluation summary:\n";
      children.forEach(child => {
        const report = progressReports.find(r => r.studentId === child.id);
        if (report) {
          response += `\n• **${child.name}** (${child.className}):\n  - **Term**: ${report.termPeriod}\n  - **Communication**: ${report.communication}\n  - **Social Skills**: ${report.socialDevelopment}\n  - **Motor Skills**: ${report.motorSkills}\n  - **Cognitive Development**: ${report.cognitiveDevelopment}\n  - **Teacher Remarks**: "${report.teacherRemarks}"`;
        } else {
          response += `\n• **${child.name}** (${child.className}): No official progress evaluations posted for this term yet.`;
        }
      });
      return response;
    }

    // 6. Child Attendance
    if (cleanQuery.includes('attendance') || cleanQuery.includes('present') || cleanQuery.includes('absent') || cleanQuery.includes('leave') || cleanQuery.includes('attend')) {
      if (children.length === 0) {
        return "I couldn't find any children linked to your parent account in our records.";
      }
      let response = "Here is the attendance summary:\n";
      children.forEach(child => {
        const childRecords = attendance.filter(a => a.studentId === child.id);
        const presentCount = childRecords.filter(a => a.status === 'Present').length;
        const rate = childRecords.length > 0 ? Math.round((presentCount / childRecords.length) * 100) : 100;
        response += `\n• **${child.name}** (${child.className}): Attendance Rate: **${rate}%** (${presentCount} of ${childRecords.length} sessions attended)`;
      });
      return response;
    }

    // 7. General Fee details / Outstanding Child-specific fees
    if (cleanQuery.includes('fee') || cleanQuery.includes('bill') || cleanQuery.includes('invoice') || cleanQuery.includes('outstanding') || cleanQuery.includes('due') || cleanQuery.includes('payment') || cleanQuery.includes('pay') || cleanQuery.includes('cost') || cleanQuery.includes('charge') || cleanQuery.includes('structure') || cleanQuery.includes('discount') || cleanQuery.includes('sibling')) {
      // Check if it's about child specific outstanding fees
      if (cleanQuery.includes('my child') || cleanQuery.includes('pending') || cleanQuery.includes('outstanding') || cleanQuery.includes('bill') || cleanQuery.includes('invoice') || cleanQuery.includes('due') || cleanQuery.includes('pay') || cleanQuery.includes('how much') || cleanQuery.includes('lily') || cleanQuery.includes('leo') || cleanQuery.includes('sophia')) {
        if (children.length === 0) {
          return "I couldn't find any children linked to your parent account in our records.";
        }
        let response = "Here is the pending fee status for your children:\n";
        children.forEach(child => {
          const childInvoices = feePayments.filter(f => f.studentId === child.id);
          const pending = childInvoices.filter(f => f.paymentStatus === 'PENDING' || f.paymentStatus === 'OVERDUE');
          
          if (pending.length > 0) {
            pending.forEach(inv => {
              response += `\n• **${child.name}** (${child.className}): Pending **$${inv.pendingAmount}** for *${inv.monthYear}* (Due Date: ${inv.dueDate})`;
            });
          } else {
            response += `\n• **${child.name}** (${child.className}): All dues are fully paid! No outstanding balances.`;
          }
        });
        response += "\n\nYou can pay outstanding fees online directly through the 'Fees & Payments' section on the sidebar.";
        return response;
      }
      
      // Standard structure
      let response = "Here is the standard fee structure for our preschool programs:\n";
      feeStructures.forEach(fs => {
        response += `\n• **${fs.programName}**: Admission Fee: $${fs.admissionFee}, Monthly Tuition: $${fs.monthlyTuitionFee}, Activity/Material: $${fs.activityFee + fs.materialFee}, Sibling Discount: ${fs.siblingDiscountPercent}%`;
        if (fs.crecheDaycareFee > 0) {
          response += `, Daycare Supplement: $${fs.crecheDaycareFee}`;
        }
      });
      response += "\n\n*Note: Sibling discount is applied automatically if multiple children are registered under the same parent.*";
      return response;
    }

    // 8. Announcements / News
    if (cleanQuery.includes('announcement') || cleanQuery.includes('news') || cleanQuery.includes('update') || cleanQuery.includes('notice')) {
      const activeAnc = announcements.filter(a => a.status === 'Published');
      if (activeAnc.length === 0) {
        return "There are no new published school announcements at this moment. Please check back later.";
      }
      
      let response = "Here are the latest school announcements and notices:\n";
      activeAnc.slice(0, 3).forEach(anc => {
        response += `\n📢 **${anc.title}** (Published on ${anc.publishedAt || anc.date})\n${anc.description}\n`;
      });
      return response;
    }

    // 9. Admission apply
    if (cleanQuery.includes('apply') || cleanQuery.includes('admission') || cleanQuery.includes('enrol') || cleanQuery.includes('register')) {
      return "To apply for admission at Happy Hearts:\n\n1. Go to the **Admissions** section on the main website homepage.\n2. Click on **Digital Application** to open the wizard.\n3. Fill out details (Child info, Parent info, Emergency contacts) and upload copies of Child Photo, Birth Certificate, Address Proof, and Parent ID.\n4. Submit the application. You can track status anytime using your Application ID.\n5. Once approved by our desk, log in to pay the admission fees and complete the enrollment!";
    }

    // 10. Schedules, hours, timing
    if (cleanQuery.includes('schedule') || cleanQuery.includes('timing') || cleanQuery.includes('time') || cleanQuery.includes('hours') || cleanQuery.includes('calendar') || cleanQuery.includes('holiday')) {
      return "Here are our standard class schedules and operational timings:\n\n• **Office Admin Hours**: 8:00 AM - 4:30 PM (Monday to Friday)\n• **Playgroup Sunshine**: 9:00 AM - 12:30 PM (Monday to Friday)\n• **Nursery Explorers**: 9:00 AM - 1:00 PM (Monday to Friday)\n• **Kindergarten Stars**: 9:00 AM - 2:00 PM (Monday to Friday)\n• **Toddler Crèche & Daycare**: 8:00 AM - 6:00 PM (Monday to Friday)\n\n*Drop-off is between 8:45 AM and 9:00 AM. Late pickups are accommodated in Daycare.*";
    }

    // 11. Contact & location
    if (cleanQuery.includes('contact') || cleanQuery.includes('phone') || cleanQuery.includes('address') || cleanQuery.includes('location') || cleanQuery.includes('email') || cleanQuery.includes('map')) {
      return "Happy Hearts Preschool Contact Information:\n\n📍 **Address**: 742 Evergreen Terrace, Springfield\n📞 **Office Phone**: +1 (555) 019-2831\n📧 **Email**: support@happyhearts.com\n💬 **In-App Chat**: You can chat directly with your child's teacher via the 'Teacher Chat' tab on the sidebar.";
    }

    // Fallback response
    return "I'm the Happy Hearts AI Assistant. I can help you with questions about admissions, standard program fees, outstanding billing details, latest announcements, schedules, and school contacts. Could you please rephrase your question or select one of the quick suggestions below?";
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Trigger AI response typing simulation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponseText = getAIResponseText(text);
      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <DashboardLayout title="Happy Hearts AI Virtual Assistant">
      <div
        style={{
          display: 'grid',
          gridTemplateRows: '1fr auto',
          height: 'calc(100vh - 160px)',
          backgroundColor: '#FFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          border: '1px solid rgba(45,49,66,0.08)'
        }}
      >
        {/* Messages Body */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            backgroundColor: 'var(--color-bg-primary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {messages.map(msg => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: isAI ? 'flex-start' : 'flex-end',
                  maxWidth: '80%'
                }}
              >
                {isAI && (
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 107, 107, 0.15)',
                      color: 'var(--color-accent-coral)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Bot size={22} />
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: isAI ? 'flex-start' : 'flex-end' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '3px' }}>
                    {isAI ? 'Happy Hearts AI' : 'You'} • {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <div
                    style={{
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-sm)',
                      borderTopRightRadius: isAI ? 'var(--radius-sm)' : '4px',
                      borderTopLeftRadius: isAI ? '4px' : 'var(--radius-sm)',
                      backgroundColor: isAI ? '#FFF' : 'var(--color-accent-coral)',
                      color: isAI ? 'var(--color-text-main)' : '#FFF',
                      fontSize: '0.92rem',
                      boxShadow: 'var(--shadow-sm)',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 107, 107, 0.15)',
                  color: 'var(--color-accent-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Bot size={22} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '3px' }}>AI is formulating response...</span>
                <div style={{ padding: '12px 20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#FFF', display: 'flex', gap: '4px', width: '60px', alignItems: 'center' }}>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulseGlow 1s infinite alternate' }}></span>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulseGlow 1s infinite alternate', animationDelay: '0.2s' }}></span>
                  <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-accent-coral)', borderRadius: '50%', display: 'inline-block', animation: 'pulseGlow 1s infinite alternate', animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer & Suggestions */}
        <div style={{ padding: '1.25rem 1.75rem', borderTop: '1px solid rgba(45,49,66,0.08)', backgroundColor: '#FFF' }}>
          {/* Quick query chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button
              onClick={() => handleSuggestionClick('Show school program fee structures')}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1.5px solid rgba(255, 107, 107, 0.2)', backgroundColor: 'rgba(255, 249, 240, 0.6)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent-coral)', transition: 'all 0.2s' }}
            >
              📊 Show program fees
            </button>
            <button
              onClick={() => handleSuggestionClick('Show my children pending fees')}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1.5px solid rgba(77, 150, 255, 0.2)', backgroundColor: 'rgba(235, 245, 255, 0.6)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent-sky)', transition: 'all 0.2s' }}
            >
              💳 Check my child's fees
            </button>
            <button
              onClick={() => handleSuggestionClick('What are the latest school announcements?')}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1.5px solid rgba(107, 203, 119, 0.2)', backgroundColor: 'rgba(234, 250, 241, 0.6)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent-mint)', transition: 'all 0.2s' }}
            >
              📢 Active Announcements
            </button>
            <button
              onClick={() => handleSuggestionClick('How do I submit an admission application?')}
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)', border: '1.5px solid rgba(132, 94, 194, 0.2)', backgroundColor: 'rgba(243, 232, 255, 0.6)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-accent-purple)', transition: 'all 0.2s' }}
            >
              📝 How to Apply?
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend(inputText);
            }}
            style={{ display: 'flex', gap: '10px' }}
          >
            <input
              type="text"
              placeholder="Ask the AI Assistant a question about admissions, fees, schedules, etc..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 'var(--radius-full)',
                border: '1.5px solid rgba(45,49,66,0.12)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <Button
              type="submit"
              variant="primary"
              icon={<Send size={16} />}
              style={{ borderRadius: 'var(--radius-full)', padding: '12px 22px' }}
            >
              Send Prompt
            </Button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Shield size={12} color="#06D6A0" />
            <span>Secure session: This AI instance only searches generic parameters and public details of your children's profiles.</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
