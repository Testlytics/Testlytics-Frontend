import React from "react";
import ExamIcons from "../../layouts/ExamIcons/ExamIcons";
import TableLayout from "../../layouts/TableLayout/TableLayout";
import styles from "./examOverviewPage.module.css";
import Heading from "../../components/Heading/Heading";

const ExamOverviewPage = () => {
  return (
    <div className={`container-fluid d-flex flex-column ${styles.pageWrapper}`}>
      {/* Heading Section */}
      <div className={`col-12 text-center  ${styles.headingSection}`}>
        <Heading text="Exams" align="center" size="40px" weight="700" />
      </div>

      {/* Top Section - ExamIcons (Auto Height) */}
      <div className={`col-12 ${styles.topSection}`}>
        <ExamIcons />
      </div>

      {/* Bottom Section - TableLayout (Fills Remaining Height) */}
      <div className={`col-12 flex-grow-1 px-5 ${styles.bottomSection}`}>
        <TableLayout />
      </div>
    </div>
  );
};

export default ExamOverviewPage;
