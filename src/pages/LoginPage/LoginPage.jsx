import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { userRoleState, isAuthenticatedState } from "../../state/UserState";
import styles from "./login.module.css";
import LoginImage from "../../assets/images/Login.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setUserRole = useSetRecoilState(userRoleState);
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedState);

  const handleLogin = () => {
    if (email === "admin@test.com" && password === "admin123") {
      setUserRole("admin");
      setIsAuthenticated(true);
    } else if (email === "student@test.com" && password === "student123") {
      setUserRole("student");
      setIsAuthenticated(true);
    } else {
      setError("Invalid email or password!");
    }
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

        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputBox}
        />

        <label className={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputBox}
        />

        <button className={styles.loginButton} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
