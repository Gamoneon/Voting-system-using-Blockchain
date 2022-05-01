import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.js";

const NavbarVertical = (props) => {
  //------------------------------ Style CSS -----------------------------------------//
  const navbarStyle = {
    position: "fixed",
    left: "0",
    display: "flex",
    height: "100vh",
    width: "15vw",
  };

  const userDetailStyle = {
    color: "white",
    background: "#696969", // by soumya singh
  };

  //------------------------------ useState Hooks -----------------------------------------//
  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [username, setUsername] = useState("");

  //------------------------------ Functions -----------------------------------------//
  const logoutHandler = () => {
    if (window.confirm("Are you sure want to logout ?")) {
      navigate("/");
    }
  };

  useEffect(() => {
    setIsAdminConnected(props.isAdmin);
    setUsername(props.username);
  }, [props.isAdmin, props.username]);

  return (
    <>
      <div>
        <div className="list-group bg-primary" style={navbarStyle}>
          <div className="list-group-item list-group-item-action disabled bg-primary">
            <Logo />
          </div>
          <div
            className="list-group-item list-group-item-action disabled "
            style={userDetailStyle}
          >
            {username} <br />
            Role : {isAdminConnected ? "Admin" : "Student"}
          </div>

          <Link
            to="/information"
            className="list-group-item list-group-item-action"
          >
            <i className="fa-solid fa-circle-info"></i> Information
          </Link>
          {isAdminConnected ? (
            <>
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
            </>
          ) : (
            <>
              <Link
                to="/voterregistration"
                className="list-group-item list-group-item-action"
              >
                <i className="fa-regular fa-id-card"></i> Voter Verification
              </Link>
              <Link
                to="/voting"
                className="list-group-item list-group-item-action"
              >
                <i className="fa-solid fa-box-archive"></i> Voting
              </Link>
            </>
          )}
          <Link to="/result" className="list-group-item list-group-item-action">
            <i className="fa-solid fa-square-poll-vertical"></i> Result
          </Link>
          <div
            onClick={logoutHandler}
            className="list-group-item list-group-item-action bg-danger"
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
