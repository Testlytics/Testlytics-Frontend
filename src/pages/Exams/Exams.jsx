import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './exams.module.css';
import ExamCard from '../../components/ExamCard/ExamCard';
import Navbar from '../../components/Navbar/Navbar';
import Table from "../../components/Table/Table";
import Breadcrumbs from '../../components/BreadCrumbs/BreadCrumbs';

const Exams = () => {
  const navigate = useNavigate();

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
  const tableData = [
    { "Sl No": "1", Date: "18-06-2024", Subject: "Physics","Exam Name": "Measurements",  Score: "78/100" },
    { "Sl No": "2", Date: "25-06-2024", Subject: "Chemistry","Exam Name": "Organic",  Score: "80/100" },
    { "Sl No": "3", Date: "01-03-2025", Subject: "Maths","Exam Name": "Maths Quiz",  Score: "90/100" },
  ];

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={`container-fluid ${styles.mainWrapper}`}>
        <div className="row">
          <div className={`col-lg-3 col-md-12 ${styles.sidebar}`}>
            {examsData.map((exam, index) => (
              <ExamCard
                key={index}
                title={exam.title}
                description={exam.description}
                value={exam.value}
                buttonText={exam.buttonText}
                onButtonClick={() => {
                  if (exam.title === 'Missed Exams' || exam.title === 'Upcoming Exams') {
                    navigate('/missed-upcoming');
                  } else {
                    alert(`${exam.title} button clicked!`);
                  }
                }}
              />
            ))}
          </div>

          <div className={`col-lg-9 col-md-12 ${styles.content}`}>
            <Breadcrumbs className = 'align-self-start' />
            <h1 className='align-self-center'>History</h1>
            <Table columns={tableColumns} data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exams;
