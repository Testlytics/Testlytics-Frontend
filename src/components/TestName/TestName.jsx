import React from 'react';
import styles from "./testName.module.css";

const TestName = ({ text }) => {
  return (
    <div className={styles['rectangle']}>
      <p className={styles['rectangle-text']}>{text}</p>
    </div>
  );
};

export default TestName;
