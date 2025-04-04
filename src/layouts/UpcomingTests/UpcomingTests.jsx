import React from 'react';
import UpcomingCard from '../../components/UpcomingCard/UpcomingCard';
import Calendar from '../../components/Calendar/Calendar';
import styles from './upcomingTests.module.css';

// Sample data for upcoming tests
const upcomingTests = [
   
  {
    date: '2025-04-10',
    testName: 'Algebra',
    time: '10:00 to 12:30',
    score: 50,
  },
  {
    date: '2025-04-15',
    testName: 'Measurements',
    time: '2:00 to 3:00',
    score: 40,
  },
  {
    date: '2025-05-2',
    testName: 'Organic',
    time: '11:00 to 13:00',
    score: 70,
  },

];

// Convert upcoming test dates to Date objects for the Calendar
const upcomingDates = upcomingTests.map((test) => new Date(test.date));

const UpcomingTests = () => {
  return (
    <div className={styles.upcomingTestsContainer}>
      {/* Heading */}
      <h1 className={styles.heading}>Upcoming Tests</h1>

      {/* Upcoming Cards */}
      <div className={styles.cardsContainer}>
        {upcomingTests.map((test, index) => (
          <UpcomingCard
            key={index}
            date={test.date}
            testName={test.testName}
            time={test.time}
            score={test.score}
          />
        ))}
      </div>

      {/* Calendar */}
      <div className={styles.calendarContainer}>
        <Calendar upcomingDates={upcomingDates} />
      </div>
    </div>
  );
};

export default UpcomingTests;
