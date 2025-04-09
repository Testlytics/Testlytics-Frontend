import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import FormLayout from '../../layouts/FormLayout/FormLayout';
import QuestionLayout from '../../layouts/QuestionLayout/QuestionLayout';
import styles from './addQuestionPage.module.css';
import { testService, questionService, subjectService } from '../../services/api';
import { toast } from 'react-toastify';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import FailureModal from '../../components/SuccessModal/FailureModal';
 
const AddQuestionPage = () => {
  const [testData, setTestData] = useState({
    testName: '',
    subjectName: '',
    testDuration: '',
    startTime: '',
    endTime: '',
    testDate: new Date()
  });
 
  const [testId, setTestId] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);
 
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
 
  const [failureMessage, setFailureMessage] = useState('');
  const [showFailureModal, setShowFailureModal] = useState(false);
 
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
    try {
      if (!testData.testName || !testData.subjectName || !testData.testDuration) {
        toast.error("Please fill all required fields.");
        return;
      }
 
      const matchedSubject = subjects.find(
        (subject) => subject.subjectName.toLowerCase() === testData.subjectName.toLowerCase()
      );
      if (!matchedSubject) {
        toast.error("Subject not found. Please enter a valid subject.");
        return;
      }
 
      const payload = {
        testName: testData.testName,
        subjectId: matchedSubject.subjectId,
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
      setModalMessage('Test created successfully!');
      setShowModal(true);
    } catch (error) {
      let errorMsg = 'Failed to create test. Interrupting another Test';
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      setFailureMessage(`${errorMsg}`);
      setShowFailureModal(true);
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
      const payload = {
        questionText: question,
        answer: options[correctAnswerIndex],
        options: formattedOptions,
      };
 
      await questionService.addQuestion(testId, payload);
      toast.success('Question saved!');
      setModalMessage('Question created successfully!');
      setShowModal(true);
 
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswerIndex(null);
    } catch (error) {
      let errorMsg = 'Failed to save question.';
      if (error?.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      setFailureMessage(`❌ ${errorMsg}`);
      setShowFailureModal(true);
      console.error('Error saving question:', error);
    }
  };
 
  const handleSubmitAll = async () => {
    toast.success('Test and questions submitted successfully!');
    setModalMessage('Test and questions submitted successfully!');
    setShowModal(true);
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
 
      {/* ✅ Success Modal */}
      {showModal && (
        <SuccessModal
          message={modalMessage}
          onClose={() => setShowModal(false)}
        />
      )}
 
      {/* ❌ Failure Modal */}
      {showFailureModal && (
        <FailureModal
          message={failureMessage}
          onClose={() => setShowFailureModal(false)}
        />
      )}
    </div>
  );
};
 
export default AddQuestionPage;