# Happy Hearts Preschool & Crèche — Milestone 4

**Happy Hearts Preschool & Crèche** is a modern, responsive, and secure web platform designed for early childhood education. Milestone 4 introduces an intelligent **Global AI Assistant**, a **Secure Real-Time Parent-Teacher Communication Console**, **Dedicated Role-Based AI Assistants**, and an offline-resilient **Hybrid AI Architecture** alongside the existing comprehensive Admin, Teacher, and Parent portals.

---

## 🌟 What's New in Milestone 4

### 1. Global AI Assistant Sliding Drawer
- **Site-Wide Accessibility**: Triggered via the floating sparkle button on public pages and the top-bar "Ask AI" button across all authenticated portals (`/parent/*`, `/teacher/*`, `/admin/*`).
- **Dynamic Role-Based Context Injection**:
  - **Public Visitors**: Answers inquiries about preschool programs, tuition fees, age criteria, operating timings, campus tours, and admission requirements without leaking private data.
  - **Parents**: Securely retrieves their linked child's attendance rate, outstanding fee balances, meal and nap logs, and daily teacher updates.
  - **Teachers**: Injects classroom rosters, student medical/allergy alerts, and class attendance statistics.
  - **Admins**: Summarizes executive metrics (total students, parents, active staff, revenue collected, and pending admission applications).
- **One-Click Quick Suggestion Chips**: Dynamic, role-sensitive prompt chips for instant answers.
- **Rich Markdown Formatting**: Bold highlights, clean bullet points, and clickable in-app links (e.g. directly to `/admission/apply`, `/admission/status`, `/parent/fees`).

### 2. Dedicated Role-Based AI Assistants
- **Parent AI Assistant (`/parent/ai-assistant`)**:
  - Queries daily meal intake, sleep/nap logs, and special educator remarks.
  - Reviews developmental evaluations (Communication, Social, Motor, and Cognitive development).
  - Checks live attendance rates and itemized fee payment invoices with due dates.
- **Teacher AI Assistant (`/teacher/ai-assistant`)**:
  - **Montessori & Sensory Lesson Planner**: Generates structured, age-appropriate activity plans (Sensory exploration, gross motor games, circle-time songs).
  - **Report Card Remark Assistant**: Crafts constructive, encouraging developmental remarks for student term evaluations.
  - **Roster & Health Audit**: Instantly surfaces students with dietary restrictions, allergies, or emergency contact requirements.
  - **Class Attendance Summary**: Real-time breakdown of present, absent, and leave counts for assigned classrooms.

### 3. Interactive Parent-Teacher Chat Console (`/parent/chat` & `/teacher/chat`)
- **Direct Bidirectional Communication**: Connects parents directly with the educators assigned to their enrolled children.
- **Simulated Pedagogical Responses**: Teachers automatically reply with contextually appropriate responses regarding illness/absence, progress, meals, and pickup schedule changes.
- **Quick Response Chips**: Preset conversation starters for parents (absence reports, pickup delays, meal checks) and one-tap replies for teachers.
- **Local Persistence**: Messages persist in browser `localStorage` across page reloads and portal sessions.

### 4. Hybrid AI Architecture & Offline Resilience
- **Dual-Layer Fallback Engine**:
  - **Cloud AI Layer**: Connects to the Google Gemini 1.5 Flash API via the `/api/chat` serverless endpoint when `GEMINI_API_KEY` is provided.
  - **Local Knowledge Engine**: If the API key is not configured or if network connectivity is interrupted, the client automatically falls back to an intelligent local rule-based knowledge engine. The AI never crashes or displays broken connection states.

---

## 🏛️ Comprehensive Platform Features

### Executive Admin Dashboard (`/admin/*`)
- **Real-Time KPI Cards**: Total students, parents, teachers, new & pending admissions, fees collected, pending balances, and school-wide attendance rate.
- **Student Management**: Add, edit, filter by program, view student profile drawers, toggle status, and delete records.
- **Parent Directory**: Manage parent profiles, link multiple children accounts, and manage account statuses.
- **Teacher Console**: Educator directory with credentials, assigned classes, and contact information.
- **Admission Portal**: Multi-stage review workflow (`Submitted` ➔ `Under Review` ➔ `Approved` ➔ `Admitted`), document verification notes, and 1-click student enrollment.
- **Fee Ledger & Payments**: Search and filter invoices by receipt #, student name, status (`PAID`, `PENDING`, `OVERDUE`), printable fee receipts, and manual payment recording.
- **Attendance Registry**: Date selector, class filter, and **Batch Attendance Marker** for fast attendance logging.
- **Announcements**: Publish, edit, and target bulletins to Everyone, Parents, Teachers, or Specific Programs.

### Parent Portal (`/parent/*`)
- **Child Profiles**: Full view of enrolled children, assigned educators, and class programs.
- **Attendance Tracking**: Visual attendance rate (%) and historical logs.
- **Fee Management**: Sibling discounts (15% on 2nd child), payment history, itemized receipts, and instant simulated checkout (UPI, Card, Net Banking).
- **Daily Classroom Logs**: Real-time updates on today's activities, meals/snacks, nap rest times, and teacher observations.
- **Progress Reports**: Term-by-term developmental report cards.
- **Direct Teacher Chat & AI Assistant**: Instant educator messaging and AI assistant queries.

### Teacher Portal (`/teacher/*`)
- **My Students Roster**: Student directory with parent contacts and emergency details.
- **Attendance Sheet**: Mark daily attendance (Present, Absent, Leave) with batch save.
- **Daily Activity Logger**: Record daily meals, naps, learning activities, and observations.
- **Progress Report Evaluator**: Submit developmental assessments across cognitive, social, motor, and language skills.
- **Parent Chat Console & AI Teaching Assistant**: Direct communication and curriculum planning.

---

## 🔒 Security & Route Protection

- **Role-Based Protected Routes (`<ProtectedRoute />`)**: Strict enforcement on `/admin/*`, `/teacher/*`, and `/parent/*` routes.
- **Session Expiration**: Automatic logout and session termination after 30 minutes of inactivity.
- **Rate-Limiting Lockout**: Account lockout after 5 consecutive failed login attempts.
- **Data Isolation**: Role-scoped data querying prevents unauthorized cross-tenant data access.

---

## 💻 Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, React Router DOM 7
- **Styling**: Vanilla CSS Design System with Happy Hearts tokens & CSS Modules
- **Animations**: Framer Motion & CSS Keyframe animations
- **Icons**: Lucide React
- **AI Integration**: Google Gemini 1.5 Flash API + Local Offline Fallback Engine
- **State Management**: Context API (`AuthContext`, `DataContext`, `AIAssistantContext`) with `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd "Happy Hearts/M4"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Gemini API Key:
   Create a `.env` file in the root directory:
   ```env
   VITE_APP_TITLE="Happy Hearts Preschool & Crèche"
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```
   *Note: If `GEMINI_API_KEY` is omitted, the AI Assistant automatically operates in offline-resilient local knowledge mode.*

4. Launch the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview production build:
   ```bash
   npm run preview
   ```

---

## 🔑 Demo Login Credentials

| Portal | URL | Email | Password |
| :--- | :--- | :--- | :--- |
| **Administrator** | `/admin/login` | `admin@happyhearts.com` | `password123` |
| **Class Teacher** | `/teacher/login` | `teacher@happyhearts.com` | `password123` |
| **Parent** | `/parent/login` | `parent@happyhearts.com` | `password123` |

---

## 📄 License & Ownership

Developed for **Happy Hearts Preschool & Crèche**. All rights reserved.