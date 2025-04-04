import React, { useState } from "react";
import QnA from "../../components/QnA/QnA";
import AttendQuestions from "../../layouts/AttendQuestions/AttendQuestions";
import { attendTestData } from "../../data/attendTestData";
import styles from "./attendTest.module.css";

const AttendTest = () => {
  console.log("AttendTest Component Rendered");

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
      <h1 className={styles.heading}>Test Name</h1>

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
