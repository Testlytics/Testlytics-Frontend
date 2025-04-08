import React from "react";
import styles from "./successModal.module.css";
import Lottie from "lottie-react";
import failureAnimation from "./failure.json";

const FailureModal = ({ message = "Something went wrong.", onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.lottieWrapper}>
          <Lottie animationData={failureAnimation} loop={true} />
        </div>
        <p className={styles.message}>{message}</p>
        <button onClick={onClose} className={styles.button}>Close
        </button>
      </div>
    </div>
  );
};

export default FailureModal;
