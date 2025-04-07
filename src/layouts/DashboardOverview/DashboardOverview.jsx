import React from "react";
import StatCard from "../../components/StatCard/StatCard";
import AreaChartComponent from "../../components/AreaChartComponent/AreaChartComponent";
import styles from "./dashboardOverview.module.css";

// Sample data for the chart (replace with actual data as needed)
const performanceData = [
  { name: "Jan", score: 65 },
  { name: "Feb", score: 50 },
  { name: "Mar", score: 75 },
  { name: "Apr", score: 20 },
  { name: "May", score: 85 },
  { name: "Jun", score: 10 },
];

const DashboardOverview = () => {
  return (
    <div className={`container-fluid ${styles.gridContainer}`}>
      <div className="row d-flex align-items-center g-4">
        {/* Stat Card - 1st Column */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <StatCard heading="Check Your Class Grade " value="A+" />
        </div>

        {/* Area Chart - 2nd Column */}
        <div className="col-lg-4 col-md-6 d-flex justify-content-center">
          <AreaChartComponent
            title="Performance Overview"
            data={performanceData}
            dataKey="score"
          />
        </div>

        {/* Class Toppers - 3rd Column */}
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
      </div>
    </div>
  );
};

export default DashboardOverview;
