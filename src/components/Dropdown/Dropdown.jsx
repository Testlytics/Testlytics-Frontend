import React, { useState } from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({ label, options = [], value, onChange }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.dropdown}
      >
        <option value="">Select a role</option>
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