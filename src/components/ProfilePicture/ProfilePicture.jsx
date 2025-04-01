import PropTypes from "prop-types";
import styles from "./profilePicture.module.css";

const ProfilePicture = ({ src, alt = "Profile Picture", size = "250px", borderRadius = "15px" }) => {
  return (
    <div
      className={styles.profileContainer}
      style={{ width: size, height: size, borderRadius }}
    >
      <img
        src={src}
        alt={alt}
        className={styles.profileImage}
        style={{ borderRadius }}
      />
    </div>
  );
};

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default ProfilePicture;
