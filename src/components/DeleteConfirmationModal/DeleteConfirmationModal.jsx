import React from "react";
import styles from "./deleteConfirmationModal.module.css";
 
const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, user }) => {
  if (!isOpen) return null;
 
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete <strong>{user?.name}</strong>?</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};
 
export default DeleteConfirmationModal;