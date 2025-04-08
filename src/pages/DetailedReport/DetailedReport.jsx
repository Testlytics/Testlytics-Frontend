import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./detailedReport.module.css";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";
import { testAttemptService } from "../../services/api";

const DetailedReport = () => {
  const { testId } = useParams();
  const columnNames = ["Student ID", "Student Name", "Submitted Time", "Score", "Accuracy", "Query", "Feedback"];
  const [feedbackData, setFeedbackData] = useState([]);
  const [classAverage, setClassAverage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await testAttemptService.getStudentsByTest(testId);

        const enrichedData = await Promise.all(
          students.map(async (student) => {
            const userId = student.id || student.userId;
            const name = student.name || student.firstName || "Unknown";

            try {
              const attempt = await testAttemptService.getTestAttempt(testId, userId);
              const accuracy = await testAttemptService.getAccuracyForTest(testId, userId);

              const score = attempt?.responseBody?.score ?? "N/A";
              const submittedTime = attempt?.responseBody?.attemptEndTime?.split("T")[0] ?? "N/A";
              const query = attempt?.responseBody?.query ?? "N/A";
              const feedback = attempt?.responseBody?.feedback ?? "";

              return [
                userId,
                name,
                submittedTime,
                `${score}%`,
                `${accuracy}%`,
                query,
                feedback,
              ];
            } catch (err) {
              console.error("Error fetching attempt for student", userId, err);
              return [
                userId,
                name,
                "N/A",
                "N/A",
                "0%",
                "N/A",
                "",
              ];
            }
          })
        );

        setFeedbackData(enrichedData);

        // Compute average score
        const totalScore = enrichedData.reduce((sum, row) => {
          const score = parseFloat(row[3].replace('%', ''));
          return isNaN(score) ? sum : sum + score;
        }, 0);
        const average = enrichedData.length ? (totalScore / enrichedData.length).toFixed(2) : "0.00";
        setClassAverage(average);
      } catch (err) {
        console.error("Error loading report data", err);
      }
    };

    if (testId) {
      fetchData();
    }
  }, [testId]);

  const handleFeedbackChange = (index, value) => {
    const updatedData = [...feedbackData];
    updatedData[index][6] = value;
    setFeedbackData(updatedData);
  };

  const modifiedData = feedbackData.map((row, index) => [
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[5],
    <input
      type="text"
      value={row[6]}
      onChange={(e) => handleFeedbackChange(index, e.target.value)}
      className={styles.feedbackInput}
      placeholder="Enter feedback"
    />,
  ]);

  const handlePublish = () => {
    // Placeholder: Replace with API call to save feedback
    console.log("Publishing feedback:", feedbackData);
  };

  return (
    <div className={styles.detailedReportContainer}>
      <Navbar />
      <h1 className={styles.title}>Detailed Report</h1>

      <div className={styles.headerRow}>
        <h2 className={styles.testTitle}>Test: {testId}</h2>
        <h2 className={styles.classAverage}>Class Average: {classAverage}%</h2>
      </div>

      <div className={styles.tableContainer}>
        <TableColour columnNames={columnNames} data={modifiedData} />
      </div>

      <div className={styles.publishButtonContainer}>
        <Button
          text="Publish"
          className={styles.publishButton}
          onClick={handlePublish}
        />
      </div>
    </div>
  );
};

export default DetailedReport;
