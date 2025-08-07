import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import {
  Appbar,
  Card,
  Title,
  Button,
  TextInput,
  Chip,
  Portal,
  Modal,
  List,
  Divider,
  ActivityIndicator,
  Surface,
  Text,
  FAB,
} from 'react-native-paper';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import RNPickerSelect from 'react-native-picker-select';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Student, Subject, ExamType, School, ReportCard, ClassAnalysis } from '../types';
import type { Assessment } from '../types';
import { FirebaseService } from '../services/firebase';
import { CalculationUtils } from '../utils/calculations';
import { PDFGenerator } from '../utils/pdfGenerator';

const { width: screenWidth } = Dimensions.get('window');

// Default data
const defaultSubjects: Subject[] = [
  { id: '1', name: 'Marathi', nameMarathi: 'मराठी', maxMarks: 100, passingMarks: 35 },
  { id: '2', name: 'English', nameMarathi: 'इंग्रजी', maxMarks: 100, passingMarks: 35 },
  { id: '3', name: 'Mathematics', nameMarathi: 'गणित', maxMarks: 100, passingMarks: 35 },
  { id: '4', name: 'Science', nameMarathi: 'विज्ञान', maxMarks: 100, passingMarks: 35 },
  { id: '5', name: 'History', nameMarathi: 'इतिहास', maxMarks: 100, passingMarks: 35 },
  { id: '6', name: 'Geography', nameMarathi: 'भूगोल', maxMarks: 100, passingMarks: 35 },
  { id: '7', name: 'Drawing', nameMarathi: 'चित्रकला', maxMarks: 50, passingMarks: 18 },
];

const defaultExamTypes: ExamType[] = [
  { id: '1', name: 'Monthly', nameMarathi: 'मासिक', weightage: 20 },
  { id: '2', name: 'Half-Yearly', nameMarathi: 'अर्धवार्षिक', weightage: 40 },
  { id: '3', name: 'Annual', nameMarathi: 'वार्षिक', weightage: 40 },
];

const defaultSchool: School = {
  name: 'Model Primary School',
  nameMarathi: 'आदर्श प्राथमिक शाळा',
  address: 'School Address',
  city: 'City Name',
  state: 'Maharashtra',
  pincode: '123456',
  udiseCode: '12345678901',
  phoneNumber: '0123456789',
  email: 'school@example.com',
  principalName: 'Principal Name',
};

const classes = [
  { label: 'पहिली (1st)', value: '1' },
  { label: 'दुसरी (2nd)', value: '2' },
  { label: 'तिसरी (3rd)', value: '3' },
  { label: 'चौथी (4th)', value: '4' },
  { label: 'पाचवी (5th)', value: '5' },
  { label: 'सहावी (6th)', value: '6' },
  { label: 'सातवी (7th)', value: '7' },
  { label: 'आठवी (8th)', value: '8' },
];

// Grade Entry Component
const GradeEntryTab = ({ 
  students, 
  subjects, 
  examTypes, 
  assessments, 
  onAddAssessment, 
  loading 
}: {
  students: Student[];
  subjects: Subject[];
  examTypes: ExamType[];
  assessments: Assessment[];
  onAddAssessment: (assessment: Omit<Assessment, 'id'>) => void;
  loading: boolean;
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedExamType, setSelectedExamType] = useState<string>('');
  const [marks, setMarks] = useState<string>('');
  const [showAddStudent, setShowAddStudent] = useState(false);
  
  // Add Student Modal states
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentFatherName, setNewStudentFatherName] = useState('');
  const [newStudentClass, setNewStudentClass] = useState('');
  const [newStudentRoll, setNewStudentRoll] = useState('');

  const handleSubmitGrade = () => {
    if (!selectedStudent || !selectedSubject || !selectedExamType || !marks) {
      Alert.alert('त्रुटी', 'कृपया सर्व माहिती भरा');
      return;
    }

    const subject = subjects.find(s => s.id === selectedSubject);
    if (!subject) return;

    const marksNumber = parseInt(marks);
    if (marksNumber > subject.maxMarks) {
      Alert.alert('त्रुटी', `गुण ${subject.maxMarks} पेक्षा जास्त असू शकत नाहीत`);
      return;
    }

    const assessment: Omit<Assessment, 'id'> = {
      studentId: selectedStudent,
      subjectId: selectedSubject,
      examTypeId: selectedExamType,
      marks: marksNumber,
      maxMarks: subject.maxMarks,
      date: new Date().toISOString(),
      academicYear: CalculationUtils.getCurrentAcademicYear(),
    };

    onAddAssessment(assessment);
    setMarks('');
    Alert.alert('यशस्वी', 'गुण यशस्वीरित्या जतन केले');
  };

  const studentPickerItems = students.map(student => ({
    label: `${student.name} (${student.class} वर्ग)`,
    value: student.id,
  }));

  const subjectPickerItems = subjects.map(subject => ({
    label: `${subject.nameMarathi} (${subject.name})`,
    value: subject.id,
  }));

  const examTypePickerItems = examTypes.map(examType => ({
    label: examType.nameMarathi,
    value: examType.id,
  }));

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>गुण प्रविष्टी</Title>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>विद्यार्थी निवडा:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedStudent(value)}
              items={studentPickerItems}
              style={pickerSelectStyles}
              placeholder={{ label: 'विद्यार्थी निवडा...', value: '' }}
              value={selectedStudent}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>विषय निवडा:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedSubject(value)}
              items={subjectPickerItems}
              style={pickerSelectStyles}
              placeholder={{ label: 'विषय निवडा...', value: '' }}
              value={selectedSubject}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>परीक्षा प्रकार:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedExamType(value)}
              items={examTypePickerItems}
              style={pickerSelectStyles}
              placeholder={{ label: 'परीक्षा प्रकार निवडा...', value: '' }}
              value={selectedExamType}
            />
          </View>

          <TextInput
            label="प्राप्त गुण"
            value={marks}
            onChangeText={setMarks}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
            right={<TextInput.Affix text={`/${subjects.find(s => s.id === selectedSubject)?.maxMarks || 100}`} />}
          />

          <Button
            mode="contained"
            onPress={handleSubmitGrade}
            style={styles.button}
            disabled={loading}
            loading={loading}
          >
            गुण जतन करा
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>विद्यार्थी व्यवस्थापन</Title>
          <Button
            mode="outlined"
            onPress={() => setShowAddStudent(true)}
            style={styles.button}
            icon="account-plus"
          >
            नवीन विद्यार्थी जोडा
          </Button>
        </Card.Content>
      </Card>

      {/* Recent Assessments */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>अलीकडील गुण प्रविष्टी</Title>
          {assessments.slice(-5).reverse().map((assessment, index) => {
            const student = students.find(s => s.id === assessment.studentId);
            const subject = subjects.find(s => s.id === assessment.subjectId);
            const examType = examTypes.find(e => e.id === assessment.examTypeId);
            
            return (
              <Surface key={index} style={styles.assessmentItem}>
                <Text style={styles.assessmentText}>
                  {student?.name} - {subject?.nameMarathi} ({examType?.nameMarathi})
                </Text>
                <Chip 
                  mode="outlined" 
                  style={[
                    styles.marksChip,
                    { backgroundColor: assessment.marks >= (subject?.passingMarks || 35) ? '#E8F5E8' : '#FFEBEE' }
                  ]}
                >
                  {assessment.marks}/{assessment.maxMarks}
                </Chip>
              </Surface>
            );
          })}
        </Card.Content>
      </Card>

      {/* Add Student Modal */}
      <Portal>
        <Modal
          visible={showAddStudent}
          onDismiss={() => setShowAddStudent(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>नवीन विद्यार्थी जोडा</Title>
          
          <TextInput
            label="विद्यार्थीचे नाव"
            value={newStudentName}
            onChangeText={setNewStudentName}
            style={styles.input}
            mode="outlined"
          />
          
          <TextInput
            label="वडिलांचे नाव"
            value={newStudentFatherName}
            onChangeText={setNewStudentFatherName}
            style={styles.input}
            mode="outlined"
          />
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>वर्ग निवडा:</Text>
            <RNPickerSelect
              onValueChange={(value) => setNewStudentClass(value)}
              items={classes}
              style={pickerSelectStyles}
              placeholder={{ label: 'वर्ग निवडा...', value: '' }}
              value={newStudentClass}
            />
          </View>
          
          <TextInput
            label="गुंडाळी क्रमांक"
            value={newStudentRoll}
            onChangeText={setNewStudentRoll}
            keyboardType="numeric"
            style={styles.input}
            mode="outlined"
          />
          
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowAddStudent(false)}
              style={styles.modalButton}
            >
              रद्द करा
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                // Add student logic here
                setShowAddStudent(false);
                setNewStudentName('');
                setNewStudentFatherName('');
                setNewStudentClass('');
                setNewStudentRoll('');
              }}
              style={styles.modalButton}
            >
              जोडा
            </Button>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

// Report Tab Component
const ReportTab = ({ 
  students, 
  subjects, 
  examTypes, 
  assessments, 
  school 
}: {
  students: Student[];
  subjects: Subject[];
  examTypes: ExamType[];
  assessments: Assessment[];
  school: School;
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async () => {
    if (!selectedStudent) {
      Alert.alert('त्रुटी', 'कृपया विद्यार्थी निवडा');
      return;
    }

    setLoading(true);
    try {
      const student = students.find(s => s.id === selectedStudent);
      if (!student) return;

      const studentAssessments = assessments.filter(a => a.studentId === selectedStudent);
      const { totalMarks, totalMaxMarks } = CalculationUtils.calculateStudentTotal(studentAssessments);
      const percentage = CalculationUtils.calculatePercentage(totalMarks, totalMaxMarks);
      const grade = CalculationUtils.calculateGrade(percentage);
      
      // Calculate rank (simplified)
      const allPercentages = students.map(s => {
        const sAssessments = assessments.filter(a => a.studentId === s.id);
        const { totalMarks: sTotalMarks, totalMaxMarks: sTotalMaxMarks } = CalculationUtils.calculateStudentTotal(sAssessments);
        return CalculationUtils.calculatePercentage(sTotalMarks, sTotalMaxMarks);
      });
      const rank = CalculationUtils.calculateRank(percentage, allPercentages);

      const reportCard: ReportCard = {
        student,
        school,
        assessments: studentAssessments,
        subjects,
        examTypes,
        totalMarks,
        totalMaxMarks,
        percentage,
        grade,
        rank,
        academicYear: CalculationUtils.getCurrentAcademicYear(),
      };

      await PDFGenerator.generateReportCard(reportCard);
    } catch (error) {
      Alert.alert('त्रुटी', 'रिपोर्ट तयार करताना त्रुटी आली');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const studentPickerItems = students.map(student => ({
    label: `${student.name} (${student.class} वर्ग)`,
    value: student.id,
  }));

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>रिपोर्ट कार्ड तयार करा</Title>
          
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>विद्यार्थी निवडा:</Text>
            <RNPickerSelect
              onValueChange={(value) => setSelectedStudent(value)}
              items={studentPickerItems}
              style={pickerSelectStyles}
              placeholder={{ label: 'विद्यार्थी निवडा...', value: '' }}
              value={selectedStudent}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleGenerateReport}
            style={styles.button}
            disabled={loading || !selectedStudent}
            loading={loading}
            icon="file-pdf-box"
          >
            PDF रिपोर्ट डाउनलोड करा
          </Button>
        </Card.Content>
      </Card>

      {/* Student Performance Preview */}
      {selectedStudent && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>विद्यार्थी कामगिरी</Title>
            {(() => {
              const student = students.find(s => s.id === selectedStudent);
              const studentAssessments = assessments.filter(a => a.studentId === selectedStudent);
              const { totalMarks, totalMaxMarks } = CalculationUtils.calculateStudentTotal(studentAssessments);
              const percentage = CalculationUtils.calculatePercentage(totalMarks, totalMaxMarks);
              const grade = CalculationUtils.calculateGrade(percentage);

              return (
                <View style={styles.performanceContainer}>
                  <Surface style={styles.performanceCard}>
                    <Text style={styles.performanceLabel}>एकूण गुण</Text>
                    <Text style={styles.performanceValue}>{totalMarks}/{totalMaxMarks}</Text>
                  </Surface>
                  <Surface style={styles.performanceCard}>
                    <Text style={styles.performanceLabel}>टक्केवारी</Text>
                    <Text style={styles.performanceValue}>{percentage}%</Text>
                  </Surface>
                  <Surface style={styles.performanceCard}>
                    <Text style={styles.performanceLabel}>श्रेणी</Text>
                    <Text style={styles.performanceValue}>{grade}</Text>
                  </Surface>
                </View>
              );
            })()}
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

// Analysis Tab Component  
const AnalysisTab = ({ 
  students, 
  subjects, 
  assessments 
}: {
  students: Student[];
  subjects: Subject[];
  assessments: Assessment[];
}) => {
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  // Calculate class-wise performance
  const classPerformance = classes.map(cls => {
    const classStudents = students.filter(s => s.class === cls.value);
    const classAssessments = assessments.filter(a => 
      classStudents.some(s => s.id === a.studentId)
    );
    
    const totalMarks = classAssessments.reduce((sum, a) => sum + a.marks, 0);
    const totalMaxMarks = classAssessments.reduce((sum, a) => sum + a.maxMarks, 0);
    const percentage = CalculationUtils.calculatePercentage(totalMarks, totalMaxMarks);
    
    return {
      name: cls.label,
      percentage: percentage || 0,
    };
  });

  // Subject-wise performance
  const subjectPerformance = subjects.map(subject => {
    const subjectAssessments = assessments.filter(a => a.subjectId === subject.id);
    const totalMarks = subjectAssessments.reduce((sum, a) => sum + a.marks, 0);
    const totalMaxMarks = subjectAssessments.reduce((sum, a) => sum + a.maxMarks, 0);
    const percentage = CalculationUtils.calculatePercentage(totalMarks, totalMaxMarks);
    
    return {
      name: subject.nameMarathi,
      percentage: percentage || 0,
    };
  });

  // Grade distribution
  const gradeDistribution = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map(grade => {
    const count = students.filter(student => {
      const studentAssessments = assessments.filter(a => a.studentId === student.id);
      const { totalMarks, totalMaxMarks } = CalculationUtils.calculateStudentTotal(studentAssessments);
      const percentage = CalculationUtils.calculatePercentage(totalMarks, totalMaxMarks);
      return CalculationUtils.calculateGrade(percentage) === grade;
    }).length;
    
    return {
      name: grade,
      population: count,
      color: getGradeColor(grade),
      legendFontColor: '#333',
      legendFontSize: 12,
    };
  }).filter(item => item.population > 0);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>वर्गवार कामगिरी</Title>
          {classPerformance.length > 0 && (
            <BarChart
              data={{
                labels: classPerformance.map(item => item.name.split(' ')[0]),
                datasets: [{
                  data: classPerformance.map(item => item.percentage),
                }],
              }}
              width={screenWidth - 60}
              height={220}
              yAxisLabel=""
              yAxisSuffix="%"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>विषयवार कामगिरी</Title>
          {subjectPerformance.length > 0 && (
            <BarChart
              data={{
                labels: subjectPerformance.map(item => item.name.substring(0, 4)),
                datasets: [{
                  data: subjectPerformance.map(item => item.percentage),
                }],
              }}
              width={screenWidth - 60}
              height={220}
              yAxisLabel=""
              yAxisSuffix="%"
              chartConfig={chartConfig}
              style={styles.chart}
            />
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>श्रेणी वितरण</Title>
          {gradeDistribution.length > 0 && (
            <PieChart
              data={gradeDistribution}
              width={screenWidth - 60}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              style={styles.chart}
            />
          )}
        </Card.Content>
      </Card>

      {/* Statistics */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>आकडेवारी</Title>
          <List.Section>
            <List.Item
              title="एकूण विद्यार्थी"
              description={`${students.length} विद्यार्थी`}
              left={props => <List.Icon {...props} icon="account-group" />}
            />
            <Divider />
            <List.Item
              title="एकूण परीक्षा"
              description={`${assessments.length} परीक्षा पूर्ण`}
              left={props => <List.Icon {...props} icon="clipboard-check" />}
            />
            <Divider />
            <List.Item
              title="सरासरी टक्केवारी"
              description={`${calculateOverallAverage(students, assessments)}%`}
              left={props => <List.Icon {...props} icon="chart-line" />}
            />
          </List.Section>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

// Helper functions
const getGradeColor = (grade: string): string => {
  const colors: { [key: string]: string } = {
    'A+': '#4CAF50',
    'A': '#8BC34A',
    'B+': '#CDDC39',
    'B': '#FFEB3B',
    'C+': '#FFC107',
    'C': '#FF9800',
    'D': '#FF5722',
    'F': '#F44336',
  };
  return colors[grade] || '#9E9E9E';
};

const calculateOverallAverage = (students: Student[], assessments: Assessment[]): number => {
  if (students.length === 0) return 0;
  
  const totalPercentage = students.reduce((sum, student) => {
    const studentAssessments = assessments.filter(a => a.studentId === student.id);
    const { totalMarks, totalMaxMarks } = CalculationUtils.calculateStudentTotal(studentAssessments);
    return sum + CalculationUtils.calculatePercentage(totalMarks, totalMaxMarks);
  }, 0);
  
  return Math.round(totalPercentage / students.length);
};

// Main Assessment Component
const Assessment: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // State
  const [students, setStudents] = useState<Student[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [subjects] = useState<Subject[]>(defaultSubjects);
  const [examTypes] = useState<ExamType[]>(defaultExamTypes);
  const [school] = useState<School>(defaultSchool);

  // Sample data for demonstration
  useEffect(() => {
    // Add sample students
    const sampleStudents: Student[] = [
      {
        id: '1',
        name: 'राहुल शर्मा',
        fatherName: 'विकास शर्मा',
        class: '5',
        rollNumber: 1,
        admissionDate: '2023-04-01',
      },
      {
        id: '2',
        name: 'प्रिया पाटील',
        fatherName: 'संजय पाटील',
        class: '5',
        rollNumber: 2,
        admissionDate: '2023-04-01',
      },
      {
        id: '3',
        name: 'अमित देशमुख',
        fatherName: 'रमेश देशमुख',
        class: '6',
        rollNumber: 1,
        admissionDate: '2023-04-01',
      },
    ];
    setStudents(sampleStudents);

    // Add sample assessments
    const sampleAssessments: Assessment[] = [
      { id: '1', studentId: '1', subjectId: '1', examTypeId: '1', marks: 85, maxMarks: 100, date: '2024-01-15', academicYear: '2023-24' },
      { id: '2', studentId: '1', subjectId: '2', examTypeId: '1', marks: 78, maxMarks: 100, date: '2024-01-16', academicYear: '2023-24' },
      { id: '3', studentId: '2', subjectId: '1', examTypeId: '1', marks: 92, maxMarks: 100, date: '2024-01-15', academicYear: '2023-24' },
      { id: '4', studentId: '2', subjectId: '2', examTypeId: '1', marks: 88, maxMarks: 100, date: '2024-01-16', academicYear: '2023-24' },
    ];
    setAssessments(sampleAssessments);
  }, []);

  const handleAddAssessment = async (assessment: Omit<Assessment, 'id'>) => {
    setLoading(true);
    try {
      // Add to local state (in real app, this would go to Firebase)
      const newAssessment: Assessment = {
        ...assessment,
        id: Date.now().toString(),
      };
      setAssessments(prev => [...prev, newAssessment]);
    } catch (error) {
      Alert.alert('त्रुटी', 'गुण जतन करताना त्रुटी आली');
    } finally {
      setLoading(false);
    }
  };

  const routes = [
    { key: 'entry', title: 'गुण प्रविष्टी' },
    { key: 'report', title: 'रिपोर्ट' },
    { key: 'analysis', title: 'विश्लेषण' },
  ];

  const renderScene = SceneMap({
    entry: () => (
      <GradeEntryTab
        students={students}
        subjects={subjects}
        examTypes={examTypes}
        assessments={assessments}
        onAddAssessment={handleAddAssessment}
        loading={loading}
      />
    ),
    report: () => (
      <ReportTab
        students={students}
        subjects={subjects}
        examTypes={examTypes}
        assessments={assessments}
        school={school}
      />
    ),
    analysis: () => (
      <AnalysisTab
        students={students}
        subjects={subjects}
        assessments={assessments}
      />
    ),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
      renderLabel={({ route, focused }) => (
        <Text style={[styles.tabLabel, { color: focused ? '#2196F3' : '#666' }]}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1976D2" barStyle="light-content" />
      <Appbar.Header style={styles.header}>
        <Appbar.Content 
          title="मूल्यमापन" 
          subtitle="शैक्षणिक गुण व्यवस्थापन"
          titleStyle={styles.headerTitle}
          subtitleStyle={styles.headerSubtitle}
        />
      </Appbar.Header>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: screenWidth }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#1976D2',
    elevation: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    elevation: 4,
  },
  tabIndicator: {
    backgroundColor: '#2196F3',
    height: 3,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  assessmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
  },
  assessmentText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  marksChip: {
    marginLeft: 8,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  performanceCard: {
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  performanceLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  performanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFF',
    marginBottom: 8,
  },
});

export default Assessment;