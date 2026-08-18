import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  AdmissionApplication,
  ClassRoom,
  Teacher,
  Parent,
  Student,
  FeeStructure,
  FeePayment,
  AttendanceRecord,
  ProgressReport,
  DailyUpdate,
  Notification,
  ApplicationStatus
} from '../types';
import {
  initialAdmissions,
  initialClasses,
  initialTeachers,
  initialParents,
  initialStudents,
  initialFeeStructures,
  initialFeePayments,
  initialAttendance,
  initialProgressReports,
  initialDailyUpdates,
  initialNotifications
} from '../services/mockData';

interface DataContextType {
  applications: AdmissionApplication[];
  classes: ClassRoom[];
  teachers: Teacher[];
  parents: Parent[];
  students: Student[];
  feeStructures: FeeStructure[];
  feePayments: FeePayment[];
  attendance: AttendanceRecord[];
  progressReports: ProgressReport[];
  dailyUpdates: DailyUpdate[];
  notifications: Notification[];

  // Methods
  submitAdmission: (data: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>) => AdmissionApplication;
  updateAdmissionStatus: (id: string, status: ApplicationStatus, remarks?: string, missingDocs?: string) => void;
  addStudent: (data: Omit<Student, 'id' | 'admissionNumber'>) => Student;
  updateStudent: (student: Student) => void;
  addTeacher: (data: Omit<Teacher, 'id' | 'joinedDate'>) => Teacher;
  updateTeacher: (teacher: Teacher) => void;
  processPayment: (paymentId: string, paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash') => boolean;
  markAttendanceBatch: (records: Omit<AttendanceRecord, 'id'>[]) => void;
  saveDailyUpdate: (update: Omit<DailyUpdate, 'id'>) => DailyUpdate;
  saveProgressReport: (report: Omit<ProgressReport, 'id' | 'evaluatedDate'>) => ProgressReport;
  broadcastNotification: (notif: Omit<Notification, 'id' | 'date' | 'isRead'>) => Notification;
  markNotificationRead: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  getParentChildren: (parentId: string) => Student[];
  getTeacherStudents: (teacherId: string) => Student[];
  getClassStudents: (classId: string) => Student[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_PREFIX = 'happy_hearts_';

function useLocalStorageState<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Failed parsing storage for ${key}`, e);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useLocalStorageState<AdmissionApplication[]>('admissions', initialAdmissions);
  const [classes] = useLocalStorageState<ClassRoom[]>('classes', initialClasses);
  const [teachers, setTeachers] = useLocalStorageState<Teacher[]>('teachers', initialTeachers);
  const [parents, setParents] = useLocalStorageState<Parent[]>('parents', initialParents);
  const [students, setStudents] = useLocalStorageState<Student[]>('students', initialStudents);
  const [feeStructures] = useLocalStorageState<FeeStructure[]>('fee_structures', initialFeeStructures);
  const [feePayments, setFeePayments] = useLocalStorageState<FeePayment[]>('fee_payments', initialFeePayments);
  const [attendance, setAttendance] = useLocalStorageState<AttendanceRecord[]>('attendance', initialAttendance);
  const [progressReports, setProgressReports] = useLocalStorageState<ProgressReport[]>('progress_reports', initialProgressReports);
  const [dailyUpdates, setDailyUpdates] = useLocalStorageState<DailyUpdate[]>('daily_updates', initialDailyUpdates);
  const [notifications, setNotifications] = useLocalStorageState<Notification[]>('notifications', initialNotifications);

  const submitAdmission = (data: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>): AdmissionApplication => {
    const id = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: AdmissionApplication = {
      ...data,
      id,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      feeStatus: 'PENDING'
    };

    setApplications(prev => [newApp, ...prev]);

    // Also auto-create notification for admin
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: `New Admission Application: ${data.childFullName}`,
      message: `Application ${id} submitted for ${data.applyingForProgram} by ${data.parentName}.`,
      category: 'Admission',
      targetAudience: 'ALL',
      isRead: false,
      createdBy: 'Admission Portal'
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newApp;
  };

  const updateAdmissionStatus = (id: string, status: ApplicationStatus, remarks?: string, missingDocs?: string) => {
    setApplications(prev =>
      prev.map(app => {
        if (app.id === id) {
          const updated = {
            ...app,
            status,
            adminRemarks: remarks !== undefined ? remarks : app.adminRemarks,
            missingDocumentsNote: missingDocs !== undefined ? missingDocs : app.missingDocumentsNote
          };

          // If approved, ensure parent account exists or link student if auto-admitted
          if (status === 'Admitted') {
            updated.feeStatus = 'PAID';
          }
          return updated;
        }
        return app;
      })
    );
  };

  const addStudent = (data: Omit<Student, 'id' | 'admissionNumber'>): Student => {
    const admissionNumber = `HH-2026-${String(students.length + 1).padStart(3, '0')}`;
    const newStudent: Student = {
      ...data,
      id: `std-${Date.now()}`,
      admissionNumber
    };
    setStudents(prev => [...prev, newStudent]);

    // Update parent's linked children
    setParents(prev =>
      prev.map(p => {
        if (p.id === data.parentId) {
          return { ...p, childrenIds: Array.from(new Set([...p.childrenIds, newStudent.id])) };
        }
        return p;
      })
    );

    return newStudent;
  };

  const updateStudent = (student: Student) => {
    setStudents(prev => prev.map(s => (s.id === student.id ? student : s)));
  };

  const addTeacher = (data: Omit<Teacher, 'id' | 'joinedDate'>): Teacher => {
    const newTeacher: Teacher = {
      ...data,
      id: `tch-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setTeachers(prev => [...prev, newTeacher]);
    return newTeacher;
  };

  const updateTeacher = (teacher: Teacher) => {
    setTeachers(prev => prev.map(t => (t.id === teacher.id ? teacher : t)));
  };

  const processPayment = (paymentId: string, paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash'): boolean => {
    const txnId = `TXN-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
    const today = new Date().toISOString().split('T')[0];

    let success = false;
    setFeePayments(prev =>
      prev.map(pay => {
        if (pay.id === paymentId) {
          success = true;
          return {
            ...pay,
            paidAmount: pay.totalAmount,
            pendingAmount: 0,
            paymentStatus: 'PAID',
            paymentDate: today,
            paymentMethod,
            transactionId: txnId,
            gatewayProvider: 'Razorpay Gateway Simulator'
          };
        }
        return pay;
      })
    );

    return success;
  };

  const markAttendanceBatch = (records: Omit<AttendanceRecord, 'id'>[]) => {
    setAttendance(prev => {
      // Remove any existing records for the same date & student
      const date = records[0]?.date;
      const filtered = prev.filter(r => r.date !== date || !records.some(rec => rec.studentId === r.studentId));
      const newEntries: AttendanceRecord[] = records.map(r => ({
        ...r,
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
      }));
      return [...newEntries, ...filtered];
    });
  };

  const saveDailyUpdate = (update: Omit<DailyUpdate, 'id'>): DailyUpdate => {
    const newUpdate: DailyUpdate = {
      ...update,
      id: `upd-${Date.now()}`
    };
    setDailyUpdates(prev => [newUpdate, ...prev]);
    return newUpdate;
  };

  const saveProgressReport = (report: Omit<ProgressReport, 'id' | 'evaluatedDate'>): ProgressReport => {
    const newReport: ProgressReport = {
      ...report,
      id: `prg-${Date.now()}`,
      evaluatedDate: new Date().toISOString().split('T')[0]
    };
    setProgressReports(prev => [newReport, ...prev]);
    return newReport;
  };

  const broadcastNotification = (notif: Omit<Notification, 'id' | 'date' | 'isRead'>): Notification => {
    const newNotif: Notification = {
      ...notif,
      id: `notif-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    return newNotif;
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const getStudentById = (id: string) => students.find(s => s.id === id);

  const getParentChildren = (parentId: string) => {
    const p = parents.find(parent => parent.id === parentId || parent.userId === parentId);
    if (p) {
      return students.filter(s => p.childrenIds.includes(s.id) || s.parentId === p.id || s.parentEmail === p.email);
    }
    return students.filter(s => s.parentId === parentId);
  };

  const getTeacherStudents = (teacherId: string) => {
    return students.filter(s => s.teacherId === teacherId);
  };

  const getClassStudents = (classId: string) => {
    return students.filter(s => s.classId === classId);
  };

  return (
    <DataContext.Provider
      value={{
        applications,
        classes,
        teachers,
        parents,
        students,
        feeStructures,
        feePayments,
        attendance,
        progressReports,
        dailyUpdates,
        notifications,
        submitAdmission,
        updateAdmissionStatus,
        addStudent,
        updateStudent,
        addTeacher,
        updateTeacher,
        processPayment,
        markAttendanceBatch,
        saveDailyUpdate,
        saveProgressReport,
        broadcastNotification,
        markNotificationRead,
        getStudentById,
        getParentChildren,
        getTeacherStudents,
        getClassStudents
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
