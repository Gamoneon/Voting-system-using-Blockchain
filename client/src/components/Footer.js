import React from "react";

const Footer = () => {
  const footerStyle = {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  };

  return (
    <footer className="footer bg-primary text-light p-3" style={footerStyle}>
      <div className="container">&copy; Copyright Blockchain</div>
    </footer>
  );
};

export default Footer;
