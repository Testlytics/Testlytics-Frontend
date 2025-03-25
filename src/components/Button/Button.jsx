import React from "react";
import styles from "./button.module.css";

const Button = ({ text, onClick, variant = "primary", className }) => {
  return (
    <button
      className={`${styles.button} ${
        variant === "secondary" ? styles.secondary : styles.primary
      } ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
