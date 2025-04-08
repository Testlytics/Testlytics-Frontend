import React from 'react';
import styles from './missedCard.module.css';
import Button from '../Button/Button'; 

const MissedCard = ({ date, testName, onViewClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.date}>{date}</div>
      <div className={styles.testName}>{testName}</div>
      <Button
          text="View"
          onClick={() => alert("View missed test!")}
        /> {/* Using the imported Button */}
    </div>
  );
};

export default MissedCard;
