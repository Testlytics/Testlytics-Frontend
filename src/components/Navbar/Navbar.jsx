import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState";
import styles from "./navbar.module.css";

const Navbar = () => {
  const userRole = useRecoilValue(userRoleState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define menu items based on the user role
  const menuItems = userRole === "admin" 
    ? ["Dashboard", "Students", "Exams", "Questions", "Subjects", "Reports", "Manage Users"]
    : ["Dashboard", "Subjects", "Exams", "Questions", "Reports"];

  const userName = userRole === "admin" ? "Admin User" : "Student User"; // Replace with actual username from state

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>Testlytics</h1>
      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <li key={item} className={styles.menuItem}>
            {item}
          </li>
        ))}
      </ul>
      <div className={styles.userSection} onClick={() => setIsModalOpen(!isModalOpen)}>
        <span className={styles.username}>{userName}</span>
        <span className={styles.dropdownArrow}>▼</span>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <p>Profile</p>
          <p>Settings</p>
          <p>Logout</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
