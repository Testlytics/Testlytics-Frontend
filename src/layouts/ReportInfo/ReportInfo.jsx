import React from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import Rectangle from "../../components/Rectangle/Rectangle";
import styles from "./reportInfo.module.css";
import { useNavigate } from 'react-router-dom';




const ReportInfo = () => {
  const navigate = useNavigate();
  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      {/* First Row: Stat Card, Area Chart, and Class Toppers */}
      <div className="row d-flex align-items-center g-4">
        {/* Class Toppers - 1st Column */}
        <div className="col-lg-4 col-md-12 d-flex justify-content-center">
          <div className={styles.toppers}>
            <h3 className={styles.heading}>Class Toppers</h3>
            <ul className={styles.toppersList}>
              <li>1. Alex Johnson</li>
              <li>2. Maria Lee</li>
              <li>3. Daniel Smith</li>
            </ul>
          </div>
        </div>

        {/* Area Chart - 2nd Column */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <AreaChartComponent />
        </div>

        {/* Stat Card - 3rd Column */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
        <StatCard 
  heading="Pending Results" 
  value="5" 
  variant="withButton" 
  buttonText="View Details" 
  onButtonClick={() => navigate("/test-reports")} 
/>

        </div>
      </div>

      {/* Second Row: Rectangle Components */}
      <div className="row mt-5">
        {[
          { leftText: "Attendance", rightText: "20%" },
          { leftText: "Accuracy", rightText: "80%" },
          { centerText: "Student Wise Reports", link: "/studentlist" }, 
          { centerText: "Subject Wise Reports", link: "/subjects" }  
        ].map((item, index) => (
          <div key={index} className="col-md-3 d-flex justify-content-center">
            {item.link ? (
              <Link to={item.link} className={styles.linkWrapper}>
                <Rectangle centerText={item.centerText} />
              </Link>
            ) : (
              <Rectangle leftText={item.leftText} rightText={item.rightText} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportInfo;
