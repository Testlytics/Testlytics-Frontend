import React from "react";
import UpcomingTest from "../../components/UpcomingTest/UpcomingTest";
import LiveExam from "../../components/LiveExamDetails/LiveExamDetails";
import PendingResults from "../../components/PendingResults/PendingResults";
import Heading from "../../components/Heading/Heading";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

const sampleResults = [
  { testName: "Mathematics Final Exam", conductedDate: "March 20, 2025" },
  { testName: "Physics Test", conductedDate: "April 5, 2025" },
  { testName: "Chemistry Test", conductedDate: "April 10, 2025" },
];

const ExamOverview = () => {
  return (
    <div className="container-fluid py-4">
      {/* Section Heading */}
      <Heading title="Exam Overview" />

      <div className="row g-4">
        {/* Upcoming Test */}
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <UpcomingTest />
        </div>

        {/* Live Exams */}
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <LiveExam />
        </div>

        {/* Pending Results */}
        <div className="col-12 col-lg-4 d-flex justify-content-center">
          <PendingResults results={sampleResults} />
        </div>
      </div>
    </div>
  );
};

export default ExamOverview;
