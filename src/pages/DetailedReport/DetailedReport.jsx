import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./detailedReport.module.css";
import TableColour from "../../components/TableColour/TableColour";
import Button from "../../components/Button/Button";
import { testAttemptService, studentService, testService } from "../../services/api";
 
const DetailedReport = () => {
  const { testId } = useParams();
  const columnNames = ["Student ID", "Student Name", "Score", "Accuracy", "Query", "Feedback"];
  const [feedbackData, setFeedbackData] = useState([]);
  const [classAverage, setClassAverage] = useState(0);
  const [error, setError] = useState(null);
  const [testName, setTestName] = useState(""); // State for test name
 
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
 
        // Access the testName from the response
        if (testDetails && testDetails.data) {
          console.log('Test details data:', testDetails.data); // Log the `data` object
          setTestName(testDetails.data.responseBody.testName || "Test Name not found"); // Access testName instead of name
        } else {
          console.log('No test data returned:', testDetails);
          setTestName("Test Name not available"); // Handle missing testName
        }
 
        // Fetch students who attended the test using testAttemptService
        const studentsData = await testAttemptService.getStudentsByTest(testId);
        console.log('Attended Students:', studentsData);
 
        if (Array.isArray(studentsData) && studentsData.length > 0 && typeof studentsData[0] === 'number') {
          const studentInfoPromises = studentsData.map(async (studentId) => {
            console.log(`Fetching data for student with ID: ${studentId}`);
 
            if (!studentId) {
              console.error(`Student ID is missing for student: ${studentId}`);
              return null;
            }
 
            try {
              const accuracy = await testAttemptService.getAccuracyForTest(testId, studentId);
              console.log(`Accuracy for student ${studentId}:`, accuracy);
 
              const scoreData = await testAttemptService.getTestAttempt(testId, studentId);
              console.log(`Test score data for student ${studentId}:`, scoreData);
 
              const score = scoreData ? scoreData.score : 0;
              const query = scoreData.query || "";  // Ensure the query is set correctly
 
              const studentData = await studentService.getStudentById(studentId);
              console.log('Student data fetched:', studentData);
 
              return {
                studentId: studentId,
                firstName: studentData.firstName || "Unknown",
                accuracy,
                score,
                query,  // Include query in the returned object
                feedback: "", // Feedback is initially empty
              };
            } catch (error) {
              if (error.response && error.response.status === 404) {
                console.error(`Student with ID ${studentId} not found`);
                return null;
              } else {
                console.error(`Error fetching student with ID ${studentId}:`, error);
                return null;
              }
            }
          });
 
          const studentDetailsData = await Promise.all(studentInfoPromises);
          console.log('All student details fetched:', studentDetailsData);
          setFeedbackData(studentDetailsData.filter(student => student !== null)); // Filter out null values
 
          // Compute average score
          const totalScore = studentDetailsData.reduce((sum, student) => sum + student.score, 0);
          const average = studentDetailsData.length ? (totalScore / studentDetailsData.length).toFixed(2) : "0.00";
          setClassAverage(average);
        } else {
          console.error("Unexpected student data structure:", studentsData);
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
 
  const handlePublish = () => {
    console.log("Publishing feedback:", feedbackData);
    feedbackData.forEach(async (student) => {
      if (student.feedback) {
        try {
          await testAttemptService.addTeacherFeedback(testId, student.studentId, student.feedback);
          console.log(`Feedback for student ${student.studentId} published.`);
        } catch (error) {
          console.error(`Error publishing feedback for student ${student.studentId}:`, error);
        }
      }
    });
  };
 
  const modifiedData = feedbackData.map((student, index) => [
    student.studentId,
    student.firstName,
    student.score,
    student.accuracy,
    student.query,  // Query column now correctly displayed
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
        <h2 className={styles.testTitle}>Test: {testName || "Loading..."}</h2> {/* Display test name or loading */}
        <h2 className={styles.classAverage}>Class Average: {classAverage}%</h2>
      </div>
 
      <div className={styles.tableContainer}>
        <TableColour columnNames={columnNames} data={modifiedData} />
      </div>
 
      {error && <p className={styles.errorMessage}>{error}</p>}
 
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