import { useState, useEffect } from "react";
import styles from "./studentPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftList from "../../layouts/LeftList/LeftList";
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import studentsData from "./students"; 
import Profile from "../../assets/images/profile.jpg";

  const StudentPage = () => {
    const [apiStudents, setApiStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [tableData, setTableData] = useState({ columns: [], data: [] });
    const [usingLocalData, setUsingLocalData] = useState(false);
    const [attendance, setAttendance] = useState({ attended: 0, total: 0 });
   
    const handleStudentClick = (student) => {
      setSelectedStudent(student);
    };
   
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
        }
      };
    
      fetchTestData();
    }, [selectedStudent]);
    
   
    // Determine which student list to use
    const studentList = usingLocalData ? students : apiStudents;
   
    if (loading) return <p>Loading students...</p>;
    if (error) return <p>Error: {error}</p>;
   
  return (
    <div className={styles.container}>


      <div className={styles.mainContent}>
        {/* Left Sidebar */}
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

        {/* Right Section */}
        <div className={styles.rightContainer}>
  {selectedStudent ? (
    <div className={styles.studentLayout}>
      <StudentLayout
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
