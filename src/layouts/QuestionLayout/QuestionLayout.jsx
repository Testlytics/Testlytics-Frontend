import React, { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import AddImage from '../../components/AddImage/AddImage';
import Button from '../../components/Button/Button';  
import styles from './questionLayout.module.css';

const QuestionLayout = () => {
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
  const [questionNo, setQuestionNo] = useState('');
  const [question, setQuestion] = useState('');

  const handleAddOption = () => {
    if (options.length < 8) {
      setOptions([...options, '']);
    }
  };

  const handleDeleteOption = (index) => {
    if (options.length > 4) {
      setOptions(options.filter((_, i) => i !== index));
      if (correctAnswerIndex === index) {
        setCorrectAnswerIndex(null); // Reset if the correct one was deleted
      } else if (correctAnswerIndex > index) {
        setCorrectAnswerIndex(correctAnswerIndex - 1); // Shift index
      }
    }
  };

  const handleSave = () => {
    console.log('Save clicked');
    console.log({
      questionNo,
      question,
      options,
      correctAnswer: options[correctAnswerIndex]
    });
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
    console.log({
      questionNo,
      question,
      options,
      correctAnswer: options[correctAnswerIndex]
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Question</h1>

      <div className={styles.inputFieldsRow}>
        <InputField label="Question No" placeholder="Enter Question Number" value={questionNo} onChange={(e) => setQuestionNo(e.target.value)} />
        <InputField label="Question" placeholder="Enter Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
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
            {/* Radio Button to Select Correct Answer */}
            <input
              type="radio"
              name="correctAnswer"
              className={styles.radioInput}
              checked={correctAnswerIndex === index}
              onChange={() => setCorrectAnswerIndex(index)}
            />

            {/* Option Input */}
            <InputField 
              label={`Option ${index + 1}`} 
              placeholder="Enter option" 
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
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

      <div className={styles.buttonContainer}>
        <Button text="Save" onClick={handleSave} />
        <Button text="Submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default QuestionLayout;
