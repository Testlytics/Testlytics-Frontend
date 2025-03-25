import React from "react";
import styles from "./inputField.module.css";

const InputField = ({ label, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      {/* Heading */}
      <h2 className={styles.heading}>{label}</h2>

      {/* Input Field */}
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
