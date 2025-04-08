import React from "react";
import styles from "./statCard.module.css";

const StatCard = ({ 
  heading, 
  value, 
  variant = "default", 
  buttonText, 
  onButtonClick, 
  icon, 
  description 
}) => {
  return (
    <div className={styles.statCard}>
      <h2 className={variant === "withIcon" ? styles.regularHeading : styles.heading}>
        {heading}
      </h2>

      {variant === "withDescription" && description && (
        <p className={styles.description}>{description}</p>
      )}

      {variant === "withIcon" && icon ? (
        <div className={styles.iconContainer}>{icon}</div>
      ) : (
        <p className={styles.value}>{value}</p>
      )}

      {variant === "withButton" && buttonText && (
        <button className={styles.outlineButton} onClick={onButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default StatCard;
