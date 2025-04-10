import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./upcomingTest.module.css";
import Heading from "../Heading/Heading";
import { testService } from "../../services/api";
import TestModal from "./TestModal"; // You'll create this next

const UpcomingTest = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [tests, setTests] = useState([]);
  const [selectedDateTests, setSelectedDateTests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      const matchedTests = tests.filter((t) => t.testDate === formattedDate);

      dates.push({
        date: date.getDate(),
        fullDate: formattedDate,
        month: date.toLocaleDateString("en-US", { month: "short" }),
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        isToday: date.toDateString() === today.toDateString(),
        testsOnDate: matchedTests,
      });
    }

    return dates;
  };

  const handlePrev = () => setStartIndex((prev) => Math.max(0, prev - 6));
  const handleNext = () => setStartIndex((prev) => prev + 6);

  const openModal = (testsOnDate) => {
    setSelectedDateTests(testsOnDate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDateTests([]);
    setIsModalOpen(false);
  };

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
              ${item.testsOnDate.length > 0 ? styles.testDay : ""}
              ${item.isToday ? styles.today : ""}`}
            onClick={() => item.testsOnDate.length > 0 && openModal(item.testsOnDate)}
            style={{ cursor: item.testsOnDate.length > 0 ? "pointer" : "default" }}
          >
            <div className={styles.date}>{item.date}</div>
            <div className={styles.month}>{item.month}</div>
            <div className={styles.day}>{item.day}</div>
            {item.testsOnDate.length > 0 && (
              <div className={styles.subject}>
                {item.testsOnDate.length === 1
                  ? item.testsOnDate[0].testName
                  : `${item.testsOnDate.length} Tests`}
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && <TestModal tests={selectedDateTests} onClose={closeModal} />}
    </div>
  );
};

export default UpcomingTest;
