import React from "react";
import Lottie from "lottie-react";
import animationData from "./404.json"; // adjust the path if needed
import styles from "./notFound.module.css";
import { useNavigate } from "react-router-dom";
 
const NotFound = () => {
  const navigate = useNavigate();
 
  return (
    <div className={styles.container}>
      <Lottie animationData={animationData} className={styles.lottie} />
      <h1 className={styles.title}>Oops! Page not found</h1>
      <p className={styles.text}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button className={styles.button} onClick={() => navigate("/overview")}>
        Go Back Home
      </button>
    </div>
  );
};
 
export default NotFound;