import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isAuthenticatedState, authLoadingState } from "../states/UserState";
// import LoadingSpinner from "./LoadingSpinner";
 
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const isLoading = useRecoilValue(authLoadingState);
 
//   if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
 
export default ProtectedRoute;