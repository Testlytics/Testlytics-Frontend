import "./App.css";
import Navbar from "./components/Navbar/Navbar"; 
import { RecoilRoot } from "recoil"; 
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes"; 

function App() {
  return (
    <RecoilRoot>
        <div className="App">
          <Navbar />
          <AppRoutes /> {/* ✅ Routes will handle navigation */}
        </div>
      
    </RecoilRoot>
  );
}

export default App;
