import React from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState";
import SubjectDetails from "../../components/SubjectDetails/SubjectDetails";
import Table from "../../components/Table/Table";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import BarGraph from "../../components/BarGraph/BarGraph";
import LineGraph from "../../components/LineGraph/LineGraph";
import Rectangle from "../../components/Rectangle/Rectangle";
import Button from "../../components/Button/Button";
import styles from "./subjectLayout.module.css"; // we'll use styles.centerColumn

const SubjectLayout = ({
  subjectDetails = { subject: "Unknown", totalExams: 0 },
  tableColumns = [],
  tableData = [],
  performanceGraphData = [],
  classAccuracyData = [],
  classToppers = [],
  rectangleOneText = { left: "Attendance", right: "85%" },
  rectangleTwoText = { left: "Accuracy", right: "+6%" },
}) => {
  const userRole = useRecoilValue(userRoleState);
 
  const timeVsScoreData = [
    { testName: "Test 1", timeSpent: 30, score: 78 },
    { testName: "Test 2", timeSpent: 45, score: 85 },
    { testName: "Test 3", timeSpent: 45, score: 27 },
    { testName: "Test 4", timeSpent: 50, score: 92 },
    { testName: "Test 5", timeSpent: 35, score: 73 },
  ];
 
  const studentTableColumns = ["Test No", "Date", "Test Name", "Score", "Actions"];
 
  const studentTableData = [
    {
      "Test No": 1,
      Date: "2025-03-01",
      "Test Name": "Quiz 1",
      Score: 80,
      Actions: <Button text="View" />,
    },
    {
      "Test No": 2,
      Date: "2025-03-10",
      "Test Name": "Midterm",
      Score: 85,
      Actions: <Button text="View" />,
    },
    {
      "Test No": 3,
      Date: "2025-03-20",
      "Test Name": "Quiz 2",
      Score: 88,
      Actions: <Button text="View" />,
    },
    {
      "Test No": 4,
      Date: "2025-03-30",
      "Test Name": "Final Exam",
      Score: 90,
      Actions: <Button text="View" />,
    },
    {
      "Test No": 5,
      Date: "2025-04-01",
      "Test Name": "Unit Test",
      Score: 78,
      Actions: <Button text="View" />,
    },
    {
      "Test No": 6,
      Date: "2025-04-10",
      "Test Name": "Monthly Test",
      Score: 84,
      Actions: <Button text="View" />,
    },
  ];
 
  return (
    <div className={`container-fluid py-4`}>
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
        <div className="col-md-8">
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
 
        {/* Graph */}
        <div className="col-md-4">
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