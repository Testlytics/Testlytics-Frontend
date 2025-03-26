import { useState } from "react";
import styles from "./manageUsersLayout.module.css";
import InputField from "../../components/InputField/InputField";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Import eye icons

const ManageUsersLayout = ({ mainHeading = "Manage Users" }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  // ✅ Toggle Password Visibility
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

        {/* ✅ Role Dropdown */}
        <Dropdown
          label="Role"
          options={["Admin", "Instructor", "Student"]} // Modify as needed
          selected={selectedRole}
          onSelect={setSelectedRole}
        />

        {/* ✅ Password Input */}
        <div className={styles.passwordContainer}>
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"} // ✅ Toggle type
            placeholder="Enter password"
            value={password}
            
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* ✅ Move eye icon inside the div properly */}
          
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
