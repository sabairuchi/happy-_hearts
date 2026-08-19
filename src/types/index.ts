export type Role = 'ADMIN' | 'TEACHER' | 'PARENT';

export type ApplicationStatus = 
  | 'Submitted' 
  | 'Under Review' 
  | 'Documents Required' 
  | 'Approved' 
  | 'Fee Pending' 
  | 'Admitted' 
  | 'Rejected';

export type FeeStatus = 'PAID' | 'PENDING' | 'PARTIALLY PAID' | 'OVERDUE';

export type AttendanceStatus = 'Present' | 'Absent' | 'Leave';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  mobile?: string;
  avatar?: string;
  teacherId?: string;
  parentId?: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: string;
  dataUrl: string;
  uploadedAt: string;
}

export interface AdmissionApplication {
  id: string; // Application Number e.g. APP-2026-1001
  submittedAt: string;
  status: ApplicationStatus;
  
  // Step 1: Child Info
  childFullName: string;
  childDob: string;
  childGender: 'Boy' | 'Girl' | 'Other';
  applyingForProgram: string; // e.g. 'Toddler Crèche', 'Playgroup', 'Nursery', 'Kindergarten'
  previousSchool?: string;
  childAddress: string;

  // Step 2: Parent/Guardian Info
  parentName: string;
  parentRelationship: string;
  parentEmail: string;
  parentMobile: string;
  parentAltPhone?: string;
  parentAddress: string;

  // Step 3: Emergency Contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;

  // Step 4: Documents
  documents: {
    photo?: DocumentFile;
    birthCertificate?: DocumentFile;
    addressProof?: DocumentFile;
    parentIdProof?: DocumentFile;
    otherDocs?: DocumentFile[];
  };

  // Review & Admin notes
  termsAccepted: boolean;
  adminRemarks?: string;
  missingDocumentsNote?: string;
  feeStatus?: FeeStatus;
}

export interface ClassRoom {
  id: string;
  name: string; // e.g. 'Playgroup Sunshine', 'Nursery Explorers'
  programType: string;
  ageGroup: string;
  teacherId?: string;
  capacity: number;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  qualification: string;
  experienceYears: number;
  assignedClassId?: string;
  assignedClassName?: string;
  isActive: boolean;
  joinedDate: string;
  bio?: string;
}

export interface Parent {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobile: string;
  altPhone?: string;
  address: string;
  relationship: string;
  occupation?: string;
  childrenIds: string[];
  isActive?: boolean;
}

export interface Student {
  id: string;
  admissionNumber: string; // e.g. HH-2026-042
  applicationId?: string;
  name: string;
  dob: string;
  gender: 'Boy' | 'Girl' | 'Other';
  photo?: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  parentId: string;
  parentName: string;
  parentEmail: string;
  parentMobile: string;
  emergencyName: string;
  emergencyPhone: string;
  joiningDate: string;
  medicalNotes?: string;
  status: 'Active' | 'Inactive' | 'Graduated';
}

export interface FeeStructure {
  id: string;
  programName: string;
  admissionFee: number;
  monthlyTuitionFee: number;
  crecheDaycareFee: number;
  activityFee: number;
  materialFee: number;
  transportFee: number;
  siblingDiscountPercent: number;
  dueDateDayOfMonth: number;
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  studentId: string;
  studentName: string;
  className: string;
  parentId: string;
  parentName: string;
  monthYear: string; // e.g. 'August 2026'
  admissionFee: number;
  tuitionFee: number;
  crecheFee: number;
  activityFee: number;
  materialFee: number;
  transportFee: number;
  discount: number;
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  dueDate: string;
  paymentStatus: FeeStatus;
  paymentDate?: string;
  paymentMethod?: 'UPI' | 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash';
  transactionId?: string;
  gatewayProvider?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  classId: string;
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  remarks?: string;
  markedByTeacherId: string;
}

export interface ProgressReport {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  termPeriod: string; // e.g. 'Term 1 - 2026'
  evaluatedDate: string;
  teacherId: string;
  teacherName: string;
  
  // Early Childhood Domains
  communication: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  socialDevelopment: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  motorSkills: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  cognitiveDevelopment: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  creativity: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  participation: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  personalDevelopment: 'Excellent' | 'Good' | 'Developing' | 'Needs Support';
  
  teacherRemarks: string;
  developmentNotes: string;
}

export interface DailyUpdate {
  id: string;
  date: string; // YYYY-MM-DD
  studentId: string;
  studentName: string;
  className: string;
  teacherId: string;
  teacherName: string;
  todayActivities: string[];
  learningActivities: string;
  mealsSnacks: string;
  napRestTime: string;
  specialObservations?: string;
  teacherRemarks?: string;
}

export interface Notification {
  id: string;
  date: string;
  title: string;
  message: string;
  category: 'Admission' | 'Fee Reminder' | 'Holiday' | 'Event' | 'PTM' | 'Notice' | 'General';
  targetAudience: 'ALL_PARENTS' | 'SPECIFIC_PARENT' | 'SPECIFIC_CLASS' | 'TEACHERS' | 'ALL';
  targetParentId?: string;
  targetClassId?: string;
  isRead: boolean;
  createdBy: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  targetAudience: 'All Parents' | 'Teachers' | 'Specific Program' | 'Everyone';
  programName?: string;
  status: 'Published' | 'Draft' | 'Unpublished';
  author: string;
  publishedAt?: string;
}

