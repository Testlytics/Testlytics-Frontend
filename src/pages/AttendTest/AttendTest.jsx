import React, { useState } from "react";
import QnA from "../../components/QnA/QnA";
import AttendQuestions from "../../layouts/AttendQuestions/AttendQuestions";
import { attendTestData } from "../../data/attendTestData";
import styles from "./attendTest.module.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";


const AttendTest = () => {
  console.log("AttendTest Component Rendered");
  const location = useLocation();
 // const testName = location.state?.testName || "Test Name"; // fallback if not passed
  const { testName } = useParams();

console.log("Location State:", location.state); // ✅ DEBUG
console.log("Test Name:", testName);  

  // State to track selected questions
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  // Handle option selection and clearing
  const handleOptionSelect = (questionNumber, selectedOption) => {
    setSelectedQuestions((prev) => {
      const updatedSelection = new Set(prev);

      if (selectedOption === null) {
        // If selection is cleared, remove from the set
        updatedSelection.delete(questionNumber);
      } else {
        // Otherwise, add it to the highlighted questions
        updatedSelection.add(questionNumber);
      }

      return updatedSelection;
    });
  };

  return (
    <div className={styles.container}>
       <h1 className={styles.heading}>{testName}</h1> {/* 🆕 Display the dynamic test name */}


      {/* Layout */}
      <div className={styles.contentWrapper}>
        {/* Left Section - QnA */}
        <div className={styles.qnaSection}>
          {attendTestData.selectable.map((questionData, index) => (
            <QnA 
              key={index} 
              {...questionData} 
              onOptionSelect={handleOptionSelect} 
            />
          ))}
        </div>

        {/* Right Section - AttendQuestions */}
        <div className={styles.attendQuestionsSection}>
          <AttendQuestions 
            totalQuestions={attendTestData.selectable.length} 
            highlightedQuestions={selectedQuestions} 
          />
        </div>
      </div>
    </div>
  );
};

export default AttendTest;
