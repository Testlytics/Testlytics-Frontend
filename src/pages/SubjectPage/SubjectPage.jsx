import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import LeftList from "../../layouts/LeftList/LeftList";
import SubjectLayout from "../../layouts/SubjectLayout/SubjectLayout";
import styles from "./subjectPage.module.css";
import subjectsData from "./subjectData";

const SubjectPage = () => {
  const { subjectId } = useParams(); 
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    if (subjectId) {
      const foundSubject = subjectsData.find((subject) => subject.subjectId.toString() === subjectId);
      setSelectedSubject(foundSubject || subjectsData[0]);
    } else {
      setSelectedSubject(subjectsData[0]);
    }
  }, [subjectId]);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        {/* Left List */}
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

        {/* Right Section - Subject Details */}
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
