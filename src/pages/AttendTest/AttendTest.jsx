import React, { useState, useEffect } from "react";
import QnA from "../../components/QnA/QnA";
import AttendQuestions from "../../layouts/AttendQuestions/AttendQuestions";
import styles from "./attendTest.module.css";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { questionService, testService } from "../../services/api";
import { outcomeService, testAttemptService } from "../../services/api";
import { useNavigate } from 'react-router-dom';

import SubmitModal from "../../components/SubmitModal/SubmitModal";




const AttendTest = () => {
  const [questions, setQuestions] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [testDuration, setTestDuration] = useState(null);
const [testName, setTestName] = useState(null);
const [selectedOptions, setSelectedOptions] = useState({});
const [showModal, setShowModal] = useState(false);
const [queryText, setQueryText] = useState("");

const navigate = useNavigate();


  console.log("AttendTest Component Rendered");
  const location = useLocation();
  

  const { testId } = useParams();

  console.log("Fetched testId from URL:", testId); 

// ✅ DEBUG

  // State to track selected questions
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());

  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await testService.getTestById(testId);
        console.log("testService.getTestById response:", response);
        const { testName } = response.data.responseBody;
        const { testDuration } = response.data.responseBody;
        setTestName(testName);
        console.log("Test Name:", testName);  
        setTestDuration(testDuration); // ✅ Set the test duration (in minutes)
        console.log("Fetched testDuration:", testDuration);
      } catch (err) {
        console.error("Failed to fetch test duration", err);
      }
    };
  
    if (testId) {
      fetchTestDetails();
    }
  }, [testId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await questionService.getQuestionsByTestId(testId);
        console.log("questionService.getQuestionsByTestId response:", response);

        const rawQuestions = response?.data;
        if (Array.isArray(rawQuestions)) {
          // Format each question to match structure used in AddQuestionPage
          const formattedQuestions = rawQuestions.map((q) => ({
            questionId: q.questionId,
            questionText: q.questionText,
            answer: q.answer,
            imageBase64: q.imageBase64 || null,
            options: (q.options || []).map((opt) => ({
              optionId: opt.optionId,
              optionText: opt.optionText,
              correct: opt.correct,
            })),
          }));
          console.log("formatted data :", formattedQuestions)
          setQuestions(formattedQuestions);
        } else {
          throw new Error("Invalid question format from server");
        }
      } catch (err) {
        console.error("Failed to fetch questions", err);
        setError("Could not load questions.");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };
  
    if (testId) fetchQuestions();
  }, [testId]);
  
  // Handle option selection and clearing
  const handleOptionSelect = (questionId, selectedOptionId) => {
    setSelectedQuestions((prev) => {
      const updated = new Set(prev);

      if (selectedOptionId === null) updated.delete(questionId); 
        else updated.add(questionId);
      

      return updated;
    });
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: selectedOptionId,
    }));
  };


  const handleFinalSubmit = async (queryInput) => {
    const userId = localStorage.getItem("userId");
  
    if (!userId || !testId) {
      alert("Missing user or test information.");
      return;
    }
  
    const outcomesPayload = questions.map((q) => {
      const selectedOptionId = selectedOptions[q.questionId];
      if (!selectedOptionId) return null;
      return {
        questionId: q.questionId,
        userId: userId,
        selectedOptionId,
      };
    }).filter(Boolean);
  
    if (outcomesPayload.length === 0) {
      alert("You have not answered any questions.");
      return;
    }
  
    try {
      await outcomeService.addOutcome(testId, { outcomes: outcomesPayload });
      console.log("✅ Outcomes submitted");
  
      await testAttemptService.submitTest(testId, userId,  queryInput );
      console.log("✅ Test attempt submitted");
  
      setShowModal(false);

      navigate("/studentexam");

      // Optional: redirect or show success
    } catch (error) {
      console.error("❌ Error during submission", error);
      alert("Submission failed. Try again.");
    }
  };
  
  


  // const handleSubmit = async () => {
    
  //   console.log("🔔 handleSubmit in AttendTest triggered!");
  //     const userId = localStorage.getItem("userId"); // Or get it from context/state
  //     console.log("Submit called with userId:", userId, "testId:", testId);
  //     if (!userId || !testId) {
  //       alert("Missing user or test information.");
  //       return;
  //     }
  //   try {
  //     console.log("blah2");
  //     const outcomesPayload = questions.map((q, index) => {
  //       const selectedOptionId = selectedOptions[q.questionId];
  //       if (!selectedOptionId) return null;
  //       return {
  //         questionId: q.questionId,
  //         userId: userId,
  //         selectedOptionId,
  //       };
  //     })
  //     .filter(Boolean); // removes null entries

  //     console.log("outcomes :", outcomesPayload);

  //     if (outcomesPayload.length === 0) {
  //       alert("You have not answered any questions.");
  //       return;
  //     }
  
  //     try {
  //       await outcomeService.addOutcome(testId, { outcomes: outcomesPayload });
  //       console.log("Outcomes submitted successfully");
  //     } catch (err) {
  //       console.error("❌ Outcome submission failed", err);
  //       alert("Could not submit outcomes");
  //       return;
  //     }
  //     // 2️⃣ Submit test attempt
  //     try {
  //       console.log("blah");
  //       await testAttemptService.submitTest(testId, userId, { query: "too tough" });
  //       console.log("Test attempt submitted");
  //     } catch (err) {
  //       console.error("❌ Test attempt submission failed", err);
  //       alert("Could not submit attempt");
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error during submission:", error);
  //     alert("Submission failed. Try again.");
  //   }
  // };

  return (
    <div className={styles.container}>
       <h1 className={styles.heading}>{testName}</h1> 
       {/* <h1 className={styles.heading}>Static Test Name</h1> */}


      {/* Layout */}
      <div className={styles.contentWrapper}>
        {/* Left Section - QnA */}
        <div className={styles.qnaSection}>
        {loading || typeof testDuration !== "number"? (
    <p>Loading test details...</p>
  ) : error ? (
    <p>{error}</p>
  ) : Array.isArray(questions) && questions.length > 0 ? (
    questions.map((questionData, index) => (
      <QnA 
        key={index} 
        questionNumber={index + 1} 
        testId={testId}   
        {...questionData} 
        onOptionSelect={handleOptionSelect} 
      />
    ))
  ) : (
    <p>No questions available.</p>
  )}
        </div>

        {/* Right Section - AttendQuestions */}
        <div className={styles.attendQuestionsSection}>
        {typeof testDuration === "number" && testDuration > 0 && (
          <AttendQuestions 
            totalQuestions={questions.length} 
            highlightedQuestions={selectedQuestions} 
            timeLimit={testDuration}
            onSubmit={() => setShowModal(true)}

          />
        )}
        </div>
      </div>
      {showModal && (
  <SubmitModal 
    onConfirm={(queryFromModal) => {
      setQueryText(queryFromModal); // Save query to state if needed elsewhere
      handleFinalSubmit(queryFromModal); // Pass query into final handler
    }}
    onCancel={() => setShowModal(false)}
  />
)}


    </div>
  );
};

export default AttendTest;
