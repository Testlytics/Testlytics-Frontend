import React from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({ label, options = [], selected, onChange }) => {
  const handleChange = (event) => {
    const value = event.target.value;
    if (onChange) onChange(value);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        value={selected} // ✅ Fully controlled component
        onChange={handleChange}
        className={styles.dropdown}
      >
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
