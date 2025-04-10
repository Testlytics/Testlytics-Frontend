import React, { useEffect, useState } from 'react';
import MissedCard from '../../components/MissedCard/MissedCard';
import styles from './missedTests.module.css';
import { testAttemptService, testService } from '../../services/api';

const MissedTests = () => {
  const [missedTests, setMissedTests] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMissedTests = async () => {
      try {
        const missedResponse = await testAttemptService.getMissedTests(userId);
        const missedIds = missedResponse?.responseBody || [];

        const missedDetails = await Promise.all(
          missedIds.map(async (testId) => {
            try {
              const response = await testService.getTestById(testId);
              const test = response?.data?.responseBody;
              return {
                id: test.testId,
                testName: test.testName,
                date: test.testDate
              };
            } catch (err) {
              console.warn(`Error fetching test with ID ${testId}`, err);
              return null;
            }
          })
        );

        // Filter out any failed/null results
        setMissedTests(missedDetails.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch missed tests:", error);
      }
    };

    fetchMissedTests();
  }, [userId]);

  return (
    <div className={styles.missedTestsContainer}>
      <h2 className={styles.heading}>Missed Exams</h2>
      <div className={styles.cardsContainer}>
        {missedTests.length > 0 ? (
          missedTests.map((test) => (
            <MissedCard
              key={test.id}
              date={test.date}
              testName={test.testName}
              onViewClick={() => console.log(`Viewing test: ${test.testName}`)}
            />
          ))
        ) : (
          <p>No missed exams found.</p>
        )}
      </div>
    </div>
  );
};

export default MissedTests;
