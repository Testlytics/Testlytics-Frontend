import React from 'react';
import styles from './statusRectangle.module.css';

const StatusRectangle = ({ text, status }) => {
  // Determine the class based on status
  const statusClass = {
    completed: styles.completed,
    ongoing: styles.ongoing,
    scheduled: styles.scheduled,
  }[status.toLowerCase()] || styles.default;

  return (
    <div className={`${styles.rectangle} ${statusClass}`}>
      <p className={styles['rectangle-text']}>{text}</p>
    </div>
  );
};

export default StatusRectangle;
