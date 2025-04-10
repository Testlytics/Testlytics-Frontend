// src/layouts/ClickableList/ClickableList.jsx
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa"; // ✅ Icon for selected item
import styles from "./qpList.module.css";

const QPList = ({ title, items, onSelect, selectedTestId }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleItemClick = (index) => {
    const selectedTest = items[index];
    
    onSelect && onSelect(selectedTest);
  };
  console.log("QPList rendered");
  console.log("QPList items:", items);



  return (
    <div className={styles.listContainer}>
      {/* Title */}
      <h2 className={styles.listTitle}>{title}</h2>

      {!items || items.length === 0 ? (
  <p>No tests found.</p>
) : (
  <ul className={styles.list}>
    {items.map((item, index) => (
      <li
        key={item.testId || index}
        className={`${styles.listItem} ${
          selectedTestId === item.testId ? styles.selectedItem : ""
        }`}
        onClick={() => handleItemClick(index)}
      >
        <div className={styles.itemContent}>
          <span className={styles.index}>{index + 1}. </span>
          <span className={styles.itemText}>{item.testName || "Unnamed Test"}</span>
        </div>
        {selectedTestId === item.testId && (
          <FaChevronRight className={styles.icon} />
        )}
      </li>
    ))}
  </ul>
)}

    </div>
  );
};

export default QPList;
