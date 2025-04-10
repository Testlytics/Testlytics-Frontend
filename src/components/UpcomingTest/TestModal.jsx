import React from "react";
import styles from "./testModal.module.css";

const TestModal = ({ tests, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Tests on Selected Date</h2>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <ul className={styles.testList}>
          {tests.map((test, index) => (
            <li key={index} className={styles.testItem}>
              <strong>{test.testName}</strong> - {test.subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestModal;
