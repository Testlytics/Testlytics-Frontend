import React from "react";
import UpcomingTest from "../../components/UpcomingTest/UpcomingTest";
import VerticalCard from "../../components/VerticalCard/VerticalCard";
import Heading from "../../components/Heading/Heading";
import styles from "./studentExamOverview.module.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const StudentExamOverview = () => {
  return (
    <div className="container-fluid py-4">
      {/* Section Heading */}
      <Heading title="Student Exam Overview" />

      <div className="row g-4">
        {/* Upcoming Test */}
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <UpcomingTest />
        </div>

        {/* Two Vertical Cards in One Column */}
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center align-items-center gap-4 mt-5">
  <VerticalCard heading="Attendance" value="80%" />
  <VerticalCard heading="Rank" value="10" variant="withDescription" description="Completed & upcoming" />
  <VerticalCard heading="Total Exams " value="13" />
</div>


        {/* Exam Tips */}
        <div className="col-12 col-lg-4 d-flex justify-content-center">
          <div className={styles.examTips}>
            <h3 className={styles.heading}>Exam Tips</h3>
            <ul className={styles.tipsList}>
              <li>Revise key concepts daily</li>
              <li>Practice previous year's papers</li>
              <li>Stay hydrated and sleep well</li>
              <li>Manage time efficiently during exams</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExamOverview;
