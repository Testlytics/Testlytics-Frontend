import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import Rectangle from "../../components/Rectangle/Rectangle";
import styles from "./reportInfo.module.css";
import {
  testService,
  testAttemptService,
  studentService,
} from "../../services/api";

const ReportInfo = ({ pendingResults: propPendingResults }) => {
  const [pendingResults, setPendingResults] = useState(0);
  const [averageScores, setAverageScores] = useState([]);

  const rectangleData = [
    // { leftText: "Attendance", rightText: "20%" },
    // { leftText: "Accuracy", rightText: "80%" },
    { centerText: "Student Wise Reports", link: "/studentlist" },
    { centerText: "Subject Wise Reports", link: "/subjects" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tests, students] = await Promise.all([
          testService.getCompletedTests(),
          studentService.getStudents(),
        ]);

        const unpublished = tests.filter((test) => !test.published);
        if (!propPendingResults) setPendingResults(unpublished.length);

        const studentMap = new Map(students.map((s) => [String(s.studentId), s]));
        const avgScorePerTest = [];

        for (const test of tests) {
          let studentIds = [];
          try {
            const res = await testAttemptService.getStudentsByTest(test.testId);
            studentIds = res;
          } catch (error) {
            if (error.response?.status === 404) continue;
            else throw error;
          }

          let total = 0;
          let count = 0;

          for (const id of studentIds) {
            const attempt = await testAttemptService.getTestAttempt(test.testId, id);
            if (attempt?.score !== undefined) {
              total += attempt.score;
              count++;
            }
          }

          avgScorePerTest.push({
            name: test.testName || `Test ${test.testId}`,
            score: count > 0 ? parseFloat((total / count).toFixed(2)) : 0,
          });
        }

        setAverageScores(avgScorePerTest);
      } catch (error) {
        console.error("Error fetching average scores:", error);
      }
    };

    fetchData();
  }, [propPendingResults]);

  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      <div className="row d-flex align-items-center g-4">
        {/* Stat Card */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <StatCard
            heading="Pending Results"
            value={propPendingResults ?? pendingResults}
            variant="default"
            buttonText="View Details"
            onButtonClick={() => alert("Details Clicked")}
          />
        </div>

        {/* Area Chart */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-self-center">
          <AreaChartComponent
            title="Average Scores"
            data={averageScores}
            dataKey="score"
            gradientId="classAverage"
          />
        </div>

        {/* Rectangles Grid */}
        <div className="col-lg-4 col-md-12 align-self-center">
          <div className="row">
            {rectangleData.map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-12 col-md-12 col-lg-12 mb-3 d-flex justify-content-center align-self-end"
              >
                {item.link ? (
                  <Link to={item.link} className={styles.linkWrapper}>
                    <Rectangle centerText={item.centerText} />
                  </Link>
                ) : (
                  <Rectangle
                    leftText={item.leftText}
                    rightText={item.rightText}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportInfo;
