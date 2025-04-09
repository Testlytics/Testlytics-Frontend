import React from "react";
import Heading from "../../components/Heading/Heading";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableColour from "../../components/TableColour/TableColour";
import "bootstrap/dist/css/bootstrap.min.css";

const TableLayout = ({ columnNames, data, loading, error }) => {
  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <Heading text="Exam History" size="36px" />
        </div>

        <div className="col-md-6 d-flex justify-content-end">
          <SearchBar placeholder="Search exams..." />
        </div>

        <div className="col-12 w-100">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error}</p>
          ) : (
            <TableColour columnNames={columnNames} data={data} height='300px' />
          )}
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
