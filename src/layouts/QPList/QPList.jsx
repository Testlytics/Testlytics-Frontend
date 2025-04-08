// src/layouts/ClickableList/ClickableList.jsx
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // ✅ Icon for selected item
import styles from "./qpList.module.css";

const QPList = ({ title, items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    const selectedTest = items[index];
    setSelectedIndex(index);
    onSelect && onSelect(selectedTest);
  };

 


  return (
    <div className={styles.listContainer}>
      {/* Title */}
      <h2 className={styles.listTitle}>{title}</h2>

      {/* List Items */}
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li
          key={item.testId || index}
          className={`${styles.listItem} ${selectedIndex === index ? styles.selectedItem : ""}`}
            onClick={() => handleItemClick(index)}
          >
             {/* Wrap index + item text to keep them aligned to left */}
             <div className={styles.itemContent}>
              <span className={styles.index}>{index + 1}. </span>
              <span className={styles.itemText}>{item.testName || "Unnamed Test"}</span>
            </div>
            {/* Show Icon when item is clicked */}
            {selectedIndex === index && (
              <FaChevronRight className={styles.icon} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QPList;
