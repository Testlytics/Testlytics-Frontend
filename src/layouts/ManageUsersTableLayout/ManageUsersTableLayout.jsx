import React from "react";
import styles from "./manageUsersTableLayout.module.css";
import Table from "../../components/Table/Table"; // ✅ Import Table Component
import { FaEdit, FaTrash } from "react-icons/fa"; // ✅ Import Icons

const ManageUsersTableLayout = ({ students = [], admins = [] }) => {
  // ✅ Define table column labels
  const columns = ["ID", "Name", "Modified At", "Actions"]; // ✅ Pass only labels

  // ✅ Dummy handlers (replace with actual logic)
  const handleEdit = (item) => {
    console.log("Edit:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete:", item);
  };

  // ✅ Format table data to match expected column format
  const formatData = (data = []) =>
    data.map((item) => ({
      ID: item.id || "-", // ✅ Keys must match column labels exactly
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
      {/* ✅ Manage Students Table */}
      <h1 className={styles.heading}>Manage Students</h1>
      <Table columns={columns} data={formatData(students)} />

      {/* ✅ Manage Admins Table */}
      <h1 className={styles.heading}>Manage Admins</h1>
      <Table columns={columns} data={formatData(admins)} />
    </div>
  );
};

export default ManageUsersTableLayout;
