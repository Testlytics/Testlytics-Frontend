import React, { useState, useEffect, useMemo } from "react";
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
const [selectedTestId, setSelectedTestId] = useState(null);

  const location = useLocation();
const { testId } = location.state || {};


const testData = useMemo(() => {
  return [...allTests, ...completedTests]; // or whatever you're computing
}, [allTests, completedTests]); // Make sure these are stable


console.log("📦 Derived testData:", testData);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      setError(null);
      try {
        const { allTests, completedTests } = await testService.getAllTestData();
        setAllTests(allTests);
        setCompletedTests(completedTests);
        console.log("allTests:", allTests);
console.log("completedTests:", completedTests);
        
        if (testId) {
          const selected = allTests.find(t => t.testId === testId) || completedTests.find(t => t.testId === testId);
          if (selected) {
            setSelectedTestId(selected.testId);
            handleTestSelect(selected);
          }
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

      setSelectedTestId(selected.testId);
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

    if (testDetails.subjectId) {
      try {
        const subjectResponse = await subjectService.getSubjectById(testDetails.subjectId);
        subjectName = subjectResponse.data.responseBody.subjectName || "Unknown Subject";
      } catch (e) {
        console.error("Error fetching subject name:", e);
      }
    }
    const questionsResponse = await questionService.getQuestionsByTestId(testDetails.testId);
console.log("Raw Questions API response:", questionsResponse.data);

const rawQuestions = questionsResponse.data; // ✅ FIXED


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
        testId: testDetails.testId,
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
      case "editable":
        return (
        
            
            <QuestionsList
              {...selectedTest}
             
              isEditable
              variant="editable"
            />
         
        );
  
      case "evaluated":
        return (
          <QuestionsList
            {...selectedTest}
            
            isEvaluated
            variant="evaluated"
          />
        );
  
      case "default":
      default:
        return (
          <QuestionsList
            {...selectedTest}
            variant="default"
          />
        );
    }
  };
  


  

console.log("📦 Derived testData:", testData);


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
            items={testData}
            selectedTestId={selectedTestId} 
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
