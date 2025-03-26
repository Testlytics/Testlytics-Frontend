import React from "react";
import styles from "./statCard.module.css";

const StatCard = ({ heading, value, variant = "default", buttonText, onButtonClick }) => {
  return (
    <div className={styles.statCard}>
      <h2 className={styles.heading}>{heading}</h2>
      <p className={styles.value}>{value}</p>

      {variant === "withButton" && buttonText && (
        <button className={styles.outlineButton} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default StatCard;
