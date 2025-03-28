export const buildSubjectTestMatrix = (subjects, tests, testIds, attempts) => {
    // 1. Create test details map with sequential names
    const testDetailsMap = new Map();
    
    // Assign sequential test names (Test 1, Test 2, etc.)
    testIds.forEach((testId, index) => {
      testDetailsMap.set(testId, {
        name: `Test ${index + 1}`, // Test 1, Test 2, etc.
        subjectId: tests.find(t => t.testId === testId)?.subjectId || 'unknown'
      });
    });
  
    // 2. Create score map
    const scoreMap = new Map();
    attempts.forEach(attempt => {
      scoreMap.set(attempt.id.testId, attempt.score);
    });
  
    // 3. Group by subject
    const subjectTestMap = new Map();
    
    testIds.forEach(testId => {
      const testInfo = testDetailsMap.get(testId);
      const subjectName = subjects.find(s => s.subjectId === testInfo.subjectId)?.subjectName || 'Other';
      
      if (!subjectTestMap.has(subjectName)) {
        subjectTestMap.set(subjectName, new Map());
      }
      
      const score = scoreMap.get(testId) ?? '-';
      subjectTestMap.get(subjectName).set(testInfo.name, score);
    });
  
    // 4. Generate sequential test names
    const allTestNames = testIds.map((_, index) => `Test ${index + 1}`);
  
    // 5. Build result
    return {
      columns: ['Subject', ...allTestNames],
      data: Array.from(subjectTestMap.entries()).map(([subject, scores]) => ({
        Subject: subject,
        ...Object.fromEntries(allTestNames.map(name => [name, scores.get(name) ?? '-']))
      }))
    };
};