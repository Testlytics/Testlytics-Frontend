import React, { useEffect, useState } from "react";
import StatCard from "../../components/StatCard/StatCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import styles from "./dashboardOverview.module.css";
import {
  testService,
  testAttemptService,
  studentService,
} from "../../services/api";
 
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
  const [performanceData, setPerformanceData] = useState([]);
  const [avgGrade, setAvgGrade] = useState("N/A");
  const [classPercentile, setClassPercentile] = useState("N/A");
  const [classAvgChartData, setClassAvgChartData] = useState([]);
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tests, students] = await Promise.all([
          testService.getCompletedTests(),
          studentService.getStudents(),
        ]);
  
        const studentMap = new Map(students.map((s) => [String(s.studentId), s]));
        const studentScores = new Map();
        const avgScorePerTest = [];
  
        for (const test of tests) {
          const studentIds = await testAttemptService.getStudentsByTest(test.testId);
  
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
  
      } catch (error) {
        console.error("Error in DashboardOverview:", error);
        setAvgGrade("N/A");
        setClassPercentile("N/A");
      }
    };
  
    fetchData(); // ✅ This is enough
  }, []);
  
  
  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      <div className="row d-flex align-items-center g-4">
        {/* Grade & Percentile for class average */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <StatCard
            heading="Class Grade"
            value={
              <div>
                <div> {avgGrade}</div>
                {/* <div><strong>Class Percentile:</strong> {classPercentile}%</div> */}
              </div>
            }
          />
        </div>
 
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
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