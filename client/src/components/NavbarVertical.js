import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.js";

const NavbarVertical = () => {
  const navigate = useNavigate();

  const navbarStyle = {
    position: "fixed",
    left: "0",
    display: "block",
    display: "flex",
    height: "100vh",
    width: "15vw",
  };

  const userDetailStyle = {
    color: "white",
  };

  const logoutHandler = () => {
    if (window.confirm("Are you sure want to logout ?")) {
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <div className="list-group bg-primary" style={navbarStyle}>
          <div className="list-group-item list-group-item-action disabled bg-primary">
            <Logo />
          </div>
          <div
            className="list-group-item list-group-item-action disabled bg-primary"
            style={userDetailStyle}
          >
            Sahil Kavitake <br />
            Role : Student
          </div>

          <Link
            to="/information"
            className="list-group-item list-group-item-action"
          >
            <i className="fa-solid fa-circle-info"></i> Information
          </Link>
          <Link
            to="/voterregistration"
            className="list-group-item list-group-item-action"
          >
            <i className="fa-regular fa-id-card"></i> Voter Registration
          </Link>
          <Link to="/voting" className="list-group-item list-group-item-action">
            <i className="fa-solid fa-box-archive"></i> Voting
          </Link>
          <Link
            to="/electionsetup"
            className="list-group-item list-group-item-action"
          >
            <i className="fa-solid fa-gears"></i> Election Setup
          </Link>
          <Link
            to="/verification"
            className="list-group-item list-group-item-action"
          >
            <i className="fa-solid fa-user-check"></i> Verification
          </Link>

          <Link to="/result" className="list-group-item list-group-item-action">
            <i className="fa-solid fa-square-poll-vertical"></i> Result
          </Link>
          <div
            onClick={logoutHandler}
            className="list-group-item list-group-item-action"
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarVertical;
