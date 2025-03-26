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
      {/* Subject Details */}
      <SubjectDetails subject={subjectDetails.subject} totalExams={subjectDetails.totalExams} />

      {/* Table Component */}
      <div className={styles.tableContainer}>
        <Table columns={tableColumns} data={tableData} />
      </div>

      {/* Performance Graph, Class Toppers & Class Accuracy Graph in a Single Row */}
      <div className={styles.row}>
        {/* Performance Graph */}
        <div className={styles.graphWrapper}>
          <h2 className={styles.heading}>Performance Graph</h2>
          <LineGraph data={performanceGraphData} lines={[{ dataKey: "score", color: "#6E7C42" }]} />
        </div>

        {/* Class Toppers */}
        <div className={styles.classToppers}>
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

        {/* Class Accuracy Graph */}
        <div className={styles.graphWrapper}>
          <h2 className={styles.heading}>Class Accuracy</h2>
          <LineGraph data={classAccuracyData} lines={[{ dataKey: "accuracy", color: "#5A643C" }]} />
        </div>
      </div>
    </div>
  );
};

export default SubjectLayout;
