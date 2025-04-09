import React, { useState, useEffect } from "react";
import AttendQuestion from "../../components/AttendQuestion/AttendQuestion";
import styles from "./attendQuestions.module.css";
import Button from "../../components/Button/Button";

const AttendQuestions = ({ totalQuestions = 0, highlightedQuestions = new Set(), timeLimit = 1, onSubmit }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [attendedQuestions, setAttendedQuestions] = useState(new Set());
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert minutes to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);


  useEffect(() => {
    setTimeRemaining(timeLimit * 60); // Reset timer if timeLimit changes
  }, [timeLimit]);
  
  useEffect(() => {
    if (typeof timeLimit === "number" && timeLimit > 0) {
      const timer = setTimeout(() => {
        alert("Time is up!");
        // Optional: redirect or disable input
      }, timeLimit * 60 * 1000); // Convert minutes to milliseconds
  
      return () => clearTimeout(timer);
    }
  }, [timeLimit]);
  

  useEffect(() => {
    if (timeRemaining <= 0 && !isSubmitted) {
      setIsSubmitted(true); // Prevent further auto-submits
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);
  
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }
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

  const handleSubmit = async () => {
    console.log("Submit button clicked");
    if (!isSubmitted) {
      console.log("blah");
      setIsSubmitted(true);
    }
      try {
        console.log("blah1");
        await onSubmit?.();
      } catch (err) {
        console.error("Submission failed inside AttendQuestions:", err);
        setIsSubmitted(false); // revert flag if error
      }
    
  };
  

  useEffect(() => {
    console.log("onSubmit prop received in AttendQuestions:", onSubmit);
  }, [onSubmit]);
  
  

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
          <div className={`${styles.circle} ${styles.attended} : ""}`}></div>
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
