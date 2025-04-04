import React from 'react';
import TestName from '../../components/TestName/TestName';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatusRectangle from '../../components/StatusRectangle/StatusRectangle';
import Navbar from '../../components/Navbar/Navbar';
import ViewButton from '../../components/Button/View/ViewButton';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import styles from './questions.module.css';

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
      

      {/* Test Names with Rectangles */}
      <div className="container-fluid mt-4">
        {testNames.map((test, index) => (
          <div key={index} className="row g-5 justify-content-center align-items-center mb-4">
            
            {/* Test Name (Left) */}
            <div className="col-12 col-md-6 d-flex justify-content-center">
              <TestName text={test.name} />
            </div>

            {/* View Button & Status Rectangle (Right) */}
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center gap-3">
                <ViewButton label="View" text="View" onClick={() => alert(`Viewing details for ${test.name}`)} />
                <StatusRectangle text={test.status} status={test.status} />
                
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
