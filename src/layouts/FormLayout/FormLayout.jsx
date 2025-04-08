import React, { useEffect, useState } from 'react';

import InputField from '../../components/InputField/InputField';
import Dropdown from '../../components/Dropdown/Dropdown';
import styles from './formLayout.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subjectService } from '../../services/api';
import SuccessModal from '../../components/SuccessModal/SuccessModal';

const FormLayout = ({ testData, setTestData, onSave }) => {
  const [subjects, setSubjects] = useState([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setTestData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await subjectService.getAllSubjects();
        setSubjects(data.map(s => s.subjectName));
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleSave = async () => {
    const success = await onSave();
    if (success) {
      setIsSuccessModalOpen(true);
      setTimeout(() => setIsSuccessModalOpen(false), 3000);

      // Optional: reset form
      setTestData({
        testName: "",
        subjectName: "",
        testDuration: "",
        startTime: "",
        endTime: "",
        testDate: null,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className='head'>Add Exam</h1>
        <button className={styles.saveButton} onClick={handleSave}>Save</button>
      </div>

      <InputField
        label="Test Name"
        placeholder="Enter name"
        value={testData.testName}
        onChange={(e) => handleChange("testName", e.target.value)}
      />

      <Dropdown
        label="Subject"
        options={subjects}
        selected={testData.subjectName}
        onChange={(value) => handleChange("subjectName", value)}
      />

      <Dropdown
        label="Test Duration (min)"
        options={["30", "60", "90", "120", "180"]}
        selected={testData.testDuration}
        onChange={(value) => {
          console.log("🌀 Selected duration:", value);
          handleChange("testDuration", value);
        }}
      />

      <div className={styles.timeInputs}>
        <div className={styles.timeInputGroup}>
          <label htmlFor="startTime" className={styles.label}>Start Time</label>
          <input
            type="time"
            id="startTime"
            value={testData.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.timeInputGroup}>
          <label htmlFor="endTime" className={styles.label}>End Time</label>
          <input
            type="time"
            id="endTime"
            value={testData.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
            className={styles.inputField}
            required
          />
        </div>

        <div className={styles.datePicker}>
          <label className={styles.label}>Test Date</label>
          <DatePicker
            selected={testData.testDate}
            onChange={date => handleChange('testDate', date)}
            dateFormat="yyyy-MM-dd"
            className={styles.inputField}
          />
        </div>
      </div>

      {isSuccessModalOpen && (
        <SuccessModal message="Test created successfully!" onClose={() => setIsSuccessModalOpen(false)} />
      )}
    </div>
  );
};

export default FormLayout;
