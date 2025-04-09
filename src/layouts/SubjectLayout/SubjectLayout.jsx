import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState";
import SubjectDetails from "../../components/SubjectDetails/SubjectDetails";
import Table from "../../components/Table/Table";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";
import Button from "../../components/Button/Button";
import styles from "./subjectLayout.module.css";
import { testService, testAttemptService } from "../../services/api";

const SubjectLayout = ({
  subjectDetails = { subject: "Unknown", subjectId: null, totalExams: 0 },
  tableColumns = [],
  tableData = [],
  performanceGraphData = [],
  classAccuracyData = [],
  classToppers = [],
  rectangleOneText = { left: "Attendance", right: "85%" },
  rectangleTwoText = { left: "Accuracy", right: "+6%" },
}) => {
  const userRole = useRecoilValue(userRoleState);
  const [studentTestData, setStudentTestData] = useState([]);
  const [attendanceText, setAttendanceText] = useState(rectangleOneText.right);
  const [accuracyText, setAccuracyText] = useState(rectangleTwoText.right);
  

  // Dummy data remains the same for the charts
  const timeVsScoreData = [
    { testName: "Test 1", timeSpent: 30, score: 78 },
    { testName: "Test 2", timeSpent: 45, score: 85 },
    { testName: "Test 3", timeSpent: 45, score: 27 },
    { testName: "Test 4", timeSpent: 50, score: 92 },
    { testName: "Test 5", timeSpent: 35, score: 73 },
  ];

  const studentTableColumns = ["Test No", "Date", "Test Name", "Score", "Actions"];

  useEffect(() => {
    if (userRole === "student" && subjectDetails?.subjectId) {
      const currentUserId = parseInt(localStorage.getItem("userId"));
  
      if (!currentUserId || !subjectDetails.subjectId) {
        console.warn("Missing userId or subjectId", {
          currentUserId,
          subjectId: subjectDetails.subjectId,
        });
        return;
      }
  
      testAttemptService
        .getUserTestIds(currentUserId)
        .then((attendedTestIds) => {
          testService
            .getCompletedTests()
            .then(async (completedTests) => {
              const attendedCompletedTests = completedTests.filter(
                (test) =>
                  attendedTestIds.includes(test.testId) &&
                  String(test.subjectId) === String(subjectDetails.subjectId)
              );
  
              // 🟢 Attendance
const attendancePercentage = subjectDetails.totalExams
? Math.round(
    (attendedCompletedTests.length /
      subjectDetails.totalExams) *
      100
  )
: 0;
setAttendanceText(`${attendancePercentage}%`); // ✅ FIXED

// 🟢 Accuracy (per test)
const accuracies = await Promise.all(
attendedCompletedTests.map(async (test) => {
  try {
    const accuracy =
      await testAttemptService.getAccuracyForTest(
        test.testId,
        currentUserId
      );
    return accuracy || 0;
  } catch (error) {
    console.error("[Accuracy Error] Test:", test.testId, error);
    return 0;
  }
})
);

const avgAccuracy =
accuracies.length > 0
  ? Math.round(
      accuracies.reduce((a, b) => a + b, 0) / accuracies.length
    )
  : 0;

setAccuracyText(`${avgAccuracy}%`); // ✅ FIXED

              // 🟢 Table Data
              const formattedData = await Promise.all(
                attendedCompletedTests.map(async (test, index) => {
                  try {
                    const attempt = await testAttemptService.getTestAttempt(
                      test.testId,
                      currentUserId
                    );
                    return {
                      "Test No": index + 1,
                      Date: new Date(test.testDate).toLocaleDateString(),
                      "Test Name": test.testName || "Untitled",
                      Score: attempt?.score ?? "N/A",
                      Actions: (
                        <Button
                          text="View"
                          onClick={() =>
                            console.log("Viewing test attempt:", attempt)
                          }
                        />
                      ),
                    };
                  } catch (error) {
                    console.error(
                      `Error fetching attempt for test ${test.testId}:`,
                      error
                    );
                    return {
                      "Test No": index + 1,
                      Date: new Date(test.testDate).toLocaleDateString(),
                      "Test Name": test.testName || "Untitled",
                      Score: "N/A",
                      Actions: (
                        <Button
                          text="View"
                          onClick={() =>
                            console.log("Viewing test attempt: error", test.testId)
                          }
                        />
                      ),
                    };
                  }
                })
              );
  
              setStudentTestData(formattedData);
            })
            .catch((error) => {
              console.error("Error fetching completed tests:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching user attendance:", error);
        });
    }
  }, [userRole, subjectDetails.subjectId]);
  

  return (
    <div className="container-fluid py-4">
      {/* First Row */}
      <div className="row g-4 align-items-center">
        {/* Subject Details */}
        <div className="col-md-4">
          <SubjectDetails
            subject={subjectDetails.subject}
            totalExams={subjectDetails.totalExams}
          />
        </div>

        {/* Rectangles or Class Toppers */}
        <div className={`col-md-4 ${styles.centerColumn}`}>
          {userRole === "student" ? (
            <>
              <Rectangle leftText="Attendance" rightText={attendanceText} className="mb-3" />
              <Rectangle leftText="Accuracy" rightText={accuracyText} />
            </>
          ) : (
            <>
              <h2 className="text-center fw-bold fs-4 mb-3">Class Toppers</h2>
              <ul className="list-unstyled text-center">
                {classToppers.length > 0 ? (
                  classToppers.map((topper, index) => (
                    <li key={index} className="mb-2 fs-5">
                      {index + 1}. {topper}
                    </li>
                  ))
                ) : (
                  <li>No toppers available</li>
                )}
              </ul>
            </>
          )}
        </div>

        {/* Graph */}
        <div className="col-md-4">
          {userRole === "student" ? (
            <BarGraph data={performanceGraphData} title="Test-wise Performance" />
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
        <div className="col-md-8">
          <h2 className="fw-bold fs-4 mb-3 text-center">
            {userRole === "student" ? "Your Test Results" : "Subject Analysis"}
          </h2>
          <div className="table-responsive">
            <Table
              columns={userRole === "student" ? studentTableColumns : tableColumns}
              data={userRole === "student" ? studentTestData : tableData}
            />
          </div>
        </div>

        {/* Graph */}
        <div className="col-md-4">
          {userRole === "student" ? (
            <LineGraph
              title="Time vs Score"
              data={timeVsScoreData}
              lines={[
                { dataKey: "score", color: "#282A2B" },
                { dataKey: "timeSpent", color: "#5A643C" },
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
