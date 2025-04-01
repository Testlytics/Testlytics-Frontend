import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { 
  isAuthenticatedState,
  userState,
  authLoadingState
} from '../states/UserState';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage/LoginPage';
import StudentPage from '../pages/StudentPage/StudentPage';
import ExamOverviewPage from '../pages/ExamOverviewPage/ExamOverviewPage';
import SubjectPage from '../pages/SubjectPage/SubjectPage';
import AddQuestionPage from '../pages/AddQuestionPage/AddQuestionPage';
import Questions from '../pages/Questions/Questions';
import ManageUsersPage from '../pages/ManageUsersPage/ManageUsersPage';

const AppRoutes = () => {
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setUser = useSetRecoilState(userState);
  const setIsLoading = useSetRecoilState(authLoadingState);

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

      {/* Protected Routes */}
      <Route path="/studentlist" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
      <Route path="/exam" element={<ProtectedRoute><ExamOverviewPage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/add-question" element={<ProtectedRoute><AddQuestionPage /></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
      <Route path="/manage-users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
