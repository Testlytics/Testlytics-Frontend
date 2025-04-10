import { useState } from "react";
import styles from "./changePassword.module.css";
import LoginImage from "../../assets/images/Login.png";
import { authService } from "../../services/api";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import FailureModal from "../../components/SuccessModal/FailureModal";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatusMessage("");
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.currentPassword) tempErrors.currentPassword = "Current Password is required";
    if (!formData.newPassword) tempErrors.newPassword = "New Password is required";
    if (!formData.confirmPassword) tempErrors.confirmPassword = "Confirm Password is required";
    if (
      formData.newPassword &&
      formData.confirmPassword &&
      formData.newPassword !== formData.confirmPassword
    ) {
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
        setShowSuccessModal(true);

        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });

        // Auto-logout after 2 seconds
        setTimeout(() => {
          localStorage.removeItem("token"); // Adjust if your token key is different
          navigate("/login");
        }, 2000);
      } catch (error) {
        const errorMsg =
          error.response?.data || "Failed to change password. Please try again.";
        setStatusType("error");
        setStatusMessage(errorMsg);
        setShowFailureModal(true);
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

      {/* Modals */}
      {showSuccessModal && (
        <SuccessModal
          message="Password changed successfully!"
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      {showFailureModal && (
        <FailureModal
          message={statusMessage}
          onClose={() => setShowFailureModal(false)}
        />
      )}
    </div>
  );
};

export default ChangePassword;
