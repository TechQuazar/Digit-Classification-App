import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Digit Recognition using CNN</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    fontSize: "24px",
    margin: "0",
  },
};

export default Header;
