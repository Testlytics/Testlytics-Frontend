import React from "react";
import DashboardOverview from "../../layouts/DashboardOverview/DashboardOverview";
import ExamOverview from "../../layouts/ExamOverview/ExamOverview";
import styles from "./overviewPage.module.css";

const OverviewPage = () => {
  return (
    <div className={`container-fluid ${styles.overviewPage}`}>
      <div className="row g-0"> {/* Added g-0 to remove gutters */}
        {/* Dashboard Overview (Top Half) */}
        <div className={`col-12 ${styles.topHalf}`}>
          <DashboardOverview />
        </div>

        {/* Exam Overview (Bottom Half) */}
        <div className={`col-12 ${styles.bottomHalf}`}>
          <ExamOverview />
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;