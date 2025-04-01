import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubjectPage from "../pages/SubjectPage/SubjectPage";
import ExamOverviewPage from "../pages/ExamOverviewPage/ExamOverviewPage";
import AddQuestionPage from "../pages/AddQuestionPage/AddQuestionPage";
import Questions from "../pages/Questions/Questions";
import LoginPage from "../pages/LoginPage/LoginPage";
import StudentPage from "../pages/StudentPage/StudentPage";
import ManageUsersPage from "../pages/ManageUsersPage/ManageUsersPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExamOverviewPage />} />
        <Route path="/subjects" element={<SubjectPage />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;