import React from "react";
import ExamCard from "../../components/ExamCard/ExamCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import StatCard from "../../components/StatCard/StatCard";
import styles from "./studentDashboardOverview.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for grid system

const StudentDashboardOverview = () => {
  const accuracy = 95;

  // Sample data for the student's performance
  const studentPerformance = [
    { name: "Jan", score: 60 },
    { name: "Feb", score: 75 },
    { name: "Mar", score: 70 },
    { name: "Apr", score: 80 },
    { name: "May", score: 85 },
    { name: "Jun", score: 95 },
  ];

  const getDescription = (score) => {
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
          />
        </div>

        {/* Stat Card */}
        <div className="col-lg-4 col-md-12 d-flex justify-content-center">
          <StatCard
            heading="Accuracy"
            value={`${accuracy}%`}
            description={getDescription(accuracy)}
            variant="withDescription"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardOverview;
