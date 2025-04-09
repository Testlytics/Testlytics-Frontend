import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpcomingTest from "../../components/UpcomingTest/UpcomingTest";
import LiveExam from "../../components/LiveExamDetails/LiveExamDetails";
import PendingResults from "../../components/PendingResults/PendingResults";
import Heading from "../../components/Heading/Heading";
import { testService } from "../../services/api"; // ✅ import test service
import "bootstrap/dist/css/bootstrap.min.css";

const ExamOverview = () => {
  const [pendingResults, setPendingResults] = useState([]);

  useEffect(() => {
    const fetchPendingResults = async () => {
      try {
        const tests = await testService.getCompletedTests();
        const unpublished = tests.filter((test) => test.published === false);
        const formatted = unpublished.map((test) => ({
          testName: test.testName || `Test ${test.testId}`,
          conductedDate: test.testDate || "N/A",
        }));
        setPendingResults(formatted);
      } catch (error) {
        console.error("Error fetching pending results:", error);
      }
    };

    fetchPendingResults();
  }, []);

  return (
    <div className="container-fluid py-4">
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
        <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
          <Link
            to="/test-reports"
            style={{ textDecoration: "none", width: "100%", display: "flex", justifyContent: "center" }}
          >
            <PendingResults results={pendingResults} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExamOverview;
