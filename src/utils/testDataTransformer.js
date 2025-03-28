// src/utils/testDataTransformer.js
export const buildSubjectTestMatrix = (subjects, tests, attempts) => {
  if (!subjects || !tests || !attempts) {
    return { columns: ['Subject'], data: [] };
  }

  // Create mappings for quick lookup
  const subjectMap = new Map(subjects.map(s => [s.subjectId, s.subjectName]));
  const testToSubjectMap = new Map(tests.map(t => [t.testId, t.subjectId]));
  const testNameMap = new Map(tests.map(t => [t.testId, t.testName || `Test ${t.testId.substring(0, 4)}`]));

  // Group attempts by subject and test
  const subjectTestMap = new Map();
  
  attempts.forEach(attempt => {
    const testId = attempt.id?.testId;
    const subjectId = testToSubjectMap.get(testId);
    if (!subjectId) return;
    
    const testName = testNameMap.get(testId);
    const subjectName = subjectMap.get(subjectId);
    
    if (!subjectTestMap.has(subjectName)) {
      subjectTestMap.set(subjectName, new Map());
    }
    
    subjectTestMap.get(subjectName).set(testName, attempt.score);
  });

  // Get all unique test names (sorted)
  const allTestNames = [...new Set(
    attempts.map(attempt => testNameMap.get(attempt.id?.testId))
  )].filter(Boolean).sort();

  // Build columns
  const columns = ['Subject', ...allTestNames];

  // Build rows
  const data = [];
  subjectTestMap.forEach((testScores, subjectName) => {
    const row = { Subject: subjectName };
    
    allTestNames.forEach(testName => {
      row[testName] = testScores.get(testName) || '-';
    });

    data.push(row);
  });

  return { columns, data };
};