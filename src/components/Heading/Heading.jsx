import React from "react";
import PropTypes from "prop-types";
import styles from "./heading.module.css";

const Heading = ({ 
  text, 
  size = "24px", 
  align = "left", 
  weight = "600", 
  color = "#000000"  // ✅ Default color is black
}) => {
  return (
    <h2
      className={styles.heading}
      style={{ fontSize: size, textAlign: align, fontWeight: weight, color }}
    >
      {text}
    </h2>
  );
};

Heading.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  weight: PropTypes.oneOf(["300", "400", "500", "600", "700"]),
  color: PropTypes.string, // ✅ New color prop
};

export default Heading;
