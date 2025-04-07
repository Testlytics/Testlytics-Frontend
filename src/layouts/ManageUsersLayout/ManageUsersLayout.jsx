import { useState } from "react";
import styles from "./manageUsersLayout.module.css";
import InputField from "../../components/InputField/InputField";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 

const ManageUsersLayout = ({ mainHeading = "Manage Users" }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      {/* ✅ Main Heading */}
      <h1 className={styles.mainHeading}>{mainHeading}</h1>

      {/* ✅ Add User Section */}
      <div className={styles.addUserContainer}>
        <h2 className={styles.subHeading}>Add User</h2>

        {/* ✅ Name Input */}
        <InputField label="Name" placeholder="Enter full name" />

        <InputField label="Email" placeholder="Enter email" type="email" />

        {/* ✅ Role Dropdown */}
        <Dropdown
          label="Role"
          options={["Admin", "Instructor", "Student"]} 
          selected={selectedRole}
          onSelect={setSelectedRole}
        />

        {/* ✅ Password Input with Eye Icon */}
        <div className={styles.passwordContainer}>
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"} 
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className={styles.eyeButton} onClick={handleTogglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* ✅ Submit Button Centered */}
        <div className={styles.buttonContainer}>
          <Button text="Add User" />
        </div>
      </div>
    </div>
  );
};

export default ManageUsersLayout;
