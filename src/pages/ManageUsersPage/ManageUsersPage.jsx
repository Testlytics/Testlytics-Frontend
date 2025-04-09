import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ManageUsersLayout from "../../layouts/ManageUsersLayout/ManageUsersLayout";
import ManageUsersTableLayout from "../../layouts/ManageUsersTableLayout/ManageUsersTableLayout";
import styles from "./manageUsersPage.module.css";
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs";

const ManageUsersPage = () => {
  // ✅ Sample data (Replace with API data later)
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", modifiedAt: "2025-03-25" },
    { id: 2, name: "Jane Smith", modifiedAt: "2025-03-24" },
  ]);

  const [admins, setAdmins] = useState([
    { id: 1, name: "Alice Brown", modifiedAt: "2025-03-23" },
    { id: 2, name: "Bob Johnson", modifiedAt: "2025-03-22" },
  ]);

  return (
    <div className={styles.container}>
      {/* ✅ Navbar */}
      <div className={styles.navbar}>
        <Navbar />
      </div>

      {/* ✅ Main Content */}
      <div className={styles.content}>
        {/* ✅ Left Section (User Management) */}
        <div className={styles.leftSection}>
          <ManageUsersLayout />
        </div>

        {/* ✅ Right Section (Tables) */}
        <div className={styles.rightSection}>
          <Breadcrumbs  />
          <ManageUsersTableLayout students={students} admins={admins} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsersPage;
