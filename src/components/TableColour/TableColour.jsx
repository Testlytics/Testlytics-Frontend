import React from "react";
import styles from "./tableColour.module.css"; // Import styles

const TableColour = ({ columnNames, data }) => {
  return (
    <div className={styles.tableContainer}>  {/* ✅ Scrollable container */}
      <table className={styles.table}>
        <thead>
          <tr>
            {columnNames.map((name, index) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Default Props
TableColour.defaultProps = {
  columnNames: ["Column 1", "Column 2", "Column 3"],
  data: [
    ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
    ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
    ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
  ],
};

export default TableColour;