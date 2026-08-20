import type { 
  User, 
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
  ChatMessage
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr-admin-1',
    name: 'Admin Director',
    email: 'admin@happyhearts.com',
    role: 'ADMIN',
    mobile: '+1 (555) 019-2831',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'usr-teacher-1',
    name: 'Sarah Jenkins',
    email: 'teacher@happyhearts.com',
    role: 'TEACHER',
    teacherId: 'tch-1',
    mobile: '+1 (555) 012-3456',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'usr-teacher-2',
    name: 'Michael Chang',
    email: 'michael.c@happyhearts.com',
    role: 'TEACHER',
    teacherId: 'tch-2',
    mobile: '+1 (555) 014-7890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'usr-parent-1',
    name: 'Emily Watson',
    email: 'parent@happyhearts.com',
    role: 'PARENT',
    parentId: 'prt-1',
    mobile: '+1 (555) 018-9922',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'usr-parent-2',
    name: 'Robert Garcia',
    email: 'robert.g@happyhearts.com',
    role: 'PARENT',
    parentId: 'prt-2',
    mobile: '+1 (555) 019-3344',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200'
  }
];

export const initialClasses: ClassRoom[] = [
  {
    id: 'cls-1',
    name: 'Playgroup Sunshine',
    programType: 'Playgroup',
    ageGroup: '1.5 - 2.5 Years',
    teacherId: 'tch-1',
    capacity: 15
  },
  {
    id: 'cls-2',
    name: 'Nursery Explorers',
    programType: 'Nursery',
    ageGroup: '2.5 - 3.5 Years',
    teacherId: 'tch-2',
    capacity: 18
  },
  {
    id: 'cls-3',
    name: 'Kindergarten Little Stars',
    programType: 'Kindergarten',
    ageGroup: '3.5 - 5 Years',
    teacherId: 'tch-1',
    capacity: 20
  },
  {
    id: 'cls-4',
    name: 'Toddler Crèche & Daycare',
    programType: 'Crèche & Daycare',
    ageGroup: '6 Months - 3 Years',
    teacherId: 'tch-2',
    capacity: 12
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 'tch-1',
    name: 'Sarah Jenkins',
    email: 'teacher@happyhearts.com',
    phone: '+1 (555) 012-3456',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    qualification: 'M.Ed in Early Childhood Education',
    experienceYears: 7,
    assignedClassId: 'cls-1',
    assignedClassName: 'Playgroup Sunshine',
    isActive: true,
    joinedDate: '2022-08-15',
    bio: 'Passionate about sensory-based play and emotional development in early childhood.'
  },
  {
    id: 'tch-2',
    name: 'Michael Chang',
    email: 'michael.c@happyhearts.com',
    phone: '+1 (555) 014-7890',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    qualification: 'B.S. in Child Psychology & Development',
    experienceYears: 5,
    assignedClassId: 'cls-2',
    assignedClassName: 'Nursery Explorers',
    isActive: true,
    joinedDate: '2023-01-10',
    bio: 'Specialized in creative arts, motor skills enhancement, and STEM for toddlers.'
  }
];

export const initialParents: Parent[] = [
  {
    id: 'prt-1',
    userId: 'usr-parent-1',
    name: 'Emily Watson',
    email: 'parent@happyhearts.com',
    mobile: '+1 (555) 018-9922',
    altPhone: '+1 (555) 018-9923',
    address: '742 Evergreen Terrace, Springfield',
    relationship: 'Mother',
    occupation: 'Software Engineer',
    childrenIds: ['std-1', 'std-2']
  },
  {
    id: 'prt-2',
    userId: 'usr-parent-2',
    name: 'Robert Garcia',
    email: 'robert.g@happyhearts.com',
    mobile: '+1 (555) 019-3344',
    address: '104 Ocean Drive, Bay Area',
    relationship: 'Father',
    occupation: 'Architect',
    childrenIds: ['std-3']
  }
];

export const initialStudents: Student[] = [
  {
    id: 'std-1',
    admissionNumber: 'HH-2026-001',
    applicationId: 'APP-2026-1001',
    name: 'Lily Watson',
    dob: '2023-05-14',
    gender: 'Girl',
    photo: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=400',
    classId: 'cls-1',
    className: 'Playgroup Sunshine',
    teacherId: 'tch-1',
    teacherName: 'Sarah Jenkins',
    parentId: 'prt-1',
    parentName: 'Emily Watson',
    parentEmail: 'parent@happyhearts.com',
    parentMobile: '+1 (555) 018-9922',
    emergencyName: 'David Watson (Father)',
    emergencyPhone: '+1 (555) 018-9923',
    joiningDate: '2025-09-01',
    medicalNotes: 'Mild peanut allergy. Keeps epinephrine in school clinic.',
    status: 'Active'
  },
  {
    id: 'std-2',
    admissionNumber: 'HH-2026-002',
    applicationId: 'APP-2026-1002',
    name: 'Leo Watson',
    dob: '2024-11-02',
    gender: 'Boy',
    photo: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    classId: 'cls-4',
    className: 'Toddler Crèche & Daycare',
    teacherId: 'tch-2',
    teacherName: 'Michael Chang',
    parentId: 'prt-1',
    parentName: 'Emily Watson',
    parentEmail: 'parent@happyhearts.com',
    parentMobile: '+1 (555) 018-9922',
    emergencyName: 'David Watson (Father)',
    emergencyPhone: '+1 (555) 018-9923',
    joiningDate: '2026-01-10',
    medicalNotes: 'None',
    status: 'Active'
  },
  {
    id: 'std-3',
    admissionNumber: 'HH-2026-003',
    applicationId: 'APP-2026-1003',
    name: 'Sophia Garcia',
    dob: '2022-09-20',
    gender: 'Girl',
    photo: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400',
    classId: 'cls-2',
    className: 'Nursery Explorers',
    teacherId: 'tch-2',
    teacherName: 'Michael Chang',
    parentId: 'prt-2',
    parentName: 'Robert Garcia',
    parentEmail: 'robert.g@happyhearts.com',
    parentMobile: '+1 (555) 019-3344',
    emergencyName: 'Elena Garcia (Mother)',
    emergencyPhone: '+1 (555) 019-3345',
    joiningDate: '2025-08-20',
    medicalNotes: 'Lactose intolerant',
    status: 'Active'
  }
];

export const initialAdmissions: AdmissionApplication[] = [
  {
    id: 'APP-2026-1001',
    submittedAt: '2026-01-15',
    status: 'Admitted',
    childFullName: 'Lily Watson',
    childDob: '2023-05-14',
    childGender: 'Girl',
    applyingForProgram: 'Playgroup',
    previousSchool: 'Home Care',
    childAddress: '742 Evergreen Terrace, Springfield',
    parentName: 'Emily Watson',
    parentRelationship: 'Mother',
    parentEmail: 'parent@happyhearts.com',
    parentMobile: '+1 (555) 018-9922',
    parentAltPhone: '+1 (555) 018-9923',
    parentAddress: '742 Evergreen Terrace, Springfield',
    emergencyName: 'David Watson',
    emergencyRelationship: 'Father',
    emergencyPhone: '+1 (555) 018-9923',
    documents: {},
    termsAccepted: true,
    adminRemarks: 'Application verified and student admitted into Playgroup Sunshine.',
    feeStatus: 'PAID'
  },
  {
    id: 'APP-2026-1004',
    submittedAt: '2026-08-10',
    status: 'Under Review',
    childFullName: 'Noah Miller',
    childDob: '2023-08-04',
    childGender: 'Boy',
    applyingForProgram: 'Playgroup',
    previousSchool: 'Sunshine Toddlers',
    childAddress: '12 Maple Avenue, Springfield',
    parentName: 'Jessica Miller',
    parentRelationship: 'Mother',
    parentEmail: 'jessica.m@gmail.com',
    parentMobile: '+1 (555) 088-7711',
    parentAddress: '12 Maple Avenue, Springfield',
    emergencyName: 'Mark Miller',
    emergencyRelationship: 'Father',
    emergencyPhone: '+1 (555) 088-7722',
    documents: {},
    termsAccepted: true,
    adminRemarks: 'Documents currently being verified by admission officer.',
    missingDocumentsNote: 'Parent ID proof copy needs clear signature.',
    feeStatus: 'PENDING'
  },
  {
    id: 'APP-2026-1005',
    submittedAt: '2026-08-14',
    status: 'Approved',
    childFullName: 'Oliver Brown',
    childDob: '2022-12-10',
    childGender: 'Boy',
    applyingForProgram: 'Nursery',
    childAddress: '45 Pine Ridge Road, Springfield',
    parentName: 'David Brown',
    parentRelationship: 'Father',
    parentEmail: 'david.b@yahoo.com',
    parentMobile: '+1 (555) 033-4455',
    parentAddress: '45 Pine Ridge Road, Springfield',
    emergencyName: 'Sarah Brown',
    emergencyRelationship: 'Mother',
    emergencyPhone: '+1 (555) 033-4466',
    documents: {},
    termsAccepted: true,
    adminRemarks: 'Approved for Nursery Explorers. Pending admission fee payment.',
    feeStatus: 'PENDING'
  }
];

export const initialFeeStructures: FeeStructure[] = [
  {
    id: 'fee-struct-1',
    programName: 'Playgroup',
    admissionFee: 350,
    monthlyTuitionFee: 250,
    crecheDaycareFee: 0,
    activityFee: 50,
    materialFee: 30,
    transportFee: 40,
    siblingDiscountPercent: 10,
    dueDateDayOfMonth: 5
  },
  {
    id: 'fee-struct-2',
    programName: 'Nursery',
    admissionFee: 400,
    monthlyTuitionFee: 280,
    crecheDaycareFee: 0,
    activityFee: 60,
    materialFee: 40,
    transportFee: 40,
    siblingDiscountPercent: 10,
    dueDateDayOfMonth: 5
  },
  {
    id: 'fee-struct-3',
    programName: 'Crèche & Daycare',
    admissionFee: 300,
    monthlyTuitionFee: 200,
    crecheDaycareFee: 180,
    activityFee: 30,
    materialFee: 20,
    transportFee: 0,
    siblingDiscountPercent: 15,
    dueDateDayOfMonth: 5
  }
];

export const initialFeePayments: FeePayment[] = [
  {
    id: 'pay-101',
    receiptNumber: 'RCP-2026-081',
    studentId: 'std-1',
    studentName: 'Lily Watson',
    className: 'Playgroup Sunshine',
    parentId: 'prt-1',
    parentName: 'Emily Watson',
    monthYear: 'August 2026',
    admissionFee: 0,
    tuitionFee: 250,
    crecheFee: 0,
    activityFee: 50,
    materialFee: 30,
    transportFee: 40,
    discount: 37, // 10% sibling discount
    totalAmount: 333,
    paidAmount: 333,
    pendingAmount: 0,
    dueDate: '2026-08-05',
    paymentStatus: 'PAID',
    paymentDate: '2026-08-03',
    paymentMethod: 'UPI',
    transactionId: 'TXN-9842103847',
    gatewayProvider: 'Razorpay Simulator'
  },
  {
    id: 'pay-102',
    receiptNumber: 'RCP-2026-082',
    studentId: 'std-2',
    studentName: 'Leo Watson',
    className: 'Toddler Crèche & Daycare',
    parentId: 'prt-1',
    parentName: 'Emily Watson',
    monthYear: 'August 2026',
    admissionFee: 0,
    tuitionFee: 200,
    crecheFee: 180,
    activityFee: 30,
    materialFee: 20,
    transportFee: 0,
    discount: 64, // Sibling discount
    totalAmount: 366,
    paidAmount: 0,
    pendingAmount: 366,
    dueDate: '2026-08-05',
    paymentStatus: 'PENDING'
  },
  {
    id: 'pay-103',
    receiptNumber: 'RCP-2026-083',
    studentId: 'std-3',
    studentName: 'Sophia Garcia',
    className: 'Nursery Explorers',
    parentId: 'prt-2',
    parentName: 'Robert Garcia',
    monthYear: 'August 2026',
    admissionFee: 0,
    tuitionFee: 280,
    crecheFee: 0,
    activityFee: 60,
    materialFee: 40,
    transportFee: 40,
    discount: 0,
    totalAmount: 420,
    paidAmount: 420,
    pendingAmount: 0,
    dueDate: '2026-08-05',
    paymentStatus: 'PAID',
    paymentDate: '2026-08-04',
    paymentMethod: 'Credit Card',
    transactionId: 'TXN-7738210982',
    gatewayProvider: 'Razorpay Simulator'
  }
];

export const initialAttendance: AttendanceRecord[] = [
  {
    id: 'att-1',
    date: '2026-08-18',
    classId: 'cls-1',
    studentId: 'std-1',
    studentName: 'Lily Watson',
    status: 'Present',
    markedByTeacherId: 'tch-1'
  },
  {
    id: 'att-2',
    date: '2026-08-18',
    classId: 'cls-4',
    studentId: 'std-2',
    studentName: 'Leo Watson',
    status: 'Present',
    markedByTeacherId: 'tch-2'
  },
  {
    id: 'att-3',
    date: '2026-08-18',
    classId: 'cls-2',
    studentId: 'std-3',
    studentName: 'Sophia Garcia',
    status: 'Leave',
    remarks: 'Family out of town',
    markedByTeacherId: 'tch-2'
  },
  {
    id: 'att-4',
    date: '2026-08-17',
    classId: 'cls-1',
    studentId: 'std-1',
    studentName: 'Lily Watson',
    status: 'Present',
    markedByTeacherId: 'tch-1'
  },
  {
    id: 'att-5',
    date: '2026-08-17',
    classId: 'cls-4',
    studentId: 'std-2',
    studentName: 'Leo Watson',
    status: 'Present',
    markedByTeacherId: 'tch-2'
  }
];

export const initialProgressReports: ProgressReport[] = [
  {
    id: 'prg-1',
    studentId: 'std-1',
    studentName: 'Lily Watson',
    className: 'Playgroup Sunshine',
    termPeriod: 'Term 1 - 2026',
    evaluatedDate: '2026-08-01',
    teacherId: 'tch-1',
    teacherName: 'Sarah Jenkins',
    communication: 'Excellent',
    socialDevelopment: 'Excellent',
    motorSkills: 'Good',
    cognitiveDevelopment: 'Excellent',
    creativity: 'Excellent',
    participation: 'Good',
    personalDevelopment: 'Excellent',
    teacherRemarks: 'Lily is a delight in class! She expresses her thoughts clearly, loves circle time storytelling, and shares toys warmly with peers.',
    developmentNotes: 'Fine motor precision is improving rapidly through clay play and painting activities.'
  },
  {
    id: 'prg-2',
    studentId: 'std-2',
    studentName: 'Leo Watson',
    className: 'Toddler Crèche & Daycare',
    termPeriod: 'Term 1 - 2026',
    evaluatedDate: '2026-08-01',
    teacherId: 'tch-2',
    teacherName: 'Michael Chang',
    communication: 'Good',
    socialDevelopment: 'Developing',
    motorSkills: 'Excellent',
    cognitiveDevelopment: 'Good',
    creativity: 'Good',
    participation: 'Good',
    personalDevelopment: 'Good',
    teacherRemarks: 'Leo is energetic and physically agile. He enjoys outdoor play and rhythmic music sessions.',
    developmentNotes: 'We are supporting Leo in building calm focus during quiet reading sessions.'
  }
];

export const initialDailyUpdates: DailyUpdate[] = [
  {
    id: 'upd-1',
    date: '2026-08-18',
    studentId: 'std-1',
    studentName: 'Lily Watson',
    className: 'Playgroup Sunshine',
    teacherId: 'tch-1',
    teacherName: 'Sarah Jenkins',
    todayActivities: ['Finger Painting', 'Story Circle: The Little Blue Engine', 'Water Play & Bubbles', 'Rhyme & Rhythm'],
    learningActivities: 'Explored primary color mixing using non-toxic finger paints.',
    mealsSnacks: 'Ate full morning fruit bowl (apples & bananas) and full lunch of vegetable soup with rice.',
    napRestTime: 'Rested comfortably for 1 hour and 20 minutes from 1:00 PM to 2:20 PM.',
    specialObservations: 'Showed great empathy helping a classmate pick up crayons.',
    teacherRemarks: 'Wonderful day overall! Very active and happy throughout.'
  },
  {
    id: 'upd-2',
    date: '2026-08-18',
    studentId: 'std-2',
    studentName: 'Leo Watson',
    className: 'Toddler Crèche & Daycare',
    teacherId: 'tch-2',
    teacherName: 'Michael Chang',
    todayActivities: ['Soft Block Building', 'Sensory Texture Mat Exploration', 'Outdoor Garden Walk'],
    learningActivities: 'Practiced stacking wooden blocks into towers of 5.',
    mealsSnacks: 'Ate complete lunch and drank whole glass of milk during afternoon snack.',
    napRestTime: 'Slept soundly for 2 hours during afternoon crèche nap time.',
    specialObservations: 'Enjoyed the tactile sensory sandbox immensely.',
    teacherRemarks: 'Leo had a peaceful, cheerful day.'
  }
];

export const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    date: '2026-08-15',
    title: 'Upcoming Grand Parents Day Celebration',
    message: 'We warmly invite all grandparents for a special story & craft morning on Friday, August 22nd at 10:00 AM.',
    category: 'Event',
    targetAudience: 'ALL_PARENTS',
    isRead: false,
    createdBy: 'Admin Director'
  },
  {
    id: 'notif-2',
    date: '2026-08-10',
    title: 'Monthly Fee Reminder - August 2026',
    message: 'Dear Parents, please ensure pending tuition and activity fees are cleared by August 5th to avoid late processing.',
    category: 'Fee Reminder',
    targetAudience: 'ALL_PARENTS',
    isRead: true,
    createdBy: 'Admin Director'
  },
  {
    id: 'notif-3',
    date: '2026-08-01',
    title: 'Teacher Progress Reports Released',
    message: 'Term 1 developmental progress evaluations are now available in your Parent Dashboard under the Progress tab.',
    category: 'Notice',
    targetAudience: 'ALL_PARENTS',
    isRead: false,
    createdBy: 'Sarah Jenkins'
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Annual Sports & Family Fun Day 2026',
    description: 'Join us for games, races, and family activities on the school grounds. Refreshments and awards will be provided.',
    date: '2026-08-25',
    targetAudience: 'Everyone',
    status: 'Published',
    author: 'Admin Director',
    publishedAt: '2026-08-15'
  },
  {
    id: 'anc-2',
    title: 'Teacher Training & Professional Workshop',
    description: 'School will operate half-day on Friday for educator professional development in early childhood STEM education.',
    date: '2026-08-28',
    targetAudience: 'Teachers',
    status: 'Published',
    author: 'Admin Director',
    publishedAt: '2026-08-16'
  },
  {
    id: 'anc-3',
    title: 'Playgroup Field Trip to City Botanical Gardens',
    description: 'Playgroup Sunshine students will go on a guided nature walk to learn about butterflies and spring flowers.',
    date: '2026-09-02',
    targetAudience: 'Specific Program',
    programName: 'Playgroup Sunshine',
    status: 'Draft',
    author: 'Sarah Jenkins'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'usr-teacher-1',
    senderName: 'Sarah Jenkins',
    senderRole: 'TEACHER',
    receiverId: 'usr-parent-1',
    receiverName: 'Emily Watson',
    receiverRole: 'PARENT',
    message: 'Hello Emily! Welcome to the Happy Hearts portal. Let me know if you have any questions about Lilys classroom transition.',
    timestamp: '2026-08-18T09:00:00.000Z'
  },
  {
    id: 'msg-2',
    senderId: 'usr-parent-1',
    senderName: 'Emily Watson',
    senderRole: 'PARENT',
    receiverId: 'usr-teacher-1',
    receiverName: 'Sarah Jenkins',
    receiverRole: 'TEACHER',
    message: 'Hi Sarah! Thank you. I was wondering what time they usually have their morning fruit snacks and nap time?',
    timestamp: '2026-08-18T09:15:00.000Z'
  },
  {
    id: 'msg-3',
    senderId: 'usr-teacher-1',
    senderName: 'Sarah Jenkins',
    senderRole: 'TEACHER',
    receiverId: 'usr-parent-1',
    receiverName: 'Emily Watson',
    receiverRole: 'PARENT',
    message: 'Of course! Morning snack is served at 10:15 AM, and nap time starts at 1:00 PM after lunch. Lily is transitioning beautifully!',
    timestamp: '2026-08-18T09:20:00.000Z'
  }
];


