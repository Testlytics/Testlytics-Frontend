import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import QPList from "../../layouts/QPList/QPList";
import QuestionsList from "../../layouts/QuestionsList/QuestionsList";
import styles from "./questionPaper.module.css";
// import Button from "../../components/Button/Button";
// import { defaultTestData, editableTestData, evaluatedTestData } from "../../data/testData"
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from "react-router-dom";
import { testService, questionService, subjectService } from "../../services/api";



const QuestionPaper = () => {
//  const { variant } = useParams(); // ✅ Get the variant from the route
const [selectedVariant, setSelectedVariant] = useState("default");
  
const [selectedTest, setSelectedTest] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allTests, setAllTests] = useState([]);
const [completedTests, setCompletedTests] = useState([]);

  const location = useLocation();
const { testId } = location.state || {};

 const testData = [...allTests, ...completedTests];


  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      setError(null);
      try {
        const { allTests, completedTests } = await testService.getAllTestData();
        setAllTests(allTests);
        setCompletedTests(completedTests);
        
        if (testId) {
          const selected = allTests.find(t => t.testId === testId);
          setSelectedTest(selected || null);
        }
      } catch (err) {
        setError(err.message || "Failed to load tests");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [testId]);


  const handleTestSelect = async (selected) => {
    try {
      console.log("Selected Test ID:", selected.testId);
      console.log("Selected test object:", selected);

       // 1. Fetch full test details using testId
    const testDetailsResponse = await testService.getTestById(selected.testId);
    const testDetails = testDetailsResponse.data.responseBody;
    console.log("Full test details:", testDetails);

    // Determine variant based on status
const variant =
testDetails.status === "scheduled" ? "editable" : "default";
setSelectedVariant(variant);

console.log("Auto-selected variant:", variant);
    let subjectName = "Unknown Subject";

    if (!testDetails || !testDetails.subjectId) {
      console.warn("Subject ID is missing from test details:", testDetails);
    } else {
      try {
        const subjectResponse = await subjectService.getSubjectById(testDetails.subjectId);
        console.log("Subject API response:", subjectResponse.data);
        subjectName = subjectResponse.data.responseBody.subjectName || "Unknown Subject";

        console.log("Resolved subject name:", subjectName);
      } catch (e) {
        console.error("Error fetching subject name:", e);
      }
    }
    const questionsResponse = await questionService.getQuestionsByTestId(testDetails.testId);
console.log("Raw Questions API response:", questionsResponse);

const rawQuestions = questionsResponse.responseBody; // ✅ FIXED


const formattedQuestions = rawQuestions.map((question, index) => ({
  id: question.questionId,
  text: question.questionText,
  answer: question.answer,
  options: question.options.map((opt) => ({
    id: opt.optionId,
    text: opt.optionText,
    correct: opt.correct,
  })),
  image: question.imageBase64,
  
}));
      const testWithQuestions = {
        subjectName,
        testName: testDetails.testName,
        totalQuestions: formattedQuestions.length,
        totalMarks: formattedQuestions.length * 1, // 1 mark per Q or use actual marks
        duration: testDetails.testDuration,
      questions: formattedQuestions,
      };
  
      setSelectedTest(testWithQuestions);
    } catch (err) {
      console.error("Failed to load questions:", err);
      alert("Failed to load questions for this test.");
    }
  };
  

  const handleDownload = () => {
    alert("Question paper downloaded successfully");
  };

  const handleSave = () => {
    alert("Question paper saved successfully");
  };

  const handleAddQuestion = () => {
    alert("Question added successfully");
  };

  const renderQuestionsList = () => {
    if (!selectedTest) return null;

    switch (selectedVariant) {
      case "default":
        return (
          <>
            <QuestionsList {...selectedTest} />
           
          </>
        );

      case "editable":
        return (
          <>
            <button className={styles.addquestion} onClick={handleAddQuestion}>
              Add Question
            </button>
            
            <QuestionsList {...selectedTest} isEditable />
           
          </>
        );

      case "evaluated":
        return <QuestionsList {...selectedTest} isEvaluated />;

      default:
        return <QuestionsList {...selectedTest} />;
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar/>
      {/* Sidebar - QPList */}
      <div className={styles.sidebar}>
      {loading ? (
          <p>Loading tests...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : testData.length > 0 ? (
          <>
          {console.log("testData passed to QPList:", testData)}
          <QPList
            title="QP List"
            items={testData.map((t) => ({
              testName: t.testName,
              testId: t.testId,
              subjectName: t.subjectName,
              testDuration: t.testDuration,
            }))}

            onSelect={handleTestSelect}
                   />
                    </>
        ) : (
          <p>No tests available</p>
        )}
      </div>

      {/* Main Content - Questions List */}
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Question Paper</h1>
        {selectedTest ? renderQuestionsList() : <p>Please select a test.</p>}
      </div>
    </div>
  );
};

export default QuestionPaper;
