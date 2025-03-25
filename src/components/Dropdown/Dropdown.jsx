import React, { useState } from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({ label, options = [], defaultValue, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    if (onChange) onChange(event.target.value);
  };

  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        value={selectedOption}
        onChange={handleChange}
        className={styles.dropdown}
      >
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
