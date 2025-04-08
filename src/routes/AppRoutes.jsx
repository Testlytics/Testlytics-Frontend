// src/routes/AppRoutes.jsx
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
import ChangePassword from '../pages/ChangePassword/ChangePassword';
import ReportPage from '../pages/ReportPage/ReportPage'; // ✅ Import Report Page
import OverviewPage from '../pages/OverviewPage/OverviewPage';

import Exams from '../pages/Exams/Exams';

import QuestionPaper from '../pages/QuestionPaper/QuestionPaper';

import MissednUpcoming from '../pages/MissednUpcoming/MissednUpcoming';

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


      {/* ✅ Change Password Route */}
      <Route path="/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />

      {/* ✅ Protected Routes */}
      <Route path="/studentlist" element={<ProtectedRoute><StudentPage /></ProtectedRoute>} />
      <Route path="/overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
      <Route path="/studentexam" element={<ProtectedRoute><Exams /></ProtectedRoute>} />
      <Route path="/exam" element={<ProtectedRoute><ExamOverviewPage /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
      <Route path="/add-question" element={<ProtectedRoute><AddQuestionPage /></ProtectedRoute>} />
      <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
      <Route path="/manage-users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />

      {/* ✅ New Report Page Route */}
      <Route path="/report" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />

   
     

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
     

     <Route path="/attend-test/:testName" element={<AttendTest />} />

      <Route path="*" element={<h1>Page Not Found</h1>} />


    </Routes>
  );
};


export default AppRoutes;


