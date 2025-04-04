import React from "react";
import styles from "./newResult.module.css";
import Button from "../Button/Button"; // Assuming you have a reusable Button component

const NewResult = ({
  subject,
  testName,
  publishedBy,
  score,
  grade,
  accuracy,
  onViewResponses
}) => {
  return (
    <div className={styles.newResult}>
      <h2 className={styles.heading}>NEW RESULT!!</h2>

      <div className={styles.details}>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Test Name:</strong> {testName}</p>
        <p><strong>Published By:</strong> {publishedBy}</p>
        <p><strong>Score:</strong> {score}</p>
        <p><strong>Grade:</strong> {grade}</p>
        <p><strong>Accuracy:</strong> {accuracy}</p>
      </div>

      <div className={styles.buttonWrapper}>
        <Button text="View Responses" onClick={onViewResponses} />
      </div>
    </div>
  );
};

export default NewResult;
