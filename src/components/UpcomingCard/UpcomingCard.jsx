import React from 'react';
import styles from './upcomingCard.module.css';
import Button from '../Button/Button'; // Import your existing Button component

const UpcomingCard = ({ date, testName, time, score, onViewClick }) => {
  return (
    <div className={styles.card}>
      <span className={styles.date}>{date}</span>
      <span className={styles.testName}>{testName}</span>
      <span className={styles.time}>{time}</span>
      <span className={styles.score}>Max Score: {score}</span>
    </div>
  );
};

export default UpcomingCard;
