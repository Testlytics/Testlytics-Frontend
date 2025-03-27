import "./App.css";
import SubjectPage from "./pages/SubjectPage/SubjectPage";
import StudentPage from "./pages/StudentPage/StudentPage";
import AddQuestionPage from "./pages/AddQuestionPage/AddQuestionPage";
import Navbar from "./components/Navbar/Navbar"; // ✅ Import Navbar
import { RecoilRoot } from "recoil"; // ✅ Import RecoilRoot

function App() {
  return (
    <RecoilRoot> {/* ✅ Wrap everything inside RecoilRoot */}
      <div className="App">
        <Navbar /> {/* ✅ Navbar stays constant */}
        <SubjectPage />
      </div>
    </RecoilRoot>
  );
}

export default App;
