import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import About from './pages/About';
import Teachers from './pages/Teachers';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';

// Milestone 2 Core Security & Providers
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ProtectedRoute } from './components/ProtectedRoute';

import Admission from './pages/Admission';
import AdmissionApply from './pages/AdmissionApply';
import AdmissionStatus from './pages/AdmissionStatus';

// Portal Entry & Dedicated Role Login Pages
import PortalSelect from './pages/PortalSelect';
import AdminLogin from './pages/admin/AdminLogin';
import TeacherLogin from './pages/teacher/TeacherLogin';
import ParentLogin from './pages/parent/ParentLogin';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AccessDenied from './pages/AccessDenied';

// Parent Dashboard Pages
import ParentDashboard from './pages/parent/ParentDashboard';
import ParentChildren from './pages/parent/ParentChildren';
import ParentAttendance from './pages/parent/ParentAttendance';
import ParentFees from './pages/parent/ParentFees';
import ParentProgress from './pages/parent/ParentProgress';
import ParentDailyUpdates from './pages/parent/ParentDailyUpdates';
import ParentNotifications from './pages/parent/ParentNotifications';
import ParentProfile from './pages/parent/ParentProfile';

// Teacher Dashboard Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherAttendance from './pages/teacher/TeacherAttendance';
import TeacherDailyUpdates from './pages/teacher/TeacherDailyUpdates';
import TeacherProgress from './pages/teacher/TeacherProgress';
import TeacherNotifications from './pages/teacher/TeacherNotifications';
import TeacherProfile from './pages/teacher/TeacherProfile';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAdmissions from './pages/admin/AdminAdmissions';
import AdminStudents from './pages/admin/AdminStudents';
import AdminParents from './pages/admin/AdminParents';
import AdminTeachers from './pages/admin/AdminTeachers';
import AdminFees from './pages/admin/AdminFees';
import AdminAttendance from './pages/admin/AdminAttendance';
import AdminProgress from './pages/admin/AdminProgress';
import AdminDailyUpdates from './pages/admin/AdminDailyUpdates';
import AdminNotifications from './pages/admin/AdminNotifications';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <CustomCursor />
          <Routes>
            {/* Public Visitor Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admission Pages */}
            <Route path="/admission" element={<Admission />} />
            <Route path="/admission/apply" element={<AdmissionApply />} />
            <Route path="/admission/status" element={<AdmissionStatus />} />

            {/* Portal Entry & Security Pages */}
            <Route path="/portal" element={<PortalSelect />} />
            <Route path="/login" element={<Navigate to="/portal" replace />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/parent/login" element={<ParentLogin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Protected Parent Routes */}
            <Route
              path="/parent/dashboard"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/children"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentChildren />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/attendance"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/fees"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentFees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/progress"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/daily-updates"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentDailyUpdates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/notifications"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/parent/profile"
              element={
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <ParentProfile />
                </ProtectedRoute>
              }
            />

            {/* Protected Teacher Routes */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/students"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/attendance"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/daily-updates"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherDailyUpdates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/progress"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/notifications"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher/profile"
              element={
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <TeacherProfile />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/admissions"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminAdmissions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/parents"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminParents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminTeachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/fees"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminFees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/attendance"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminAttendance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/progress"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminProgress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/daily-updates"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDailyUpdates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/notifications"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminNotifications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
