import React from "react";
import styles from "./styles.module.css";

export default function SourceFile(props) {
  const { children, location } = props;
  return (
    <div className={styles.sourceFile}>
      <div className={styles.location}>{location}</div>
      {children}
    </div>
  );
}
