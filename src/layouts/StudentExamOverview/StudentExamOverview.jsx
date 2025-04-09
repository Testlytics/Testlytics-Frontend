import React, { useEffect, useState } from "react";
import UpcomingTest from "../../components/UpcomingTest/UpcomingTest";
import VerticalCard from "../../components/VerticalCard/VerticalCard";
import Heading from "../../components/Heading/Heading";
import styles from "./studentExamOverview.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRecoilValue } from "recoil";
import { userState, authLoadingState } from "../../states/UserState";
import { testService, testAttemptService, studentService } from "../../services/api";

const StudentExamOverview = () => {
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [rank, setRank] = useState(null);
  const [totalExams, setTotalExams] = useState(0);
  const user = useRecoilValue(userState);
  const authLoading = useRecoilValue(authLoadingState);

  useEffect(() => {
    const fetchAttendance = async () => {
      const studentId = user?.id || localStorage.getItem("userId");
      if (!studentId) return;

      try {
        const [completedTests, userTestIds] = await Promise.all([
          testService.getCompletedTests(),
          testAttemptService.getUserAttendance(studentId),
        ]);

        const attendedCompletedTests = userTestIds.filter((testId) =>
          completedTests.some((ct) => ct.testId === testId)
        );

        const total = completedTests.length;
        const attended = attendedCompletedTests.length;
        const percentage = total === 0 ? 0 : Math.round((attended / total) * 100);

        setAttendancePercentage(percentage);
        setTotalExams(attended); // totalExams = number of attended tests
      } catch (err) {
        console.error("Error calculating attendance:", err);
      }
    };

    const fetchRank = async () => {
      const studentId = user?.id || localStorage.getItem("userId");
      if (!studentId) return;

      try {
        const userTestIds = await testAttemptService.getUserTestIds(studentId); // Only the tests user attended
        const students = await studentService.getStudents(); // All students

        const scoresByStudent = new Map();

        for (const testId of userTestIds) {
          for (const student of students) {
            try {
              const attempt = await testAttemptService.getTestAttempt(testId, student.studentId);
              if (!attempt || typeof attempt.score !== "number") continue;

              if (!scoresByStudent.has(student.studentId)) {
                scoresByStudent.set(student.studentId, {
                  name: student.firstName,
                  totalScore: 0,
                  testCount: 0,
                });
              }

              const current = scoresByStudent.get(student.studentId);
              scoresByStudent.set(student.studentId, {
                ...current,
                totalScore: current.totalScore + attempt.score,
                testCount: current.testCount + 1,
              });
            } catch (err) {
              if (err.response?.status !== 404) {
                console.error(`Error fetching attempt for student ${student.studentId} test ${testId}:`, err);
              }
              // If 404 or no attempt found, skip
            }
          }
        }

        // Calculate average
        const allScorers = Array.from(scoresByStudent.entries()).map(([id, data]) => ({
          userId: id,
          name: data.name,
          averageScore: data.testCount ? data.totalScore / data.testCount : 0,
        }));

        // Sort and get rank
        const sorted = allScorers.sort((a, b) => b.averageScore - a.averageScore);
        const userRank = sorted.findIndex((entry) => entry.userId === studentId) + 1;

        setRank(userRank || "N/A");
        setTotalExams(userTestIds.length); // Total exams = attended
      } catch (err) {
        console.error("Error calculating rank:", err);
      }
    };

    if (!authLoading) {
      fetchAttendance();
      fetchRank();
    }
  }, [user, authLoading]);

  return (
    <div className="container-fluid py-4">
      <Heading title="Student Exam Overview" />

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <UpcomingTest />
        </div>

        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center gap-4 mt-5">
          <VerticalCard heading="Attendance" value={`${attendancePercentage}%`} />
          <VerticalCard
            heading="Rank"
            value={rank !== null ? rank : "Loading..."}
            
            
          />
          <VerticalCard heading="Total Exams" value={totalExams} />
        </div>

        <div className="col-12 col-lg-4 d-flex justify-content-center">
          <div className={styles.examTips}>
            <h3 className={styles.heading}>Exam Tips</h3>
            <ul className={styles.tipsList}>
              <li>Revise key concepts daily</li>
              <li>Practice previous year's papers</li>
              <li>Stay hydrated and sleep well</li>
              <li>Manage time efficiently during exams</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExamOverview;
