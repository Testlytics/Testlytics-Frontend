import React from 'react';
import MissedCard from '../../components/MissedCard/MissedCard';
import styles from './missedTests.module.css'; // Import CSS for layout styling

const MissedTests = () => {
  // Sample data for missed tests
  const missedTests = [
    { id: 1, date: '18-06-2024', testName: 'Algebra' },
    { id: 2, date: '20-06-2024', testName: 'Measurements' },
    { id: 3, date: '30-06-2024', testName: 'Organic' }
  ];

  return (
    <div className={styles.missedTestsContainer}>
      <h2 className={styles.heading}>Missed Exams</h2>
      <div className={styles.cardsContainer}>
        {missedTests.map((test) => (
          <MissedCard
            key={test.id}
            date={test.date}
            testName={test.testName}
            onViewClick={() => console.log(`Viewing test: ${test.testName}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MissedTests;
