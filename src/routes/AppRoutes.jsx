// src/routes/AppRoutes.jsx
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { 
  isAuthenticatedState,
  userState,
  authLoadingState
} from '../states/UserState';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginPage from '../pages/LoginPage/LoginPage';

import QuestionPaper from '../pages/QuestionPaper/QuestionPaper';
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import Exams from '../pages/Exams/Exams';
import MissednUpcoming from '../pages/MissednUpcoming/MissednUpcoming';
import Questions from '../pages/Questions/Questions';
import StartTest from '../pages/StartTest/StartTest';
import AttendTest from '../pages/AttendTest/AttendTest';



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

  useEffect(() => {
    setIsAuthenticated(true); // Temporarily set to true for debugging
  }, [setIsAuthenticated]);
  


  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
      <Route
        path="/changepassword"
        element={
        //   <ProtectedRoute>
            <ChangePassword />
        //   </ProtectedRoute>
        }
      />
      <Route
        path="/exams"
        element={
        //   <ProtectedRoute>
            <Exams />
        //   </ProtectedRoute>
        }
      />
      <Route
        path="/missednupcoming"
        element={
        //   <ProtectedRoute>
            <MissednUpcoming />
        //   </ProtectedRoute>
        }
      />
       {/* Default route for question paper */}
       <Route path="/questionpaper/:variant" element={<QuestionPaper />} />
      
      <Route
        path="/starttest"
        element={
        //   <ProtectedRoute>
            <StartTest />
        //   </ProtectedRoute>
        }
      />
      <Route
        path="/questions"
        element={
        //   <ProtectedRoute>
            <Questions />
        //   </ProtectedRoute>
        }
      />

      <Route path="/attend-test" element={<AttendTest />} />
      <Route path="*" element={<h1>Page Not Found</h1>} />


    </Routes>
  );
};

export default AppRoutes;