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
  <div className={styles.label}>Subject</div>
  <div className={styles.colon}>:</div>
  <div className={styles.value}>{subject}</div>

  <div className={styles.label}>Test Name</div>
  <div className={styles.colon}>:</div>
  <div className={styles.value}>{testName}</div>

  <div className={styles.label}>Published By</div>
  <div className={styles.colon}>:</div>
  <div className={styles.value}>{publishedBy}</div>

  <div className={styles.label}>Score</div>
  <div className={styles.colon}>:</div>
  <div className={styles.value}>{score}</div>

  <div className={styles.label}>Grade</div>
  <div className={styles.colon}>:</div>
  <div className={styles.value}>{grade}</div>

  <div className={styles.label}>Accuracy</div>
  <div className={styles.colon}>:</div>
  <div className={styles.value}>{accuracy}</div>
</div>

      <div className={styles.buttonWrapper}>
        <Button text="View Responses" onClick={onViewResponses} />
      </div>
    </div>
  );
};

export default NewResult;
