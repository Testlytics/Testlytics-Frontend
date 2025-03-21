import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ListCard from "../../components/ListCard/ListCard";
import styles from "./leftList.module.css";

const LeftList = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const students = [
    { id: "101", name: "John Doe" },
    { id: "102", name: "Jane Smith" },
    { id: "103", name: "Michael Brown" },
    { id: "104", name: "Emily Davis" },
  ];

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.includes(searchQuery)
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <SearchBar onSearch={(query) => setSearchQuery(query)} />
      <div className={styles.listContainer}>
        {filteredStudents.map((student) => (
          <ListCard
            key={student.id}
            id={student.id}
            name={student.name}
            isSelected={selectedId === student.id}
            onClick={() => setSelectedId(student.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default LeftList;
