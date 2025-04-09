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
      <div className="row d-flex align-items-center g-4">
        {/* Stat Card */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <StatCard 
            heading="Pending Results" 
            value="5" 
            variant="default" 
            buttonText="View Details" 
            onButtonClick={() => alert('Details Clicked')} 
          />
        </div>

        {/* Area Chart */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center align-self-center">
          <AreaChartComponent />
        </div>

        {/* Rectangles Grid */}
        <div className="col-lg-4 col-md-12">
          <div className="row">
            {rectangleData.map((item, index) => (
              <div
                key={index}
                className="col-12 col-sm-6 col-md-6 col-lg-6 mb-3 d-flex justify-content-center"
              >
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
      </div>
    </div>
  );
};

export default ReportInfo;
