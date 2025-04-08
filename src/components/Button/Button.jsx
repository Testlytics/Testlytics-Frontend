import React from "react";
import styles from "./button.module.css";

const Button = ({ text, onClick, width }) => {
  return (
    <button
      className={`${styles.button} ${styles.primary}`}
      onClick={onClick}
      style={{ width: width || "auto" }} // Default width is "auto" if not provided
    >
      {text}
    </button>
  );
};

export default Button;
