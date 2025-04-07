import React from "react";
import styles from "./statCard.module.css";

const StatCard = ({
  heading,
  value,
  variant = "default",
  buttonText,
  onButtonClick,
  icon,
  description,
  color = "#5A643C" // ✅ Default color for value only
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
        <p className={styles.value} style={{ color }}>{value}</p> // ✅ Color only applied here
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
