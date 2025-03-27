import React from "react";
import styles from "./liveExamDetails.module.css";

const LiveExamDetails = ({ exams = [] }) => {
  return (
    <>
    <h3 className={styles.heading}>Live Exams</h3>
    <div className={styles.container}>
      <div className={styles.examSlots}>
        {exams.slice(0, 2).map((exam, index) => (
          <div key={index} className={styles.examCard}>
            <div className={styles.innerBox}>
              <div className={styles.details}>
                <div className={styles.testName}>{exam.name}</div>
                <div className={styles.subject}>{exam.subject}</div>
                <div className={styles.duration}>Duration: {exam.duration} mins</div>
              </div>
              <div className={styles.time}>{exam.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default LiveExamDetails;
