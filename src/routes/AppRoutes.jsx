import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  isAuthenticatedState,
  userState,
  authLoadingState,
  userRoleState
} from '../states/UserState';

import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage/LoginPage';
import ChangePassword from '../pages/ChangePassword/ChangePassword';

// Admin/Teacher Pages
import OverviewPage from '../pages/OverviewPage/OverviewPage';
import StudentPage from '../pages/StudentPage/StudentPage';
import ExamOverviewPage from '../pages/ExamOverviewPage/ExamOverviewPage';
import SubjectPage from '../pages/SubjectPage/SubjectPage';
import AddQuestionPage from '../pages/AddQuestionPage/AddQuestionPage';
import Questions from '../pages/Questions/Questions';
import ManageUsersPage from '../pages/ManageUsersPage/ManageUsersPage';
import ReportPage from '../pages/ReportPage/ReportPage';
import StudentResultPage from "../pages/StudentResultPage/StudentResultPage";

// Test-Taking Pages
import MissednUpcoming from '../pages/MissednUpcoming/MissednUpcoming';
import QuestionPaper from '../pages/QuestionPaper/QuestionPaper';
import StartTest from '../pages/StartTest/StartTest';
import AttendTest from '../pages/AttendTest/AttendTest';


const AppRoutes = () => {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setUser = useSetRecoilState(userState);
  const setIsLoading = useSetRecoilState(authLoadingState);
  const setUserRole = useSetRecoilState(userRoleState);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const user = await getCurrentUser();
        setUser(user);
        setUserRole(user.role);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticated, setUser, setIsLoading, setUserRole]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
      <Route path="/studentlist" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
      <Route path="/exam" element={<ProtectedRoute><ExamOverviewPage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/add-question" element={<ProtectedRoute><AddQuestionPage /></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="/manage-users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
      <Route path="/student-report" element={<ProtectedRoute><StudentResultPage /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
      <Route path="/missednupcoming" element={<ProtectedRoute><MissednUpcoming /></ProtectedRoute>} />
      <Route path="/starttest" element={<ProtectedRoute><StartTest /></ProtectedRoute>} />

      {/* Public Test Page (Optional: Protect if needed) */}
      <Route path="/attend-test" element={<AttendTest />} />
      <Route path="/questionpaper/:variant" element={<QuestionPaper />} />

      {/* Catch-All Route */}
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
