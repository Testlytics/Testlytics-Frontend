import { useState } from "react";
import styles from "./changePassword.module.css";
import LoginImage from "../../assets/images/Login.png";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.currentPassword) tempErrors.currentPassword = "Current Password is required";
    if (!formData.newPassword) tempErrors.newPassword = "New Password is required";
    if (!formData.confirmPassword) tempErrors.confirmPassword = "Confirm Password is required";
    if (formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Password Change Request: ", formData);
      // Add your password change logic here
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Section - Image */}
      <div className={styles.imageContainer}>
        <img src={LoginImage} alt="Placeholder" />
      </div>

      {/* Right Section - Form */}
      <div className={styles.changePasswordBox}>
        <h1 className={styles.title}>Testlytics</h1>
        <h2 className={styles.subTitle}>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              className={styles.inputBox}
              value={formData.currentPassword}
              onChange={handleChange}
            />
            {errors.currentPassword && <p className={styles.error}>{errors.currentPassword}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>New Password</label>
            <input
              type="password"
              name="newPassword"
              className={styles.inputBox}
              value={formData.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && <p className={styles.error}>{errors.newPassword}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={styles.inputBox}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>

          
        </form>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </div>
    </div>
  );
};

export default ChangePassword;
