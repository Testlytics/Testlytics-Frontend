import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportInfo from "../../layouts/ReportInfo/ReportInfo";
import styles from "./reportPage.module.css";
import Heading from "../../components/Heading/Heading";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";

const ReportPage = () => {
  const navigate = useNavigate();
  const [unpublishedTests, setUnpublishedTests] = useState([]);
  const [subjectMap, setSubjectMap] = useState({});

  useEffect(() => {
    // Dummy subjects
    const dummySubjects = [
      { subjectId: "sub101", subjectName: "Mathematics" },
      { subjectId: "sub102", subjectName: "Science" },
      { subjectId: "sub103", subjectName: "History" },
    ];

    // Dummy tests
    const dummyTests = [
      {
        testId: "test001",
        testDate: "2025-04-01",
        subjectId: "sub101",
        testName: "Algebra Basics",
        published: false,
      },
      {
        testId: "test002",
        testDate: "2025-04-03",
        subjectId: "sub102",
        testName: "Physics Quiz",
        published: false,
      },
      {
        testId: "test003",
        testDate: "2025-04-05",
        subjectId: "sub103",
        testName: "Ancient Civilizations",
        published: false,
      },
    ];

    // Build subject map
    const map = {};
    dummySubjects.forEach(subject => {
      map[subject.subjectId] = subject.subjectName;
    });

    setSubjectMap(map);
    setUnpublishedTests(dummyTests);
  }, []);

  const handleViewClick = (testId) => {
    navigate(`/detailed-report/${testId}`);
  };

  const columnNames = ["SI.No", "Date", "Subject", "Test Name", "Attendance", "Detailed Report"];

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
        <TableColour columnNames={columnNames} data={formattedData} height='auto'/>
      </div>
    </div>
  );
};

export default ReportPage;
