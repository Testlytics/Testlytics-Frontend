const subjectsData = [
    {
      subjectId: "MATH101",
      subjectName: "Mathematics",
      totalExams: 5,
      tableColumns: ["Student ID", "Student", "Test 1", "Test 2", "Test 3"],
      tableData: [
        { "Student ID": "S101", Student: "Alice Johnson", "Test 1": 85, "Test 2": 90, "Test 3": 88 },
        { "Student ID": "S102", Student: "Bob Smith", "Test 1": 78, "Test 2": 85, "Test 3": 80 },
        { "Student ID": "S103", Student: "Charlie Brown", "Test 1": 92, "Test 2": 88, "Test 3": 95 },
        { "Student ID": "S104", Student: "David Lee", "Test 1": 88, "Test 2": 79, "Test 3": 84 },
      ]
      ,
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
  