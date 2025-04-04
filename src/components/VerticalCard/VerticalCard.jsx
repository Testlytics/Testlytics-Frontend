import React from "react";
import styles from "./verticalCard.module.css";

const VerticalCard = ({ heading, value, description, variant = "default" }) => {
  return (
    <div className={`${styles.verticalCard} ${variant === "withDescription" ? styles.withDescription : ""}`}>
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.value}>{value}</p>
      {variant === "withDescription" && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default VerticalCard;
