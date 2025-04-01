import { RecoilRoot } from "recoil";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </RecoilRoot>
  );
}

function MainContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login"]; // Add more paths if needed

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </>
  );
}

export default App;