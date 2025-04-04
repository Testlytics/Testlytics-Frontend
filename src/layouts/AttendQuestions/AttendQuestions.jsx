import React, { useState, useEffect } from "react";
import AttendQuestion from "../../components/AttendQuestion/AttendQuestion";
import styles from "./attendQuestions.module.css";
import Button from "../../components/Button/Button";

const AttendQuestions = ({ totalQuestions = 0, highlightedQuestions = new Set(), timeLimit = 1 }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [attendedQuestions, setAttendedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert minutes to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit(); // Auto-submit when time is up
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timeRemaining]);

  // Convert time into MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Handle question selection
  const handleQuestionClick = (questionNumber) => {
    setSelectedQuestion(questionNumber);
    setAttendedQuestions((prev) => new Set(prev).add(questionNumber)); // Mark question as attended
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (!isSubmitted) {
      alert("Time is up! Questions Submitted.");
      setIsSubmitted(true); // Prevent multiple submissions
    }
  };

  return (
    <div className={styles.container}>
      {/* Timer Display at Top-Right */}
      <div className={styles.timer}>{formatTime(timeRemaining)}</div>

      {/* Heading */}
      <h2 className={styles.heading}>Questions</h2>

      {/* Render AttendQuestion component for each question */}
      <div className={styles.questionGrid}>
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
          <div 
            key={num} 
            onClick={() => handleQuestionClick(num)} 
            className={`${styles.questionNumber} ${highlightedQuestions.has(num) ? styles.highlighted : ""}`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className={styles.buttonContainer}>
        <Button text="Submit" onClick={handleSubmit} className={styles.submitButton} disabled={isSubmitted} />
      </div>

      {/* Circle Section (Attended & Not Attended) */}
      <div className={styles.circleSection}>
        <div className={styles.circleWrapper}>
          <div className={`${styles.circle} ${attendedQuestions.size > 0 ? styles.attended : ""}`}></div>
          <span>Attended</span>
        </div>
        <div className={styles.circleWrapper}>
          <div className={styles.circle}></div>
          <span>Not Attended</span>
        </div>
      </div>
    </div>
  );
};

export default AttendQuestions;
