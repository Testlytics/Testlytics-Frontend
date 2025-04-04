// src/components/AttendQuestion/AttendQuestion.jsx
import React, { useState } from "react";
import styles from "./attendQuestion.module.css";

const AttendQuestion = ({ questionNumber, onClick, isSelected }) => {
  return (
    <div
      className={`${styles.questionCircle} ${isSelected ? styles.selected : ""}`}
      onClick={() => onClick(questionNumber)}
    >
      <span className={styles.questionNumber}>{questionNumber}</span>
    </div>
  );
};

export default AttendQuestion;
