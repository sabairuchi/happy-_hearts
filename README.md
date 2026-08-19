# Happy Hearts Preschool & Crèche — Milestone 3

**Happy Hearts Preschool & Crèche** is a modern, responsive, and secure web platform featuring a vibrant public website, role-based portals for Parents & Teachers, and a full-featured **Admin Dashboard & School Management System**.

---

## 🌟 Key Features (Milestone 3 Complete)

### 1. Executive Admin Dashboard
- Real-time overview cards:
  - **TOTAL STUDENTS**: Active enrolled pupil count
  - **TOTAL PARENTS**: Registered parent accounts
  - **TOTAL TEACHERS**: Active teaching staff
  - **NEW ADMISSIONS**: Recently submitted applications
  - **PENDING ADMISSIONS**: Applications awaiting review
  - **TOTAL FEES COLLECTED**: Cleared revenue total ($)
  - **PENDING FEES**: Outstanding balance ($)
  - **TODAY'S ATTENDANCE**: School-wide attendance rate (%)
- Quick action shortcuts for instant operations.
- Activity tables for recent admissions, fee transactions, and announcements.

### 2. Student Management (`/admin/students`)
- Search by student name, admission number, or parent.
- Filter by program/class and enrollment status (Active, Inactive, Graduated).
- Full Student Profile drawer displaying parent links, DOB, gender, emergency contact, and medical notes.
- Add/Edit student records with class and educator assignment.
- Status toggle (Active / Inactive) and permanent deletion with confirmation modal.

### 3. Parent Management (`/admin/parents`)
- Search by parent name, email, or mobile.
- View Parent Profile showing linked children accounts.
- Register new parent accounts & edit existing records.
- Link parent accounts to one or multiple student profiles.
- Activate / Deactivate parent accounts with visual status badges.

### 4. Teacher Management (`/admin/teachers`)
- Educator directory cards with photos, qualifications, experience, and contact details.
- Search and filter by active/inactive staff.
- Add/Edit teacher records and assign program/classes.
- Toggle active teacher account status.

### 5. Admission Management (`/admin/admissions`)
- Filter applications by status: `Submitted`, `Under Review`, `Documents Required`, `Approved`, `Admitted`, `Rejected`.
- Detailed review modal with child details, parent details, emergency info, and document verification notes.
- Approval/Rejection workflow with confirmation dialogs.
- **Enroll Student**: Direct conversion of approved applicants into active enrolled Student records with auto-generated admission numbers (e.g. `HH-2026-042`).

### 6. Fee & Payment Overview (`/admin/fees`)
- Financial overview metrics (Total revenue collected, pending balance, settled vs outstanding invoices).
- Configured Program Fee Structures overview table.
- Search and filter fee payment ledger by receipt #, student name, parent name, or status (`PAID`, `PENDING`, `OVERDUE`).
- Printable fee receipt modal with itemized breakdown.
- Manual fee payment recorder allowing admins to mark pending invoices as paid via cash, UPI, card, or net banking.

### 7. Attendance Overview (`/admin/attendance`)
- Today's attendance summary: Present count, Absent count, Leave count, Attendance % progress bar.
- Date selector filter & class filter.
- Detailed attendance logs master table.
- **Batch Attendance Marker**: Admin tool to quickly mark batch attendance for any class on a selected date.

### 8. Announcements Management (`/admin/announcements`)
- Create, Edit, and Delete announcements with confirmation.
- Target Audience selection: `Everyone`, `All Parents`, `Teachers`, `Specific Program`.
- Publish / Unpublish status toggle and announcement history log.

---

## 🔒 Security & Route Protection

- **Protected Routes**: All `/admin/*`, `/teacher/*`, and `/parent/*` routes require role-based authentication. Unauthenticated users attempting to access protected endpoints are automatically redirected to `/admin/login`, `/teacher/login`, or `/parent/login`.
- **Session Expiration**: Inactivity monitor automatically logs out users after 30 minutes of inactivity.
- **Rate-Limiting Lockout**: Account lockout after 5 consecutive failed login attempts.
- **Data Protection**: Sensitive credentials, payment secrets, and private keys are decoupled from frontend bundles.

---

## 💻 Technologies Used

- **Frontend**: React 19, TypeScript, Vite 8, React Router DOM 7
- **Icons & UI Components**: Lucide React icons, Vanilla CSS Design System with Happy Hearts design tokens
- **Animations**: Framer Motion & CSS keyframe animations
- **State Architecture**: Context API (`AuthContext`, `DataContext`) with local storage persistence

---

## 🚀 Getting Started & Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation Steps

1. Clone or extract the project repository into your workspace:
   ```bash
   cd "Happy Hearts/M3"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 🔑 Demo Login Credentials

- **Admin Portal (`/admin/login`)**:
  - Email: `admin@happyhearts.com`
  - Password: `password123`

- **Teacher Portal (`/teacher/login`)**:
  - Email: `teacher@happyhearts.com`
  - Password: `password123`

- **Parent Portal (`/parent/login`)**:
  - Email: `parent@happyhearts.com`
  - Password: `password123`

---

## 🌐 Environment Variables Setup

Create a `.env` file in the root directory (optional for production deployments):

```env
VITE_APP_TITLE="Happy Hearts Preschool & Crèche"
VITE_RAZORPAY_KEY_ID="rzp_test_9842109384721"
```

---

## 📄 License & Ownership

Developed for **Happy Hearts Preschool & Crèche**. All rights reserved.