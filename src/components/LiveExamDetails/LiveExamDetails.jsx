import React from "react";
import styles from "./liveExamDetails.module.css";
import Heading from "../Heading/Heading";

const LiveExamDetails = ({ exams = [] }) => {
  return (
    <div className={styles.container}>
      <Heading text="Live Exams" size="32px" align="center" weight="600" />
      <div className={styles.examSlots}>
        {exams.map((exam, index) => (
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
  );
};

export default LiveExamDetails;
