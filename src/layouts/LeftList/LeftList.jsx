import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListCard from "../../components/ListCard/ListCard";
import styles from "./leftList.module.css";

const LeftList = ({ title, data, onItemClick, selectedItemId, itemKey, itemLabel }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Filter items based on search query (Supports any data type)
  const filteredData = data.filter((item) =>
    item[itemLabel].toLowerCase().includes(searchQuery.toLowerCase()) ||
    item[itemKey].toString().includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <div className={styles.listContainer}>
        {filteredData.map((item) => (
          <ListCard
            key={item[itemKey]}
            id={item[itemKey]}
            name={item[itemLabel]}
            isSelected={selectedItemId === item[itemKey]} // ✅ Highlight selected item
            onClick={() => onItemClick(item)} // ✅ Pass selected item
          />
        ))}
      </div>
    </div>
  );
};

export default LeftList;
