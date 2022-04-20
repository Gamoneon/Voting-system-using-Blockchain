import React from "react";
import { Link } from "react-router-dom";

const NavbarVertical = () => {
  const navbarStyle = {
    height: "100vh",
    width: "15vw",
  };

  return (
    <>
      <div>
        <ul
          className="nav flex-column nav-pills  bg-primary"
          style={navbarStyle}
        >
          <li className="nav-item">
            <Link className="navbar-brand" to="/dashboard">
              LOGO
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/information">
              Information
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/voterregistration">
              Voter Registration
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/voting">
              Voting
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/results">
              Results
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarVertical;
