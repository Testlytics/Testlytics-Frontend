import React from "react";
import ReportStat from "../../layouts/ReportStat/ReportStat";
import ReportInfo from "../../layouts/ReportInfo/ReportInfo";
import styles from "./reportPage.module.css";
import Heading from "../../components/Heading/Heading";

const ReportPage = () => {
  return (
    <div className={styles.pageContainer}>
<div className={`col-12 text-center  ${styles.headingSection}`}>
        <Heading text="Reports" align="center" size="40px" weight="700" />
      </div>      
      <div className={styles.topSection}>
        <ReportStat />
      </div>

      <div className={styles.bottomSection}>
        <ReportInfo />
      </div>
    </div>
  );
};

export default ReportPage;
