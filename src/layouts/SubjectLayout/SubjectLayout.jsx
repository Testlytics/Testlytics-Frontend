import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState";
import { testService } from "../../services/api";
import { testAttemptService } from "../../services/api";
import SubjectDetails from "../../components/SubjectDetails/SubjectDetails";
import Table from "../../components/Table/Table";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";
import styles from "./subjectLayout.module.css"; // we'll use styles.centerColumn

const SubjectLayout = ({
  subjectDetails = { subject: "Unknown", totalExams: 0, subjectId: null },
  tableColumns = [],
  tableData = [],
  classAccuracyData = [],
  classToppers = [],
  rectangleOneText = { left: "Attendance", right: "85%" },
  rectangleTwoText = { left: "Accuracy", right: "+6%" },
  studentTableData = [],
  timeVsScoreData = [],
}) => {
  const userRole = useRecoilValue(userRoleState);
  const [performanceGraphData, setPerformanceGraphData] = useState([]);

  const studentTableColumns = ["Test No", "Date", "Test Name", "Score", "Actions"];

  // 🔽 Fetch performance graph data (for teacher)
  useEffect(() => {
    const fetchPerformanceGraph = async () => {
      if (!subjectDetails.subjectId || userRole !== "admin") {
        console.log("Not fetching. Either subjectId is missing or user is not an admin.");
        return;
      }
  
      console.log("Fetching tests for subjectId:", subjectDetails.subjectId);
  
      try {
        const allTests = await testService.getCompletedTests();
        console.log("All tests fetched:", allTests);
  
        const subjectTests = allTests.filter(
          (test) => test.subjectId === subjectDetails.subjectId
        );
        console.log("Filtered subject tests:", subjectTests);
  
        const graphData = await Promise.all(
          subjectTests.map(async (test) => {
            console.log(`Fetching attempts for test: ${test.testName} (${test.testId})`);
  
            const attempts = await testAttemptService.getStudentsByTest(test.testId);
            console.log(`Attempts for ${test.testName}:`, attempts);
  
            const scores = attempts.map((a) => a.score || 0);
            console.log(`Scores for ${test.testName}:`, scores);
  
            const avg = scores.length
              ? scores.reduce((sum, score) => sum + score, 0) / scores.length
              : 0;
            console.log(`Average score for ${test.testName}:`, avg);
  
            return {
              name: test.testName,
              score: Math.round(avg),
            };
          })
        );
  
        console.log("Final graph data (average scores):", graphData);
        setPerformanceGraphData(graphData);
      } catch (error) {
        console.error("Error fetching performance graph:", error);
      }
    };
  
    fetchPerformanceGraph();
  }, [subjectDetails.subjectId, userRole]);
  

  return (
    <div className={`container-fluid py-4 mx-5`}>
      {/* First Row */}
      <div className="row g-4 ">
        {/* Subject Details */}
        <div className="col-md-4 align-self-center">
          <SubjectDetails 
            subject={subjectDetails.subject} 
            totalExams={subjectDetails.totalExams} 
          />
        </div>

        {/* Rectangles or Class Toppers */}
        <div className={`col-md-4 align-self-center ${styles.centerColumn}`}>
          {userRole === "student" ? (
            <>
              <Rectangle 
                leftText={rectangleOneText.left} 
                rightText={rectangleOneText.right} 
                className="mb-3"
              />
              <Rectangle 
                leftText={rectangleTwoText.left} 
                rightText={rectangleTwoText.right} 
              />
            </>
          ) : (
            <div className={styles.classToppersContainer}>
              <h2 className={styles.classToppersTitle}>Class Toppers</h2>
              {classToppers.length > 0 ? (
                <ul className="list-unstyled">
                  {classToppers.map((topper, index) => {
                    let topperClass = styles.topperItem;
                    if (index === 0) topperClass += ` ${styles.gold}`;
                    else if (index === 1) topperClass += ` ${styles.silver}`;
                    else if (index === 2) topperClass += ` ${styles.bronze}`;
                    return (
                      <li key={index} className={topperClass}>
                        {index + 1}. {topper}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className={styles.noToppers}>No toppers available</p>
              )}
            </div>
          )}
        </div>

        {/* Graph */}
        <div className="col-md-4 align-self-center">
          {userRole === "student" ? (
            <BarGraph 
              data={performanceGraphData} 
              title="Test-wise Performance" 
            />
          ) : (
            <AreaChartComponent 
              data={performanceGraphData} 
              dataKey="score" 
              title="Performance Graph" 
            />
          )}
        </div>
      </div>

      {/* Second Row */}
      <div className="row g-4 mt-4">
        {/* Table */}
        <div className="col-12 col-md-8">
          <h2 className="fw-bold fs-4 mb-3 text-center">
            {userRole === "student" ? "Your Test Results" : "Subject Analysis"}
          </h2>
          <div className="table-responsive">
            <Table 
              columns={userRole === "student" ? studentTableColumns : tableColumns}
              data={userRole === "student" ? studentTableData : tableData}
            />
          </div>
        </div>

        {/* Accuracy Graph */}
        <div className="col-12 col-md-4 align-self-center">
          {userRole === "student" ? (
            <LineGraph 
              title="Time vs Score"
              data={timeVsScoreData}
              lines={[
                { dataKey: "score", color: "#282A2B" },
                { dataKey: "timeSpent", color: "#5A643C" }
              ]}
            />
          ) : (
            <AreaChartComponent 
              data={classAccuracyData} 
              dataKey="accuracy" 
              title="Class Accuracy" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectLayout;
