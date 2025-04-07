import React, { useEffect, useState } from "react";
import InputField from "../InputField/InputField";
import AddImage from "../AddImage/AddImage";
import styles from "./editProfileModal.module.css";
import Dropdown from "../Dropdown/Dropdown";

const EditProfileModal = ({ isOpen, onClose, userData = {}, onChange, onSave }) => {
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    role: "",
    image: null,
  });

  useEffect(() => {
  if (userData) {
    setLocalUser({
      id: userData.id || null, // ✅ Include ID
      name: userData.name || "",
      email: userData.email || "",
      role: (userData.role || "").toLowerCase(),
      image: userData.image || null,
    });
  }
}, [userData]);

  const handleChange = (field, value) => {
    const updated = { ...localUser, [field]: value };
    setLocalUser(updated);
    onChange?.(field, value);
  };

 
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Edit Profile</h2>

        <InputField
          label="Name"
          placeholder="Enter name"
          value={localUser.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          value={localUser.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Dropdown
          label="Role"
          options={["student", "admin"]}
          value={localUser.role}
          onChange={(val) => handleChange("role", val)}
        />

        <AddImage
          className={styles.addimage}
          image={localUser.image}
          onChange={(file) => handleChange("image", file)}
        />

        <div className={styles.buttonGroup}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={() => onSave(localUser)}>
  Save
</button>

        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
