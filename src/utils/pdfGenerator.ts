import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { ReportCard, Assessment, Subject } from '../types';
import { CalculationUtils } from './calculations';

export class PDFGenerator {
  static async generateReportCard(reportCard: ReportCard): Promise<void> {
    try {
      const html = this.generateReportCardHTML(reportCard);
      
      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `${reportCard.student.name} - रिपोर्ट कार्ड`,
        });
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  private static generateReportCardHTML(reportCard: ReportCard): string {
    const subjectRows = this.generateSubjectRows(reportCard.assessments, reportCard.subjects);
    const currentDate = CalculationUtils.formatDateMarathi(new Date());
    
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>रिपोर्ट कार्ड - ${reportCard.student.name}</title>
          <style>
            body {
              font-family: 'Noto Sans Devanagari', Arial, sans-serif;
              margin: 20px;
              background-color: #f9f9f9;
            }
            .report-card {
              background: white;
              padding: 30px;
              border-radius: 15px;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              max-width: 800px;
              margin: 0 auto;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #2196F3;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .school-name {
              font-size: 28px;
              font-weight: bold;
              color: #1976D2;
              margin-bottom: 5px;
            }
            .school-details {
              font-size: 14px;
              color: #666;
              margin-bottom: 10px;
            }
            .report-title {
              font-size: 24px;
              font-weight: bold;
              color: #FF9800;
              margin-top: 15px;
            }
            .student-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
              background: #E3F2FD;
              padding: 20px;
              border-radius: 10px;
            }
            .student-details {
              flex: 1;
            }
            .academic-info {
              flex: 1;
              text-align: right;
            }
            .info-row {
              margin-bottom: 8px;
              font-size: 16px;
            }
            .label {
              font-weight: bold;
              color: #1976D2;
            }
            .marks-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
              background: white;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .marks-table th {
              background: linear-gradient(135deg, #2196F3, #1976D2);
              color: white;
              padding: 15px;
              text-align: center;
              font-weight: bold;
            }
            .marks-table td {
              padding: 12px;
              text-align: center;
              border-bottom: 1px solid #E0E0E0;
            }
            .marks-table tr:nth-child(even) {
              background: #F5F5F5;
            }
            .marks-table tr:hover {
              background: #E3F2FD;
            }
            .subject-name {
              text-align: left !important;
              font-weight: bold;
              color: #333;
            }
            .marks-cell {
              font-weight: bold;
              color: #1976D2;
            }
            .percentage-cell {
              font-weight: bold;
              color: #FF9800;
            }
            .grade-cell {
              font-weight: bold;
              font-size: 16px;
            }
            .grade-A { color: #4CAF50; }
            .grade-B { color: #FF9800; }
            .grade-C { color: #FFC107; }
            .grade-D { color: #FF5722; }
            .grade-F { color: #F44336; }
            .total-row {
              background: linear-gradient(135deg, #4CAF50, #388E3C) !important;
              color: white !important;
              font-weight: bold;
              font-size: 18px;
            }
            .total-row td {
              border: none !important;
            }
            .summary {
              display: flex;
              justify-content: space-around;
              margin-bottom: 30px;
            }
            .summary-card {
              background: linear-gradient(135deg, #FF9800, #F57C00);
              color: white;
              padding: 20px;
              border-radius: 15px;
              text-align: center;
              flex: 1;
              margin: 0 10px;
              box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .summary-title {
              font-size: 14px;
              margin-bottom: 5px;
              opacity: 0.9;
            }
            .summary-value {
              font-size: 24px;
              font-weight: bold;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #E0E0E0;
            }
            .signature {
              text-align: center;
              width: 200px;
            }
            .signature-line {
              border-top: 1px solid #666;
              margin-top: 50px;
              padding-top: 5px;
              font-size: 14px;
              color: #666;
            }
            .print-date {
              font-size: 12px;
              color: #999;
              text-align: right;
              margin-top: 20px;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 100px;
              color: rgba(33, 150, 243, 0.1);
              z-index: -1;
              pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="watermark">मूल्यमापन</div>
          <div class="report-card">
            <div class="header">
              <div class="school-name">${reportCard.school.nameMarathi}</div>
              <div class="school-name" style="font-size: 20px; color: #666;">${reportCard.school.name}</div>
              <div class="school-details">
                ${reportCard.school.address}, ${reportCard.school.city}, ${reportCard.school.state} - ${reportCard.school.pincode}<br>
                दूरध्वनी: ${reportCard.school.phoneNumber} | ईमेल: ${reportCard.school.email}<br>
                UDISE कोड: ${reportCard.school.udiseCode}
              </div>
              <div class="report-title">शैक्षणिक प्रगती अहवाल</div>
              <div style="font-size: 18px; color: #666;">Academic Progress Report</div>
            </div>

            <div class="student-info">
              <div class="student-details">
                <div class="info-row">
                  <span class="label">विद्यार्थीचे नाव:</span> ${reportCard.student.name}
                </div>
                <div class="info-row">
                  <span class="label">वडिलांचे नाव:</span> ${reportCard.student.fatherName}
                </div>
                <div class="info-row">
                  <span class="label">गुंडाळी क्रमांक:</span> ${CalculationUtils.convertToMarathiNumbers(reportCard.student.rollNumber)}
                </div>
              </div>
              <div class="academic-info">
                <div class="info-row">
                  <span class="label">वर्ग:</span> ${reportCard.student.class}
                </div>
                <div class="info-row">
                  <span class="label">शैक्षणिक वर्ष:</span> ${reportCard.academicYear}
                </div>
                <div class="info-row">
                  <span class="label">दिनांक:</span> ${currentDate}
                </div>
              </div>
            </div>

            <table class="marks-table">
              <thead>
                <tr>
                  <th>विषय<br>Subject</th>
                  <th>पूर्णांक<br>Max Marks</th>
                  <th>प्राप्त गुण<br>Marks Obtained</th>
                  <th>टक्केवारी<br>Percentage</th>
                  <th>श्रेणी<br>Grade</th>
                  <th>स्थिती<br>Status</th>
                </tr>
              </thead>
              <tbody>
                ${subjectRows}
                <tr class="total-row">
                  <td class="subject-name">एकूण (Total)</td>
                  <td>${CalculationUtils.convertToMarathiNumbers(reportCard.totalMaxMarks)}</td>
                  <td>${CalculationUtils.convertToMarathiNumbers(reportCard.totalMarks)}</td>
                  <td>${CalculationUtils.convertToMarathiNumbers(reportCard.percentage)}%</td>
                  <td>${reportCard.grade}</td>
                  <td>${reportCard.percentage >= 35 ? 'उत्तीर्ण' : 'अनुत्तीर्ण'}</td>
                </tr>
              </tbody>
            </table>

            <div class="summary">
              <div class="summary-card">
                <div class="summary-title">एकूण टक्केवारी</div>
                <div class="summary-value">${CalculationUtils.convertToMarathiNumbers(reportCard.percentage)}%</div>
              </div>
              <div class="summary-card">
                <div class="summary-title">श्रेणी</div>
                <div class="summary-value">${reportCard.grade}</div>
              </div>
              <div class="summary-card">
                <div class="summary-title">वर्गातील स्थान</div>
                <div class="summary-value">${CalculationUtils.convertToMarathiNumbers(reportCard.rank)}</div>
              </div>
            </div>

            <div class="footer">
              <div class="signature">
                <div class="signature-line">वर्गशिक्षक स्वाक्षरी<br>Class Teacher</div>
              </div>
              <div class="signature">
                <div class="signature-line">पालक स्वाक्षरी<br>Parent's Signature</div>
              </div>
              <div class="signature">
                <div class="signature-line">मुख्याध्यापक स्वाक्षरी<br>Principal</div>
              </div>
            </div>

            <div class="print-date">
              मुद्रण दिनांक: ${currentDate} | Generated by मूल्यमापन Assessment System
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private static generateSubjectRows(assessments: Assessment[], subjects: Subject[]): string {
    return assessments.map(assessment => {
      const subject = subjects.find(s => s.id === assessment.subjectId);
      if (!subject) return '';

      const percentage = CalculationUtils.calculateSubjectPercentage(assessment.marks, assessment.maxMarks);
      const grade = CalculationUtils.calculateGrade(percentage);
      const gradeDesc = CalculationUtils.getGradeDescriptionMarathi(grade);
      const passed = CalculationUtils.isSubjectPassed(assessment.marks, subject.passingMarks);
      const gradeClass = grade.charAt(0).toLowerCase();

      return `
        <tr>
          <td class="subject-name">
            <strong>${subject.nameMarathi}</strong><br>
            <small style="color: #666;">${subject.name}</small>
          </td>
          <td>${CalculationUtils.convertToMarathiNumbers(assessment.maxMarks)}</td>
          <td class="marks-cell">${CalculationUtils.convertToMarathiNumbers(assessment.marks)}</td>
          <td class="percentage-cell">${CalculationUtils.convertToMarathiNumbers(percentage)}%</td>
          <td class="grade-cell grade-${gradeClass}">
            ${grade}<br>
            <small>${gradeDesc}</small>
          </td>
          <td style="color: ${passed ? '#4CAF50' : '#F44336'}; font-weight: bold;">
            ${passed ? 'उत्तीर्ण' : 'अनुत्तीर्ण'}
          </td>
        </tr>
      `;
    }).join('');
  }
}