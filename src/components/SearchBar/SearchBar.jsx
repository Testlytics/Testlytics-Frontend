import { useState } from "react";
import { Search } from "lucide-react"; // Importing the search icon
import styles from "./searchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>
        <Search size={30} className={styles.icon} /> {/* Search Icon */}
      </button>
    </div>
  );
};

export default SearchBar;