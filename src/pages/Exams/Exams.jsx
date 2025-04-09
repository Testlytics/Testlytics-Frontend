import React, { useEffect, useState } from 'react';
import styles from './exams.module.css';
import ExamCard from '../../components/ExamCard/ExamCard';
import Navbar from '../../components/Navbar/Navbar';
import Table from "../../components/Table/Table";
import { testService, testAttemptService } from '../../services/api';
import { useNavigate } from 'react-router-dom';


const Exams = () => {

  const navigate = useNavigate();

  const [liveExam, setLiveExam] = useState(null);
  const [missedExams, setMissedExams] = useState([]);
const [upcomingExams, setUpcomingExams] = useState([]);
const [historyTests, setHistoryTests] = useState([]);

  
const userId = Number(localStorage.getItem("userId"));

console.log("Fetched userId from localStorage:", userId);

  const tableColumns = ["Sl No","Date", "Subject", "Exam Name" , "Score" ];

   // Data for the Table
   const tableData = historyTests.map((test, index) => ({
    "Sl No": index + 1,
    Date: test.testDate,
    Subject: test.subjectName,
    "Exam Name": test.testName,
    Score: `${test.score}`
  }));

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await testService.getAllTests();
        console.log("API response:", response);
        const allTests = Array.isArray(response) ? response : [];
  
        allTests.forEach(test => {
          console.log(`Test: ${test.testName}, active: ${test.active}`);
        });
  
        const activeTest = allTests.find(test => test.active === true);
        setLiveExam(activeTest || null);

        const missedResponse = await testAttemptService.getMissedTests(userId);
console.log("Missed Exams:", missedResponse);
setMissedExams(missedResponse.responseBody || []);

const upcomingResponse = await testService.getUpcomingTests();
console.log("✅ Full Upcoming Response:", JSON.stringify(upcomingResponse, null, 2));

setUpcomingExams(upcomingResponse.responseBody || []);

if (!Array.isArray(upcomingResponse.responseBody)) {
  console.warn("⚠️ upcomingResponse.responseBody is not an array:", upcomingResponse.responseBody);
} else if (upcomingResponse.responseBody.length === 0) {
  console.warn("⚠️ Upcoming exams list is empty");
}



        const attendedTestIds = await testAttemptService.getUserAttendance(userId);

        const completedTestDetails = await Promise.all(
          attendedTestIds.map(async (testId) => {
            const testAttempt = await testAttemptService.getTestAttempt(testId, userId);
            return {
              testId: testAttempt.testId,
              testName: testAttempt.testName,
              subjectName: testAttempt.subjectName,
              testDate: testAttempt.testDate,
              score: testAttempt.score,
              totalMarks: testAttempt.totalMarks
            };
          })
        );

        setHistoryTests(completedTestDetails);

      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
  
    fetchTests();
  }, []);
  

  // Sample data for 3 ExamCards
  const examsData = [
    {
     
      title: 'LIVE Exam',
      description: liveExam?.testName || 'No exam currently',
      value: liveExam ? `${liveExam.startTime} to ${liveExam.endTime}` : '',
      buttonText: liveExam ? 'Attend' : 'N/A',
      onButtonClick: () => {
        if (liveExam) {
          navigate(`/start-test/${liveExam.testId}`);
        }
      },
    },
    {
      title: 'Missed Exams',
      value: `Total No : ${missedExams.length}`,
      buttonText: 'View',
    },
    {
      title: 'Upcoming Exams',
      value: `Total No : ${upcomingExams.length}`,
      buttonText: 'View',
    },
  ];


console.log("Missed Exams Count:", missedExams.length);
console.log("Upcoming Exams Count:", upcomingExams.length);


  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={`container-fluid ${styles.mainWrapper}`}>
        <div className="row">
          <div className={`col-lg-3 col-md-12 ${styles.sidebar}`}>
            {examsData.map((exam, index) => (
              <ExamCard
                key={index}
                title={exam.title}
                description={exam.description}
                value={exam.value}
                buttonText={exam.buttonText}
                onButtonClick={() => {
                  if (exam.title === 'Missed Exams' || exam.title === 'Upcoming Exams') {
                    navigate('/missed-upcoming');
                  } else {
                    navigate(`/start-test/${liveExam.testId}`);
                  }
                }}
              />
            ))}
          </div>

          <div className={`col-lg-9 col-md-12 ${styles.content}`}>
            <h1>History</h1>
            <Table columns={tableColumns} data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;