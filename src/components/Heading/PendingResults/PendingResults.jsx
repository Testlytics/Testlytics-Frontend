import React from "react";
import PropTypes from "prop-types";
import styles from "./pendingResults.module.css";

const PendingResults = ({ testName, conductedDate }) => {
  return (
    <div className={styles.container}>
      <div className={styles.testName}>{testName}</div>
      <div className={styles.date}>Conducted on: {conductedDate}</div>
    </div>
  );
};

PendingResults.propTypes = {
  testName: PropTypes.string.isRequired,
  conductedDate: PropTypes.string.isRequired,
};

export default PendingResults;
