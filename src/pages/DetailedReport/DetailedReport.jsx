import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./detailedReport.module.css";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";
import { testAttemptService, studentService, testService } from "../../services/api";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const DetailedReport = () => {
  const { testId } = useParams();
  const columnNames = ["Student ID", "Student Name", "Score", "Accuracy", "Query", "Feedback"];
  const [feedbackData, setFeedbackData] = useState([]);
  const [classAverage, setClassAverage] = useState(0);
  const [error, setError] = useState(null);
  const [testName, setTestName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);  // State to track publish process
  const [publishError, setPublishError] = useState(null); // Track publish errors

  useEffect(() => {
    const fetchTestData = async () => {
      console.log('Test ID received:', testId);

      if (!testId) {
        setError("Test ID is missing or invalid.");
        console.log('No Test ID found');
        return;
      }

      try {
        // Fetch the test details using testService
        const testDetails = await testService.getTestById(testId);
        console.log('Test details fetched:', testDetails); // Log the full response

        if (testDetails && testDetails.data) {
          setTestName(testDetails.data.responseBody.testName || "Test Name not found");
        } else {
          setTestName("Test Name not available");
        }

        // Fetch students who attended the test
        const studentsData = await testAttemptService.getStudentsByTest(testId);
        console.log('Attended Students:', studentsData);

        if (Array.isArray(studentsData)) {
          const studentInfoPromises = studentsData.map(async (studentId) => {
            console.log(`Fetching data for student with ID: ${studentId}`);

            if (!studentId) {
              console.error(`Student ID is missing for student: ${studentId}`);
              return null;
            }

            try {
              const accuracy = await testAttemptService.getAccuracyForTest(testId, studentId);
              const scoreData = await testAttemptService.getTestAttempt(testId, studentId);
              const score = scoreData ? scoreData.score : 0;
              const query = scoreData.query || "";

              const studentData = await studentService.getStudentById(studentId);
              return {
                studentId: studentId,
                firstName: studentData.firstName || "Unknown",
                accuracy,
                score,
                query,
                feedback: "", // Initialize empty feedback
              };
            } catch (error) {
              console.error(`Error fetching student with ID ${studentId}:`, error);
              return null;
            }
          });

          const studentDetailsData = await Promise.all(studentInfoPromises);
          setFeedbackData(studentDetailsData.filter(student => student !== null));

          const totalScore = studentDetailsData.reduce((sum, student) => sum + student.score, 0);
          const average = studentDetailsData.length ? (totalScore / studentDetailsData.length).toFixed(2) : "0.00";
          setClassAverage(average);
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchTestData();
  }, [testId]);

  const handleFeedbackChange = (index, value) => {
    const updatedData = [...feedbackData];
    updatedData[index].feedback = value;
    setFeedbackData(updatedData);
  };

  const handlePublish = async () => {
    console.log("Publishing feedback:", feedbackData);
    let allFeedbackPublished = true;
    
    // Iterate over all students and publish their feedback
    for (const student of feedbackData) {
      if (student.feedback) {
        try {
          await testAttemptService.addTeacherFeedback(testId, student.studentId, student.feedback);
          console.log(`Feedback for student ${student.studentId} published.`);
        } catch (error) {
          console.error(`Error publishing feedback for student ${student.studentId}:`, error.response ? error.response.data : error.message);
          allFeedbackPublished = false;  // If any feedback fails, set this flag to false
        }
      }
    }
    
    // If all feedback is published successfully, publish the test and show success modal
    if (allFeedbackPublished) {
      try {
        await testService.publishTest(testId);  // Publish the test after feedback
        console.log("Test published successfully.");
        setIsModalOpen(true);  // Show success modal after publishing
      } catch (error) {
        console.error("Error publishing test:", error.response ? error.response.data : error.message);
        // Optionally, handle any errors when publishing the test
      }
    } else {
      // Optionally show an error message if any feedback failed to publish
      console.error("Some feedback failed to publish.");
    }
   
  };

  const modifiedData = feedbackData.map((student, index) => [
    student.studentId,
    student.firstName,
    student.score,
    student.accuracy,
    student.query,
    <input
      type="text"
      value={student.feedback}
      onChange={(e) => handleFeedbackChange(index, e.target.value)}
      className={styles.feedbackInput}
      placeholder="Enter feedback"
    />,
  ]);

  return (
    <div className={styles.detailedReportContainer}>
      <Navbar />
      <h1 className={styles.title}>Detailed Report</h1>

      <div className={styles.headerRow}>
        <h2 className={styles.testTitle}>Test: {testName || "Loading..."}</h2>
      </div>

      <div className={styles.tableContainer}>
        <TableColour columnNames={columnNames} data={modifiedData} height="auto" />
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
      {publishError && <p className={styles.errorMessage}>{publishError}</p>}

      <div className={styles.publishButtonContainer}>
        <Button
          text="Publish"
          className={styles.publishButton}
          onClick={handlePublish}
          disabled={isPublishing}  // Disable button if already publishing
        />
      </div>

      {isModalOpen && (
        <SuccessModal
          onClose={() => setIsModalOpen(false)}
          message="Feedback published successfully!"
        />
      )}
    </div>
  );
};

export default DetailedReport;
