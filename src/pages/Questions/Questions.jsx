import React, { useEffect, useState } from 'react';
import TestName from '../../components/TestName/TestName';
import SearchBar from '../../components/SearchBar/SearchBar';
import StatusRectangle from '../../components/StatusRectangle/StatusRectangle';
import styles from './questions.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ViewButton from '../../components/Button/View/ViewButton';
import { testService, subjectService } from '../../services/api';
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { useNavigate } from 'react-router-dom';


const Questions = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const handleViewClick = async (test) => {
    const variant = test.status === 'Scheduled' ? 'editable' : 'default';
  
    try {
      // 👇 You can optionally prefetch test data here if needed
      // const data = await testService.getTestsByVariant(variant); 
  
      navigate(`/questionpaper/${variant}`, { state: { testId: test.testId } });
    } catch (error) {
      console.error("Error navigating to test:", error);
    }
  };
  

  // Determine the status based on current time and completed list
  const getStatus = (test, isCompleted) => {
    if (isCompleted) return 'Completed';

    const now = new Date();
    const testDate = new Date(test.testDate);
    const startTime = new Date(`${testDate.toDateString()} ${test.startTime}`);
    const endTime = new Date(`${testDate.toDateString()} ${test.endTime}`);

    if (now >= startTime && now <= endTime) return 'Ongoing';
    if (now < startTime) return 'Scheduled';
    return 'Unknown';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both subjects and tests in parallel
        const [subjects, testData] = await Promise.all([
          subjectService.getAllSubjects(),
          testService.getAllTestData()
        ]);

        const { allTests, completedTests } = testData;

        // Create a subjectId -> subjectName map
        const subjectMap = {};
        subjects.forEach(sub => {
          subjectMap[sub.subjectId] = sub.subjectName;
        });

        // Prepare completed test ID list
        const completedIds = completedTests.map(t => t.testId.toString());

        // Combine all tests and completed tests, avoiding duplicates
const combinedTestsMap = new Map();

// Add all tests
allTests.forEach(test => {
  combinedTestsMap.set(test.testId, test);
});


// Add completed tests (they’ll overwrite if already in allTests)
completedTests.forEach(test => {
  combinedTestsMap.set(test.testId, test);
});

// Convert map to array
const combinedTests = Array.from(combinedTestsMap.values());



// Now, add subject name and status
const mergedTests = combinedTests.map(test => ({
  ...test,
  subject: subjectMap[test.subjectId] || 'Unknown Subject',
  status: getStatus(test, completedIds.includes(test.testId.toString()))
}));

        setTests(mergedTests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles['questions-page']}>
      <Navbar />
      <h1 className={styles['questions-heading']}>Questions</h1>

      <div className={styles['search-bar-container']}>
        <SearchBar />
      </div>

      {loading ? (
        <p>Loading tests...</p>
      ) : tests.length === 0 ? (
        <p>No tests available</p>
      ) : (
        <div className="container-fluid mt-4">
          {tests.map((test, index) => (
            <div key={index} className="row g-5 justify-content-center align-items-center mb-4">
             <div className="col-12 col-md-6 d-flex justify-content-center">
              <TestName text={`${test.subject} | ${test.testName}`} />
             </div>
             <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="d-flex justify-content-center align-items-center gap-3">
              <ViewButton
                label="View"
                text="View"
                onClick={() => handleViewClick(test)}
              />
              <StatusRectangle text={test.status} status={test.status} />
             </div>
             </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Questions;


