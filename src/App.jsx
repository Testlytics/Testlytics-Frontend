import "./App.css";
import StudentPage from "./pages/StudentPage/StudentPage";
import { RecoilRoot } from "recoil"; // ✅ Import RecoilRoot

function App() {
  return (
    <RecoilRoot> {/* ✅ Wrap everything inside RecoilRoot */}
      <div className="App">
        <StudentPage />
      </div>
    </RecoilRoot>
  );
}

export default App;
