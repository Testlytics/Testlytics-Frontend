// src/layouts/ClickableList/ClickableList.jsx
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // ✅ Icon for selected item
import styles from "./qpList.module.css";

const QPList = ({ title, items, onSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Handle item click
  const handleItemClick = (index) => {
    const selectedTestName = items[index];
    setSelectedIndex(index);
    onSelect(selectedTestName);
  };

  return (
    <div className={styles.listContainer}>
      {/* Title */}
      <h2 className={styles.listTitle}>{title}</h2>

      {/* List Items */}
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li
            key={index}
            className={`${styles.listItem} ${
              selectedIndex === index ? styles.selectedItem : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
             {/* Wrap index + item text to keep them aligned to left */}
             <div className={styles.itemContent}>
              <span className={styles.index}>{index + 1}. </span>
              <span className={styles.itemText}>{item}</span>
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
