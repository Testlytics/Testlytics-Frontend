import React, { useState, useEffect } from 'react';
import styles from './examCard.module.css';
import Button from '../Button/Button';

const ExamCard = ({ title, description, value, fetchData, buttonText, onButtonClick }) => {
  // Correctly initialize state
  const [currentValue, setCurrentValue] = useState(value);

  // Fetch data and update currentValue periodically
  useEffect(() => {
    if (fetchData) {
      const interval = setInterval(async () => {
        try {
          const newValue = await fetchData();
          setCurrentValue(newValue);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }, 5000); // Fetch data every 5 seconds

      return () => clearInterval(interval);
    }
  }, [fetchData]);

  return (
    <div className={styles['card']}>
      <h3 className={styles['title']}>{title}</h3>
      {description && <p className={styles['description']}>{description}</p>}
      <p className={styles['value']}>{currentValue}</p>

      {buttonText && (
        <Button
          text={buttonText}
          onClick={onButtonClick ? onButtonClick : () => alert('Button clicked!')}
          className={styles['card-button']}
        />
      )}    
    </div>
  );
};

export default ExamCard;