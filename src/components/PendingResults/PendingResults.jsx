import React from "react";
import PropTypes from "prop-types";
import styles from "./pendingResults.module.css";
import Heading from "../Heading/Heading"; // Import your Heading component

const PendingResults = ({ results = [] }) => {
  return (
    <div className={styles.container}>
      {/* Add Heading at the top */}
      <Heading text="Pending Results" size="28px" align="center" weight="600" color="white" />

      {results.length === 0 ? (
        <p className={styles.noResults}>No pending results available.</p>
      ) : (
        results.map((result, index) => (
          <div key={index} className={styles.resultBox}>
            <div className={styles.testName}>{result.testName}</div>
            <div className={styles.date}>Conducted on: {result.conductedDate}</div>
          </div>
        ))
      )}
    </div>
  );
};

PendingResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      testName: PropTypes.string.isRequired,
      conductedDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PendingResults;
