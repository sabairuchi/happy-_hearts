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
  Announcement,
  ApplicationStatus,
  ChatMessage
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
  initialNotifications,
  initialAnnouncements,
  initialChatMessages
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
  announcements: Announcement[];
  chatMessages: ChatMessage[];
  
  // Methods
  submitAdmission: (data: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>) => AdmissionApplication;
  updateAdmissionStatus: (id: string, status: ApplicationStatus, remarks?: string, missingDocs?: string) => void;
  convertAdmissionToStudent: (applicationId: string, classId: string, teacherId: string) => Student | null;
  addStudent: (data: Omit<Student, 'id' | 'admissionNumber'>) => Student;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: string) => void;
  toggleStudentStatus: (id: string, status: 'Active' | 'Inactive' | 'Graduated') => void;
  addParent: (data: Omit<Parent, 'id' | 'childrenIds'>) => Parent;
  updateParent: (parent: Parent) => void;
  toggleParentStatus: (id: string) => void;
  addTeacher: (data: Omit<Teacher, 'id' | 'joinedDate'>) => Teacher;
  updateTeacher: (teacher: Teacher) => void;
  toggleTeacherStatus: (id: string) => void;
  deleteTeacher: (id: string) => void;
  processPayment: (paymentId: string, paymentMethod: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash') => boolean;
  markAttendanceBatch: (records: Omit<AttendanceRecord, 'id'>[]) => void;
  saveDailyUpdate: (update: Omit<DailyUpdate, 'id'>) => DailyUpdate;
  saveProgressReport: (report: Omit<ProgressReport, 'id' | 'evaluatedDate'>) => ProgressReport;
  broadcastNotification: (notif: Omit<Notification, 'id' | 'date' | 'isRead'>) => Notification;
  markNotificationRead: (id: string) => void;
  addAnnouncement: (data: Omit<Announcement, 'id' | 'date'>) => Announcement;
  updateAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: string) => void;
  togglePublishAnnouncement: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
  getParentChildren: (parentId: string) => Student[];
  getTeacherStudents: (teacherId: string) => Student[];
  getClassStudents: (classId: string) => Student[];
  sendChatMessage: (senderId: string, senderName: string, senderRole: any, receiverId: string, receiverName: string, receiverRole: any, message: string) => ChatMessage;

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
  const [announcements, setAnnouncements] = useLocalStorageState<Announcement[]>('announcements', initialAnnouncements);
  const [chatMessages, setChatMessages] = useLocalStorageState<ChatMessage[]>('chat_messages', initialChatMessages);


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

          if (status === 'Admitted') {
            updated.feeStatus = 'PAID';
          }
          return updated;
        }
        return app;
      })
    );
  };

  const convertAdmissionToStudent = (applicationId: string, classId: string, teacherId: string): Student | null => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return null;

    const selClass = classes.find(c => c.id === classId);
    const selTeacher = teachers.find(t => t.id === teacherId);

    // Check if parent account exists, or create one
    let parentObj = parents.find(p => p.email.toLowerCase() === app.parentEmail.toLowerCase());
    if (!parentObj) {
      parentObj = {
        id: `prt-${Date.now()}`,
        userId: `usr-prt-${Date.now()}`,
        name: app.parentName,
        email: app.parentEmail,
        mobile: app.parentMobile,
        altPhone: app.parentAltPhone,
        address: app.parentAddress,
        relationship: app.parentRelationship,
        childrenIds: [],
        isActive: true
      };
      setParents(prev => [...prev, parentObj!]);
    }

    const admissionNumber = `HH-2026-${String(students.length + 1).padStart(3, '0')}`;
    const newStudent: Student = {
      id: `std-${Date.now()}`,
      admissionNumber,
      applicationId: app.id,
      name: app.childFullName,
      dob: app.childDob,
      gender: app.childGender,
      classId,
      className: selClass?.name || app.applyingForProgram,
      teacherId,
      teacherName: selTeacher?.name || 'Assigned Educator',
      parentId: parentObj.id,
      parentName: parentObj.name,
      parentEmail: parentObj.email,
      parentMobile: parentObj.mobile,
      emergencyName: app.emergencyName,
      emergencyPhone: app.emergencyPhone,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    setStudents(prev => [...prev, newStudent]);
    setParents(prev =>
      prev.map(p => (p.id === parentObj!.id ? { ...p, childrenIds: Array.from(new Set([...p.childrenIds, newStudent.id])) } : p))
    );

    // Auto-generate Fee invoice for the program
    const feeStruct = feeStructures.find(
      f => f.programName.toLowerCase().includes(app.applyingForProgram.toLowerCase()) ||
           app.applyingForProgram.toLowerCase().includes(f.programName.toLowerCase())
    ) || feeStructures[0];

    if (feeStruct) {
      const siblingsCount = parentObj.childrenIds.length;
      const discountPercent = siblingsCount > 0 ? feeStruct.siblingDiscountPercent : 0;
      
      const subtotal = feeStruct.monthlyTuitionFee + feeStruct.crecheDaycareFee + feeStruct.activityFee + feeStruct.materialFee + feeStruct.transportFee;
      const discount = Math.round((subtotal * discountPercent) / 100);
      const totalAmount = subtotal - discount;

      const newInvoice: FeePayment = {
        id: `pay-${Date.now()}`,
        receiptNumber: `RCP-2026-${Math.floor(100 + Math.random() * 900)}`,
        studentId: newStudent.id,
        studentName: newStudent.name,
        className: newStudent.className,
        parentId: parentObj.id,
        parentName: parentObj.name,
        monthYear: 'August 2026',
        admissionFee: feeStruct.admissionFee,
        tuitionFee: feeStruct.monthlyTuitionFee,
        crecheFee: feeStruct.crecheDaycareFee,
        activityFee: feeStruct.activityFee,
        materialFee: feeStruct.materialFee,
        transportFee: feeStruct.transportFee,
        discount: discount,
        totalAmount: totalAmount + feeStruct.admissionFee,
        paidAmount: 0,
        pendingAmount: totalAmount + feeStruct.admissionFee,
        dueDate: '2026-09-05',
        paymentStatus: 'PENDING'
      };

      setFeePayments(prev => [...prev, newInvoice]);

      // Broadcast fee reminder notification to parent
      const newNotif: Notification = {
        id: `notif-${Date.now()}-fee`,
        date: new Date().toISOString().split('T')[0],
        title: `Fee Invoice Generated: ${newStudent.name}`,
        message: `An invoice of $${newInvoice.totalAmount} for ${newStudent.className} enrollment has been generated. Please clear dues by ${newInvoice.dueDate}.`,
        category: 'Fee Reminder',
        targetAudience: 'SPECIFIC_PARENT',
        targetParentId: parentObj.id,
        isRead: false,
        createdBy: 'System Billing'
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    // Update application status to Admitted
    updateAdmissionStatus(applicationId, 'Admitted', 'Converted to enrolled student profile.');

    return newStudent;

  };

  const addStudent = (data: Omit<Student, 'id' | 'admissionNumber'>): Student => {
    const admissionNumber = `HH-2026-${String(students.length + 1).padStart(3, '0')}`;
    const newStudent: Student = {
      ...data,
      id: `std-${Date.now()}`,
      admissionNumber
    };
    setStudents(prev => [...prev, newStudent]);

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

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const toggleStudentStatus = (id: string, status: 'Active' | 'Inactive' | 'Graduated') => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, status } : s)));
  };

  const addParent = (data: Omit<Parent, 'id' | 'childrenIds'>): Parent => {
    const newParent: Parent = {
      ...data,
      id: `prt-${Date.now()}`,
      childrenIds: [],
      isActive: true
    };
    setParents(prev => [...prev, newParent]);
    return newParent;
  };

  const updateParent = (parent: Parent) => {
    setParents(prev => prev.map(p => (p.id === parent.id ? parent : p)));
  };

  const toggleParentStatus = (id: string) => {
    setParents(prev => prev.map(p => (p.id === id ? { ...p, isActive: p.isActive === false ? true : false } : p)));
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

  const toggleTeacherStatus = (id: string) => {
    setTeachers(prev => prev.map(t => (t.id === id ? { ...t, isActive: !t.isActive } : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
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

  const addAnnouncement = (data: Omit<Announcement, 'id' | 'date'>): Announcement => {
    const today = new Date().toISOString().split('T')[0];
    const newAnnouncement: Announcement = {
      ...data,
      id: `anc-${Date.now()}`,
      date: today,
      publishedAt: data.status === 'Published' ? today : undefined
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    return newAnnouncement;
  };

  const updateAnnouncement = (announcement: Announcement) => {
    setAnnouncements(prev => prev.map(a => (a.id === announcement.id ? announcement : a)));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const togglePublishAnnouncement = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setAnnouncements(prev =>
      prev.map(a => {
        if (a.id === id) {
          const nextStatus = a.status === 'Published' ? 'Unpublished' : 'Published';
          return {
            ...a,
            status: nextStatus,
            publishedAt: nextStatus === 'Published' ? today : a.publishedAt
          };
        }
        return a;
      })
    );
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
        announcements,
        submitAdmission,
        updateAdmissionStatus,
        convertAdmissionToStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        toggleStudentStatus,
        addParent,
        updateParent,
        toggleParentStatus,
        addTeacher,
        updateTeacher,
        toggleTeacherStatus,
        deleteTeacher,
        processPayment,
        markAttendanceBatch,
        saveDailyUpdate,
        saveProgressReport,
        broadcastNotification,
        markNotificationRead,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        togglePublishAnnouncement,
        getStudentById,
        getParentChildren,
        getTeacherStudents,
        getClassStudents,
        chatMessages,
        sendChatMessage: (senderId: string, senderName: string, senderRole: any, receiverId: string, receiverName: string, receiverRole: any, message: string): ChatMessage => {
          const newMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            senderId,
            senderName,
            senderRole,
            receiverId,
            receiverName,
            receiverRole,
            message,
            timestamp: new Date().toISOString()
          };
          setChatMessages(prev => [...prev, newMsg]);
          return newMsg;
        }
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

