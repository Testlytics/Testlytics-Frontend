import React, { useEffect, useState, useMemo } from 'react';
import styles from './exams.module.css';
import ExamCard from '../../components/ExamCard/ExamCard';
import Navbar from '../../components/Navbar/Navbar';
import Table from "../../components/Table/Table";
import { testService, testAttemptService, subjectService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Exams = () => {
  const navigate = useNavigate();

  const [liveExam, setLiveExam] = useState(null);
  const [missedExams, setMissedExams] = useState([]);
  const [upcomingExams, setUpcomingExams] = useState([]);
  const [historyTests, setHistoryTests] = useState([]);

  const userId = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get upcoming tests first
        const upcoming = await testService.getUpcomingTests();
        const upcomingList = upcoming?.data?.responseBody || [];
  
        // 2. Check if any upcoming test is live
        const activeTest = upcomingList.find(test => test.active === true);
        setLiveExam(activeTest || null);
  
        // 3. Store upcoming exams excluding the active one (optional)
        const filteredUpcoming = upcomingList.filter(test => test.testId !== activeTest?.testId);
        setUpcomingExams(filteredUpcoming);
  
        // 4. Missed Exams
        const missed = await testAttemptService.getMissedTests(userId);
        setMissedExams(Array.isArray(missed?.responseBody) ? missed.responseBody : []);
  
        // 5. Test History
        const getStudentTestHistory = async (userId) => {
          try {
            const testIds = await testAttemptService.getUserTestIds(userId);
            const testHistory = await Promise.all(
              testIds.map(async (testId) => {
                try {
                  const [attemptRes, testRes] = await Promise.all([
                    testAttemptService.getTestAttempt(testId, userId),
                    testService.getTestById(testId)
                  ]);
  
                  const attempt = attemptRes;
                  const test = testRes?.data?.responseBody;
                  if (!test || !test.published) return null;
  
                  const subjectId = test.subjectId;
                  let subjectName = "Unknown Subject";
  
                  try {
                    const subjectRes = await subjectService.getSubjectById(subjectId);
                    subjectName = subjectRes?.data?.responseBody?.subjectName || subjectName;
                  } catch (err) {
                    console.warn(`Failed to fetch subject for subjectId ${subjectId}`, err);
                  }
  
                  return {
                    testId: testId,
                    testName: test.testName,
                    subjectName: subjectName,
                    testDate: test.testDate,
                    score: attempt?.score ?? "Not Submitted",
                    totalMarks: test.totalMarks || "N/A",
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
        if (liveExam) navigate(`/start-test/:testId/${liveExam.testId}`);
      }
    },
    {
      title: 'Missed Exams',
      
      value: `Total No : ${missedExams?.length ?? 0}`,
      buttonText: 'View',
      onButtonClick: () => navigate('/missednupcoming')
    },
    {
      title: 'Upcoming Exams',
      value: `Total No : ${upcomingExams?.length ?? 0}`,
      buttonText: 'View',
      onButtonClick: () => navigate('/missednupcoming')
    }
  ];
  

  const tableColumns = ["Sl No", "Date", "Subject", "Exam Name", "Score"];
  const tableData = historyTests.map((test, index) => ({
    "Sl No": index + 1,
    Date: test.testDate,
    Subject: test.subjectName,
    "Exam Name": test.testName,
    Score: `${test.score}`
  }));

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
