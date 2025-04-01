import React from 'react';
import InputField from '../../components/InputField/InputField';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './formLayout.module.css';

const FormLayout = () => {
  return (
    <div className={styles.container}>
      <h1 className='head'>Add Exam</h1>
      <div className="inputs"></div>
      <InputField label="Test Name" placeholder="Enter name" />

      <Dropdown label="Subject" options={["Option 1", "Option 2", "Option 3"]} />
      <Dropdown label="Test Duration" options={["30 minutes", "1 hour", "1 hour 30 mins","2 hours", "3 hours"]} />
      
      <div className={styles.timeInputs}>
        <label htmlFor="startTime" className={styles.label}>Start Time</label>
        <input
          type="time"
          id="startTime"
          name="startTime"
          className={styles.inputField}
        />
        
        <label htmlFor="endTime" className={styles.label}>End Time</label>
        <input
          type="time"
          id="endTime"
          name="endTime"
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

export default FormLayout;
