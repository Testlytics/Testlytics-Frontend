import PropTypes from "prop-types";
import styles from "./studentDetails.module.css";

const StudentDetails = ({ firstName, id, rank }) => {
  return (
    <div className={styles.studentContainer}>
      <p className={styles.text}>Name: {firstName}</p>
      <p className={styles.text}>ID: {id}</p>
      <p className={styles.text}>Rank: {rank}</p>
    </div>
  );
};

StudentDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
};

export default StudentDetails;
