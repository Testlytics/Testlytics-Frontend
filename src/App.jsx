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
<<<<<<< HEAD

function MainContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login"]; // Add more paths if needed

=======
 
function MainContent() {
  const location = useLocation();
  const hideNavbarPaths = ["/login"]; // Add more paths if needed
 
>>>>>>> feature-adith
  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </>
  );
}
<<<<<<< HEAD

export default App;
=======
 
export default App;
>>>>>>> feature-adith
