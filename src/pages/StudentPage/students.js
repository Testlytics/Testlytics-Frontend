const students = [
    {
      firstName: "John Doe",
      studentId: "101",
      rank: "1",
      profilePicture: {
        imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      tableData: {
        columns: ["Subjects", "Test 1", "Test 2", "Test 3"],
        data: [
          { Subjects: "Math", "Test 1": 85, "Test 2": 90, "Test 3": 88 },
          { Subjects: "Science", "Test 1": 78, "Test 2": 85, "Test 3": 80 },
          { Subjects: "History", "Test 1": 92, "Test 2": 88, "Test 3": 95 },
          { Subjects: "English", "Test 1": 88, "Test 2": 79, "Test 3": 84 },
        ],
      },
      barGraphData: [
        { label: "Math", value: 85 },
        { label: "Science", value: 78 },
        { label: "History", value: 92 },
        { label: "English", value: 88 },
      ],
      lineGraphData: [
        { label: "Week 1", marks: 80 },
        { label: "Week 2", marks: 85 },
        { label: "Week 3", marks: 90 },
        { label: "Week 4", marks: 95 },
      ],
      rectangleOneText: "Excellent Performance",
      rectangleTwoText: "Needs Improvement in Science",
    },
    {
      firstName: "Jane Smith",
      studentId: "102",
      rank: "2",
      profilePicture: {
        imageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      tableData: {
        columns: ["Subjects", "Test 1", "Test 2", "Test 3"],
        data: [
          { Subjects: "Math", "Test 1": 80, "Test 2": 85, "Test 3": 83 },
          { Subjects: "Science", "Test 1": 90, "Test 2": 92, "Test 3": 88 },
          { Subjects: "History", "Test 1": 75, "Test 2": 80, "Test 3": 78 },
          { Subjects: "English", "Test 1": 82, "Test 2": 84, "Test 3": 80 },
        ],
      },
      barGraphData: [
        { label: "Math", value: 80 },
        { label: "Science", value: 90 },
        { label: "History", value: 75 },
        { label: "English", value: 82 },
      ],
      lineGraphData: [
        { label: "Week 1", marks: 78 },
        { label: "Week 2", marks: 80 },
        { label: "Week 3", marks: 85 },
        { label: "Week 4", marks: 88 },
      ],
      rectangleOneText: "Great Performance",
      rectangleTwoText: "Focus on History",
    },
  ];
  
  export default students;
  