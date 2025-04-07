import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import StatCard from "../../components/StatCard/StatCard";
import BarGraph from "../../components/BarGraph/BarGraph";
import Rectangle from "../../components/Rectangle/Rectangle";
import styles from "./studentReport.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentReport = () => {
  const percentage = 40;
  const attendance = 90;
  let grade = "";

  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "B";
  else if (percentage >= 70) grade = "C";
  else if (percentage >= 60) grade = "D";
  else grade = "F";

  const dangerColor = "#992E2E";
  const warningColor = "#FFA500";
  const successColor = "#5A643C";

  const gradeColor = grade === "F" ? dangerColor : successColor;
  const percentageColor = percentage < 50 ? dangerColor : successColor;

  let attendanceColor = successColor;
  if (attendance < 75) attendanceColor = dangerColor;
  else if (attendance < 90) attendanceColor = warningColor;

  // ✅ Your format for BarGraph
  const barGraphData = [
    { label: "Math", value: 85 },
    { label: "Science", value: 78 },
    { label: "History", value: 92 },
    { label: "English", value: 88 },
  ];

  return (
    <div className={`container ${styles.wrapper}`}>
      <div className="row mb-4">
        <div className="col">
          <Heading text="Reports" size="36px" />
        </div>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-sm-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
          <StatCard heading="Your Grade" value={grade} color={gradeColor} />
        </div>
        <div className="col-sm-12 col-md-4 d-flex justify-content-center mb-3 mb-md-0">
          <StatCard heading="Percentage" value={`${percentage}%`} color={percentageColor} />
        </div>
        <div className="col-sm-12 col-md-4 d-flex justify-content-center">
          <StatCard heading="Attendance" value={`${attendance}%`} color={attendanceColor} />
        </div>
      </div>

      {/* ✅ Bar Graph using separate subject data */}
      <div className="row mb-4">
        <div className="col">
          <div className={styles.chartWrapper}>
            <BarGraph data={barGraphData} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className={styles.rectangleWrapper}>
            <Link to="/subjects" style={{ textDecoration: "none" }}>
              <Rectangle centerText="Subject Wise Report" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
