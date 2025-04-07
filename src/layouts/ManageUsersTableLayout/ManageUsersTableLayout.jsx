import React, { useState } from "react";
import styles from "./manageUsersTableLayout.module.css";
import Table from "../../components/Table/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";

const ManageUsersTableLayout = ({ students = [], admins = [] }) => {
  const columns = ["ID", "Name", "Modified At", "Actions"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (user) => {
    console.log("Delete:", user);
  };

  const handleInputChange = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saving user:", editingUser);
    setIsModalOpen(false);
    // TODO: Save logic via API
  };

  const formatData = (data = []) =>
    data.map((item) => ({
      ID: item.id || "-",
      Name: item.name || "-",
      "Modified At": item.modifiedAt || "-",
      Actions: (
        <div className={styles.actions}>
          <FaEdit className={styles.editIcon} onClick={() => handleEdit(item)} />
          <FaTrash className={styles.deleteIcon} onClick={() => handleDelete(item)} />
        </div>
      ),
    }));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Manage Students</h1>
      <Table columns={columns} data={formatData(students)} />

      <h1 className={styles.heading}>Manage Admins</h1>
      <Table columns={columns} data={formatData(admins)} />

      {/* ✅ Call the EditProfileModal */}
      <EditProfileModal
        isOpen={isModalOpen}
        userData={editingUser}
        onClose={() => setIsModalOpen(false)}
        onChange={handleInputChange}
        onSave={handleSave}
      />
    </div>
  );
};

export default ManageUsersTableLayout;
