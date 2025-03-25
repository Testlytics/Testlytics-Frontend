import PropTypes from "prop-types";
import styles from "./profilePicture.module.css";

const ProfilePicture = ({ src, alt = "Profile Picture" }) => {
  return (
    <div className={styles.profileContainer}>
      <img src={src} alt={alt} className={styles.profileImage} />
    </div>
  );
};

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default ProfilePicture;
