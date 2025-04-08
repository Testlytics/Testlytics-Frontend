import { useState, useEffect } from "react";
import styles from "./studentPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftList from "../../layouts/LeftList/LeftList";
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import { buildSubjectTestMatrix } from "../../utils/testDataTransformer";
import students from "./students";

const StudentPage = () => {
  const [apiStudents, setApiStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [barGraphData, setBarGraphData] = useState([]);
  const [lineGraphData, setLineGraphData] = useState([]);
  const [tableData, setTableData] = useState({ 
    columns: ["Subject", "Status"], 
    data: [{ Subject: "Loading Data", Status: "Please wait..." }] 
  });
  const [usingLocalData, setUsingLocalData] = useState(false);
  const [attendance, setAttendance] = useState({ attended: 0, total: 0 });
  const [accuracy, setAccuracy] = useState(0);


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
        setError("Failed to load student list. Using local data.");
      }
    };
    
    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      setTableData({
        columns: ["Subject", "Status"],
        data: [{ Subject: "Loading Test Data", Status: "Fetching records..." }]
      });
  
      if (!selectedStudent?.studentId) {
        setTableData({
          columns: ["Subject", "Status"],
          data: [{ Subject: "No Selection", Status: "Please select a student" }]
        });
        setAttendance({ attended: 0, total: 0 });
        return;
      }
  
      try {
        const [subjects, completedTests, testIds] = await Promise.all([
          subjectService.getAllSubjects(),
          testService.getCompletedTests(),
          testAttemptService.getUserTestIds(selectedStudent.studentId),
        ]);
  
        const attendedCompletedTests = testIds.filter(testId =>
          completedTests.some(ct => ct.testId === testId)
        );
  
        setAttendance({
          attended: attendedCompletedTests.length,
          total: completedTests.length
        });
  
        if (attendedCompletedTests.length === 0) {
          setTableData({
            columns: ["Subject", "Status"],
            data: [{ Subject: "No Tests", Status: "Student hasn't taken any tests yet" }]
          });
          setBarGraphData([]);
          return;
        }
  
        const attempts = await Promise.all(
          attendedCompletedTests.map(testId =>
            testAttemptService.getTestAttempt(testId, selectedStudent.studentId)
              .then(attempt => attempt)
              .catch(() => ({ id: { testId }, score: null }))
        ));
        const accuracies = await Promise.all(
          attendedCompletedTests.map(async (testId) => {
              try {
                  const accuracy = await testAttemptService.getAccuracyForTest(testId, selectedStudent.studentId);
                  return accuracy || 0; // Fallback to 0 if accuracy is falsy (0, null, undefined)
              } catch (error) {
                  console.error("[Accuracy Error] Test:", testId, "Error:", error);
                  return 0; // Force 0% on API errors
              }
          })
      );
      
      const avgAccuracy = accuracies.length > 0
          ? Math.round((accuracies.reduce((a, b) => a + b, 0) / accuracies.length) )
          : 0;
      
      setAccuracy(avgAccuracy);
        
        const matrix = buildSubjectTestMatrix(
          subjects,
          completedTests,
          attendedCompletedTests,
          attempts.filter(a => a !== null)
        );
  
        if (matrix.data.length === 0) {
          setTableData({
            columns: ["Subject", "Status"],
            data: [{ Subject: "No Data", Status: "No test records found" }]
          });
          setBarGraphData([]);
        } else {
          setTableData(matrix);
        }
  
        setBarGraphData(matrix.barGraphData);
        setLineGraphData(matrix.timeScoreData);
        setError("");
  
      } catch (error) {
        console.error("Error loading test data:", error);
        setTableData({
          columns: ["Subject", "Status"],
          data: [{ Subject: "-", Status: "No test data" }]
        });
        setAttendance({ attended: 0, total: 0 });
        setBarGraphData([]);
        setLineGraphData([]);
        setError("Failed to load test data. Please try again.");
      }
    };
  
    fetchTestData();
  }, [selectedStudent]);
  
  const studentList = usingLocalData ? students : apiStudents;

  if (loading) return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading students...</p>
    </div>
  );

  return (
    <div className={styles.container}>
      <Navbar />
      
      <div className={styles.mainContent}>
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

        <div className={styles.rightContainer}>
          {selectedStudent ? (
            <StudentLayout
              {...selectedStudent}
              tableData={tableData}
              barGraphData={barGraphData}
              lineGraphData={lineGraphData}
              attendance={attendance}
              accuracy={accuracy}
              error={error}
            />
          ) : (
            <div className={styles.noSelection}>
              <p>Please select a student from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;