import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { 
  userRoleState, 
  isAuthenticatedState,
  userState,
  authLoadingState,
  authErrorState
} from "../../states/UserState";
import { authService } from "../../services/api";
import styles from "./login.module.css";
import LoginImage from "../../assets/images/Login.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Recoil state setters
  const setUserRole = useSetRecoilState(userRoleState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);
  const setUser = useSetRecoilState(userState);
  const setError = useSetRecoilState(authErrorState);
  const setLoading = useSetRecoilState(authLoadingState);
  
  // Recoil state values
  const error = useRecoilValue(authErrorState);
  const isLoading = useRecoilValue(authLoadingState);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
  
    try {
      const { token, user } = await authService.login({ email, password });
      
      if (!token) {
        throw new Error("Authentication token missing");
      }
  
      localStorage.setItem("token", token);
      setUser({
        email: user.email,
        role: user.role
      });
      setUserRole(user.role);
      setIsAuthenticated(true);
      
      navigate(user.role === "admin" ? "/studentlist" : "/student");
  
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className={styles.container}>
      {/* Left Side with Image */}
      <div className={styles.imageContainer}>
        <img src={LoginImage} alt="Login Illustration" />
      </div>

      {/* Right Side (Login Form) */}
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Testlytics</h1>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.inputBox}
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.inputBox}
            disabled={isLoading}
          />
        </div>

        <button 
          className={styles.loginButton} 
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className={styles.spinner}></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;