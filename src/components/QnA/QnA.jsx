import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./qna.module.css";
import { attendTestData } from "../../data/attendTestData";
import { testService } from "../../services/api";

const QnA = ({
  variant = "selectable",
  onOptionSelect,
  testId,
  questionText,
  questionId,
  options,
  imageBase64,
  questionNumber,
  correctOption,
  selectedOption: parentSelectedOption,
  onEdit,
  onDelete
}) => {

  // Local state to manage selected option
  const [selectedOption, setSelectedOption] = useState(parentSelectedOption || null); // this is fine as long as parent gives UUID

  const [testName, setTestName] = useState("");


  useEffect(() => {
    const fetchTestName = async () => {
      try {
        const response = await testService.getTestById(testId); // Assumes GET /tests/{id}
        console.log("Test fetched:", response); 
        setTestName(response.testName);
      } catch (error) {
        console.error("Failed to fetch test name:", error);
      }
    };

    if (testId) {
      fetchTestName();
    }
  }, [testId]);

  // Map option index to alphabetical labels
  const getOptionLabel = (index) => String.fromCharCode(65 + index); // 65 is 'A'

  // Handle option selection
  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
    onOptionSelect(questionId, optionId);
  };

  // Handle clearing the selection
  const handleClearSelection = () => {
    setSelectedOption(null);
    onOptionSelect(questionNumber, null); // Notify parent that selection is cleared
  };

  return (
    <div
      className={`${styles.qnaContainer} ${
        variant === "selectable" ? styles.selectableStyle : ""
      }`}
    >
      {/* Test Title */}
      {testName && <h3 className={styles.testTitle}>{testName}</h3>}
      {/* Header with Question and Icons */}
      <div className={styles.questionWrapper}>
        {/* Question Text with Number */}
        <div className={styles.questionHeader}>
          <h2 className={styles.questionText}>
          {questionNumber && questionText ? `${questionNumber}. ${questionText}` : "Question not available"}
          </h2>
          

          {/* Icons for Editing and Deleting */}
          {variant === "editable" && (
            <div className={styles.iconContainer}>
              <FaEdit
                className={styles.icon}
                onClick={onEdit}
                title="Edit Question"
              />
              <FaTrashAlt
                className={styles.icon}
                onClick={onDelete}
                title="Delete Question"
              />
            </div>
          )}
        </div>

        {/* Options with labels, circles, highlights, or selection */}
        <div className={styles.optionsContainer}>
          {options.map((option, index) => (
            <div
              key={index}
              className={`${styles.optionWrapper} ${
                variant === "highlighted" && correctOption === index
                  ? styles.correctOption
                  : variant === "marked" && selectedOption === index
                  ? selectedOption === correctOption
                    ? styles.correctOption // ✅ Correctly selected option
                    : styles.selectedOption // ❌ Incorrectly selected option
                  : variant === "marked" &&
                    correctOption === index &&
                    selectedOption !== correctOption
                  ? styles.correctOption // ✅ Highlight correct option if marked incorrect
                  : variant === "editable" && correctOption === index
                  ? styles.correctEditableOption // ✅ Highlight correct in editable mode
                  : ""
              }`}
            >
              {/* Radio Button for Selectable Variant */}
              {variant === "selectable" ? (
                <input
                  type="radio"
                  name={`question-${questionNumber}`}
                  id={`option-${index}`}
                  className={styles.radioButton}
                  checked={selectedOption === option.optionId}
                  value={option.optionId}
                  onChange={() => handleOptionChange(option.optionId)} // Notify parent
                />
              ) : (
                // Alphabetical Label for Default or Highlighted Variant
                <span className={styles.optionLabel}>
                  {`${getOptionLabel(index)}.`}
                </span>
              )}

              {/* Option Text */}
              <label htmlFor={`option-${index}`} className={styles.optionText}>
                {option.optionText}
              </label>
            </div>
          ))}
        </div>

        {/* Clear Selection Button (Only for Selectable Variant) */}
        {variant === "selectable" && selectedOption !== null && (
          <button className={styles.clearButton} onClick={handleClearSelection}>
            Clear
          </button>
        )}
      </div>

      {/* Optional Image beside the question */}
      {imageBase64 && (
        <img src={imageBase64} alt="Question" className={styles.questionImage} />
      )}
    </div>
  );
};

export default QnA;
