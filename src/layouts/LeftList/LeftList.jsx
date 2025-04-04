import { useState, useMemo } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListCard from "../../components/ListCard/ListCard";
import styles from "./leftList.module.css";
 
const LeftList = ({ title, data = [], onItemClick, selectedItemId, itemKey, itemLabel }) => {
  const [searchQuery, setSearchQuery] = useState("");

  

  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data.filter((item) => {
      const key = item[itemKey]?.toString().toLowerCase() || "";
      const label = item[itemLabel]?.toString().toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return key.includes(query) || label.includes(query);
    });
  }, [data, searchQuery, itemKey, itemLabel]);
 
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <SearchBar onSearch={setSearchQuery} />
      <div className={styles.listContainer}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <ListCard
              key={item[itemKey]}
              id={item[itemKey]}
              name={item[itemLabel]}
              isSelected={selectedItemId === item[itemKey]}
              onClick={() => onItemClick(item)}
            />
          ))
        ) : (
          <p className={styles.noResults}>No matching results</p>
        )}
      </div>
    </div>
  );
};
 
 
export default LeftList;
 