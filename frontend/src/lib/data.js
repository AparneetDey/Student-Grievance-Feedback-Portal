// Dummy user data
export const dummyUsers = {
    '1': {
      id: '1',
      email: 'student@university.edu',
      name: 'Alex Johnson',
      role: 'student',
      studentId: 'STU20230001',
      department: 'Computer Science',
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-03-10'),
    },
    '2': {
      id: '2',
      email: 'admin@university.edu',
      name: 'Sarah Admin',
      role: 'admin',
      studentId: null,
      department: 'Administration',
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2024-03-10'),
    },
    '3': {
      id: '3',
      email: 'mentor@university.edu',
      name: 'Professor Mark',
      role: 'mentor',
      studentId: null,
      department: 'Computer Science',
      createdAt: new Date('2023-08-15'),
      updatedAt: new Date('2024-03-10'),
    },
  };
  
  // Dummy grievances data
  export const dummyGrievances = [
    {
      id: '1',
      anonymous: false,
      category: 'academic',
      title: 'Unfair Grading in CS 101',
      description: 'I believe my midterm exam was graded incorrectly. The solution I provided matches the expected output shown in class.',
      status: 'open',
      priority: 'high',
      createdAt: new Date('2024-03-08'),
      updatedAt: new Date('2024-03-10'),
      userId: '1',
    },
    {
      id: '2',
      anonymous: true,
      category: 'infrastructure',
      title: 'Library Wi-Fi Connectivity Issues',
      description: 'The Wi-Fi network in the library has been extremely slow and frequently disconnects, affecting study sessions.',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date('2024-02-25'),
      updatedAt: new Date('2024-03-09'),
      userId: '1',
    },
    {
      id: '3',
      anonymous: false,
      category: 'hostel',
      title: 'Inadequate Hot Water Supply',
      description: 'Hot water is available for only 2 hours in the morning. This needs to be extended to evening hours as well.',
      status: 'resolved',
      priority: 'low',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-03-01'),
      userId: '1',
    },
    {
      id: '4',
      anonymous: false,
      category: 'placement',
      title: 'Placement Drive Schedule Conflict',
      description: 'The placement drive scheduled for March 15 conflicts with my exam timetable. Request for reschedule.',
      status: 'open',
      priority: 'high',
      createdAt: new Date('2024-03-05'),
      updatedAt: new Date('2024-03-10'),
      userId: '1',
    },
    {
      id: '5',
      anonymous: true,
      category: 'academic',
      title: 'Missing Course Materials',
      description: 'Lecture slides and assignment PDFs for last week are not uploaded on the course portal.',
      status: 'resolved',
      priority: 'medium',
      createdAt: new Date('2024-02-28'),
      updatedAt: new Date('2024-03-03'),
      userId: '1',
    },
    {
      id: '6',
      anonymous: false,
      category: 'health',
      title: 'First Aid Kit Missing in Lab 3',
      description: 'The first aid kit is completely empty in Chemistry Lab 3. This is a major safety hazard.',
      status: 'open',
      priority: 'high',
      createdAt: new Date('2024-04-20'),
      updatedAt: new Date('2024-04-20'),
      userId: '2',
    },
    {
      id: '7',
      anonymous: true,
      category: 'infrastructure',
      title: 'Broken Chairs in Seminar Hall',
      description: 'Multiple chairs in the back row of the main seminar hall are broken and unusable.',
      status: 'in-progress',
      priority: 'low',
      createdAt: new Date('2024-04-18'),
      updatedAt: new Date('2024-04-19'),
      userId: '1',
    },
    {
      id: '8',
      anonymous: false,
      category: 'other',
      title: 'Campus Cafe Menu Variety',
      description: 'The campus cafe lacks vegan and dairy-free options. Requesting an updated menu.',
      status: 'open',
      priority: 'low',
      createdAt: new Date('2024-04-22'),
      updatedAt: new Date('2024-04-22'),
      userId: '3',
    },
  ];
  
  // Dummy comments data
  export const dummyComments = [
    {
      id: '1',
      grievanceId: '1',
      content: 'Thank you for submitting your grievance. We have reviewed your exam and will conduct a detailed analysis. Please expect a resolution within 3 days.',
      isAdminResponse: true,
      createdAt: new Date('2024-03-09'),
      userId: '2',
    },
    {
      id: '2',
      grievanceId: '1',
      content: 'I have attached my work and the rubric. Looking forward to the review.',
      isAdminResponse: false,
      createdAt: new Date('2024-03-09T10:30:00'),
      userId: '1',
    },
    {
      id: '3',
      grievanceId: '2',
      content: 'We are currently investigating the Wi-Fi issues. IT team is working on improving the network infrastructure.',
      isAdminResponse: true,
      createdAt: new Date('2024-03-10'),
      userId: '2',
    },
    {
      id: '4',
      grievanceId: '3',
      content: 'The hot water system has been upgraded. It is now available from 6 AM to 9 PM daily.',
      isAdminResponse: true,
      createdAt: new Date('2024-03-01'),
      userId: '2',
    },
  ];
  
  // Dummy notifications data
  export const dummyNotifications = [
    {
      id: '1',
      grievanceId: '1',
      userId: '1',
      title: 'Grievance Updated',
      message: 'Your grievance "Unfair Grading in CS 101" has been moved to review status.',
      type: 'update',
      isRead: false,
      scheduledAt: new Date('2024-03-10T08:00:00'),
      sentAt: new Date('2024-03-10T08:05:00'),
    },
    {
      id: '2',
      grievanceId: '2',
      userId: '1',
      title: 'Admin Response',
      message: 'There is a new admin response to your grievance. Please check it.',
      type: 'response',
      isRead: true,
      scheduledAt: new Date('2024-03-10T07:00:00'),
      sentAt: new Date('2024-03-10T07:05:00'),
    },
    {
      id: '3',
      grievanceId: null,
      userId: '1',
      title: 'System Announcement',
      message: 'Maintenance window scheduled for March 12, 2024 from 2-4 AM. System may be unavailable.',
      type: 'announcement',
      isRead: true,
      scheduledAt: new Date('2024-03-08T09:00:00'),
      sentAt: new Date('2024-03-08T09:00:00'),
    },
  ];
  
  // Dummy attachments data
  export const dummyAttachments = [
    {
      id: '1',
      fileName: 'exam_solution.pdf',
      fileType: 'application/pdf',
      fileUrl: '/files/exam_solution.pdf',
      uploadedAt: new Date('2024-03-09T10:30:00'),
      grievanceId: '1',
    },
    {
      id: '2',
      fileName: 'grading_rubric.pdf',
      fileType: 'application/pdf',
      fileUrl: '/files/grading_rubric.pdf',
      uploadedAt: new Date('2024-03-09T10:31:00'),
      grievanceId: '1',
    },
  ];
  
  // Helper functions
  export const getGrievanceById = (id) => dummyGrievances.find(g => g.id === id);
  export const getCommentsByGrievanceId = (grievanceId) => dummyComments.filter(c => c.grievanceId === grievanceId);
  export const getAttachmentsByGrievanceId = (grievanceId) => dummyAttachments.filter(a => a.grievanceId === grievanceId);
  export const getNotificationsByUserId = (userId) => dummyNotifications.filter(n => n.userId === userId);
  export const getUserById = (userId) => dummyUsers[userId];
  
  // Category and status options
  export const GRIEVANCE_CATEGORIES = [
    { value: 'academic', label: 'Academic' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'placement', label: 'Placement' },
    { value: 'health', label: 'Health & Safety' },
    { value: 'other', label: 'Other' },
  ];
  
  export const GRIEVANCE_STATUSES = [
    { value: 'open', label: 'Open', color: 'bg-blue-100 text-blue-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-800' },
  ];
  
  export const GRIEVANCE_PRIORITIES = [
    { value: 'low', label: 'Low', color: 'text-blue-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' },
  ];
  
  export const USER_ROLES = [
    { value: 'student', label: 'Student' },
    { value: 'admin', label: 'Administrator' },
    { value: 'mentor', label: 'Mentor' },
  ];
  