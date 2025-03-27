import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./upcomingTest.module.css";

const UpcomingTest = ({ tests = [] }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Function to generate the next 6 days
  const getNextDates = () => {
    const today = new Date();
    const dates = [];

    for (let i = startIndex; i < startIndex + 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0]; // Format as YYYY-MM-DD

      dates.push({
        date: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }), // e.g., Jan, Feb
        day: date.toLocaleDateString("en-US", { weekday: "short" }), // e.g., Mon, Tue
        isToday: date.toDateString() === today.toDateString(), // Check if it's today
        test: tests.find((t) => t.date === formattedDate) || null,
      });
    }
    return dates;
  };

  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 6));
  const handleNext = () => setStartIndex((prev) => prev + 6);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrev} disabled={startIndex === 0}>
          <FaChevronLeft />
        </button>
        <h3 className={styles.heading}>Upcoming Tests</h3>
        <button className={styles.navButton} onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.grid}>
        {getNextDates().map((item, index) => (
          <div
            key={index}
            className={`${styles.box} 
              ${item.test ? styles.testDay : ""} 
              ${item.isToday ? styles.today : ""}`}
          >
            <div className={styles.date}>{item.date}</div>
            <div className={styles.month}>{item.month}</div>
            <div className={styles.day}>{item.day}</div>
            {item.test && <div className={styles.subject}>{item.test.subject}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTest;
