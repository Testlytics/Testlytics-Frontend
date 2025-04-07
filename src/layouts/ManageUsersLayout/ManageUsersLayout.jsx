import { useState } from "react";
import styles from "./manageUsersLayout.module.css";
import InputField from "../../components/InputField/InputField";
import Dropdown from "../../components/Dropdown/Dropdown";
import Button from "../../components/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { createUser } from "../../services/api"; 

const ManageUsersLayout = ({ mainHeading = "Manage Users" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const roleNameToId = {
    Admin: 1,
    Student: 2,
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async () => {
    console.log("Form values:", { name, email, password, selectedRole });
    if (!name.trim() || !email.trim() || !password.trim() || !selectedRole) {
      alert("Please fill in all required fields.");
      return;
    }

    const userPayload = {
      username: name,
      email: email,
      password: password,
      role: {
        id: roleNameToId[selectedRole],
      },
    };

    try {
      await createUser(userPayload, image);
      alert("✅ User created successfully!");
      // Clear form after success
      setName("");
      setEmail("");
      setPassword("");
      setSelectedRole("");
      setImage(null);
    } catch (error) {
      console.error("Error creating user:", error);
      alert("❌ Failed to create user. Please try again.");
    }
    await fetchUsers();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.mainHeading}>{mainHeading}</h1>

      <div className={styles.addUserContainer}>
        <h2 className={styles.subHeading}>Add User</h2>

        <InputField
          label="Name"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Email"
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Dropdown
          label="Role"
          options={["Admin", "Student"]}
          value={selectedRole}
          onChange={setSelectedRole}
        />

        <div className={styles.passwordContainer}>
          <InputField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.eyeButton}
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <InputField
          label="Profile Image (Optional)"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className={styles.buttonContainer}>
          <Button text="Add User" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsersLayout;