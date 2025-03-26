import "./App.css";
import StudentPage from "./pages/StudentPage/StudentPage";
import AddQuestionPage from "./pages/AddQuestionPage/AddQuestionPage";
import { RecoilRoot } from "recoil"; // ✅ Import RecoilRoot

function App() {
  return (
    <RecoilRoot> {/* ✅ Wrap everything inside RecoilRoot */}
      <div className="App">
        <AddQuestionPage />
      </div>
    </RecoilRoot>
  );
}

export default App;
