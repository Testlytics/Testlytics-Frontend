// src/pages/QPandQuestionsPage.jsx
import React, { useState } from "react";
import QPList from "../../layouts/QPList/QPList";
import QuestionsList from "../../layouts/QuestionsList/QuestionsList";
import styles from "./questionPaper.module.css";
import Button from "../../components/Button/Button"; 
import Navbar from '../../components/Navbar/Navbar';

const QuestionPaper = () => {
  // State to manage selected item from QPList
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sample data for demonstration (can be fetched dynamically later)
  const qpItems = ["JavaScript", "Python", "Java", "C++", "Ruby"];

  const handleSubmit = () => {
    alert("Question Paper Submitted!");
  };

  // Handle item click in QPList
  const handleQPClick = (index) => {
    setSelectedIndex(index);
  };

  return (

    <div className={styles.container}>
      {/* Navbar Component */}
      <Navbar />

    <div className={styles.pageContainer}>
      {/* Sidebar with QPList */}
      <div className={styles.sidebar}>
        <QPList title="QP List" items={qpItems} onItemClick={handleQPClick} />
      </div>

      {/* Main content with QuestionsList */}
      <div className={styles.content}>
        <h1 className={styles.pageTitle}>Question Paper</h1>

        <div className={styles.questionWrapper}>

            {/* Load QuestionsList with variant="default" */}
            <QuestionsList variant="default" selectedIndex={selectedIndex} />
        </div>
        <Button
          label="Download"
          onClick={handleSubmit}
          variant="primary"
          text="Download"
          className={styles.Button}
        />
      </div>
    </div>
    </div>
  );
};

export default QuestionPaper;
