import styles from "./button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button className={`${styles.button} ${styles.primary}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
