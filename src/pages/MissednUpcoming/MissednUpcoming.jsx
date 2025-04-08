import React from 'react';
import Navbar from '../../components/Navbar/Navbar'; // Import Navbar
import MissedTests from '../../layouts/MissedTests/MissedTests';
import UpcomingTests from '../../layouts/UpcomingTests/UpcomingTests';
import styles from './missednUpcoming.module.css';

const MissednUpcoming = () => {
  return (
    <div className={styles.container}>
      {/* Navbar Component */}
      <Navbar />

      {/* Two-column Layout */}
      <div className={styles.contentWrapper}>
        {/* Left Section - Missed Tests */}
        <section className={styles.leftSection}>
          <MissedTests />
        </section>

        {/* Right Section - Upcoming Tests */}
        <section className={styles.rightSection}>
          <UpcomingTests />
        </section>
      </div>
    </div>
  );
};

export default MissednUpcoming;
