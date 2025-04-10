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

import { useNavigate } from "react-router-dom";

import {
  testService,
  testAttemptService,
} from "../../services/api";

const StudentDashboardOverview = () => {
  const [accuracy, setAccuracy] = useState(0);
  const [loading, setLoading] = useState(true);
  const [studentPerformance, setStudentPerformance] = useState([]);
  const [nextExam, setNextExam] = useState(null);
  const navigate = useNavigate();


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
        const [completedTests, userTestIds, allTests] = await Promise.all([
          testService.getCompletedTests(),
          testAttemptService.getUserTestIds(studentId),
          testService.getAllTests(), // used for next exam logic
        ]);

        // --- PERFORMANCE & ACCURACY LOGIC ---
        const attendedCompletedTests = userTestIds.filter((testId) =>
          completedTests.some((ct) => ct.testId === testId)
        );

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

        // --- NEXT EXAM LOGIC ---
        const upcomingTests = allTests
        .filter((test) => {
          const testDateTime = new Date(`${test.testDate}T${test.startTime}`);
          const now = new Date();
          return (
            testDateTime > now &&
            !userTestIds.includes(test.testId) // not yet attempted
          );
        })
        .sort((a, b) => {
          const aDateTime = new Date(`${a.testDate}T${a.startTime}`);
          const bDateTime = new Date(`${b.testDate}T${b.startTime}`);
          return aDateTime - bDateTime;
        });
      
        if (upcomingTests.length > 0) {
          const test = upcomingTests[0];
        
          const normalizeDate = (d) => {
            const date = new Date(d);
            date.setHours(0, 0, 0, 0);
            return date;
          };
        
          const now = normalizeDate(new Date());
          const testDateTime = normalizeDate(new Date(`${test.testDate}T${test.startTime}`));
        
          const diffDays = Math.floor((testDateTime - now) / (1000 * 60 * 60 * 24));
        
          setNextExam({
            title: "Next Exam",
            description: `${test.testName}`,
            value:
      diffDays === 0
        ? "Today"
        : diffDays === 1
        ? "1 Day Left"
        : `${diffDays} Days Left`,
    buttonText: "View Details",
    onClick: () => navigate("/missednupcoming"),
          });
        }
        
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
            title={nextExam?.title || "Next Exam"}
            description={nextExam?.description || "No upcoming exams"}
            value={nextExam?.value || "-"}
            buttonText={nextExam?.buttonText || ""}
            onButtonClick={nextExam?.onClick || (() => {})}
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
