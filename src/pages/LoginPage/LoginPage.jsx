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
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
 
    setLoading(true);
    setError(""); // Reset error message
 
    try {
      const { token, user } = await authService.login({ email, password });
      
      if (!token) throw new Error("Authentication token missing");
      
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify({ email: user.email, role: user.role }));

setUser({ email: user.email, role: user.role });
setUserRole(user.role);
setIsAuthenticated(true);

      
      navigate(user.role === "admin" ? "/overview" : "/overview");
    } catch (err) {
      setError(() => err.response?.data?.message || "Invalid credentials");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // ✅ Prevents page refresh
      handleLogin();
    }
  };
 
  return (
    <div className={styles.container}>
      {/* Left Side with Image */}
      <div className={styles.imageContainer}>
        <img src={LoginImage} alt="Login Illustration" />
      </div>
 
      {/* Right Side (Login Form) */}
      <div className={styles.loginBox} onSubmit={(e) => e.preventDefault()}>
        <h1 className={styles.title}>Testlytics</h1>
 
        {error && <p className={styles.error}>{error}</p>}
 
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          
          <input
            id="email"
            
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${styles.inputBox} ${error ? styles.inputError : ""}`}
            disabled={isLoading}
            aria-label="Enter your email"
          
          />
        </div>
 
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password</label>
          
          <input
            id="password"
           
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${styles.inputBox} ${error ? styles.inputError : ""}`}
            disabled={isLoading}
            aria-label="Enter your password"
            
          />
        </div>
 
        <button
          className={styles.loginButton}
          onClick={handleLogin}
          disabled={isLoading}
          aria-busy={isLoading}
         
        >
          {isLoading ? <span className={styles.spinner}></span> : "Login"}
        
        </button>
      </div>
    </div>
  );
};
 
export default LoginPage;
