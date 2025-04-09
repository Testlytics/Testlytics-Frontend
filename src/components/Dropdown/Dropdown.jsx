import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
 
const Dropdown = ({ label, options = [], defaultValue = "", onChange, error }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
 
  useEffect(() => {
    setSelectedOption(defaultValue); // update if default changes from parent
  }, [defaultValue]);
 
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onChange) onChange(value);
  };
 
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        value={selectedOption}
        onChange={handleChange}
        className={`${styles.dropdown} ${error ? styles.errorBorder : ""}`}
      >
        <option value="" disabled hidden>Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
 
export default Dropdown;