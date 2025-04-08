import React, { useEffect, useState } from 'react';
import styles from "./startTest.module.css"; // Import the CSS file for styling
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom'; 
import { testService } from '../../services/api'; 

const StartTest = () => {

  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await testService.getTestById(1); // Replace 1 with dynamic ID if needed
        setTestData(response.data);
      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };

    fetchTestData();
  }, []);

  const handleStartTest = () => {
    if (testData && testData.testName) {
      navigate(`/attend-test/${testData.testName}`);
    }
  };

  if (!testData) {
    return <div>Loading...</div>;
  }


  return (

    <div className={styles['page-container']}>
        <Navbar />

    <div className={styles['split-container']}>
      {/* Left Section */}
      
  {/* Left Section */}
  <div className={styles['split-section'] + ' ' + styles['left-section']}>
    <h2>General Instructions</h2>
    <div className={styles['instructions-container']}>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>1.</span>
        <span className={styles['instruction']}><b>Login Early</b> - Join at least 10 minutes before the exam.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>2.</span>
        <span className={styles['instruction']}><b>Read Guidelines</b> - Check rules, time limits, and question format.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>3.</span>
        <span className={styles['instruction']}><b>Manage Time</b> - Track the timer and pace yourself.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>4.</span>
        <span className={styles['instruction']}><b>Avoid Refreshing</b> - Do not reload or switch tabs.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>5.</span>
        <span className={styles['instruction']}><b>No External Help</b> - Follow exam integrity rules.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>6.</span>
        <span className={styles['instruction']}><b>Save and Submit</b> - Ensure answers are saved before submitting.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>7.</span>
        <span className={styles['instruction']}><b>Stay Focused</b> - Any misconduct may lead to penalties.</span>
      </div>
      <div className={styles['instruction-row']}>
        <span className={styles['number']}>8.</span>
        <span className={styles['instruction']}><b>Report Issues</b> - Contact support for technical problems.</span>
      </div>
    </div>
  </div>

      <div className={styles['split-section'] + ' ' + styles['right-section']}>
  <h2>Exam Details</h2>
  <div className={styles['details-container']}>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Subject Name &nbsp; &nbsp; &nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>Physics</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Test Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>Measurements</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Assigned By &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>Mentor name</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Duration &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>60 min</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Total Questions &nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>100</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Total Marks &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>100</span>
  </div>
</div>
{/* Call the Button Component Here */}
<div className={styles['button-container']}>
            <Button label="Start Test" text="Start Test" onClick={handleStartTest}/>
          </div>

 
</div>
</div>
    </div>
  );
};

export default StartTest;
