// 📁 src/layouts/QuestionsList/QuestionsList.jsx
import React, { useEffect, useState } from "react";
import QnA from "../../components/QnA/QnA";
import { FaChevronRight } from "react-icons/fa"; // ✅ Import icon
import styles from "./questionsList.module.css";
import Button from "../../components/Button/Button";
import { questionService } from "../../services/api"; 

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
  testId,
  studentName, // New prop for the student's name
}) => {
  
  console.log("✅ Received testId in QuestionsList:", testId);


  //✅ State to manage questions dynamically
  const [questionsData, setQuestionsData] = useState({
    subjectName: "",
    testName: "",
    totalQuestions: 0,
    totalMarks: 0,
    duration: 0,
    questions: [],
    variant: "default",
  });

  const handleButtonClick = async () => {
    if (questionsData.variant === "default") {
      try {
        
        if (!testId) {
          alert("No test selected.");
          return;
        }
  
        const response = await questionService.downloadQuestionPaper(testId);
  
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
  
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${questionsData.testName || "QuestionPaper"}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
  
      } catch (error) {
        console.error("❌ Download error:", error);
        alert("Failed to download question paper.");
      }
    } else {
      alert("Button Clicked!"); // or handle other variants
    }
  };


  // ✅ State to manage selected question dynamically
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  useEffect(() => {
    console.log("🧩 QuestionsList Props:", {
      subjectName,
      testName,
      totalQuestions,
      totalMarks,
      duration,
      questions,
      variant,
    });

    console.log("QuestionsList loaded with variant:", variant);
  
    setQuestionsData({
      subjectName,
      testName,
      totalQuestions,
      totalMarks,
      duration,
      questions,
      variant,
    });
  }, [subjectName, testName, totalQuestions, totalMarks, duration, questions, variant]);
  

  // ✅ Handle click to highlight and select question
  const handleItemClick = (index) => {
    setSelectedQuestionIndex(index === selectedQuestionIndex ? null : index);
  };

  const getButtonText = () => {
    switch (questionsData.variant) {
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
        {questionsData.questions && questionsData.questions.length > 0 ? (
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
  questionId={question.questionId} // optional if QnA uses it
  questionText={question.text}     // pass this as questionText if QnA expects that prop name
  correctOption={question.options.findIndex(opt => opt.isCorrect)} // index of correct option
  selectedOption={question.selectedOption} // should be optionId
  options={question.options.map((opt) => ({
    optionId: opt.optionId,
    optionText: opt.text,
    isCorrect: opt.isCorrect
  }))}
  image={question.image || null}
  variant={
    isEvaluated
      ? "marked"
      : isEditable
      ? "editable"
      : "default"
  }
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
