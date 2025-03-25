import styles from "./rectangle.module.css";

const Rectangle = ({ leftText, rightText }) => {
  return (
    <div className={styles.rectangle}>
      <span className={styles.leftText}>{leftText}</span>
      <span className={styles.rightText}>{rightText}</span>
    </div>
  );
};

export default Rectangle;
