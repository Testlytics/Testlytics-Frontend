// 📁 src/layouts/QuestionsList/QuestionsList.jsx
import React, { useEffect, useState } from "react";
import QnA from "../../components/QnA/QnA";
import { FaChevronRight } from "react-icons/fa"; // ✅ Import icon
import styles from "./questionsList.module.css";
import Button from "../../components/Button/Button";

const QuestionsList = ({
  subjectName,
  testName,
  totalQuestions,
  totalMarks,
  duration,
  questions,
  isEditable = false, // Default: false
  isEvaluated = false, // Default: false
  variant = "default", // ✅ Variant, default "default"
  selectedIndex, // ✅ Selected index if needed for dynamic data
  studentName, // New prop for the student's name
}) => {
  // ✅ State to manage questions dynamically
  // const [questionsData, setQuestionsData] = useState({
  //   subjectName: "",
  //   testName: "",
  //   totalQuestions: 0,
  //   totalMarks: 0,
  //   duration: 0,
  //   questions: [],
  // });

  const handleButtonClick = () => {
    alert("Button Clicked!"); // Replace with actual functionality
  };


  // ✅ State to manage selected question dynamically
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  // ✅ Load data dynamically (no default data now)
  useEffect(() => {
    setQuestionsData({
      subjectName,
      testName,
      totalQuestions,
      totalMarks,
      duration,
      questions,
      variant,
    });
  }, [subjectName, testName, totalQuestions, totalMarks, duration, questions,variant]);

  // ✅ Handle click to highlight and select question
  const handleItemClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  const getButtonText = () => {
    switch (variant) {
      case "editable":
        return "Save";
      case "evaluated":
        return "Feedback";
      case "default":
        return "Download";
      default:
        return "Start Test";
    }
  };


  return (
    <div className={styles.container}>

       {/* 🔹 Button in the top-right corner */}
      

      {/* Test Info Header */}
      <div className={styles.testInfo}>

      <div className={styles.buttonContainer}>
        <Button text={getButtonText()} onClick={handleButtonClick} />
      </div>
        <h2 className={styles.subjectName}>{questionsData.subjectName}</h2>
        <p className={styles.testDetails}>{questionsData.testName}</p>
        <p className={styles.testDetails}>
          <strong>Total Questions:</strong> {questionsData.totalQuestions}
        </p>
        <p className={styles.testDetails}>
          <strong>Total Marks:</strong> {questionsData.totalMarks}
        </p>
        <p className={styles.testDetails}>
          <strong>Duration:</strong> {questionsData.duration} mins
        </p>

        {isEvaluated && studentName && (
          <p className={styles.testDetails}>
            <strong>Student Name:</strong> {studentName}
          </p>
          
        )}

      </div>

      {/* Render List of Questions */}
      <div className={styles.questionsContainer}>
        {questionsData.questions.length > 0 ? (
          <div className={styles.gridContainer}>
          {questionsData.questions.map((question, index) => (
            <div
              key={index}
              className={`${styles.questionWrapper} ${
                selectedQuestionIndex === index ? styles.selectedItem : ""
              }`}
              onClick={() => handleItemClick(index)}
            >
              <div className={styles.questionText}>
                <QnA
                  questionNumber={index + 1}
                  question={question.question}
                  options={question.options}
                  image={question.image || null}
                  // ✅ Determine variant based on isEditable and isEvaluated
                  variant={
                    isEvaluated
                      ? "marked" // Highlight correct/incorrect answers
                      : isEditable
                      ? "editable" // Enable editable mode
                      : "default" // Default variant
                  }
                  correctOption={question.correctOption} // ✅ For evaluation
                  selectedOption={question.selectedOption} // ✅ For evaluation
                />
              </div>
              {/* ✅ Show Icon when item is clicked */}
              {selectedQuestionIndex === index && (
                <FaChevronRight className={styles.icon} />
              )}
            </div>
          ))}
          </div>
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
