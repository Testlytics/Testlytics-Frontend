import React from 'react';
import TestName from '../../components/TestName/TestName';
import SearchBar from '../../components/SearchBar/SearchBar'; // Import SearchBar
import StatusRectangle from '../../components/StatusRectangle/StatusRectangle';
import styles from './questions.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ViewButton from '../../components/Button/View/ViewButton'; // ✅ Import ViewButton

const testNames = [
  { name: 'Physics | Measurements', status: 'Completed' },
  { name: 'Chemistry | Organic', status: 'Scheduled' },
  { name: 'Biology | Brain', status: 'Ongoing' },
  { name: 'Physics | Measurements', status: 'Completed' },
];

const Questions = () => {


  return (
    <div className={styles['questions-page']}>
       {/* Navbar Component */}
    <Navbar />

      <h1 className={styles['questions-heading']}>Questions</h1>

      {/* SearchBar Component */}
      <div className={styles['search-bar-container']}>
        <SearchBar />
      </div>

     
      {/* Test Names with Rectangles */}
      <div className={styles['questions-container']}>
        {testNames.map((test, index) => (
          <div key={index} className={styles['question-row']}>
            <TestName text={test.name} />
            <ViewButton label="View" text="View" onClick={() => alert(`Viewing details for ${test.name}`)} />
            <StatusRectangle text={test.status} status={test.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;

