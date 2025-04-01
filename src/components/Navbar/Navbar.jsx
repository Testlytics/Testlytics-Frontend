import { useState } from "react";
import { useRecoilState } from "recoil";
import { userRoleState, isAuthenticatedState } from "../../states/UserState";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/api";
import styles from "./navbar.module.css";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = userRole === "admin"
    ? ["Dashboard", "Students", "Exams", "Reports", "Manage Users"]
    : ["Dashboard", "Subjects", "Exams", "Questions", "Reports"];

  const userName = userRole === "admin" ? "Admin User" : "Student User";

  const handleMenuItemClick = (item) => {
    setIsMenuOpen(false);
    switch(item) {
      case "Students": navigate("/studentlist"); break;
      case "Dashboard": navigate("/dashboard"); break;
      // Add other cases as needed
      default: break;
    }
  };

  const handleLogout = async () => {
    try {
      // Call logout API
      await authService.logout();
      
      // Clear client-side storage
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      
      // Reset Recoil state
      setUserRole('');
      setIsAuthenticated(false);
      
      // Close modal and redirect to login
      setIsModalOpen(false);
      navigate('/login');
      
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback: clear storage and state even if API fails
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      setUserRole('');
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
    <nav className={styles.navbar}>
      {/* Hamburger menu button */}
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

      {/* Navigation menu */}
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

      {/* User profile section */}
      <div className={styles.userSection} onClick={() => setIsModalOpen(!isModalOpen)}>
        <img src="/profile.png" alt="Profile" className={styles.profilePic} />
        <span className={styles.username}>{userName}</span>
        <span className={styles.dropdownArrow}>▼</span>
      </div>

      {/* Profile modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <img src="/profile.png" alt="Profile" className={styles.modalProfilePic} />
          <p className={styles.modalUsername}>{userName}</p>
          <p className={styles.modalRole}>{userRole.toUpperCase()}</p>
          <button className={styles.modalButton}>Change Password</button>
          <button 
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <FiLogOut className={styles.logoutIcon} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;