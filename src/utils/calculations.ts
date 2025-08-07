import { Assessment, Subject, Student, ReportCard, School, ExamType } from '../types';

export class CalculationUtils {
  // Calculate percentage from marks
  static calculatePercentage(totalMarks: number, totalMaxMarks: number): number {
    if (totalMaxMarks === 0) return 0;
    return Math.round((totalMarks / totalMaxMarks) * 100 * 100) / 100;
  }

  // Calculate grade based on percentage
  static calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    if (percentage >= 35) return 'D';
    return 'F';
  }

  // Get grade description in Marathi
  static getGradeDescriptionMarathi(grade: string): string {
    const gradeDescriptions: { [key: string]: string } = {
      'A+': 'उत्कृष्ट',
      'A': 'अति उत्तम',
      'B+': 'उत्तम',
      'B': 'चांगले',
      'C+': 'सरासरीपेक्षा चांगले',
      'C': 'सरासरी',
      'D': 'उत्तीर्ण',
      'F': 'अनुत्तीर्ण'
    };
    return gradeDescriptions[grade] || 'अज्ञात';
  }

  // Calculate total marks for a student
  static calculateStudentTotal(assessments: Assessment[]): { totalMarks: number; totalMaxMarks: number } {
    const totalMarks = assessments.reduce((sum, assessment) => sum + assessment.marks, 0);
    const totalMaxMarks = assessments.reduce((sum, assessment) => sum + assessment.maxMarks, 0);
    return { totalMarks, totalMaxMarks };
  }

  // Calculate subject-wise percentage
  static calculateSubjectPercentage(marks: number, maxMarks: number): number {
    return this.calculatePercentage(marks, maxMarks);
  }

  // Check if student passed in a subject
  static isSubjectPassed(marks: number, passingMarks: number): boolean {
    return marks >= passingMarks;
  }

  // Check if student passed overall
  static isOverallPassed(assessments: Assessment[], subjects: Subject[]): boolean {
    // Check if passed in all subjects
    for (const assessment of assessments) {
      const subject = subjects.find(s => s.id === assessment.subjectId);
      if (subject && !this.isSubjectPassed(assessment.marks, subject.passingMarks)) {
        return false;
      }
    }
    
    // Check overall percentage
    const { totalMarks, totalMaxMarks } = this.calculateStudentTotal(assessments);
    const percentage = this.calculatePercentage(totalMarks, totalMaxMarks);
    return percentage >= 35; // Overall passing percentage
  }

  // Calculate rank among students
  static calculateRank(studentPercentage: number, allPercentages: number[]): number {
    const sortedPercentages = allPercentages.sort((a, b) => b - a);
    return sortedPercentages.indexOf(studentPercentage) + 1;
  }

  // Generate academic year string
  static getCurrentAcademicYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    if (month >= 4) { // April onwards is new academic year
      return `${year}-${year + 1}`;
    } else {
      return `${year - 1}-${year}`;
    }
  }

  // Format date in Marathi format
  static formatDateMarathi(date: Date): string {
    const months = [
      'जानेवारी', 'फेब्रुवारी', 'मार्च', 'एप्रिल', 'मे', 'जून',
      'जुलै', 'ऑगस्ट', 'सप्टेंबर', 'ऑक्टोबर', 'नोव्हेंबर', 'डिसेंबर'
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
  }

  // Convert English numbers to Marathi numbers
  static convertToMarathiNumbers(num: number): string {
    const marathiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return num.toString().split('').map(digit => marathiDigits[parseInt(digit)] || digit).join('');
  }
}