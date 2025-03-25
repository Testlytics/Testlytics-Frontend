import "./App.css";
import StudentPage from "./pages/StudentPage/StudentPage";
import { RecoilRoot } from "recoil"; // ✅ Import RecoilRoot
import TestReports from "./pages/TestReports/TestReports";

function App() {
  return (
    <RecoilRoot> {/* ✅ Wrap everything inside RecoilRoot */}
      <div className="App">
        <StudentPage />
        <TestReports />

      </div>
    </RecoilRoot>
  );
}

export default App;
