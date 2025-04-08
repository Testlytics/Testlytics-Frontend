import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./detailedReport.module.css";
import TableColour from "../../components/TableColour/TableColour";

const DetailedReport = () => {
  const { topic } = useParams();

  // Define column names
  const columnNames = ["Student ID", "Student Name", "Submitted Time", "Score", "Accuracy", "Query", "Feedback"];

  // Define demo data with initial empty feedback fields
  const initialData = [
    ["101", "Alice Johnson", "10:05 AM", "85%", "90%", "Why was question 3 tricky?", ""],
    ["102", "Bob Smith", "10:10 AM", "78%", "85%", "Can you explain question 5?", ""],
    ["103", "Charlie Brown", "10:15 AM", "92%", "95%", "I had trouble with question 2.", ""],
  ];

  // Use state to manage feedback input for each student
  const [feedbackData, setFeedbackData] = useState(initialData);

  // Handle feedback input change
  const handleFeedbackChange = (index, value) => {
    const updatedData = [...feedbackData];
    updatedData[index][6] = value; // 6 is the index for "Feedback" column
    setFeedbackData(updatedData);
  };

  // Modify data to include input fields in the Feedback column
  const modifiedData = feedbackData.map((row, index) => [
    row[0], // Student ID
    row[1], // Student Name
    row[2], // Submitted Time
    row[3], // Score
    row[4], // Accuracy
    row[5], // Query
    <input
      type="text"
      value={row[6]}
      onChange={(e) => handleFeedbackChange(index, e.target.value)}
      className={styles.feedbackInput} // Apply styles
      placeholder="Enter feedback"
    />,
  ]);

  return (
    <div className={styles.detailedReportContainer}>
      <Navbar />
      <h1 className={styles.title}>Detailed Report</h1>
      
      {/* Row with Test Name on Left & Class Average on Right */}
      <div className={styles.headerRow}>
        <h2 className={styles.testTitle}>Test: {topic}</h2>
        <h2 className={styles.classAverage}>Class Average: </h2>
      </div>

      <div className={styles.tableContainer}>
        <TableColour columnNames={columnNames} data={modifiedData} />
      </div>
    </div>
  );
};

export default DetailedReport;