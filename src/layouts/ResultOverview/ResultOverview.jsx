import React from "react";
import NewResult from "../../components/NewResult/NewResult";
import Table from "../../components/Table/Table"; // ✅ Added Table here
import "bootstrap/dist/css/bootstrap.min.css";

const ResultOverview = () => {
  return (
    <div className="container mt-5">
      {/* Row 1 - NewResult */}
      <div className="row mb-4">
        <div className="col d-flex justify-content-center">
          <NewResult />
        </div>
      </div>

      {/* Row 2 - Table */}
      <div className="row">
        <div className="col">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default ResultOverview;
