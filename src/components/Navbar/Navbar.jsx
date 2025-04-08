import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { userRoleState, isAuthenticatedState } from "../../states/UserState";
import { useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import Avatar from "react-avatar";
import styles from "./navbar.module.css";
import { studentService } from "../../services/api";

const Navbar = () => {
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("User");

  const navigate = useNavigate();
  const location = useLocation();

  const userSectionRef = useRef(null);
  const modalRef = useRef(null);

  const menuItems =
    userRole === "admin"
      ? [
          { name: "Dashboard", path: "/overview" },
          { name: "Students", path: "/studentlist" },
          { name: "Exams", path: "/exam" },
          { name: "Reports", path: "/reports" },
          { name: "Manage Users", path: "/manage-users" }
        ]
      : [
          { name: "Dashboard", path: "/overview" },
          { name: "Subjects", path: "/subjects" },
          { name: "Exams", path: "/exams" },
          { name: "Questions", path: "/question-paper" },
          { name: "Reports", path: "/student-report" }
        ];

  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // ✅ Correct key
  
      // Reset Recoil state
      setUserRole('');
      setIsAuthenticated(false);
  
      // Close modal and navigate
      setIsModalOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
  
      // Fallback: ensure cleanup
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // ✅ Correct key
      setUserRole('');
      setIsAuthenticated(false);
      navigate("/login");
    }
  };
  
 
  return (
    <nav className={styles.navbar}>
      {/* Hamburger Menu */}
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

      {/* Menu Items */}
      <ul className={`${styles.menu} ${isMenuOpen ? styles.open : ""}`}>
        {menuItems.map(({ name, path }) => (
          <li
            key={name}
            className={`${styles.menuItem} ${
              location.pathname === path ? styles.active : ""
            }`}
            onClick={() => handleMenuItemClick(path)}
          >
            {name}
          </li>
        ))}
      </ul>

      {/* User Info */}
      <div
        className={styles.userSection}
        onClick={() => setIsModalOpen(!isModalOpen)}
        ref={userSectionRef}
      >
        <Avatar
          src="/profile.png"
          name={userName}
          size="40"
          round={true}
          className={styles.profilePic}
        />
        <span className={styles.username}>{userName}</span>
        <span className={styles.dropdownArrow}>▼</span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modal} ref={modalRef}>
          <Avatar
            src="/profile.png"
            name={userName}
            size="80"
            round={true}
            className={styles.modalProfilePic}
          />
          <p className={styles.modalUsername}>{userName}</p>
          <p className={styles.modalRole}>{userRole?.toUpperCase() || "UNKNOWN"}</p>
          <button className={styles.modalButton}>Change Password</button>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <FiLogOut className={styles.logoutIcon} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
