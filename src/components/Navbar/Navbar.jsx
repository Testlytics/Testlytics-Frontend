import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState";
import { useNavigate } from "react-router-dom"; // Add this import
import styles from "./navbar.module.css";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const userRole = useRecoilValue(userRoleState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const menuItems =
    userRole === "admin"
      ? ["Dashboard", "Students", "Exams", "Reports", "Manage Users"]
      : ["Dashboard", "Subjects", "Exams", "Questions", "Reports"];

  const userName = userRole === "admin" ? "Admin User" : "Student User";

  // Function to handle menu item clicks
  const handleMenuItemClick = (item) => {
    setIsMenuOpen(false); // Close mobile menu when an item is clicked
    
    switch(item) {
      case "Students":
        navigate("/studentlist");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      // Add more cases for other menu items as needed
      default:
        break;
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Hamburger Menu Button */}
      <div
        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Logo */}
      <h1 className={styles.logo} onClick={() => navigate("/")}>Testlytics</h1>

      {/* Navigation Menu */}
      <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
        {menuItems.map((item) => (
          <li 
            key={item} 
            className={styles.menuItem}
            onClick={() => handleMenuItemClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* User Section */}
      <div className={styles.userSection} onClick={() => setIsModalOpen(!isModalOpen)}>
        <img src="/profile.png" alt="Profile" className={styles.profilePic} />
        <span className={styles.username}>{userName}</span>
        <span className={styles.dropdownArrow}>▼</span>
      </div>

      {/* Profile Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <img src="/profile.png" alt="Profile" className={styles.modalProfilePic} />
          <p className={styles.modalUsername}>{userName}</p>
          <p className={styles.modalRole}>{userRole.toUpperCase()}</p>
          <button className={styles.modalButton}>Change Password</button>
          <button className={styles.logoutButton}>
            <FiLogOut className={styles.logoutIcon} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;