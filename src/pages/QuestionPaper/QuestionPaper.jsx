import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ✅ Import useParams
import QPList from "../../layouts/QPList/QPList";
import QuestionsList from "../../layouts/QuestionsList/QuestionsList";
import styles from "./questionPaper.module.css";
// import Button from "../../components/Button/Button";
// import { defaultTestData, editableTestData, evaluatedTestData } from "../../data/testData"
import Navbar from '../../components/Navbar/Navbar';

const QuestionPaper = () => {
  const { variant } = useParams(); // ✅ Get the variant from the route
  const [selectedTest, setSelectedTest] = useState(null);
  const [testData, setTestData] = useState([]); // ✅ Store test data based on the variant
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await testService.getTestsByVariant(variant);
        setTestData(data);
      } catch (err) {
        setError(err.message || "Failed to load tests");
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [variant]);

  // Fetch correct test data based on variant
  // useEffect(() => {
  //   switch (variant) {
  //     case "default":
  //       setTestData(defaultTestData);
  //       break;
  //     case "editable":
  //       setTestData(editableTestData);
  //       break;
  //     case "evaluated":
  //       setTestData(evaluatedTestData);
  //       break;
  //     default:
  //       setTestData([]); // Handle unexpected cases
  //   }
  // }, [variant]);

  const handleTestSelect = (testName) => {
    const test = testData.find((t) => t.testName === testName);
    console.log("Selected Test:", test);
    setSelectedTest(test);
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

    switch (variant) {
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
          <QPList
            title="QP List"
            items={testData.map((t) => t.testName)}
            onSelect={handleTestSelect}
          />
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
