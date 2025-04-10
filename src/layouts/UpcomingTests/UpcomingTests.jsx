import React, { useEffect, useState } from 'react';
import UpcomingCard from '../../components/UpcomingCard/UpcomingCard';
import Calendar from '../../components/Calendar/Calendar';
import styles from './upcomingTests.module.css';
import { testService } from '../../services/api';

const UpcomingTests = () => {
  const [upcomingTests, setUpcomingTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingTests = async () => {
      try {
        const allTests = await testService.getAllTests();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // normalize

        const futureTests = allTests
          .filter(test => {
            const testDate = new Date(test.testDate);
            testDate.setHours(0, 0, 0, 0);
            return testDate >= today;
          })
          .map(test => {
            const testDate = new Date(test.testDate);
            testDate.setHours(0, 0, 0, 0);

            return {
              date: test.testDate,
              testName: test.testName,
              time: `${test.startTime} to ${test.endTime}`,
              score: test.testDuration, // Or actual score
              isToday: testDate.getTime() === today.getTime(),
            };
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // sort by date

        setUpcomingTests(futureTests);
      } catch (error) {
        console.error('Error fetching upcoming tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingTests();
  }, []);

  const upcomingDates = upcomingTests.map(test => new Date(test.date));

  return (
    <div className={styles.upcomingTestsContainer}>
      <h1 className={styles.heading}>Upcoming Tests</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Upcoming Cards */}
          <div className={styles.cardsContainer}>
            {upcomingTests.map((test, index) => (
              <UpcomingCard
                key={index}
                date={test.date}
                testName={test.testName}
                time={test.time}
                score={test.score}
                isToday={test.isToday} // pass flag to card
              />
            ))}
          </div>

          {/* Calendar */}
          <div className={styles.calendarContainer}>
            <Calendar upcomingDates={upcomingDates} />
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingTests;
