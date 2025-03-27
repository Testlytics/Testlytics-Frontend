import { useState, useEffect } from "react";
import { studentService } from "../../services/api";
import styles from "./studentPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftList from "../../layouts/LeftList/LeftList";
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import studentsData from "./students"; // Import the students data
import Profile from "../../assets/images/profile.jpg";

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
          <LeftList
            title="Students"
            data={studentsData}
            itemKey="studentId"
            itemLabel="firstName"
            selectedItemId={selectedStudent?.studentId} // ✅ Fix: Use selectedStudent?.studentId
            onItemClick={handleStudentClick} // ✅ Fix: Correct function name
          />
        </div>
        <div className={styles.rightContainer}>
          {selectedStudent ? (
            <div className={styles.studentLayout}>
              <StudentLayout
                studentDetails={{
                  src:Profile,
                  title: selectedStudent.title,
                  firstName: selectedStudent.firstName,
                  studentId: selectedStudent.studentId,
                  rank: selectedStudent.rank,
                }}
                tableData={selectedStudent.tableData}
                barGraphData={selectedStudent.barGraphData}
                lineGraphData={selectedStudent.lineGraphData}
              />
            </div>
          ) : (
            <p className={styles.noStudent}>Select a student to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;