// Firebase Database Initialization with Default Data
// मूल्यमापन Assessment System

import { getDatabase, ref, set } from 'firebase/database';

// Default school information
export const defaultSchoolData = {
  name: 'Model Primary School',
  nameMarathi: 'आदर्श प्राथमिक शाळा',
  address: 'School Complex, Education Lane',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411001',
  udiseCode: '27251234567',
  phoneNumber: '020-12345678',
  email: 'principal@modelschool.edu.in',
  principalName: 'Dr. Rajesh Kumar',
};

// Default subjects with Marathi names
export const defaultSubjects = {
  'subject1': {
    name: 'Marathi',
    nameMarathi: 'मराठी',
    maxMarks: 100,
    passingMarks: 35,
    order: 1
  },
  'subject2': {
    name: 'English',
    nameMarathi: 'इंग्रजी',
    maxMarks: 100,
    passingMarks: 35,
    order: 2
  },
  'subject3': {
    name: 'Mathematics',
    nameMarathi: 'गणित',
    maxMarks: 100,
    passingMarks: 35,
    order: 3
  },
  'subject4': {
    name: 'Science',
    nameMarathi: 'विज्ञान',
    maxMarks: 100,
    passingMarks: 35,
    order: 4
  },
  'subject5': {
    name: 'History',
    nameMarathi: 'इतिहास',
    maxMarks: 100,
    passingMarks: 35,
    order: 5
  },
  'subject6': {
    name: 'Geography',
    nameMarathi: 'भूगोल',
    maxMarks: 100,
    passingMarks: 35,
    order: 6
  },
  'subject7': {
    name: 'Drawing',
    nameMarathi: 'चित्रकला',
    maxMarks: 50,
    passingMarks: 18,
    order: 7
  }
};

// Default exam types
export const defaultExamTypes = {
  'exam1': {
    name: 'Monthly',
    nameMarathi: 'मासिक',
    weightage: 20,
    order: 1
  },
  'exam2': {
    name: 'Half-Yearly',
    nameMarathi: 'अर्धवार्षिक',
    weightage: 40,
    order: 2
  },
  'exam3': {
    name: 'Annual',
    nameMarathi: 'वार्षिक',
    weightage: 40,
    order: 3
  }
};

// Sample students data
export const sampleStudents = {
  'student1': {
    name: 'राहुल शर्मा',
    fatherName: 'विकास शर्मा',
    class: '5',
    rollNumber: 1,
    admissionDate: '2023-04-01',
    dateOfBirth: '2013-05-15',
    address: 'Flat 101, Green Valley, Pune',
    phoneNumber: '9876543210'
  },
  'student2': {
    name: 'प्रिया पाटील',
    fatherName: 'संजय पाटील',
    class: '5',
    rollNumber: 2,
    admissionDate: '2023-04-01',
    dateOfBirth: '2013-07-20',
    address: 'House 45, Sunshine Colony, Pune',
    phoneNumber: '9876543211'
  },
  'student3': {
    name: 'अमित देशमुख',
    fatherName: 'रमेश देशमुख',
    class: '6',
    rollNumber: 1,
    admissionDate: '2023-04-01',
    dateOfBirth: '2012-03-10',
    address: 'Bungalow 12, Rose Garden, Pune',
    phoneNumber: '9876543212'
  },
  'student4': {
    name: 'सुनीता जोशी',
    fatherName: 'प्रकाश जोशी',
    class: '6',
    rollNumber: 2,
    admissionDate: '2023-04-01',
    dateOfBirth: '2012-09-25',
    address: 'Apartment 203, Blue Heights, Pune',
    phoneNumber: '9876543213'
  }
};

// Sample assessments
export const sampleAssessments = {
  'assessment1': {
    studentId: 'student1',
    subjectId: 'subject1',
    examTypeId: 'exam1',
    marks: 85,
    maxMarks: 100,
    date: '2024-01-15T00:00:00Z',
    academicYear: '2023-24',
    teacherName: 'श्रीमती सुनीता राणे'
  },
  'assessment2': {
    studentId: 'student1',
    subjectId: 'subject2',
    examTypeId: 'exam1',
    marks: 78,
    maxMarks: 100,
    date: '2024-01-16T00:00:00Z',
    academicYear: '2023-24',
    teacherName: 'Mr. John Smith'
  },
  'assessment3': {
    studentId: 'student1',
    subjectId: 'subject3',
    examTypeId: 'exam1',
    marks: 92,
    maxMarks: 100,
    date: '2024-01-17T00:00:00Z',
    academicYear: '2023-24',
    teacherName: 'श्री राजेश कुमार'
  },
  'assessment4': {
    studentId: 'student2',
    subjectId: 'subject1',
    examTypeId: 'exam1',
    marks: 88,
    maxMarks: 100,
    date: '2024-01-15T00:00:00Z',
    academicYear: '2023-24',
    teacherName: 'श्रीमती सुनीता राणे'
  },
  'assessment5': {
    studentId: 'student2',
    subjectId: 'subject2',
    examTypeId: 'exam1',
    marks: 82,
    maxMarks: 100,
    date: '2024-01-16T00:00:00Z',
    academicYear: '2023-24',
    teacherName: 'Mr. John Smith'
  }
};

// Function to initialize Firebase database with default data
export async function initializeFirebaseData(database: any) {
  try {
    console.log('🔥 Initializing Firebase database with default data...');
    
    // Set school information
    await set(ref(database, 'school'), defaultSchoolData);
    console.log('✅ School data initialized');
    
    // Set subjects
    await set(ref(database, 'subjects'), defaultSubjects);
    console.log('✅ Subjects data initialized');
    
    // Set exam types
    await set(ref(database, 'examTypes'), defaultExamTypes);
    console.log('✅ Exam types data initialized');
    
    // Set sample students
    await set(ref(database, 'students'), sampleStudents);
    console.log('✅ Sample students data initialized');
    
    // Set sample assessments
    await set(ref(database, 'assessments'), sampleAssessments);
    console.log('✅ Sample assessments data initialized');
    
    console.log('🎉 Firebase database initialization completed!');
    console.log('मूल्यमापन system is ready with sample data!');
    
  } catch (error) {
    console.error('❌ Error initializing Firebase data:', error);
    throw error;
  }
}

// Academic year settings
export const academicSettings = {
  currentYear: '2023-24',
  startDate: '2023-04-01',
  endDate: '2024-03-31',
  examSchedule: {
    monthly: {
      'april': '2023-04-30',
      'may': '2023-05-31',
      'june': '2023-06-30',
      'september': '2023-09-30',
      'october': '2023-10-31',
      'november': '2023-11-30',
      'december': '2023-12-31',
      'january': '2024-01-31',
      'february': '2024-02-29'
    },
    halfYearly: '2023-09-30',
    annual: '2024-03-15'
  }
};

// Grade boundaries (percentage-based)
export const gradeBoundaries = {
  'A+': { min: 90, max: 100, description: 'उत्कृष्ट', descriptionEn: 'Excellent' },
  'A': { min: 80, max: 89, description: 'अति उत्तम', descriptionEn: 'Very Good' },
  'B+': { min: 70, max: 79, description: 'उत्तम', descriptionEn: 'Good' },
  'B': { min: 60, max: 69, description: 'चांगले', descriptionEn: 'Satisfactory' },
  'C+': { min: 50, max: 59, description: 'सरासरीपेक्षा चांगले', descriptionEn: 'Above Average' },
  'C': { min: 40, max: 49, description: 'सरासरी', descriptionEn: 'Average' },
  'D': { min: 35, max: 39, description: 'उत्तीर्ण', descriptionEn: 'Pass' },
  'F': { min: 0, max: 34, description: 'अनुत्तीर्ण', descriptionEn: 'Fail' }
};