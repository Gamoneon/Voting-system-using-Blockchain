import React from "react";

const Footer = () => {
  const footerStyle = {
    position: "absolute",
    bottom: "0",
    width: "100%",
  };

  return (
    <footer className="footer bg-primary text-light p-4" style={footerStyle}>
      <div className="container">&copy; Copyright Blockchain</div>
    </footer>
  );
};

export default Footer;
