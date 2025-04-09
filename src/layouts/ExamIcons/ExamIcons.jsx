import React from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import { FaPlus, FaBook, FaQuestion } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for grid
import styles from "./examIcons.module.css"; 

const ExamIcons = () => {
  return (
    <div className="container py-4">
      {/* Centering the grid items */}
      <div className="row g-4 justify-content-center text-center">
        {/* Total Exams */}
        <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
          <StatCard heading="Total Exams" variant="withIcon" value="10" />
        </div>

        {/* Add Exam - Clickable */}
        <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
          <Link to="/add-question" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.statCard}>
              <StatCard heading="Add Exam" variant="withIcon" icon={<FaPlus size={60} />} />
            </div>
          </Link>
        </div>

        {/* Questions - Clickable */}
        <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
          <Link to="/exam/questions" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.statCard}>
              <StatCard heading="Questions" variant="withIcon" icon={<FaQuestion size={60} />} />
            </div>
          </Link>
        </div>

        {/* Subjects - Clickable */}
        <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center">
          <Link to="/exam/subjects" style={{ textDecoration: "none", color: "inherit" }}>
            <div className={styles.statCard}>
              <StatCard heading="Subjects" variant="withIcon" icon={<FaBook size={60} />} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamIcons;
