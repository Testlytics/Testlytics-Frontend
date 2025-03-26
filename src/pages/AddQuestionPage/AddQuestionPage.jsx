import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import QuestionLayout from '../../layouts/QuestionLayout/QuestionLayout';
import styles from './addQuestionPage.module.css';

const AddQuestionPage = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Navbar */}
      <Navbar />

      <div className={styles.contentContainer}>
        {/* Left Section - White Background */}
        <div className={styles.leftSection}>
          <FormLayout />
        </div>

        {/* Right Section - 1024px, Background: #F3F5ED */}
        <div className={styles.rightSection}>
          <QuestionLayout />
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
