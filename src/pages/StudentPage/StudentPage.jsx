import { useEffect, useState } from "react";
import styles from "./studentPage.module.css";
import { studentService, subjectService, testService, testAttemptService } from "../../services/api";
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import LeftList from "../../layouts/LeftList/LeftList";
import { buildSubjectTestMatrix } from "../../utils/testDataTransformer";
import students from "./students"; // Correct variable name

const StudentPage = () => {
  const [apiStudents, setApiStudents] = useState([]); // Renamed to avoid confusion
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState({ columns: [], data: [] });
  const [usingLocalData, setUsingLocalData] = useState(false);

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
        setSelectedStudent(students[0]); // Using the imported students data
        setUsingLocalData(true);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchTestData = async () => {
      // Ensure we have a valid student ID
      if (!selectedStudent?.userId && !selectedStudent?.studentId) {
        console.error("No valid student ID available");
        setTableData({ columns: [], data: [] });
        return;
      }
  
      // Use userId if available, otherwise fall back to studentId
      const studentId = selectedStudent.userId || selectedStudent.studentId;
      console.log("Fetching data for student:", studentId);
  
      try {
        // 1. Get attended test IDs
        const testIds = await testAttemptService.getUserTestIds(studentId);
        console.log("Attended test IDs:", testIds);
  
        // 2. Get all required data in parallel
        const [subjects, tests, attempts] = await Promise.all([
          subjectService.getAllSubjects(),
          testService.getAllTests(),
          Promise.all(
            testIds.map(testId => 
              testAttemptService.getTestAttempt(testId, studentId)
                .then(attempt => {
                  console.log(`Test ${testId} score:`, attempt?.score);
                  return attempt;
                })
                .catch(error => {
                  console.error(`Failed to fetch attempt ${testId}:`, error);
                  return { id: { testId }, score: null }; // Keep failed attempts
                })
          ))
        ]);
  
        // 3. Process data
        const matrix = buildSubjectTestMatrix(
          subjects,
          tests,
          testIds,
          attempts.filter(a => a !== null)
        );
        
        setTableData(matrix);
      } catch (error) {
        console.error("Error loading test data:", error);
        setTableData({ columns: [], data: [] });
      }
    };
  
    fetchTestData();
  }, [selectedStudent]);

  // Determine which student list to use
  const studentList = usingLocalData ? students : apiStudents;

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <LeftList
        title="Students"
        data={studentList}
        itemKey="studentId"
        itemLabel="firstName"
        selectedItemId={selectedStudent?.studentId}
        onItemClick={handleStudentClick}
      />

{selectedStudent && (
  <StudentLayout 
    {...selectedStudent}
    tableData={
      (tableData && Array.isArray(tableData.columns) && Array.isArray(tableData.data))
        ? tableData
        : { columns: [], data: [] }
    }
    barGraphData={selectedStudent.barGraphData || []}
    lineGraphData={selectedStudent.lineGraphData || []}
  />
)}
    </div>
  );
};

export default StudentPage;