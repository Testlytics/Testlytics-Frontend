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
  console.log("Fetched userId:", userId);

  const tableColumns = ["Sl No", "Date", "Subject", "Exam Name", "Score"];
  const tableData = historyTests.map((test, index) => ({
    "Sl No": index + 1,
    Date: test.testDate,
    Subject: test.subjectName,
    "Exam Name": test.testName,
    Score: `${test.score}`
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch all available tests
        const allTestsResponse = await testService.getAllTests();
        const allTests = Array.isArray(allTestsResponse) ? allTestsResponse : [];
        const activeTest = allTests.find(test => test.active === true);
        setLiveExam(activeTest || null);
        console.log("All Tests:", allTests);
        console.log("Active Test:", activeTest);

        // 2. Missed Exams
        const missed = await testAttemptService.getMissedTests(userId);
        console.log("Missed Exams:", missed?.responseBody);
        setMissedExams(missed?.responseBody || []);

        // 3. Upcoming Exams
        const upcoming = await testService.getUpcomingTests();
        console.log("Upcoming Exams:", upcoming?.responseBody);
        setUpcomingExams(upcoming?.responseBody || []);

        // 4. Get test history
        const getStudentTestHistory = async (userId) => {
          try {
            const testIds = await testAttemptService.getUserTestIds(userId);

            const testHistory = await Promise.all(
              testIds.map(async (testId) => {
                try {
                  const [attempt, test] = await Promise.all([
                    testAttemptService.getTestAttempt(testId, userId),
                    testService.getTestById(testId)
                  ]);

                  console.log(`Parsed Attempt for ${testId}:`, attempt);
                  console.log(`Parsed Test for ${testId}:`, test?.data?.responseBody);

                  const testData = test?.data?.responseBody;

                  if (!testData || !testData.published) {
                    console.warn(`Skipping testId ${testId} (not published or missing test data)`);
                    return null;
                  }

                  return {
                    testId: testId,
                    testName: testData.testName,
                    subjectName: testData.subjectName,
                    testDate: testData.testDate,
                    score: attempt?.score ?? "Not Submitted",
                    totalMarks: testData.totalMarks || "N/A",
                    status: attempt ? "Submitted" : "Not Submitted"
                  };
                } catch (err) {
                  console.error(`Error processing testId ${testId}:`, err);
                  return null;
                }
              })
            );

            return testHistory.filter(Boolean);
          } catch (error) {
            console.error("Failed to fetch test history:", error);
            return [];
          }
        };

        const filteredHistory = await getStudentTestHistory(userId);
        console.log("Final Filtered History Tests:", filteredHistory);
        setHistoryTests(filteredHistory);

      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const examsData = [
    {
      title: 'LIVE Exam',
      description: liveExam?.testName || 'No exam currently',
      value: liveExam ? `${liveExam.startTime} to ${liveExam.endTime}` : '',
      buttonText: liveExam ? 'Attend' : 'N/A',
      onButtonClick: () => {
        if (liveExam) navigate(`/start-test/${liveExam.testId}`);
      }
    },
    {
      title: 'Missed Exams',
      description: 'Exams you didn\'t attend',
      value: `Total No : ${missedExams.length}`,
      buttonText: 'View',
      onButtonClick: () => navigate('/missed-upcoming')
    },
    {
      title: 'Upcoming Exams',
      description: 'Scheduled upcoming exams',
      value: `Total No : ${upcomingExams.length}`,
      buttonText: 'View',
      onButtonClick: () => navigate('/missed-upcoming')
    }
  ];

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
                onButtonClick={exam.onButtonClick}
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
