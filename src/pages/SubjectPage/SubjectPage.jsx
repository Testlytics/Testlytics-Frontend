import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LeftList from "../../layouts/LeftList/LeftList"; // ✅ Updated Import
import SubjectLayout from "../../layouts/SubjectLayout/SubjectLayout"; // ✅ Updated Import
import styles from "./subjectPage.module.css";
import subjectsData from "./subjectData"; // ✅ Import subjects data

const SubjectPage = () => {
  // ✅ Manage selected subject state
  const [selectedSubject, setSelectedSubject] = useState(subjectsData[0] || null);

  // ✅ Update selected subject if data changes
  useEffect(() => {
    if (subjectsData.length > 0) {
      setSelectedSubject(subjectsData[0]);
    }
  }, [subjectsData]);

  // ✅ Handle subject selection
  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className={styles.pageContainer}>
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Main Content: LeftList + SubjectLayout */}
      <div className={styles.content}>
        {/* Left Sidebar - 1/4 of screen */}
        <div className={styles.leftList}>
          <LeftList
            title="Subjects"
            data={subjectsData}
            itemKey="subjectId"
            itemLabel="subjectName"
            selectedItemId={selectedSubject?.subjectId} // ✅ Fix: Use selectedSubject?.subjectId
            onItemClick={handleSubjectClick} // ✅ Fix: Correct function name
          />
        </div>

        {/* Right Section - 3/4 of screen */}
        <div className={styles.subjectLayout}>
          {selectedSubject ? (
            <SubjectLayout
              subjectDetails={{
                subject: selectedSubject.subjectName,
                totalExams: selectedSubject.totalExams,
              }}
              tableColumns={selectedSubject.tableColumns}
              tableData={selectedSubject.tableData}
              performanceGraphData={selectedSubject.performanceGraphData}
              classAccuracyData={selectedSubject.classAccuracyData}
              classToppers={selectedSubject.classToppers}
            />
          ) : (
            <p className={styles.noSubject}>No subject selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
