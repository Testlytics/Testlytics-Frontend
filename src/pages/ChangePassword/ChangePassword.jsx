import { useState } from "react";
import styles from "./changePassword.module.css";
import LoginImage from "../../assets/images/Login.png";
import { authService } from "../../services/api"; // adjust path if needed

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatusMessage(""); // Clear previous status on input change
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const payload = {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        };
        const response = await authService.changePassword(payload);
        console.log("Password changed successfully:", response);
        setStatusType("success");
        setStatusMessage("Password changed successfully!");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        const errorMsg = error.response?.data || "Failed to change password. Please try again.";
        setStatusType("error");
        setStatusMessage(errorMsg);
        console.error("Error changing password:", error);
      }
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

          <button type="submit" className={styles.submitButton}>Submit</button>

          {statusMessage && (
            <p className={statusType === "success" ? styles.success : styles.error}>
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
