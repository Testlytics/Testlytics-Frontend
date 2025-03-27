import React from "react";
import SubjectDetails from "../../components/SubjectDetails/SubjectDetails";
import Table from "../../components/Table/Table";
import LineGraph from "../../components/LineGraph/LineGraph";
import styles from "./subjectLayout.module.css";

const SubjectLayout = ({
  subjectDetails = { subject: "Unknown", totalExams: 0 },
  tableColumns = [],
  tableData = [],
  performanceGraphData = [],
  classAccuracyData = [],
  classToppers = [],
}) => {
  return (
    <div className={styles.container}>
      {/* First Row: Subject Details, Class Toppers, Performance Graph */}
      <div className={styles.firstRow}>
        <div className={`${styles.box} ${styles.details}`}>
          <SubjectDetails subject={subjectDetails.subject} totalExams={subjectDetails.totalExams} />
        </div>

        <div className={`${styles.box} ${styles.classToppers}`}>
          <h2 className={styles.heading}>Class Toppers</h2>
          <ul className={styles.topperList}>
            {classToppers.length > 0 ? (
              classToppers.map((topper, index) => (
                <li key={index}>
                  {index + 1}. {topper}
                </li>
              ))
            ) : (
              <li>No toppers available</li>
            )}
          </ul>
        </div>

        <div className={styles.graphWrapper}>
          <h2 className={styles.heading}>Performance Graph</h2>
          <LineGraph data={performanceGraphData} lines={[{ dataKey: "score", color: "#6E7C42" }]} />
        </div>
      </div>

      {/* Second Row: Table + Class Accuracy Graph */}
      <div className={styles.secondRow}>
        <div className={styles.tableContainer}>
          <Table columns={["Student ID", "Student", "Test 1", "Test 2", "Test 3"]} data={tableData} />
        </div>

        <div className={styles.graphWrapper}>
          <h2 className={styles.heading}>Class Accuracy</h2>
          <LineGraph data={classAccuracyData} lines={[{ dataKey: "accuracy", color: "#5A643C" }]} />
        </div>
      </div>
    </div>
  );
};

export default SubjectLayout;
