import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button"; // ✅ Import Button
import styles from "./testReports.module.css";

const TestReports = () => {
  // Define custom column names
  const columnNames = ["SI.No", "Date", "Subject", "Test Name", "Attendance", "Detailed Report"];

  // Define custom table data
  const data = [
    [1, "2025-03-20", "Mathematics", "Math Test 1", "Present", <Button text="View" onClick={() => alert("Viewing Math Test 1")} />],
    [2, "2025-03-21", "Science", "Science Quiz", "Absent", <Button text="View" onClick={() => alert("Viewing Science Quiz")} />],
    [3, "2025-03-22", "History", "History Exam", "Present", <Button text="View" onClick={() => alert("Viewing History Exam")} />],
    [4, "2025-03-23", "English", "English Test", "Present", <Button text="View" onClick={() => alert("Viewing English Test")} />],
  ];

  return (
    <div className={styles.testReportsContainer}>
      <Navbar />
      <h1 className={styles.heading}>Test Reports</h1>
      <div className={styles.tableContainer}>
        {/* Pass the custom column names and data to TableColour */}
        <TableColour columnNames={columnNames} data={data} />
      </div>
    </div>
  );
};

export default TestReports;
