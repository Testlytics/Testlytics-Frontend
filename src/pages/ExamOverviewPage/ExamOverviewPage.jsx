import React, { useEffect, useState } from "react";
import ExamIcons from "../../layouts/ExamIcons/ExamIcons";
import TableLayout from "../../layouts/TableLayout/TableLayout";
import styles from "./examOverviewPage.module.css";
import Heading from "../../components/Heading/Heading";
import { testService } from "../../services/api";
import { subjectService } from "../../services/api"; // ✅ Use subjectService
import Button from "../../components/Button/Button";

const ExamOverviewPage = () => {
  const [tableData, setTableData] = useState([]);
  const [testCount, setTestCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const columnNames = ["Test ID", "Date", "Test Name", "Subject", "Question paper"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch completed tests and subjects
        const [tests, subjects] = await Promise.all([
          testService.getCompletedTests(),
          subjectService.getAllSubjects()
        ]);

        // Map subjectId to subjectName
        const subjectMap = {};
        subjects.forEach(subject => {
          subjectMap[subject.subjectId] = subject.subjectName;
        });

        // Format test data
        const formattedData = tests.map((test, index) => [
          index + 1,
          test.testDate,
          test.testName,
          subjectMap[test.subjectId] || "Unknown",
          {
            content: <Button key={test.testId} text="View" />,
            cellClass: 'centerCell'  // custom class to apply
          }
        ]);
        

        setTableData(formattedData);
        setTestCount(tests.length);
      } catch (err) {
        console.error("Error fetching test history or subjects:", err);
        setError("Failed to load exam history.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`container-fluid d-flex flex-column ${styles.pageWrapper}`}>
      <div className={`col-12 text-center ${styles.headingSection}`}>
        <Heading text="Exams" align="center" size="40px" weight="700" />
      </div>

      <div className={`col-12 ${styles.topSection}`}>
        <ExamIcons totalExams={testCount}/>
      </div>

      <div className={`col-12 flex-grow-1 px-5 ${styles.bottomSection}`}>
        <TableLayout 
          columnNames={columnNames}
          data={tableData}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ExamOverviewPage;
