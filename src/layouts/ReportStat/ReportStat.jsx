import React from "react";
import StatCard from "../../components/StatCard/StatCard";
import "bootstrap/dist/css/bootstrap.min.css"; 

const ReportStat = () => {
  const stats = [
    { heading: "Total Pass Percentage", value: "80%" },
    { heading: "Physics", value: "100%" },
    { heading: "Chemistry", value: "78%" },
    { heading: "Mathematics", value: "85%" }
  ];

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center mt-4">
      <div className="row w-100 justify-content-center text-center">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 d-flex justify-content-center">
            <StatCard heading={stat.heading} value={stat.value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportStat;
