import styles from "./table.module.css";

const Table = ({ columns = [], data = [] }) => {
  return (
    <div className={styles.tableContainer}>
      {columns.length === 0 || data.length === 0 ? (
        <p className={styles.noDataMessage}>No data available</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col] ?? "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// ✅ Make sure this is present
export default Table;
