import React, { useEffect, useState } from "react";
import styles from "./manageUsersTableLayout.module.css";
import Table from "../../components/Table/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { getUsersByRole, updateUser } from "../../services/api";

const ManageUsersTableLayout = () => {
  const columns = ["ID", "Name", "Modified At", "Actions"];
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch students and admins on mount
  const fetchData = async () => {
    try {
      const studentsData = await getUsersByRole("STUDENT");
      const adminsData = await getUsersByRole("ADMIN");
      setStudents(studentsData);
      setAdmins(adminsData);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };
  

  const handleDelete = (user) => {
    console.log("Delete:", user);
    // TODO: Add delete API call
  };

  const handleInputChange = (field, value) => {
    setEditingUser((prev) => ({ ...prev, [field]: value }));
  };
 
  const handleSave = async (updatedUser) => {
    const userPayload = {
      username: updatedUser.name, // Ensure this matches your User entity
      email: updatedUser.email,
      password: updatedUser.password || updatedUser.name, // Fallback if password not provided
      role: { // Must match your backend Role structure
        id: updatedUser.role.toUpperCase() === "ADMIN" ? 1 : 2
      }
    };
  
    try {
      console.log("Sending payload:", {
        user: userPayload,
        hasImage: !!updatedUser.image
      });
  
      await updateUser(
        updatedUser.id, 
        userPayload,
        updatedUser.image instanceof File ? updatedUser.image : null
      );
      console.log("Image file type:", typeof updatedUser.image);
console.log("Is File instance:", updatedUser.image instanceof File);
      
      await fetchData();
      setIsModalOpen(false);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Detailed error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      alert(error.response?.data?.message || "Failed to update user");
    }
  };
  
  

  const formatData = (data = []) =>
    data.map((item) => ({
      ID: item.id,
      Name: item.name,
      "Modified At": item.modifiedAt,
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
