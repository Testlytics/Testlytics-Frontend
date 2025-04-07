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
import StudentPage from '../pages/StudentPage/StudentPage';
import ExamOverviewPage from '../pages/ExamOverviewPage/ExamOverviewPage';
import SubjectPage from '../pages/SubjectPage/SubjectPage';
import AddQuestionPage from '../pages/AddQuestionPage/AddQuestionPage';
import Questions from '../pages/Questions/Questions';
import ManageUsersPage from '../pages/ManageUsersPage/ManageUsersPage';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import ReportPage from '../pages/ReportPage/ReportPage'; 
import OverviewPage from '../pages/OverviewPage/OverviewPage';
import StudentResultPage from "../pages/StudentResultPage/StudentResultPage";

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
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsAuthenticated, setUser, setIsLoading]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
      <Route path="/studentlist" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
      <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
      <Route path="/exam" element={<ProtectedRoute><ExamOverviewPage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/add-question" element={<ProtectedRoute><AddQuestionPage /></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="/manage-users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
      <Route path="/student-report" element={<ProtectedRoute><StudentResultPage /></ProtectedRoute>} />
      </Routes>
  );
};

export default AppRoutes;
