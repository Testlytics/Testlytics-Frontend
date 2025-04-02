export const buildSubjectTestMatrix = (subjects, completedTests, testIds, attempts) => {
  // 1. Group tests by subject first
  const subjectTestsMap = new Map();
  
  // Initialize map with all subjects
  subjects.forEach(subject => {
    subjectTestsMap.set(subject.subjectName, []);
  });

  // Early return if no tests attended
  if (testIds.length === 0 || attempts.length === 0) {
    return {
      columns: ["Subject", "Status"],
      data: [{ Subject: "No Tests Attended", Status: "This student hasn't taken any tests yet" }],
      averageScores: {}, // Empty object for consistency
      barGraphData: [] // Empty array for bar graph
    };
  }

  // 2. Assign tests to subjects and maintain order
  testIds.forEach(testId => {
    const testInfo = completedTests.find(t => t.testId === testId);
    const subjectName = subjects.find(s => s.subjectId === testInfo?.subjectId)?.subjectName || "Other";
    
    if (!subjectTestsMap.has(subjectName)) {
      subjectTestsMap.set(subjectName, []);
    }
    
    subjectTestsMap.get(subjectName).push(testId);
  });

  // 3. Create score map
  const scoreMap = new Map();
  attempts.forEach(attempt => {
    scoreMap.set(attempt.id.testId, attempt.score);
  });

  // 4. Determine maximum number of tests in any subject
  let maxTests = 0;
  subjectTestsMap.forEach(tests => {
    if (tests.length > maxTests) maxTests = tests.length;
  });

  // 5. Generate test names (Test 1, Test 2,... up to maxTests)
  const testColumns = Array.from({ length: maxTests }, (_, i) => `Test ${i + 1}`);

  // 6. Calculate average scores
  const averageScores = {};
  subjectTestsMap.forEach((testIds, subject) => {
    const scores = testIds.map(testId => scoreMap.get(testId)).filter(score => score !== undefined);
    averageScores[subject] = scores.length > 0 
      ? parseFloat((scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2))
      : 0; // Default to 0 if no scores
  });

  // 7. Build bar graph data ensuring valid values
  const barGraphData = Object.entries(averageScores)
    .filter(([_, avgScore]) => avgScore > 0) // Exclude subjects with zero scores
    .map(([subject, avgScore]) => ({
      label: subject,
      value: avgScore,
    }));

  // 8. Build the result
  return {
    columns: ["Subject", ...testColumns],
    data: Array.from(subjectTestsMap.entries()).map(([subject, testIds]) => {
      const row = { Subject: subject };
      
      testIds.forEach((testId, index) => {
        row[`Test ${index + 1}`] = scoreMap.get(testId) ?? "-";
      });
      
      // Fill remaining test columns with "-"
      for (let i = testIds.length; i < maxTests; i++) {
        row[`Test ${i + 1}`] = "-";
      }
      
      return row;
    }),
    averageScores, // ✅ Added this to return subject-wise average scores separately
    barGraphData,  // ✅ Adjusted this to exclude subjects with zero average scores
  };
};
