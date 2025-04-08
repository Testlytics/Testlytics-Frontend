import React, { useEffect, useState } from "react";
import StatCard from "../../components/StatCard/StatCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import styles from "./dashboardOverview.module.css";
import { testService, testAttemptService, studentService } from "../../services/api";

// Converts percentile to grade
const getGradeFromPercentile = (percentile) => {
  if (percentile >= 90) return "A+";
  if (percentile >= 75) return "A";
  if (percentile >= 60) return "B";
  if (percentile >= 40) return "C";
  return "D";
};

const DashboardOverview = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [userPercentile, setUserPercentile] = useState(null);
  const [grade, setGrade] = useState("N/A");
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tests, students] = await Promise.all([
          testService.getCompletedTests(),
          studentService.getStudents(),
        ]);

        const studentMap = new Map(students.map(s => [String(s.studentId), s]));
        const studentScores = new Map();

        const userId = students[0]?.studentId?.toString(); // 🔁 Replace this with actual user ID from auth/session

        const tempPerformance = [];

        for (const test of tests) {
          const studentIds = await testAttemptService.getStudentsByTest(test.testId);

          for (const id of studentIds) {
            const attempt = await testAttemptService.getTestAttempt(test.testId, id);
            if (!attempt || attempt.score === undefined) continue;

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
            userData.totalScore += attempt.score;
            userData.testCount += 1;

            // Collect current user's performance
            if (idStr === userId) {
              const time = parseFloat(attempt.totalTime);
              const subject = attempt.subjectName || "Subject";
              const existing = tempPerformance.find((d) => d.time === time);
              if (existing) {
                existing[subject] = attempt.score;
              } else {
                tempPerformance.push({ time, [subject]: attempt.score });
              }
            }
          }
        }

        setPerformanceData(tempPerformance.sort((a, b) => a.time - b.time));

        // Compute averages and sort
        const allScorers = Array.from(studentScores.entries()).map(([id, data]) => ({
          userId: id,
          name: data.name,
          averageScore: data.testCount ? data.totalScore / data.testCount : 0,
          totalScore: data.totalScore,
          testCount: data.testCount,
        }));

        const sorted = allScorers.sort((a, b) => b.averageScore - a.averageScore);
        setTopScorers(sorted.slice(0, 3));

        const current = allScorers.find(s => s.userId === userId);

        if (current && current.testCount > 0) {
          const studentsBelow = allScorers.filter(s => s.averageScore < current.averageScore).length;
          const percentile = (studentsBelow / allScorers.length) * 100;

          setUserPercentile(percentile.toFixed(2));
          setGrade(getGradeFromPercentile(percentile));
        } else {
          setUserPercentile("N/A");
          setGrade("N/A");
        }

      } catch (error) {
        console.error("Error in DashboardOverview:", error);
        setUserPercentile("N/A");
        setGrade("N/A");
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      <div className="row d-flex align-items-center g-4">
        {/* Stat Card - Grade & Percentile */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <StatCard
            heading="Class Grade"
            value={
              <div>
                <div> {grade}</div>
                {/* <div><strong>Percentile:</strong> {userPercentile}%</div> */}
              </div>
            }
          />
        </div>

        {/* Area Chart */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <AreaChartComponent
            title="Performance Overview"
            data={performanceData}
          />
        </div>

        {/* Class Toppers */}
        <div className="col-lg-4 col-md-12 d-flex justify-content-center">
          <div className={styles.toppers}>
            <h3 className={styles.heading}>Class Toppers</h3>
            <ul className={styles.toppersList}>
              {topScorers.length > 0 ? (
                topScorers.map((student, index) => (
                  <li key={student.userId}>
                    {index + 1}. {student.name}
                  </li>
                ))
              ) : (
                <li>No data available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
