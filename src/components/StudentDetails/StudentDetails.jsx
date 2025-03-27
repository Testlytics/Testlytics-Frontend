import PropTypes from "prop-types";

const StudentDetails = ({ id, firstName, email, rank }) => {
  return (
    <div>
      <h2>{firstName}</h2>
      <p>ID: {id}</p>
      <p>Email: {email}</p>
      <p>Rank: {rank}</p>
    </div>
  );
};

StudentDetails.propTypes = {
  id: PropTypes.string.isRequired, // Ensure it matches the transformed data
  firstName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired
};

export default StudentDetails;
