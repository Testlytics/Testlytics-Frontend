import React from "react";
import Heading from "../../components/Heading/Heading";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableColour from "../../components/TableColour/TableColour";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const TableLayout = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* Heading - 1st Column (Row 1) */}
        <div className="col-md-6">
          <Heading text="Exam History" size="36px" />
        </div>

        {/* SearchBar - 2nd Column (Row 1) */}
        <div className="col-md-6 d-flex justify-content-end">
          <SearchBar placeholder="Search exams..." />
        </div>

        {/* TableColour - Full Width (Row 2) */}
        <div className="col-12 w-100">
          <TableColour />
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
