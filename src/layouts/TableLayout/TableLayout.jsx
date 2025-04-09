import React, { useState } from "react";
import Heading from "../../components/Heading/Heading";
import SearchBar from "../../components/SearchBar/SearchBar";
import TableColour from "../../components/TableColour/TableColour";
import "bootstrap/dist/css/bootstrap.min.css";

const dummyData = [
  { examName: "Math Test", date: "2025-04-01", status: "Completed" },
  { examName: "Physics Quiz", date: "2025-03-25", status: "Pending" },
  { examName: "History Final", date: "2025-02-10", status: "Completed" },
  { examName: "Biology Midterm", date: "2025-01-15", status: "Missed" },
];

const TableLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = dummyData.filter((item) =>
    item.examName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tableData = filteredData.map((item) => [
    item.examName,
    item.date,
    item.status,
  ]);

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <Heading text="Exam History" size="36px" />
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <div className="col-12">
          <TableColour
            columnNames={["Exam Name", "Date", "Status"]}
            data={tableData}
          />
        </div>
      </div>
    </div>
  );
};

export default TableLayout;
