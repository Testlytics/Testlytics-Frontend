import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import styles from "./qna.module.css";
import { attendTestData } from "../../data/attendTestData";

const QnA = ({ variant = "selectable", onOptionSelect, ...props }) => {
  // Load data from attendTestData based on variant
  const data = attendTestData[variant] || {};

  // Merge props with default data (props override default test data)
  const {
    question,
    options,
    image,
    questionNumber,
    correctOption,
    selectedOption: parentSelectedOption,
    onEdit,
    onDelete,
  } = { ...data, ...props };

  // Local state to manage selected option
  const [selectedOption, setSelectedOption] = useState(parentSelectedOption || null);

  // Map option index to alphabetical labels
  const getOptionLabel = (index) => String.fromCharCode(65 + index); // 65 is 'A'

  // Handle option selection
  const handleOptionChange = (index) => {
    setSelectedOption(index);
    onOptionSelect(questionNumber, index);
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
      {/* Header with Question and Icons */}
      <div className={styles.questionWrapper}>
        {/* Question Text with Number */}
        <div className={styles.questionHeader}>
          <h2 className={styles.questionText}>
            {questionNumber}. {question}
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
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)} // Notify parent
                />
              ) : (
                // Alphabetical Label for Default or Highlighted Variant
                <span className={styles.optionLabel}>
                  {`${getOptionLabel(index)}.`}
                </span>
              )}

              {/* Option Text */}
              <label htmlFor={`option-${index}`} className={styles.optionText}>
                {option}
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
      {image && (
        <img src={image} alt="Question" className={styles.questionImage} />
      )}
    </div>
  );
};

export default QnA;
