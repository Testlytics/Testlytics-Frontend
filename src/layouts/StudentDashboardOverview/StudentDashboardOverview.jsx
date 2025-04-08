import React from "react";
import ExamCard from "../../components/ExamCard/ExamCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import StatCard from "../../components/StatCard/StatCard";
import styles from "./studentDashboardOverview.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for grid system

const StudentDashboardOverview = () => {
  const accuracy = 95; // Change this dynamically if needed

  // Function to determine description based on score
  const getDescription = (score) => {
    if (score >= 90) return "Excellent performance!";
    if (score >= 75) return "You are highly accurate!";
    if (score >= 50) return "Good, but there's room for improvement.";
    return "Needs significant improvement.";
  };

  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      <div className="row d-flex align-items-center g-4">
        {/* Exam Card - 1st Column (1/4) */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <ExamCard
            title="Next Exam"
            description="Mathematics Grade 10"
            value="2 Days Left"
            buttonText="View Details"
            onButtonClick={() => alert("Exam Details Clicked!")}
          />
        </div>

        {/* Area Chart - 2nd & 3rd Column (2/4) */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <AreaChartComponent />
        </div>

        {/* Stat Card - 4th Column (1/4) */}
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
