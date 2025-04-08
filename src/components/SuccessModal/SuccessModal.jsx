import React from 'react';
import Lottie from 'lottie-react';
import styles from './successModal.module.css';
import animationData from './success.json';

const SuccessModal = ({ onClose, message = 'Action completed successfully!' }) => {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.lottie}>
          <Lottie animationData={animationData} loop={true} />
        </div>
        <h2 className={styles.message}>{message}</h2>
        <button onClick={onClose} className={styles.button}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
