import { useState, type ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Users, 
  FileText, 
  CalendarCheck, 
  CreditCard, 
  TrendingUp, 
  Clock, 
  Bell, 
  User, 
  Settings,
  GraduationCap,
  BookOpen,
  Megaphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NotificationBell } from './NotificationBell';
import styles from './DashboardLayout.module.css';

interface NavItem {
  name: string;
  path: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
}

export const DashboardLayout = ({ children, title }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getNavItems = (): NavItem[] => {
    if (!user) return [];

    if (user.role === 'PARENT') {
      return [
        { name: 'Overview', path: '/parent/dashboard', icon: <Home size={18} /> },
        { name: 'My Children', path: '/parent/children', icon: <Users size={18} /> },
        { name: 'Admission', path: '/admission/status', icon: <FileText size={18} /> },
        { name: 'Attendance', path: '/parent/attendance', icon: <CalendarCheck size={18} /> },
        { name: 'Fees & Payments', path: '/parent/fees', icon: <CreditCard size={18} /> },
        { name: 'Child Progress', path: '/parent/progress', icon: <TrendingUp size={18} /> },
        { name: 'Daily Updates', path: '/parent/daily-updates', icon: <Clock size={18} /> },
        { name: 'Notifications', path: '/parent/notifications', icon: <Bell size={18} /> },
        { name: 'My Profile', path: '/parent/profile', icon: <User size={18} /> }
      ];
    }

    if (user.role === 'TEACHER') {
      return [
        { name: 'Dashboard', path: '/teacher/dashboard', icon: <Home size={18} /> },
        { name: 'My Students', path: '/teacher/students', icon: <GraduationCap size={18} /> },
        { name: 'Attendance Sheet', path: '/teacher/attendance', icon: <CalendarCheck size={18} /> },
        { name: 'Daily Activity Logs', path: '/teacher/daily-updates', icon: <Clock size={18} /> },
        { name: 'Progress Reports', path: '/teacher/progress', icon: <TrendingUp size={18} /> },
        { name: 'Notifications', path: '/teacher/notifications', icon: <Bell size={18} /> },
        { name: 'Teacher Profile', path: '/teacher/profile', icon: <User size={18} /> }
      ];
    }

    if (user.role === 'ADMIN') {
      return [
        { name: 'Executive Overview', path: '/admin/dashboard', icon: <Home size={18} /> },
        { name: 'Admission Portal', path: '/admin/admissions', icon: <FileText size={18} /> },
        { name: 'Students Registry', path: '/admin/students', icon: <GraduationCap size={18} /> },
        { name: 'Parent Accounts', path: '/admin/parents', icon: <Users size={18} /> },
        { name: 'Teachers Console', path: '/admin/teachers', icon: <BookOpen size={18} /> },
        { name: 'Fee & Payments', path: '/admin/fees', icon: <CreditCard size={18} /> },
        { name: 'School Attendance', path: '/admin/attendance', icon: <CalendarCheck size={18} /> },
        { name: 'Announcements', path: '/admin/announcements', icon: <Megaphone size={18} /> },
        { name: 'Progress Evaluation', path: '/admin/progress', icon: <TrendingUp size={18} /> },
        { name: 'Daily Log Audit', path: '/admin/daily-updates', icon: <Clock size={18} /> },
        { name: 'Broadcast Notices', path: '/admin/notifications', icon: <Bell size={18} /> },
        { name: 'Portal Settings', path: '/admin/settings', icon: <Settings size={18} /> }
      ];
    }

    return [];
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/Happyhearts_logo.png"
              alt="Happy Hearts Preschool & Crèche"
              style={{ height: '42px', objectFit: 'contain' }}
            />
          </Link>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
              alt={user?.name}
              className={styles.userAvatar}
            />
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userRole}>{user?.role}</div>
            </div>
          </div>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              className={styles.mobileToggle}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className={styles.topTitle}>{title}</h1>
          </div>

          <div className={styles.topActions}>
            <Link to="/" className={styles.siteHomeBtn}>
              <Home size={14} />
              <span>Main Website</span>
            </Link>
            <NotificationBell />
          </div>
        </header>

        <main className={styles.pageBody}>{children}</main>
      </div>
    </div>
  );
};
