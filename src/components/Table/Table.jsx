import styles from "./table.module.css";

const Table = ({ title = "", columns = [], data = [] }) => {
  return (
    <div className={styles.tableContainer}>
      {/* ✅ Table Title */}
      {title && <h2 className={styles.tableTitle}>{title}</h2>} 

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

export default Table;
