import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportInfo from "../../layouts/ReportInfo/ReportInfo";
import styles from "./reportPage.module.css";
import Heading from "../../components/Heading/Heading";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";
import { testService, subjectService } from "../../services/api";

const ReportPage = () => {
  const navigate = useNavigate();
  const [unpublishedTests, setUnpublishedTests] = useState([]);
  const [subjectMap, setSubjectMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the data
        const [tests, subjects] = await Promise.all([
          testService.getCompletedTests(),
          subjectService.getAllSubjects(),
        ]);

        // Filter unpublished tests
        const unpublished = tests.filter(test => test.published === false);

        // Build subject map: subjectId → subjectName
        const map = {};
        subjects.forEach(subject => {
          map[subject.subjectId] = subject.subjectName;
        });

        // Set the state for unpublished tests and subject map
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

  // Format data to include subject names
  const formattedData = unpublishedTests.map((test, index) => [
    index + 1,
    test.testDate || "N/A",
    subjectMap[test.subjectId] || "Unknown Subject",
    test.testName || "N/A",
    "Pending",
    <div className={styles.buttonCell} key={test.testId}>
      <Button
        text="View to Publish"
        className={styles.centerButton}
        onClick={() => handleViewClick(test.testId)}
      />
    </div>,
  ]);

  return (
    <div className={styles.pageContainer}>
      {/* Breadcrumbs */}
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs />
      </div>

      {/* Heading */}
      <div className={`col-12 text-center ${styles.headingSection}`}>
        <Heading text="Reports" align="center" size="40px" weight="700" />
      </div>      

      {/* Report Info */}
      <div className={styles.topSection}>
        <ReportInfo />
      </div>

      {/* Test Reports Table */}
      <div className={styles.bottomSection}>
        <h1>Test Reports</h1>
        <TableColour columnNames={columnNames} data={formattedData} height="auto" />
      </div>
    </div>
  );
};

export default ReportPage;
