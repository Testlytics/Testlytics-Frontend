// src/layouts/QuestionsList/QuestionsList.jsx
import React, { useEffect, useState } from "react";
import QnA from "../../components/QnA/QnA";
import { FaChevronRight } from "react-icons/fa"; // ✅ Import icon
import styles from "./questionsList.module.css";

const QuestionsList = ({
  subjectName,
  testName,
  totalQuestions,
  totalMarks,
  duration,
  questions,
  isEditable = false, // Default: false
  isEvaluated = false, // Default: false
  variant = "default", // ✅ Added variant with default as "default"
  selectedIndex, // ✅ Passed to dynamically load data
}) => {
  // ✅ State to manage questions data dynamically when variant is "default"
  const [questionsData, setQuestionsData] = useState({
    subjectName: "",
    testName: "",
    totalQuestions: 0,
    totalMarks: 0,
    duration: 0,
    questions: [],
  });

  // ✅ State to manage selected question dynamically
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  // ✅ Sample data for default variant (replace with API later if needed)
  const defaultData = [
    {
      subjectName: "JavaScript",
      testName: "Basics",
      totalQuestions: 3,
      totalMarks: 30,
      duration: 15,
      questions: [
        {
          question: "What is the correct way to declare a variable in JavaScript?",
          options: ["let", "var", "const", "All of the above"],
          correctOption: 3,
          selectedOption: null,
        },
        {
          question: "Which method is used to parse a JSON string?",
          options: ["JSON.parse()", "JSON.stringify()", "JSON.decode()", "parseJSON()"],
          correctOption: 0,
          selectedOption: null,
        },
        {
          question: "What is the output of `typeof NaN`?",
          options: ["number", "string", "undefined", "NaN"],
          correctOption: 0,
          selectedOption: null,
        },
      ],
    },
    {
      subjectName: "Python",
      testName: "Introduction",
      totalQuestions: 2,
      totalMarks: 20,
      duration: 10,
      questions: [
        {
          question: "Which keyword is used to define a function in Python?",
          options: ["function", "def", "func", "define"],
          correctOption: 1,
          selectedOption: null,
        },
        {
          question: "What is the correct way to comment in Python?",
          options: ["//", "#", "/* */", "--"],
          correctOption: 1,
          selectedOption: null,
        },
      ],
    },
  ];

  // ✅ Dynamically load data if variant is "default"
  useEffect(() => {
    if (variant === "default") {
      setQuestionsData(defaultData[selectedIndex] || defaultData[0]);
    } else {
      // Use passed props directly for other variants
      setQuestionsData({
        subjectName,
        testName,
        totalQuestions,
        totalMarks,
        duration,
        questions,
      });
    }
  }, [variant, selectedIndex, subjectName, testName, totalQuestions, totalMarks, duration, questions]);

  // ✅ Handle click to highlight and select question
  const handleItemClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  return (
    <div className={styles.container}>
      {/* Test Info Header */}
      <div className={styles.testInfo}>
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
      </div>

      {/* Render List of Questions */}
      <div className={styles.questionsContainer}>
        {questionsData.questions.length > 0 ? (
          questionsData.questions.map((question, index) => (
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
                      : "default" // Default highlighted variant
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
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
