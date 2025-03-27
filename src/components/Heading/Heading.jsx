import React from "react";
import PropTypes from "prop-types";
import styles from "./heading.module.css";

const Heading = ({ text, size = "24px", align = "left", weight = "600" }) => {
  return (
    <h2
      className={styles.heading}
      style={{ fontSize: size, textAlign: align, fontWeight: weight }}
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
};

export default Heading;
