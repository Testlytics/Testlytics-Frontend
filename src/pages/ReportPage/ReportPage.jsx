import React from "react";
import ReportStat from "../../layouts/ReportStat/ReportStat";
import ReportInfo from "../../layouts/ReportInfo/ReportInfo";
import styles from "./reportPage.module.css";
import Heading from "../../components/Heading/Heading";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";

const ReportPage = () => {
  return (
    <div className={styles.pageContainer}>
      
      {/* Breadcrumbs at the top */}
      <div className={styles.breadcrumbsWrapper}>
        <Breadcrumbs />
      </div>

      {/* Heading */}
      <div className={`col-12 text-center ${styles.headingSection}`}>
        <Heading text="Reports" align="center" size="40px" weight="700" />
      </div>      

      {/* Report Stats */}
      <div className={styles.topSection}>
        <ReportStat />
      </div>

      {/* Report Info */}
      <div className={styles.bottomSection}>
        <ReportInfo />
      </div>
    </div>
  );
};

export default ReportPage;
