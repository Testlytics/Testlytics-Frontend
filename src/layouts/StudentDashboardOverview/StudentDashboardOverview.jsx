import React from "react";
import ExamCard from "../../components/ExamCard/ExamCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import StatCard from "../../components/StatCard/StatCard";
import styles from "./studentDashboardOverview.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for grid system

const StudentDashboardOverview = () => {
  return (
    <div className={`container-fluid d-flex justify-content-center align-items-center ${styles.gridContainer}`}>
      <div className="row g-4 justify-content-center text-center align-items-center">
        {/* Exam Card - 1st Column (1/4) */}
        <div className="col-lg-3 col-md-6 d-flex justify-content-center mt-5">
          <ExamCard
            title="Next Exam"
            description="Mathematics Grade 10"
            value="2 Days Left"
            buttonText="View Details"
            onButtonClick={() => alert("Exam Details Clicked!")}
          />
        </div>

        {/* Area Chart - 2nd & 3rd Column (2/4) */}
        <div className="col-lg-6 col-md-12 d-flex justify-content-center align-items-center">
          <AreaChartComponent />
        </div>

        {/* Stat Card - 4th Column (1/4) */}
        <div className="col-lg-3 col-md-6 d-flex justify-content-center align-items-center">
          <StatCard heading="Average Score" value="85%" variant="default" />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardOverview;
