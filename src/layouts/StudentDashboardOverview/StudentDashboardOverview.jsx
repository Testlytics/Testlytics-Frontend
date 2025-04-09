import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  userState,
  authLoadingState,
} from "../../states/UserState";

import ExamCard from "../../components/ExamCard/ExamCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import StatCard from "../../components/StatCard/StatCard";
import styles from "./studentDashboardOverview.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  testService,
  testAttemptService,
} from "../../services/api";

const StudentDashboardOverview = () => {
  const [accuracy, setAccuracy] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentPerformance, setStudentPerformance] = useState([]);

  const user = useRecoilValue(userState);
  const authLoading = useRecoilValue(authLoadingState);

  useEffect(() => {
    const fetchData = async () => {
      const studentId = user?.id || localStorage.getItem("userId");
      if (!studentId) {
        setLoading(false);
        return;
      }

      try {
        const [completedTests, userTestIds] = await Promise.all([
          testService.getCompletedTests(),
          testAttemptService.getUserTestIds(studentId),
        ]);

        const attendedCompletedTests = userTestIds.filter((testId) =>
          completedTests.some((ct) => ct.testId === testId)
        );

        // Fetch accuracy and scores
        const accuracies = [];
        const performance = [];

        for (const testId of attendedCompletedTests) {
          try {
            const [accuracyResult, attempt] = await Promise.all([
              testAttemptService.getAccuracyForTest(testId, studentId),
              testAttemptService.getTestAttempt(testId, studentId),
            ]);

            const testName =
              completedTests.find((t) => t.testId === testId)?.testName ||
              `Test ${testId}`;

            performance.push({
              name: testName,
              score: attempt?.score ?? 0,
            });

            accuracies.push(accuracyResult || 0);
          } catch (err) {
            console.error("Error with testId", testId, err);
          }
        }

        const avgAccuracy = accuracies.length
          ? Math.round(
              accuracies.reduce((total, current) => total + current, 0) /
                accuracies.length
            )
          : 0;

        setAccuracy(avgAccuracy);
        setStudentPerformance(performance);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) fetchData();
  }, [user, authLoading]);

  const getAccuracyDescription = (score) => {
    if (score >= 90) return "Excellent performance!";
    if (score >= 75) return "You are highly accurate!";
    if (score >= 50) return "Good, but there's room for improvement.";
    return "Needs significant improvement.";
  };

  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      <div className="row d-flex align-items-center g-4">
        {/* Exam Card */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <ExamCard
            title="Next Exam"
            description="Mathematics Grade 10"
            value="2 Days Left"
            buttonText="View Details"
            onButtonClick={() => alert("Exam Details Clicked!")}
          />
        </div>

        {/* Area Chart */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <AreaChartComponent
            title="Your Performance"
            data={studentPerformance}
            dataKey="score"
            gradientId="studentPerformance"
          />
        </div>

        {/* Accuracy Card */}
        <div className="col-lg-4 col-md-12 d-flex justify-content-center">
          <StatCard
            heading="Accuracy"
            value={loading ? "Loading..." : `${accuracy}%`}
            description={loading ? "" : getAccuracyDescription(accuracy)}
            variant="withDescription"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardOverview;
