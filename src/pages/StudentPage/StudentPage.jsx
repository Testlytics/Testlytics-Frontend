import { useState, useEffect } from "react";
import styles from "./studentPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftList from "../../layouts/LeftList/LeftList";
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import { studentService, subjectService, testService, testAttemptService } from "../../services/api";
import { buildSubjectTestMatrix } from "../../utils/testDataTransformer";
import students from "./students";
import Profile from "../../assets/images/profile.jpg";
 
const StudentPage = () => {
  // State management
  const [apiStudents, setApiStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState({ columns: [], data: [] });
  const [usingLocalData, setUsingLocalData] = useState(false);
  const [attendance, setAttendance] = useState({ attended: 0, total: 0 });
 
  // Handlers
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };
 
  // Effects
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await studentService.getStudents();
        setApiStudents(data);
        setSelectedStudent(data.length > 0 ? data[0] : null);
        setUsingLocalData(false);
        setLoading(false);
      } catch (err) {
        console.error("API failed, using local data:", err);
        setSelectedStudent(students[0]);
        setUsingLocalData(true);
        setLoading(false);
        setError("Failed to load data from server. Using local data.");
      }
    };
 
    fetchStudents();
  }, []);
 
  useEffect(() => {
    const fetchTestData = async () => {
      if (!selectedStudent?.userId && !selectedStudent?.studentId) {
        console.error("No valid student ID available");
        setTableData({ columns: [], data: [] });
        return;
      }
    
      const studentId = selectedStudent.userId || selectedStudent.studentId;
      
      try {
        const [subjects, completedTests, testIds] = await Promise.all([
          subjectService.getAllSubjects(),
          testService.getCompletedTests(),
          testAttemptService.getUserTestIds(studentId),
        ]);
    
        const attendedCompletedTests = testIds.filter(testId =>
          completedTests.some(ct => ct.testId === testId)
        );
    
        setAttendance({
          attended: attendedCompletedTests.length,
          total: completedTests.length
        });
    
        const attempts = await Promise.all(
          attendedCompletedTests.map(testId =>
            testAttemptService.getTestAttempt(testId, studentId)
              .then(attempt => attempt)
              .catch(error => ({ id: { testId }, score: null }))
          )
        );
    
        const matrix = buildSubjectTestMatrix(
          subjects,
          completedTests,
          attendedCompletedTests,
          attempts.filter(a => a !== null)
        );
    
        setTableData(matrix);
      } catch (error) {
        console.error("Error loading test data:", error);
        setTableData({ columns: [], data: [] });
        setAttendance({ attended: 0, total: 0 });
        setError("Failed to load test data.");
      }
    };
    
    fetchTestData();
  }, [selectedStudent]);
  
  // Derived state
  const studentList = usingLocalData ? students : apiStudents;
 
  // Render states
  if (loading) return <div className={styles.loading}>Loading students...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
 
  return (
    <div className={styles.container}>
      <Navbar /> {/* Added from first version */}
      
      <div className={styles.mainContent}>
        {/* Left Sidebar - Combined layout from both versions */}
        <div className={styles.leftSidebar}>
          <LeftList
            title="Students"
            data={studentList}
            itemKey="studentId"
            itemLabel="firstName"
            selectedItemId={selectedStudent?.studentId}
            onItemClick={handleStudentClick}
          />
        </div>
 
        {/* Right Section - Enhanced layout */}
        <div className={styles.rightContainer}>
          {selectedStudent ? (
            <div className={styles.studentLayout}>
              <StudentLayout
                // Combined props from both versions
                {...selectedStudent}
                studentDetails={{
                  src: Profile,
                  title: selectedStudent.title,
                  firstName: selectedStudent.firstName,
                  studentId: selectedStudent.studentId,
                  rank: selectedStudent.rank,
                }}
                tableData={
                  (tableData && Array.isArray(tableData.columns) && Array.isArray(tableData.data))
                    ? tableData
                    : { columns: [], data: [] }
                }
                barGraphData={selectedStudent.barGraphData || []}
                lineGraphData={selectedStudent.lineGraphData || []}
                attendance={attendance}
              />
            </div>
          ) : (
            <p className={styles.noStudent}>No student selected</p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default StudentPage;