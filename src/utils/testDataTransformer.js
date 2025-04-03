// Data transformation: buildSubjectTestMatrix.js
export const buildSubjectTestMatrix = (subjects, completedTests, testIds, attempts) => {
  
  // Handle empty cases
  if (!testIds.length || !attempts.length) {
    console.warn("No test attempts found.");
    return {
      columns: ["Subject", "Status"],
      data: [{ Subject: "No Tests Attended", Status: "This student hasn't taken any tests yet" }],
      averageScores: {},
      barGraphData: [],
      timeScoreData: []
    };
  }

  // 1. Group tests by subject
  const subjectTestsMap = new Map(subjects.map(subject => [subject.subjectName, []]));
  testIds.forEach(testId => {
    const testInfo = completedTests.find(t => t.testId === testId);
    const subjectName = subjects.find(s => s.subjectId === testInfo?.subjectId)?.subjectName || "Other";
    subjectTestsMap.get(subjectName)?.push(testId);
  });
 

  // 2. Create score and time mappings
  const scoreMap = new Map();
  const timeMap = new Map();
  attempts.forEach(attempt => {
    scoreMap.set(attempt.id.testId, attempt.score);
    if (attempt.attemptStartTime && attempt.attemptEndTime) {
      const duration = ((new Date(attempt.attemptEndTime) - new Date(attempt.attemptStartTime)) / (1000 * 60)).toFixed(1);
      timeMap.set(attempt.id.testId, parseFloat(duration));
    } else {
      console.warn("Invalid attempt times:", attempt);
      timeMap.set(attempt.id.testId, 0);
    }
  });


  // 3. Calculate average scores per subject
  const averageScores = {};
  subjectTestsMap.forEach((testIds, subject) => {
    const scores = testIds.map(testId => scoreMap.get(testId)).filter(score => score !== undefined);
    averageScores[subject] = scores.length ? (scores.reduce((sum, s) => sum + s, 0) / scores.length).toFixed(2) : 0;
  });
 

  // 4. Prepare bar graph data
  const barGraphData = Object.entries(averageScores)
    .filter(([_, avgScore]) => avgScore > 0)
    .map(([subject, avgScore]) => ({ label: subject, value: avgScore }));


  // 5. Build time vs. score data grouped by subject
  const timeScoreDataWithSubject = testIds.map(testId => {
    const testInfo = completedTests.find(t => t.testId === testId);
    const subjectName = subjects.find(s => s.subjectId === testInfo?.subjectId)?.subjectName || "Other";
    return { score: scoreMap.get(testId) || 0, time: timeMap.get(testId) || 0, subject: subjectName };
  });
 

  // 6. Organize time vs. score data for the line graph
  // Group data by time, making sure each subject has its own separate value
  const uniqueSubjects = [...new Set(timeScoreDataWithSubject.map(t => t.subject))];
  const timeMapForLineGraph = new Map();
  timeScoreDataWithSubject.forEach(({ time, subject, score }) => {
    if (!timeMapForLineGraph.has(time)) {
      const newEntry = { time };
      uniqueSubjects.forEach(subj => { newEntry[subj] = undefined; }); // ✅ Use undefined, not null
      timeMapForLineGraph.set(time, newEntry);
    }
    
    timeMapForLineGraph.get(time)[subject] = score;
  });
  const timeScoreData = Array.from(timeMapForLineGraph.values()).sort((a, b) => a.time - b.time);
  console.log("Final Time Score Data:", timeScoreData);

  // 7. Build table data
  const maxTests = Math.max(...Array.from(subjectTestsMap.values()).map(tests => tests.length));
  const testColumns = Array.from({ length: maxTests }, (_, i) => `Test ${i + 1}`);
  const tableData = Array.from(subjectTestsMap.entries()).map(([subject, testIds]) => {
    const row = { Subject: subject };
    testIds.forEach((testId, index) => row[`Test ${index + 1}`] = scoreMap.get(testId) ?? "-");
    for (let i = testIds.length; i < maxTests; i++) row[`Test ${i + 1}`] = "-";
    return row;
  });
 

  // 8. Return processed data
  return {
    columns: ["Subject", ...testColumns],
    data: tableData,
    averageScores,
    barGraphData,
    timeScoreData
  };
};
