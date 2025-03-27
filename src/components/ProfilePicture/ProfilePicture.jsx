import PropTypes from "prop-types";
import styles from "./profilePicture.module.css";

const ProfilePicture = ({ src, alt = "Profile Picture" }) => {
  // Ensure fallback image if `src` is missing or empty
  const defaultImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const image = src?.trim() ? src : defaultImage;

  return (
    <div className={styles.profileContainer}>
      <img src={image} alt={alt} className={styles.profileImage} />
    </div>
  );
};

ProfilePicture.propTypes = {
  src: PropTypes.string, // ✅ No longer required to prevent errors
  alt: PropTypes.string,
};

export default ProfilePicture;
