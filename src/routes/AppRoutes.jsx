import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage/LoginPage';


// Admin/Teacher Pages

import StudentPage from '../pages/StudentPage/StudentPage';
import ExamOverviewPage from '../pages/ExamOverviewPage/ExamOverviewPage';
import SubjectPage from '../pages/SubjectPage/SubjectPage';
import AddQuestionPage from '../pages/AddQuestionPage/AddQuestionPage';
import Questions from '../pages/Questions/Questions';
import ManageUsersPage from '../pages/ManageUsersPage/ManageUsersPage';

import StudentResultPage from "../pages/StudentResultPage/StudentResultPage";
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import ReportPage from '../pages/ReportPage/ReportPage'; // ✅ Import Report Page
import OverviewPage from '../pages/OverviewPage/OverviewPage';
import DetailedReport from '../pages/DetailedReport/DetailedReport';
import Exams from '../pages/Exams/Exams';

import QuestionPaper from '../pages/QuestionPaper/QuestionPaper';

// Test-Taking Pages
import MissednUpcoming from '../pages/MissednUpcoming/MissednUpcoming';
import StartTest from '../pages/StartTest/StartTest';
import AttendTest from '../pages/AttendTest/AttendTest';
import { Notebook } from 'lucide-react';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
      <Route path="/studentlist" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
      <Route path="/studentexam" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
      <Route path="/exam" element={<ProtectedRoute><ExamOverviewPage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/add-question" element={<ProtectedRoute><AddQuestionPage /></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="/manage-users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
      <Route path="/student-report" element={<ProtectedRoute><StudentResultPage /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
      <Route path="/missednupcoming" element={<ProtectedRoute><MissednUpcoming /></ProtectedRoute>} />
      <Route path="/start-test/:testId" element={<StartTest />} />


      <Route path="/detailed-report/:testId" element={<ProtectedRoute><DetailedReport /></ProtectedRoute>} />
      {/* Public Test Pages */}
      <Route path="/attend-test/:testId" element={<AttendTest />} />
      <Route path="/questionpaper/:variant" element={<QuestionPaper />} />
      

   
     

     




      {/* Fallback */}
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
};

export default AppRoutes;
