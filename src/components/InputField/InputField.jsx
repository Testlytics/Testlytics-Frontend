import React from "react";
import styles from "./inputField.module.css";
 
const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  error,
}) => {
  return (
    <div className={styles.inputContainer}>
      {/* Heading */}
      <h2 className={styles.heading}>{label}</h2>
 
      {/* Input Field */}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.errorBorder : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
 
      {/* Error Message */}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
 
export default InputField;