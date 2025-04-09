import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportInfo from "../../layouts/ReportInfo/ReportInfo";
import styles from "./reportPage.module.css";
import Heading from "../../components/Heading/Heading";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";
import { testService, subjectService, testAttemptService, studentService } from "../../services/api";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent"; // Importing the chart component

// Converts percentile to grade
const getGradeFromPercentile = (percentile) => {
  if (percentile >= 90) return "A+";
  if (percentile >= 75) return "A";
  if (percentile >= 60) return "B";
  if (percentile >= 40) return "C";
  return "D";
};

const ReportPage = () => {
  const navigate = useNavigate();
  const [unpublishedTests, setUnpublishedTests] = useState([]);
  const [subjectMap, setSubjectMap] = useState({});
  const [classAvgChartData, setClassAvgChartData] = useState([]);
  const [topScorers, setTopScorers] = useState([]);
  const [avgGrade, setAvgGrade] = useState("N/A");
  const [classPercentile, setClassPercentile] = useState("N/A");
  const [pendingResults, setPendingResults] = useState(0); // State for pending results count

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tests, subjects, and students
        const [tests, subjects, students] = await Promise.all([
          testService.getCompletedTests(),
          subjectService.getAllSubjects(),
          studentService.getStudents(),
        ]);

        // Filter unpublished tests
        const unpublished = tests.filter((test) => test.published === false);

        // Set the state for unpublished tests
        setUnpublishedTests(unpublished);

        // Build subject map: subjectId → subjectName
        const map = {};
        subjects.forEach((subject) => {
          map[subject.subjectId] = subject.subjectName;
        });

        setSubjectMap(map);

        // Prepare data for chart and top scorers
        const studentMap = new Map(students.map((s) => [String(s.studentId), s]));
        const studentScores = new Map();
        const avgScorePerTest = [];

        for (const test of tests) {
          let studentIds = [];
          try {
            const res = await testAttemptService.getStudentsByTest(test.testId);
            studentIds = res; // Assuming your service unwraps the actual body
          } catch (error) {
            if (error.response && error.response.status === 404) {
              // No students attempted this test — skip to next test
              continue;
            } else {
              throw error; // Other unexpected errors should still surface
            }
          }

          let total = 0;
          let count = 0;

          for (const id of studentIds) {
            const attempt = await testAttemptService.getTestAttempt(test.testId, id);
            if (attempt && attempt.score !== undefined) {
              total += attempt.score;
              count++;
            }

            const idStr = String(id);
            if (!studentScores.has(idStr)) {
              const student = studentMap.get(idStr);
              studentScores.set(idStr, {
                totalScore: 0,
                testCount: 0,
                name: student?.firstName || `Student ${id}`,
              });
            }

            const userData = studentScores.get(idStr);
            userData.totalScore += attempt?.score ?? 0;
            userData.testCount += 1;
          }

          avgScorePerTest.push({
            test: test.testName || `Test ${test.testId}`,
            averageScore: count > 0 ? parseFloat((total / count).toFixed(2)) : 0,
          });
        }

        setClassAvgChartData(avgScorePerTest);

        const allScorers = Array.from(studentScores.entries()).map(([id, data]) => ({
          userId: id,
          name: data.name,
          averageScore: data.testCount ? data.totalScore / data.testCount : 0,
          totalScore: data.totalScore,
          testCount: data.testCount,
        }));

        const sorted = allScorers.sort((a, b) => b.averageScore - a.averageScore);
        setTopScorers(sorted.slice(0, 3));

        if (sorted.length > 0) {
          const avg = sorted.reduce((sum, s) => sum + s.averageScore, 0) / sorted.length;
          const percentile = 100 * (sorted.filter((s) => s.averageScore < avg).length / sorted.length);
          setClassPercentile(percentile.toFixed(2));
          setAvgGrade(getGradeFromPercentile(percentile));
        }

        // Set pending results based on the highest SI number
        setPendingResults(unpublished.length); // The number of pending results is the length of unpublishedTests
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

      {/* Pending Results Display */}
      <div className={styles.pendingResults}>
        <h2>Pending Results: {pendingResults}</h2> {/* Display pending results */}
      </div>

      {/* Card Title Grid Container */}
      <div className={styles.cardTitleGrid}>
        {/* Area Chart inside the cardTitle grid */}
        <div className={styles.cardTileContainer}>
          <AreaChartComponent
            title="Overall Performance Graph"
            data={classAvgChartData.map((d) => ({
              name: d.test,
              score: d.averageScore,
            }))}
            dataKey="score"
            gradientId="classAverage"
          />
        </div>
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
