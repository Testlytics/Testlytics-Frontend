import React from 'react';
import InputField from '../../components/InputField/InputField';
import AddImage from '../../components/AddImage/AddImage';
import Button from '../../components/Button/Button';
import styles from './questionLayout.module.css';
import { toast } from 'react-toastify';

const QuestionLayout = ({
  question,
  setQuestion,
  options,
  setOptions,
  correctAnswerIndex,
  setCorrectAnswerIndex,
  onSave,
  onSubmit
}) => {
  const handleAddOption = () => {
    if (options.length < 8) {
      setOptions([...options, '']);
    }
  };

  const handleDeleteOption = (index) => {
    if (options.length > 4) {
      const updated = options.filter((_, i) => i !== index);
      setOptions(updated);

      if (correctAnswerIndex === index) setCorrectAnswerIndex(null);
      else if (correctAnswerIndex > index) setCorrectAnswerIndex(correctAnswerIndex - 1);
    }
  };

  const validateForm = () => {
    if (!question.trim()) {
      toast.error('Question cannot be empty');
      return false;
    }

    if (options.length < 4) {
      toast.error('At least 4 options are required');
      return false;
    }

    const hasEmptyOption = options.some(opt => !opt.trim());
    if (hasEmptyOption) {
      toast.error('All options must be filled');
      return false;
    }

    if (correctAnswerIndex === null || correctAnswerIndex === undefined) {
      toast.error('Please select the correct answer');
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave();
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Question</h1>

      <div className={styles.inputFieldsRow}>
        <InputField
          label="Question"
          placeholder="Enter Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          width='700px'
        />
        <AddImage />
      </div>

      <div className={styles.choicesHeader}>
        <h2 className={styles.choicesTitle}>Choices</h2>
        <button className={styles.addOptionButton} onClick={handleAddOption}>
          <span className={styles.plusIcon}>+</span> Add Option
        </button>
      </div>

      <div className={styles.optionFields}>
        {options.map((option, index) => (
          <div key={index} className={styles.optionWrapper}>
            <input
              type="radio"
              name="correctAnswer"
              className={styles.radioInput}
              checked={correctAnswerIndex === index}
              onChange={() => setCorrectAnswerIndex(index)}
            />

            <InputField
              label={`Option ${index + 1}`}
              placeholder="Enter option"
              value={option}
              onChange={(e) => {
                const updated = [...options];
                updated[index] = e.target.value;
                setOptions(updated);
              }}
            />

            {options.length > 4 && (
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteOption(index)}
              >
                ❌
              </button>
            )}
          </div>
        ))}
      </div>

      <p className={styles.disclaimer}>
        * Select the correct option using the radio button.
        <br className={styles.mobileBreak} />
        It will be saved as the correct answer.
      </p>

      <div className={styles.buttonContainer}>
        <Button text="Save" onClick={handleSave} />
        <Button text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default QuestionLayout;
