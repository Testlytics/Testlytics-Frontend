import { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userRoleState, isAuthenticatedState } from "../../states/UserState";
import { useNavigate, useLocation } from "react-router-dom";
import { authService } from "../../services/api";
import styles from "./navbar.module.css";
import { FiLogOut } from "react-icons/fi";
 
const Navbar = () => {
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
 
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
          { name: "Exams", path: "/exam" },
          { name: "Questions", path: "/questions" },
          { name: "Reports", path: "/reports" }
        ];
 
  const userName = userRole === "admin" ? "Admin User" : "Student User";
 
  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };
 
  const handleLogout = async () => {
    try {
    
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
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            <FiLogOut className={styles.logoutIcon} />
           
          </button>
        </div>
      )}
    </nav>
  );
};
 
export default Navbar;