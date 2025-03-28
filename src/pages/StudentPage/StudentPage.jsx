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
      if (!selectedStudent) return;
      
      if (usingLocalData) {
        // Use the tableData from local students data
        setTableData(selectedStudent.tableData || { columns: [], data: [] });
        return;
      }

      try {
        const [subjects, tests, testIds] = await Promise.all([
          subjectService.getAllSubjects(),
          testService.getAllTests(),
          testAttemptService.getUserTestIds(selectedStudent.userId || selectedStudent.studentId)
        ]);

        const attempts = await Promise.all(
          testIds.map(testId => 
            testAttemptService.getTestAttempt(testId, selectedStudent.userId || selectedStudent.studentId)
              .catch(() => null)
          )
        );

        const validAttempts = attempts.filter(Boolean);
        const matrix = buildSubjectTestMatrix(subjects, tests, validAttempts);
        setTableData(matrix);
      } catch (error) {
        console.error("Error loading test data, falling back to local data:", error);
        setTableData(selectedStudent.tableData || { columns: [], data: [] });
      }
    };

    fetchTestData();
  }, [selectedStudent, usingLocalData]);

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