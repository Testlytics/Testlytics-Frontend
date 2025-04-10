import { RecoilRoot } from "recoil";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar/Navbar";
import AuthInitializer from "./routes/AuthInitializer";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
      <AuthInitializer /> 
        <MainContent />
        
      </BrowserRouter>
    </RecoilRoot>
  );
}
 
function MainContent() {
  const location = useLocation();
 
  // List of routes where navbar should be visible
  const showNavbarPaths = [
    "/studentlist",
    "/overview",
    "/exam",
    "/exam/subjects",
    "/add-question",
    "/exam/questions",
    "/manage-users",
    "/reports",
    "/student-report",
    "/exams",
    "/missednupcoming",
    "/detailed-report",
    "/test-reports",
    "/question-paper",
    "/student-evaluated",
    "/change-password"
  ];
 
  const shouldShowNavbar = showNavbarPaths.some(path =>
    location.pathname.startsWith(path)
  );
 
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <AppRoutes />
    </>
  );
}
 
export default App;