import React, { useState } from "react";
import InputField from "../InputField/InputField";
import AddImage from "../AddImage/AddImage";
import styles from "./editProfileModal.module.css";
import Dropdown from "../Dropdown/Dropdown"; // ✅ Added Dropdown

const EditProfileModal = ({ isOpen, onClose, initialData = {}, onSave }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [role, setRole] = useState(initialData.role || "");
  const [image, setImage] = useState(initialData.image || "");

  const handleSave = () => {
    onSave({ name, email, role, image });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Edit Profile</h2>

        <InputField
          label="Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputField
          label="Email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Dropdown
        label="Role"
        options={["admin", "student"]}
        value={role}
        onChange={(e) => setRole(e.target.value)}
        />


        {/* ✅ AddImage instead of image URL */}
        <AddImage className={styles.addimage} image={image} onChange={setImage} />

        <div className={styles.buttonGroup}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
