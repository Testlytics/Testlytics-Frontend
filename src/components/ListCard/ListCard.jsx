import styles from "./listCard.module.css";

const ListCard = ({ id, name, isSelected, onClick }) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <span className={styles.name}>
       {name} 
      </span>
      <span className={`${styles.arrow} ${isSelected ? styles.arrowSelected : ""}`}>
        &#10132;
      </span>
    </div>
  );
};

export default ListCard;
