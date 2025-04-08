import React from 'react';
import styles from './subjectDetails.module.css';

const SubjectDetails = ({ subject, totalExams }) => {
  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <h2 className={styles.heading}>Subject</h2>
        <p className={styles.value}>{subject}</p>
      </div>
      <div className={styles.detail}>
        <h2 className={styles.heading}>Total Exams</h2>
        <p className={styles.value}>{totalExams}</p>
      </div>
    </div>
  );
};

export default SubjectDetails;
