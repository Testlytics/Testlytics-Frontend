const subjectsData = [
    {
      subjectId: "MATH101",
      subjectName: "Mathematics",
      totalExams: 5,
      tableData: [
        { exam: "Midterm", score: 85 },
        { exam: "Final Exam", score: 90 },
        { exam: "Quiz 1", score: 80 },
        { exam: "Quiz 2", score: 88 },
        { exam: "Assignment", score: 92 },
      ],
      performanceGraphData: [
        { exam: "Quiz 1", score: 80 },
        { exam: "Midterm", score: 85 },
        { exam: "Quiz 2", score: 88 },
        { exam: "Final Exam", score: 90 },
      ],
      classAccuracyData: [
        { exam: "Quiz 1", accuracy: 75 },
        { exam: "Midterm", accuracy: 82 },
        { exam: "Quiz 2", accuracy: 79 },
        { exam: "Final Exam", accuracy: 88 },
      ],
      classToppers: ["Alice Johnson", "Bob Smith", "Charlie Brown"],
    },
    {
      subjectId: "SCI102",
      subjectName: "Science",
      totalExams: 4,
      tableData: [
        { exam: "Midterm", score: 78 },
        { exam: "Final Exam", score: 85 },
        { exam: "Lab Report", score: 80 },
        { exam: "Project", score: 90 },
      ],
      performanceGraphData: [
        { exam: "Lab Report", score: 80 },
        { exam: "Midterm", score: 78 },
        { exam: "Final Exam", score: 85 },
        { exam: "Project", score: 90 },
      ],
      classAccuracyData: [
        { exam: "Lab Report", accuracy: 72 },
        { exam: "Midterm", accuracy: 75 },
        { exam: "Final Exam", accuracy: 81 },
        { exam: "Project", accuracy: 85 },
      ],
      classToppers: ["David Lee", "Emma Watson", "Frank Miller"],
    },
  ];
  
  export default subjectsData;
  