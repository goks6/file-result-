// Types for the Assessment System

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  class: string;
  rollNumber: number;
  admissionDate: string;
}

export interface Subject {
  id: string;
  name: string;
  nameMarathi: string;
  maxMarks: number;
  passingMarks: number;
}

export interface ExamType {
  id: string;
  name: string;
  nameMarathi: string;
  weightage: number;
}

export interface Assessment {
  id: string;
  studentId: string;
  subjectId: string;
  examTypeId: string;
  marks: number;
  maxMarks: number;
  date: string;
  academicYear: string;
}

export interface School {
  name: string;
  nameMarathi: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  udiseCode: string;
  phoneNumber: string;
  email: string;
  principalName: string;
}

export interface ReportCard {
  student: Student;
  school: School;
  assessments: Assessment[];
  subjects: Subject[];
  examTypes: ExamType[];
  totalMarks: number;
  totalMaxMarks: number;
  percentage: number;
  grade: string;
  rank: number;
  academicYear: string;
}

export interface ClassAnalysis {
  className: string;
  totalStudents: number;
  passedStudents: number;
  failedStudents: number;
  averagePercentage: number;
  highestMarks: number;
  lowestMarks: number;
  subjectWiseAnalysis: SubjectAnalysis[];
}

export interface SubjectAnalysis {
  subject: Subject;
  averageMarks: number;
  passedStudents: number;
  failedStudents: number;
  highestMarks: number;
  lowestMarks: number;
}