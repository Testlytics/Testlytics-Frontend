import styles from "./rectangle.module.css";

const Rectangle = ({ leftText, rightText, centerText }) => {
  return (
    <div className={`${styles.rectangle} ${centerText ? styles.center : ""}`}>
      {centerText ? (
        <span className={styles.centerText}>{centerText}</span>
      ) : (
        <>
          <span className={styles.leftText}>{leftText}</span>
          <span className={styles.rightText}>{rightText}</span>
        </>
      )}
    </div>
  );
};

export default Rectangle;
