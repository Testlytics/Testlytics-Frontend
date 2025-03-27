import { useState, useEffect } from "react";
import { studentService } from "../../services/api";
import styles from "./studentPage.module.css";

const StudentPage = ({ navbar }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // This will only return users with role_id = 2
        const studentsData = await studentService.getStudents();
        setStudents(studentsData);
        if (studentsData.length > 0) {
          setSelectedStudent(studentsData[0]);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  if (loading) {
    return <div className={styles.container}>Loading students...</div>;
  }

  if (error) {
    return <div className={styles.container}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {navbar}
      <div className={styles.mainContent}>
        <div className={styles.leftSidebar}>
          <h1>Students List</h1>
          {students.length > 0 ? (
            <LeftList
              students={students}
              selectedStudentId={selectedStudent?.id}
              onStudentClick={handleStudentClick}
            />
          ) : (
            <p>No students found</p>
          )}
        </div>
        <div className={styles.rightContainer}>
          {selectedStudent ? (
            <StudentLayout
              studentDetails={{
                firstName: selectedStudent.username, // Using username as firstName
                studentId: selectedStudent.id,
                email: selectedStudent.email
              }}
            />
          ) : (
            <p className={styles.noStudent}>Select a student to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;