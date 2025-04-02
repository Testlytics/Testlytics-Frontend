import PropTypes from "prop-types";

const StudentDetails = ({ id, firstName, email, rank }) => {
  return (
    <div>
      <h1>{firstName}</h1>
      <h3>ID: {id}</h3>
      <h3>Email: {email}</h3>
      <h3>Rank: {rank}</h3>
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
