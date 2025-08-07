import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, push, update, remove } from 'firebase/database';
import { Student, Assessment, Subject, ExamType, School } from '../types';

// Firebase configuration
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export class FirebaseService {
  // Student operations
  static async addStudent(student: Omit<Student, 'id'>): Promise<string> {
    try {
      const studentsRef = ref(database, 'students');
      const newStudentRef = push(studentsRef);
      await set(newStudentRef, student);
      return newStudentRef.key!;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  }

  static async getStudents(): Promise<Student[]> {
    try {
      const studentsRef = ref(database, 'students');
      const snapshot = await get(studentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting students:', error);
      throw error;
    }
  }

  static async updateStudent(id: string, student: Partial<Student>): Promise<void> {
    try {
      const studentRef = ref(database, `students/${id}`);
      await update(studentRef, student);
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  static async deleteStudent(id: string): Promise<void> {
    try {
      const studentRef = ref(database, `students/${id}`);
      await remove(studentRef);
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }

  // Assessment operations
  static async addAssessment(assessment: Omit<Assessment, 'id'>): Promise<string> {
    try {
      const assessmentsRef = ref(database, 'assessments');
      const newAssessmentRef = push(assessmentsRef);
      await set(newAssessmentRef, assessment);
      return newAssessmentRef.key!;
    } catch (error) {
      console.error('Error adding assessment:', error);
      throw error;
    }
  }

  static async getAssessments(): Promise<Assessment[]> {
    try {
      const assessmentsRef = ref(database, 'assessments');
      const snapshot = await get(assessmentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting assessments:', error);
      throw error;
    }
  }

  static async updateAssessment(id: string, assessment: Partial<Assessment>): Promise<void> {
    try {
      const assessmentRef = ref(database, `assessments/${id}`);
      await update(assessmentRef, assessment);
    } catch (error) {
      console.error('Error updating assessment:', error);
      throw error;
    }
  }

  // Subject operations
  static async getSubjects(): Promise<Subject[]> {
    try {
      const subjectsRef = ref(database, 'subjects');
      const snapshot = await get(subjectsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting subjects:', error);
      throw error;
    }
  }

  // Exam type operations
  static async getExamTypes(): Promise<ExamType[]> {
    try {
      const examTypesRef = ref(database, 'examTypes');
      const snapshot = await get(examTypesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting exam types:', error);
      throw error;
    }
  }

  // School operations
  static async getSchoolInfo(): Promise<School | null> {
    try {
      const schoolRef = ref(database, 'school');
      const snapshot = await get(schoolRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error('Error getting school info:', error);
      throw error;
    }
  }

  static async updateSchoolInfo(school: School): Promise<void> {
    try {
      const schoolRef = ref(database, 'school');
      await set(schoolRef, school);
    } catch (error) {
      console.error('Error updating school info:', error);
      throw error;
    }
  }
}