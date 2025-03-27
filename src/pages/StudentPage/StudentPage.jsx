import { useEffect, useState } from "react";
import { studentService } from "../../services/api"; 
import StudentLayout from "../../layouts/StudentLayout/StudentLayout";
import LeftList from "../../layouts/LeftList/LeftList";

const StudentPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };
  useEffect(() => {
    // Fetch students when the page loads
    const fetchStudents = async () => {
      try {
        const data = await studentService.getStudents();
        setStudents(data);
        setSelectedStudent(data.length > 0 ? data[0] : null); // Select first student by default
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ display: "flex" }}>
      {/* LeftList for Student Selection */}
      <LeftList
            title="Students"
            data={students}
            itemKey="studentId"
            itemLabel="firstName"
            selectedItemId={selectedStudent?.studentId} // ✅ Fix: Use selectedStudent?.studentId
            onItemClick={handleStudentClick} // ✅ Fix: Correct function name
          />

      {/* StudentLayout to display details of selected student */}
      {selectedStudent && <StudentLayout {...selectedStudent} />}
    </div>
  );
};

export default StudentPage;
