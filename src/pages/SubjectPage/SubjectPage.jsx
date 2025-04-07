import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LeftList from "../../layouts/LeftList/LeftList";
import SubjectLayout from "../../layouts/SubjectLayout/SubjectLayout";
import styles from "./subjectPage.module.css";
import {
  studentService,
  subjectService,
  testService,
  testAttemptService,
} from "../../services/api";

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [completedTests, setCompletedTests] = useState([]);
  const [classToppers, setClassToppers] = useState([]);
  const [loadingToppers, setLoadingToppers] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  // 🔄 Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedSubjects, fetchedCompletedTests] = await Promise.all([
          subjectService.getAllSubjects(),
          testService.getCompletedTests(),
        ]);

        setSubjects(fetchedSubjects);
        setCompletedTests(fetchedCompletedTests);

        const foundSubject =
          fetchedSubjects.find(
            (subject) => subject.subjectId.toString() === subjectId
          ) || fetchedSubjects[0];

        setSelectedSubject(foundSubject);

        // Compute Top Scorers
        if (foundSubject) {
          setLoadingToppers(true);
          const subjectTests = fetchedCompletedTests.filter(
            (test) =>
              test.subjectId.toString() ===
              foundSubject.subjectId.toString()
          );
          const topScorers = await computeTopScorers(subjectTests);
          setClassToppers(topScorers);
          setLoadingToppers(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingToppers(false);
      }
    };

    fetchData();
  }, [subjectId]);

  // 🧮 Compute top scorers
  const computeTopScorers = async (tests) => {
    if (!tests || tests.length === 0) return [];

    const allStudents = await studentService.getStudents();
    const studentMap = new Map(
      allStudents.map((student) => [String(student.studentId), student])
    );

    const studentScores = new Map();

    for (const test of tests) {
      try {
        const studentIds = await testAttemptService.getStudentsByTest(test.testId);

        for (const userId of studentIds) {
          try {
            const attempt = await testAttemptService.getTestAttempt(
              test.testId,
              userId
            );

            if (attempt?.score !== undefined) {
              const studentIdStr = String(userId);

              if (!studentScores.has(studentIdStr)) {
                const student = studentMap.get(studentIdStr);
                studentScores.set(studentIdStr, {
                  totalScore: 0,
                  testCount: 0,
                  name: student?.firstName || `Student ${userId}`,
                });
              }

              const userData = studentScores.get(studentIdStr);
              userData.totalScore += attempt.score;
              userData.testCount += 1;
            }
          } catch (error) {
            console.error(`Error processing student ${userId}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error fetching students for test ${test.testId}:`, error);
      }
    }

    return Array.from(studentScores.entries())
      .map(([userId, data]) => ({
        userId,
        name: data.name,
        averageScore: data.testCount > 0 ? data.totalScore / data.testCount : 0,
      }))
      .sort((a, b) => b.averageScore - a.averageScore)
      .slice(0, 3);
  };

  // 📊 Build performance table
  useEffect(() => {
    if (!selectedSubject || completedTests.length === 0) return;

    const prepareTable = async () => {
      const subjectTests = completedTests.filter(
        (test) =>
          test.subjectId.toString() === selectedSubject.subjectId.toString()
      );

      const allStudents = await studentService.getStudents();
      const studentMap = new Map(
        allStudents.map((student) => [String(student.studentId), student])
      );

      const columns = ["Student ID", "Name"];
      const testIds = [];
      subjectTests.forEach((test, index) => {
        columns.push(`Test ${index + 1}`);
        testIds.push({ id: test.testId, label: `Test ${index + 1}` });
      });

      const studentScores = {};

      for (const test of testIds) {
        const studentIds = await testAttemptService.getStudentsByTest(test.id);

        for (const studentId of studentIds) {
          const studentIdStr = String(studentId);
          if (!studentScores[studentIdStr]) {
            const student = studentMap.get(studentIdStr);
            studentScores[studentIdStr] = {
              "Student ID": studentIdStr,
              Name: student?.firstName || `Student ${studentIdStr}`,
            };
          }

          const attempt = await testAttemptService.getTestAttempt(
            test.id,
            studentIdStr
          );
          studentScores[studentIdStr][test.label] =
            attempt?.score?.toFixed(2) ?? "-";
        }
      }

      setTableColumns(columns);
      setTableData(Object.values(studentScores));
    };

    prepareTable();
  }, [selectedSubject, completedTests]);

  // 🔍 Debug
  useEffect(() => {
    console.log("Class Toppers:", classToppers);
  }, [classToppers]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <div className={styles.leftList}>
          <LeftList
            title="Subjects"
            data={subjects}
            itemKey="subjectId"
            itemLabel="subjectName"
            selectedItemId={selectedSubject?.subjectId}
            onItemClick={async (subject) => {
              setSelectedSubject(subject);
              setLoadingToppers(true);
              const subjectTests = completedTests.filter(
                (test) =>
                  test.subjectId.toString() === subject.subjectId.toString()
              );
              const topScorers = await computeTopScorers(subjectTests);
              setClassToppers(topScorers);
              setLoadingToppers(false);
            }}
          />
        </div>

        <div className={styles.subjectLayout}>
          {selectedSubject ? (
            <SubjectLayout
              subjectDetails={{
                subject: selectedSubject.subjectName,
                totalExams: completedTests.filter(
                  (test) => test.subjectId === selectedSubject.subjectId
                ).length,
              }}
              classToppers={classToppers.map((topper) => `${topper.name}`)}
              tableColumns={tableColumns}
              tableData={tableData}
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
