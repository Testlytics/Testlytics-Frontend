import React, { useEffect, useState } from 'react';
import styles from "./startTest.module.css"; // Import the CSS file for styling
import Navbar from '../../components/Navbar/Navbar';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom'; 
import { testService, subjectService, questionService, testAttemptService } from '../../services/api'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';


const StartTest = () => {


  const navigate = useNavigate();
  const [testData, setTestData] = useState(null);
  const [subjectName, setSubjectName] = useState("Loading...");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const { testId } = useParams();

console.log("Fetched testId from URL:", testId); 

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        console.log("Calling getTestById with testId:", testId);
        const response = await testService.getTestById(testId);
        const test = response.data.responseBody;
       
        setTestData(test);

        if (test.subjectId) {
          const subjectResponse = await subjectService.getSubjectById(test.subjectId);
          const subject = subjectResponse.data.responseBody;
          setSubjectName(subject.subjectName || "Unknown Subject");
        }

        // Fetch Questions
        const questionsResponse = await questionService.getQuestionsByTestId(testId);
        console.log("Questions API response:", questionsResponse);
        const questions = Array.isArray(questionsResponse?.data)
  ? questionsResponse.data
  : [];

console.log("Extracted Questions:", questions);
console.log("Total Questions:", questions.length);

        setTotalQuestions(questions.length);
        setTotalMarks(questions.length); 


      } catch (error) {
        console.error('Error fetching test data:', error);
      }
    };


    if (testId) {
      fetchTestData();
    }
  }, [testId]);


  



  const handleStartTest = async () => {
    
    try {
      console.log("handle start test triggered");
      const userId = parseInt(localStorage.getItem("userId"),10); 
console.log("Calling API with testId:", testId, "userId:", userId);
      if (testData && testId && userId) {
        // Call the backend to start the test attempt
        console.log("blah");
        const attemptResponse = await testAttemptService.startTestAttempt(testId, userId);
        console.log("Test attempt started:", attemptResponse);


// const attemptResponse = await axios.post(
//   `http://localhost:8080/attempts/start`,
//   null,
//   {
//     params: {
//       testId: testData.testId,
//       userId: userId,
//     },
//   }
// );

console.log("Response from direct Axios:", attemptResponse);
        
        // Then navigate to attend-test
        navigate(`/attend-test/${testId}`);
      } else {
        console.error("Missing testId or userId");
      }
    } catch (error) {
      console.error("Failed to start test attempt:", error);
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
    <span className={styles['value']}>{subjectName}</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Test Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <span className={styles['colon']}>:</span>
    
<span className={styles['value']}>{testData.testName}</span>
  </div>
 
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Duration &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>{testData.testDuration} min</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Total Questions &nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>{totalQuestions}</span>
  </div>
  <div className={styles['detail-row']}>
    <span className={styles['label']}>Total Marks &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span>
    <span className={styles['colon']}>:</span>
    <span className={styles['value']}>{totalMarks}</span>
  </div>
</div>
{/* Call the Button Component Here */}
<div className={styles['button-container']}>
            <Button text="Start Test" onClick={handleStartTest}/>
          </div>

 
</div>
</div>
    </div>
  );
};

export default StartTest;
