  import React from "react";
  import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
  import Navbar from "../../components/Navbar/Navbar";
  import TableColour from "../../components/TableColour/TableColour";
  import Button from "../../components/Button/Button"; 
  import styles from "./testReports.module.css";

  const TestReports = () => {
    const navigate = useNavigate(); // ✅ Initialize navigation

    // Define custom column names
    const columnNames = ["SI.No", "Date", "Subject", "Test Name", "Attendance", "Detailed Report"];

    // Function to handle navigation
    const handleViewClick = (testName) => {
      navigate(`/detailed-report/${testName}`); // ✅ Navigate to detailed report
    };

    // Define custom table data with navigation
    const data = [
      [
        1,
        "2025-03-20",
        "Mathematics",
        "Math Test 1",
        "Present",
        <div className={styles.buttonCell}>
          <Button
            text="View to Publish"
            className={styles.centerButton}
            onClick={() => handleViewClick("Math Test 1")}
          />
        </div>,
      ],
      [
        2,
        "2025-03-21",
        "Science",
        "Science Quiz",
        "Absent",
        <div className={styles.buttonCell}>
          <Button
            text="View to Publish"
            className={styles.centerButton}
            onClick={() => handleViewClick("Science Quiz")}
          />
        </div>,
      ],
      [
        3,
        "2025-03-22",
        "History",
        "History Exam",
        "Present",
        <div className={styles.buttonCell}>
          <Button
            text="View to Publish"
            className={styles.centerButton}
            onClick={() => handleViewClick("History Exam")}
          />
        </div>,
      ],
      [
        4,
        "2025-03-23",
        "English",
        "English Test",
        "Present",
        <div className={styles.buttonCell}>
          <Button
            text="View to Publish"
            className={styles.centerButton}
            onClick={() => handleViewClick("English Test")}
          />
        </div>,
      ],
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
