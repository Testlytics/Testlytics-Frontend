import { useState, useEffect } from "react";
import styles from "./studentPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import LeftList from "../../layouts/LeftList/LeftList";
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import studentsData from "./students"; // Import the students data
import Profile from "../../assets/images/profile.jpg";

const StudentPage = ({ navbar }) => {
  // Ensure default state is set properly
  const [selectedStudent, setSelectedStudent] = useState(studentsData[0] || null);

  // If studentsData changes, update selectedStudent
  useEffect(() => {
    if (studentsData.length > 0) {
      setSelectedStudent(studentsData[0]); // Set first student as default
    }
  }, [studentsData]);

  // Handle student click
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      {navbar}

      <div className={styles.mainContent}>
        {/* Left Sidebar */}
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

        {/* Right Section */}
        <div className={styles.rightContainer}>
          {/* Check if selectedStudent is available */}
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
            <p className={styles.noStudent}>No student selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPage;
