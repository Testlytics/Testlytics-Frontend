import React from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState"; 
import DashboardOverview from "../../layouts/DashboardOverview/DashboardOverview";
import StudentDashboardOverview from "../../layouts/StudentDashboardOverview/StudentDashboardOverview";
import ExamOverview from "../../layouts/ExamOverview/ExamOverview";
import StudentExamOverview from "../../layouts/StudentExamOverview/StudentExamOverview";
import styles from "./overviewPage.module.css";

const OverviewPage = () => {
  const role = useRecoilValue(userRoleState); 

  return (
    <div className={`container-fluid ${styles.overviewPage}`}>
      <div className="row g-0">
        {/* Conditionally Render Dashboard */}
        <div className={`col-12 ${styles.topHalf}`}>
          {role === "admin" ? <DashboardOverview /> : <StudentDashboardOverview />}
        </div>

        {/* Conditionally Render Exam Overview */}
        <div className={`col-12 ${styles.bottomHalf}`}>
          {role === "admin" ? <ExamOverview /> : <StudentExamOverview />}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
