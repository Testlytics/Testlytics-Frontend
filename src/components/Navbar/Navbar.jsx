import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userRoleState } from "../../states/UserState";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const userRole = useRecoilValue(userRoleState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current URL path

  const menuItems =
    userRole === "admin"
      ? [
          { name: "Dashboard", path: "/overview" },
          { name: "Students", path: "/studentlist" },
          { name: "Exams", path: "/exam" },
          { name: "Reports", path: "/report" },
          { name: "Manage Users", path: "/manage-users" }
        ]
      : [
          { name: "Dashboard", path: "/overview" },
          { name: "Subjects", path: "/subjects" },
          { name: "Exams", path: "/exam" },
          { name: "Questions", path: "/questions" },
          { name: "Reports", path: "/report" }
        ];

  const userName = userRole === "admin" ? "Admin User" : "Student User";

  // Function to handle menu item clicks
  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false); // Close mobile menu when an item is clicked
    navigate(path);
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
      <h1 className={styles.logo} onClick={() => navigate("/")}>
        Testlytics
      </h1>

      {/* Navigation Menu */}
      <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
        {menuItems.map(({ name, path }) => (
          <li
            key={name}
            className={`${styles.menuItem} ${
              location.pathname === path ? styles.active : "" /* ✅ Highlight Active */
            }`}
            onClick={() => handleMenuItemClick(path)}
          >
            {name}
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
      {/* Profile Modal */}
{isModalOpen && (
  <div className={styles.modal}>
    <img src="/profile.png" alt="Profile" className={styles.modalProfilePic} />
    <p className={styles.modalUsername}>{userName}</p>
    <p className={styles.modalRole}>{userRole.toUpperCase()}</p>
    <button
      className={styles.modalButton}
      onClick={() => {
        console.log("Navigating to /change-password"); // ✅ Debugging log
        setIsModalOpen(false); 
        navigate("/change-password");
      }}      
    >
      Change Password
    </button>
    <button className={styles.logoutButton}>
      <FiLogOut className={styles.logoutIcon} />
    </button>
  </div>
)}

    </nav>
  );
};

export default Navbar;
