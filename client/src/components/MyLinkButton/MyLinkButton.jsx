import React from "react";
import { Link } from "react-router-dom";
import styles from "./mylink.module.scss";
const MyLinkButton = ({ children, to }) => {
  return (
    <Link to={to} className={styles.button}>
      {" "}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
    </Link>
  );
};

export default MyLinkButton;
