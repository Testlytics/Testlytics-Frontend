import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListCard from "../../components/ListCard/ListCard";
import styles from "./leftList.module.css";
import studentsData from "../../pages/StudentPage/students"; // Import the students data

const LeftList = ({ title, onStudentClick, selectedStudentId }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter students based on search query
  const filteredStudents = studentsData.filter(
    (student) =>
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <div className={styles.listContainer}>
        {filteredStudents.map((student) => (
          <ListCard
            key={student.studentId}
            id={student.studentId}
            name={student.firstName}
            isSelected={selectedStudentId === student.studentId} // Highlight selected student
            onClick={() => onStudentClick(student)} // Pass the selected student to parent
          />
        ))}
      </div>
    </div>
  );
};

export default LeftList;
