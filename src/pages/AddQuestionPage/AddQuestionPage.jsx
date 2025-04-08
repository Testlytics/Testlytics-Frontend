import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import QuestionLayout from '../../layouts/QuestionLayout/QuestionLayout';
import styles from './addQuestionPage.module.css';
import { testService, questionService } from '../../services/api';
import { toast } from 'react-toastify';
import { subjectService } from '../../services/api';

const AddQuestionPage = () => {
  const [testData, setTestData] = useState({
    testName: '',
    subjectName: '',
    testDuration: '',
    startTime: '',
    endTime: '',
    testDate: new Date()
  });

  const [testId, setTestId] = useState(null); // Store created test ID
  const [subjects, setSubjects] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const allSubjects = await subjectService.getAllSubjects();
        setSubjects(allSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
  
    fetchSubjects();
  }, []);


  const handleSaveTest = async () => {
    console.log("📌 handleSaveTest triggered");

    


    try {


      console.log("blah");

      console.log("🧪 testData values:", testData);
      // ✅ Validate inputs early
      if (!testData.testName || !testData.subjectName || !testData.testDuration) {
        toast.error("Please fill all required fields.");
        return;
      }
      console.log("all fields correct");

  
      // ✅ Lookup subjectId
      console.log("🔍 Available subjects:", subjects);

      const matchedSubject = subjects.find(
        (subject) => subject.subjectName.toLowerCase() === testData.subjectName.toLowerCase()
      );
  
      if (!matchedSubject) {
        toast.error("Subject not found. Please enter a valid subject.");
        return;
      }
  
      const payload = {
        testName: testData.testName,
        subjectId: matchedSubject.subjectId, // 👈 use ID, not name
        testDuration: Number(testData.testDuration),
        startTime: testData.startTime,
        endTime: testData.endTime,
        testDate: testData.testDate.toISOString().split('T')[0]
      };
  
      const response = await testService.createTest(payload);
      const createdId = response.testId || response.responseBody?.testId;
  
      if (!createdId) throw new Error('Test ID missing from response');
  
      setTestId(createdId);
      toast.success('Test created successfully!');
      window.alert('✅ Test created successfully!');
    } catch (error) {
      toast.error('Failed to create test.');
      console.error('🧾 Error response data:', error.response?.data);
      console.error('Error creating test:', error);
    }
  };
  



  const handleSaveQuestion = async () => {
    try {
      if (!testId) {
        toast.error('Please create the test first.');
        return;
      }

      if (correctAnswerIndex === null) {
        toast.error('Please select the correct answer.');
        return;
      }

      if (options.some(opt => opt.trim() === '') || question.trim() === '') {
        toast.error('Please fill in the question and all options.');
        return;
      }

      const formattedOptions = options.map(opt => ({ optionText: opt }));

     // ✅ Enforce correct structure and order
     const orderedPayload = {
      questionText: question,
      answer: options[correctAnswerIndex],
      options: formattedOptions,
    };


    console.log("✅ Payload being sent:", orderedPayload);


      await questionService.addQuestion(testId, orderedPayload);
      toast.success('Question saved!');
      window.alert('✅ Question created successfully!');
      
      // Reset form
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(null);
    } catch (error) {
      console.error('Error saving question:', error);
      toast.error('Failed to save question.');
    }
  };

  const handleSubmitAll = async () => {
    toast.success('Test and questions submitted successfully!');
    window.alert('✅ Test and questions submitted successfully!');
    // Optional: Navigate or reset everything if needed
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          <FormLayout
            testData={testData}
            setTestData={setTestData}
            onSave={handleSaveTest}
          />
        </div>
        <div className={styles.rightSection}>
          <QuestionLayout
            question={question}
            setQuestion={setQuestion}
            options={options}
            setOptions={setOptions}
            correctAnswerIndex={correctAnswerIndex}
            setCorrectAnswerIndex={setCorrectAnswerIndex}
            onSave={handleSaveQuestion}
            onSubmit={handleSubmitAll}
          />
        </div>
      </div>
    </div>
  );
};

export default AddQuestionPage;
