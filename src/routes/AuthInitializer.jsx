import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  userRoleState,
  isAuthenticatedState,
  authLoadingState
} from "../states/UserState";

const AuthInitializer = () => {
  const setUserRole = useSetRecoilState(userRoleState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setIsLoading = useSetRecoilState(authLoadingState);

  useEffect(() => {
    setIsLoading(true); // Start loading

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user?.role) {
      setUserRole(user.role);
      setIsAuthenticated(true);
    } else {
      setUserRole('');
      setIsAuthenticated(false);
    }

    setIsLoading(false); // Done loading
  }, []);

  return null;
};

export default AuthInitializer;
