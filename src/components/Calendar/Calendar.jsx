import React, { useState } from 'react';
import styles from './calendar.module.css';

// Helper to generate days of the month
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const daysArray = [];

  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    daysArray.push(new Date(year, month, i));
  }

  return daysArray;
};

const Calendar = ({ upcomingDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysArray = generateCalendarDays(year, month);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const isUpcomingDate = (date) => {
    return upcomingDates.some(
      (examDate) =>
        date &&
        date.getDate() === examDate.getDate() &&
        date.getMonth() === examDate.getMonth() &&
        date.getFullYear() === examDate.getFullYear()
    );
  };

  return (
    <div className={styles.calendarContainer}>
      {/* Header */}
      <div className={styles.header}>
        <button onClick={prevMonth} className={styles.navButton}>
          &#9664;
        </button>
        <h2 className={styles.monthTitle}>
          {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h2>
        <button onClick={nextMonth} className={styles.navButton}>
          &#9654;
        </button>
      </div>

      {/* Days of the week */}
      <div className={styles.weekDays}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className={styles.dayHeader}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className={styles.daysGrid}>
        {daysArray.map((date, index) => (
          <div
            key={index}
            className={`${styles.day} ${
              date ? (isUpcomingDate(date) ? styles.highlighted : '') : styles.empty
            }`}
          >
            {date ? date.getDate() : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
