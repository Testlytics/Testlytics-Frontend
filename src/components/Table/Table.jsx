import styles from "./table.module.css";

const Table = ({ columns, data }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th> // Column headers
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col]}</td> // Dynamically filling data
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;