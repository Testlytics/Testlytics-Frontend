import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./upcomingTest.module.css";
import Heading from "../Heading/Heading";
import { testService } from "../../services/api";
 
const UpcomingTest = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [tests, setTests] = useState([]);
 
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const allTests = await testService.getAllTests();
   
        setTests(allTests);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    };
 
    fetchTests();
  }, []);
 
  const getNextDates = () => {
    const today = new Date();
    const dates = [];
 
    for (let i = startIndex; i < startIndex + 6; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split("T")[0];
 
      const matchedTest = tests.find((t) => {
        
        return t.testDate === formattedDate;
      });
 
      dates.push({
        date: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        isToday: date.toDateString() === today.toDateString(),
        test: matchedTest || null,
      });
    }
 
    return dates;
  };
 
  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 6));
  const handleNext = () => setStartIndex((prev) => prev + 6);
 
  return (
    <div className={styles.container}>
      <Heading text="Upcoming Tests" size="32px" align="left" weight="600" />
 
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrev} disabled={startIndex === 0}>
          <FaChevronLeft />
        </button>
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
            {item.test && <div className={styles.subject}>{item.test.testName}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default UpcomingTest;