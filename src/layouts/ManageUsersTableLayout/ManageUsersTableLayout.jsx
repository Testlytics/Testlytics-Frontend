import React, { useEffect, useState } from "react";
import styles from "./manageUsersTableLayout.module.css";
import Table from "../../components/Table/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import { getUsersByRole, updateUser,deleteUser } from "../../services/api";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";


const ManageUsersTableLayout = () => {
  const columns = ["ID", "Name", "Email", "Actions"];
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);


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
  

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
  
    try {
      await deleteUser(userToDelete.id);
     
      await fetchData();
    } catch (error) {
      console.error("Delete error:", error);
     
    } finally {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
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
        id: updatedUser.role=== "ADMIN" ? 1 : 2
      }
    };
  
    try {
      // console.log("Sending payload:", {
      //   user: userPayload,
      //   hasImage: !!updatedUser.image
      // });
  
      await updateUser(
        updatedUser.id, 
        userPayload,
        updatedUser.image instanceof File ? updatedUser.image : null
      );
//       console.log("Image file type:", typeof updatedUser.image);
// console.log("Is File instance:", updatedUser.image instanceof File);
      
      await fetchData();
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("Detailed error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
  };
  
  

  const formatData = (data = []) =>
    data.map((item) => ({
      ID: item.id,
      Name: item.name,
      Email: item.email,
      Actions: (
        <div className={styles.actions}>
          <FaEdit className={styles.editIcon} onClick={() => handleEdit(item)} />
          <FaTrash className={styles.deleteIcon} onClick={() => handleDeleteClick(item)} />
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

<DeleteConfirmationModal
  isOpen={isDeleteModalOpen}
  onClose={() => setIsDeleteModalOpen(false)}
  onConfirm={handleConfirmDelete}
  user={userToDelete}
/>
    </div>
    
  );
};

export default ManageUsersTableLayout;
