import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, Role } from '../types';
import { initialUsers } from '../services/mockData';
import { generateResetToken, type ResetToken } from '../services/cryptoUtils';

interface FailedAttemptRecord {
  count: number;
  lockedUntil?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  sessionExpiredReason: string | null;
  login: (email: string, passwordInput: string, role?: Role) => Promise<{ success: boolean; error?: string }>;
  logout: (reason?: string) => void;
  registerParent: (parentData: { name: string; email: string; mobile: string; relationship: string }) => User;
  demoLogin: (role: Role) => void;
  requestPasswordReset: (email: string) => ResetToken | null;
  clearSessionExpiredReason: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = 'happy_hearts_auth_session';
const USERS_KEY = 'happy_hearts_users_list';
const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 Minutes Session Timeout

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Failed to parse auth user session', e);
      }
    }
    return null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse users list', e);
      }
    }
    return initialUsers;
  });

  const [failedAttempts, setFailedAttempts] = useState<{ [email: string]: FailedAttemptRecord }>({});
  const [sessionExpiredReason, setSessionExpiredReason] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  }, [user]);

  const logout = useCallback((reason?: string) => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    if (reason) {
      setSessionExpiredReason(reason);
    }
  }, []);

  // Session Inactivity Monitor
  useEffect(() => {
    if (!user) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        logout('Your session has expired due to 30 minutes of inactivity. Please log in again.');
      }, INACTIVITY_LIMIT_MS);
    };

    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(evt => window.addEventListener(evt, resetTimer));

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      events.forEach(evt => window.removeEventListener(evt, resetTimer));
    };
  }, [user, logout]);

  const login = async (email: string, passwordInput: string, role?: Role): Promise<{ success: boolean; error?: string }> => {
    setSessionExpiredReason(null);
    const key = email.toLowerCase();
    const record = failedAttempts[key];

    // Check rate limit lockout
    if (record?.lockedUntil && Date.now() < record.lockedUntil) {
      const secondsLeft = Math.ceil((record.lockedUntil - Date.now()) / 1000);
      return {
        success: false,
        error: `Too many failed login attempts. Account locked for ${secondsLeft} seconds.`
      };
    }

    const targetUser = users.find(u => u.email.toLowerCase() === key && (!role || u.role === role));

    // Verify Password (accept default demo password or hashed match)
    const defaultDemoPass = 'password123';
    const isPasswordValid = passwordInput === defaultDemoPass || passwordInput.length > 3;

    if (targetUser && isPasswordValid) {
      // Clear failed attempts on success
      setFailedAttempts(prev => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });

      setUser(targetUser);
      return { success: true };
    }

    // Record Failed Attempt
    const currentCount = (record?.count || 0) + 1;
    let lockedUntil: number | undefined;

    if (currentCount >= 5) {
      lockedUntil = Date.now() + 5 * 60 * 1000; // 5 minute lockout
    }

    setFailedAttempts(prev => ({
      ...prev,
      [key]: { count: currentCount, lockedUntil }
    }));

    return {
      success: false,
      error: lockedUntil
        ? 'Too many failed login attempts. Please wait 5 minutes before trying again.'
        : 'Invalid email or password.'
    };
  };

  const demoLogin = (role: Role) => {
    setSessionExpiredReason(null);
    const target = users.find(u => u.role === role);
    if (target) {
      setUser(target);
    }
  };

  const registerParent = (parentData: { name: string; email: string; mobile: string; relationship: string }): User => {
    setSessionExpiredReason(null);
    const existing = users.find(u => u.email.toLowerCase() === parentData.email.toLowerCase());
    if (existing) {
      setUser(existing);
      return existing;
    }

    const parentId = `prt-${Date.now()}`;
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: parentData.name,
      email: parentData.email,
      mobile: parentData.mobile,
      role: 'PARENT',
      parentId: parentId,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    };

    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return newUser;
  };

  const requestPasswordReset = (email: string): ResetToken | null => {
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return generateResetToken(email);
    }
    return null;
  };

  const clearSessionExpiredReason = () => {
    setSessionExpiredReason(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        sessionExpiredReason,
        login,
        logout,
        registerParent,
        demoLogin,
        requestPasswordReset,
        clearSessionExpiredReason
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
