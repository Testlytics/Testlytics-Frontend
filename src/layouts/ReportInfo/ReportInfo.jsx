import React from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard/StatCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import Rectangle from "../../components/Rectangle/Rectangle";
import styles from "./reportInfo.module.css";

const ReportInfo = () => {
  const rectangleData = [
    { leftText: "Attendance", rightText: "20%" },
    { leftText: "Accuracy", rightText: "80%" },
    { centerText: "Student Wise Reports", link: "/studentlist" },
    { centerText: "Subject Wise Reports", link: "/subjects" }
  ];

  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      {/* First Row: 2x2 Rectangles, Area Chart, and Stat Card */}
      <div className="row d-flex align-items-center g-4">
        {/* Rectangles Grid - 1st Column */}
        <div className="col-lg-4 col-md-12 d-flex justify-content-center align-self-end">
          <div className="row w-100">
            {rectangleData.map((item, index) => (
              <div key={index} className="col-6 d-flex justify-content-center mb-3 ">
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
            onButtonClick={() => alert('Details Clicked')} 
          />
        </div>
      </div>
    </div>
  );
};

export default ReportInfo;
