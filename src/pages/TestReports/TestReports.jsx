import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";
import styles from "./testReports.module.css";
import { testService,subjectService  } from "../../services/api";
 
 
const TestReports = () => {
  const navigate = useNavigate();
  const [unpublishedTests, setUnpublishedTests] = useState([]);
  const [subjectMap, setSubjectMap] = useState({});
 
  // Fetch test and subject data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tests, subjects] = await Promise.all([
          testService.getCompletedTests(),
          subjectService.getAllSubjects()
        ]);
 
        const unpublished = tests.filter(test => test.published === false);
 
        // Build map: subjectId → subjectName
        const map = {};
        subjects.forEach(subject => {
          map[subject.subjectId] = subject.subjectName;
        });
 
        setSubjectMap(map);
        setUnpublishedTests(unpublished);
      } catch (error) {
        console.error("Error fetching test or subject data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  const handleViewClick = (testId) => {
    navigate(`/detailed-report/${testId}`);
  };
 
  const columnNames = ["SI.No", "Date", "Subject", "Test Name", "Attendance", "Detailed Report"];
 
  // Format data with subject name
  const formattedData = unpublishedTests.map((test, index) => [
    index + 1,
    test.testDate || "N/A",
    subjectMap[test.subjectId] || "Unknown Subject",
    test.testName || "N/A",
    "Pending",
    <div className={styles.buttonCell}>
      <Button
        text="View to Publish"
        className={styles.centerButton}
        onClick={() => handleViewClick(test.testId)}
      />
    </div>,
  ]);
 
  return (
    <div className={styles.testReportsContainer}>
      <Navbar />
      <h1 className={styles.heading}>Test Reports</h1>
      <div className={styles.tableContainer}>
        <TableColour columnNames={columnNames} data={formattedData} />
      </div>
    </div>
  );
};
 
export default TestReports;