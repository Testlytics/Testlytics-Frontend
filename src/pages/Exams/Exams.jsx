import React from 'react';
import styles from './exams.module.css';
import ExamCard from '../../components/ExamCard/ExamCard';
import Navbar from '../../components/Navbar/Navbar';
import Table from "../../components/Table/Table";

const Exams = () => {
  // Sample data for 3 ExamCards
  const examsData = [
    {
      title: 'LIVE Exam',
      description: 'Measurements',
      value: '17:00 to 18:30',
      buttonText: 'Attend',
    },
    {
      title: 'Missed Exams',
      value: 'Total No : 3',
      buttonText: 'View',
    },
    {
      title: 'Upcoming Exams',
      value: 'Total No : 2',
      buttonText: 'View',
    },
  ];

  const tableColumns = ["Sl No","Date", "Subject", "Exam Name" , "Score" ];

   // Data for the Table
   const tableData = [
    { "Sl No": "1", Date: "18-06-2024", Subject: "Physics","Exam Name": "Measurements",  Score: "78/100" },
    { "Sl No": "1", Date: "25-06-2024", Subject: "Chemistry","Exam Name": "Organic",  Score: "80/100" },
    { "Sl No": "1", Date: "01-03-2025", Subject: "Maths","Exam Name": "Maths Quiz",  Score: "90/100" },
  ];

  return (

    <div className={styles['page-container']}>
        <Navbar />
   
    <div className={styles['exams-container']}>
         
      <div className={styles['sidebar']}>
        {examsData.map((exam, index) => (
          <ExamCard
            key={index}
            title={exam.title}
            description={exam.description}
            value={exam.value}
            buttonText={exam.buttonText}
            onButtonClick={() => alert(`${exam.title} button clicked!`)}
          />
        ))}
      </div>
      <div className={styles['content']}>
        <h1>History</h1>
        <Table columns={tableColumns} data={tableData} />
      </div>
    </div>
    </div>
  );
};

export default Exams;
