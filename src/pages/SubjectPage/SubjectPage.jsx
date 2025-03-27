  import { useState, useEffect } from "react";
  import Navbar from "../../components/Navbar/Navbar";
  import LeftList from "../../layouts/LeftList/LeftList"; 
  import SubjectLayout from "../../layouts/SubjectLayout/SubjectLayout"; 
  import styles from "./subjectPage.module.css";
  import subjectsData from "./subjectData"; 

  const SubjectPage = () => {
    
    const [selectedSubject, setSelectedSubject] = useState(subjectsData[0] || null);

    
    useEffect(() => {
      if (subjectsData.length > 0) {
        setSelectedSubject(subjectsData[0]);
      }
    }, [subjectsData]);

    
    const handleSubjectClick = (subject) => {
      setSelectedSubject(subject);
    };

    return (
      <div className={styles.pageContainer}>
        {/* ✅ Navbar */}

        {/* ✅ Main Content: LeftList + SubjectLayout */}
        <div className={styles.content}>
          <div className={styles.leftList}>
            <LeftList
              title="Subjects"
              data={subjectsData}
              itemKey="subjectId"
              itemLabel="subjectName"
              selectedItemId={selectedSubject?.subjectId} 
              onItemClick={handleSubjectClick} 
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
