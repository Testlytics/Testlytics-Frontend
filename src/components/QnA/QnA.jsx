import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // ✅ Imported icons
import styles from "./qna.module.css";

const QnA = ({
  question,
  options,
  image,
  questionNumber,
  variant = "default",
  correctOption,
  selectedOption, // ✅ New prop for selected answer
  onEdit, // ✅ New prop for editing
  onDelete, // ✅ New prop for deleting
}) => {
  // Map option index to alphabetical labels
  const getOptionLabel = (index) => String.fromCharCode(65 + index); // 65 is 'A'

  return (
    <div className={`${styles.qnaContainer} ${
      variant === "selectable" ? styles.selectableStyle : ""
    }`}>
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
                  defaultChecked={selectedOption === index}
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
      </div>

      {/* Optional Image beside the question */}
      {image && (
        <img src={image} alt="Question" className={styles.questionImage} />
      )}
    </div>
  );
};

export default QnA;
