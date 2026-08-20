import { IncomingMessage } from 'http';

// Helper to buffer raw request body in Node environment
async function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', err => {
      reject(err);
    });
  });
}

// Rule-based mock chatbot engine for when API keys are not available
function getMockAIResponse(message: string, userRole: string, context: string): string {
  const msg = message.toLowerCase().trim();

  // Guard role-based checks for Public users trying to access private details
  if (userRole === 'PUBLIC' && (
    msg.includes('attendance') || 
    msg.includes('grade') || 
    msg.includes('report') || 
    msg.includes('child') || 
    msg.includes('my son') || 
    msg.includes('my daughter') ||
    msg.includes('my kid') ||
    msg.includes('fee invoice') ||
    msg.includes('my payment') ||
    msg.includes('my profile')
  )) {
    return "Hi there! 👋 To view student attendance, progress reports, fees, or other personal dashboard details, please log in to the Parent or Teacher Portal. Public visitors do not have access to private student records.";
  }

  // 1. Role-based Parent specific questions
  if (userRole === 'PARENT' && context) {
    if (msg.includes('my child') || msg.includes('my kid') || msg.includes('emma') || msg.includes('student') || msg.includes('attendance') || msg.includes('grade') || msg.includes('progress') || msg.includes('report') || msg.includes('update')) {
      return `Here is the current information retrieved from your Parent Dashboard:\n\n${context}\n\nFor more detailed logs, please check the corresponding sections in your sidebar navigation menu.`;
    }
  }

  // 2. Role-based Teacher specific questions
  if (userRole === 'TEACHER' && context) {
    if (msg.includes('my class') || msg.includes('student') || msg.includes('attendance') || msg.includes('my student') || msg.includes('schedule') || msg.includes('who are')) {
      return `Here is your Teacher Portal details:\n\n${context}\n\nYou can manage grades, record daily updates, and log batch attendance using the Teacher Dashboard.`;
    }
  }

  // 3. Role-based Admin specific questions
  if (userRole === 'ADMIN' && context) {
    if (msg.includes('stat') || msg.includes('total') || msg.includes('system') || msg.includes('revenue') || msg.includes('count')) {
      return `Here is the system overview from your Executive Admin Dashboard:\n\n${context}`;
    }
  }

  // 4. Admission general inquiries
  if (msg.includes('apply') || msg.includes('admission') || msg.includes('enroll') || msg.includes('register') || msg.includes('form') || msg.includes('joining')) {
    if (msg.includes('status') || msg.includes('track')) {
      return "You can check the status of your submitted application on the Admission Status page: /admission/status. You will need your Application ID (e.g., APP-2026-XXXX).";
    }
    return "Applying to Happy Hearts is quick and fully digital! You can start by visiting our Admission page (/admission) or go directly to the Admission Form (/admission/apply). The 4-step process includes:\n1. Digital Application\n2. Document Upload\n3. Application Review\n4. Fee Payment & Confirmation.";
  }

  // 5. Admission requirements & documents
  if (msg.includes('requirement') || msg.includes('document') || msg.includes('upload') || msg.includes('birth certificate') || msg.includes('passport')) {
    return "To complete your admission application, you will need to upload the following documents:\n- Recent passport-size photograph of the child\n- Government-issued Birth Certificate\n- Parent/Guardian National ID or Passport copy\n- Proof of residential address (Utility bill, lease)\n- Immunization & vaccination records (recommended).";
  }

  // 6. Contact information & Location
  if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('call') || msg.includes('address') || msg.includes('location') || msg.includes('where') || msg.includes('map') || msg.includes('tour') || msg.includes('visit')) {
    return "You can reach the Happy Hearts admissions team in several ways:\n- 📧 Email: hello@happyhearts.edu\n- 📞 Phone: +1 (234) 567-890\n- 📍 Address: 123 Sunny Lane, Happyville, ST 12345\n- 🕒 Campus Tours: Monday – Saturday, 9 AM – 3 PM (Call or email to schedule!).";
  }

  // 7. Programs offered
  if (msg.includes('program') || msg.includes('class') || msg.includes('toddler') || msg.includes('playgroup') || msg.includes('nursery') || msg.includes('kindergarten') || msg.includes('age')) {
    return "Happy Hearts offers four age-appropriate programs:\n- **Toddler Crèche & Daycare** (6 Months - 2 Years): Sensory play, loving daycare caregivers ($200/mo + daycare charges).\n- **Playgroup Sunshine** (1.5 - 2.5 Years): Social play, language & fine motor skills ($250/mo).\n- **Nursery Explorers** (2.5 - 3.5 Years): Early literacy, numbers, story circles ($280/mo).\n- **Kindergarten Stars** (3.5 - 5 Years): Academic school-readiness, writing, math foundations ($300/mo).";
  }

  // 8. Fees & Payments
  if (msg.includes('fee') || msg.includes('cost') || msg.includes('price') || msg.includes('pay') || msg.includes('discount') || msg.includes('invoice')) {
    if (userRole === 'PARENT' && context) {
      // Find fee details in parent context
      const lines = context.split('\n');
      const feeLines = lines.filter(l => l.toLowerCase().includes('fee') || l.toLowerCase().includes('due') || l.toLowerCase().includes('pay'));
      if (feeLines.length > 0) {
        return `Here are the fee details found for your child(ren):\n${feeLines.join('\n')}\n\nYou can view details and make payments on your Fees page: /parent/fees.`;
      }
    }
    return "Our program fees are:\n- Toddler Crèche: $200/month\n- Playgroup Sunshine: $250/month\n- Nursery Explorers: $280/month\n- Kindergarten Stars: $300/month\n\n💰 **Sibling Discount**: We automatically apply a 15% discount on the tuition fee for a second child enrolled. Payments can be securely completed online via Credit Card, Debit Card, UPI, or Net Banking in the Parent Portal.";
  }

  // 9. Timings
  if (msg.includes('timing') || msg.includes('hour') || msg.includes('time') || msg.includes('open') || msg.includes('schedule') || msg.includes('day')) {
    return "Our school operating hours are:\n- 🏫 **Preschool Program**: 8:00 AM – 2:00 PM (Monday – Friday)\n- 🧸 **Crèche Daycare Service**: 7:30 AM – 6:00 PM (Monday – Friday)\n- 🗺️ **Campus Visits**: Monday – Saturday, 9 AM – 3 PM.";
  }

  // 10. Meals
  if (msg.includes('meal') || msg.includes('food') || msg.includes('lunch') || msg.includes('snack') || msg.includes('eat') || msg.includes('nutrition')) {
    return "Yes! 🍎 We offer organic, pediatric nutritionist-approved morning snacks and healthy hot lunches for full-day daycare students. Dietary restrictions are strictly accommodated.";
  }

  // Fallback greeting & helper list
  return "I'm the Happy Hearts AI Assistant. I can answer questions about:\n- 🧸 Our programs and age limits\n- 📝 Admission requirements & documentation\n- 🏫 School and daycare operating timings\n- 📍 Location and contact information\n- 💰 Fees, payment methods, and sibling discounts\n\nIf you are logged in, I can also provide details about your specific dashboard context. What can I help you with?";
}

// Default handler function
export default async function handler(req: any, res: any) {
  try {
    // 1. Check method
    if (req.method !== 'POST') {
      if (typeof res.status === 'function') {
        return res.status(405).json({ error: 'Method Not Allowed' });
      } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }
    }

    // 2. Parse body depending on the environment (Vercel has pre-parsed req.body)
    let body: any;
    if (req.body) {
      body = req.body;
    } else {
      const bodyStr = await readRequestBody(req);
      body = JSON.parse(bodyStr);
    }

    const { message, history, userRole, context } = body;

    if (!message) {
      if (typeof res.status === 'function') {
        return res.status(400).json({ error: 'Missing message parameter' });
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Missing message parameter' }));
        return;
      }
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // 3. Fallback to mock if API key is not available
    if (!apiKey) {
      const mockReply = getMockAIResponse(message, userRole, context);
      if (typeof res.status === 'function') {
        return res.status(200).json({ response: mockReply, mock: true });
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ response: mockReply, mock: true }));
        return;
      }
    }

    // 4. If key exists, build and send the request to Gemini API
    const systemPrompt = `You are the official Happy Hearts AI Assistant, a friendly and professional chatbot for Happy Hearts Preschool & Crèche.
Your goals:
1. Help visitors and logged-in users with questions about Happy Hearts.
2. Answer based ONLY on the Approved School Information and the Authorized User Context provided below.
3. If the answer cannot be found in the provided context, politely say that you cannot confirm the information and direct the user to the Contact Page (/contact) or Admissions Page (/admission).
4. Strictly respect role-based access control. Do not discuss private information unless it is explicitly present in the "Authorized User Context" below.
5. Keep answers concise, clear, and child-friendly/welcoming.

Approved School Information:
- Location: 123 Sunny Lane, Happyville, ST 12345
- Phone: +1 (234) 567-890
- Email: hello@happyhearts.edu
- Hours: Preschool runs 8:00 AM - 2:00 PM; Crèche daycare runs 7:30 AM - 6:00 PM (Monday to Friday).
- Admissions: Phase 1 is open through March 31st. Campus visits are Monday-Saturday 9 AM - 3 PM. Sibling discount of 15% on the second child's enrollment.
- Programs Offered:
  * Toddler Crèche & Daycare (6 Months - 2 Years): $200/month. Safe environment, sensory play, nap/meal routines.
  * Playgroup Sunshine (1.5 - 2.5 Years): $250/month. Language, finger painting, social play.
  * Nursery Explorers (2.5 - 3.5 Years): $280/month. Literacy, numbers, story circles, independence.
  * Kindergarten Stars (3.5 - 5 Years): $300/month. School readiness, early math/writing.
- Required Documents: Child photo, birth certificate, parent ID proof, utility bill/lease address proof, immunization record.
- Meals: Nutritionist-approved morning snacks and hot lunch for full-day daycare.

User Role: ${userRole || 'PUBLIC'}
Authorized User Context:
${context || 'No specific personal context. User is a public visitor.'}

Remember: If the user asks about personal details (like student info, grades, attendance, fees) and the Authorized User Context is empty or the user is not authorized (User Role is PUBLIC), politely explain that they must log in to their dashboard to view this details.`;

    const contents = (history || []).map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const geminiPayload = {
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.5,
        maxOutputTokens: 1000
      }
    };

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('Gemini API request failed, status:', response.status, errorText);
      // Fallback on API failure
      const mockReply = getMockAIResponse(message, userRole, context);
      if (typeof res.status === 'function') {
        return res.status(200).json({ response: mockReply, mock: true, apiError: true });
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ response: mockReply, mock: true, apiError: true }));
        return;
      }
    }

    const data: any = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response right now. How else can I help you?";

    if (typeof res.status === 'function') {
      return res.status(200).json({ response: replyText });
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ response: replyText }));
      return;
    }

  } catch (error: any) {
    console.error('AI Assistant API Error:', error);
    // General fallback
    try {
      const mockReply = "I'm sorry, the Happy Hearts AI Assistant is experiencing temporary connection difficulties. Please try again in a few moments, or visit our Contact page to speak with us directly.";
      if (typeof res.status === 'function') {
        return res.status(500).json({ error: 'Internal Server Error', response: mockReply });
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error', response: mockReply }));
        return;
      }
    } catch (writeErr) {
      console.error('Error writing error response:', writeErr);
    }
  }
}
