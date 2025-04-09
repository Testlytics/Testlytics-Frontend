import React from "react";
import StudentReport from "../../layouts/StudentReport/StudentReport";
import ResultOverview from "../../layouts/ResultOverview/ResultOverview";
import styles from "./studentResultPage.module.css";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";

const StudentResultPage = () => {
  return (
    <div className={styles.pageWrapper}>
      {/* Left Section: Student Report */}
      <div className={styles.leftSection}>
        <Breadcrumbs />
        <StudentReport />
      </div>

      {/* Right Section: Result Overview */}
      <div className={styles.rightSection}>
        <ResultOverview />
      </div>
    </div>
  );
};

export default StudentResultPage;
