import React from 'react';
import styles from './viewButton.module.css';

const ViewButton = ({ text, onClick, type = 'button', variant = 'primary' }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ViewButton;