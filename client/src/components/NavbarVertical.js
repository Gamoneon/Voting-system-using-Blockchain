import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.js";
import { sol_getElectionDetails } from "../webaction/SolidityFunctionModules.js";
import $ from 'jquery'



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
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");

  //------------------------------ Functions -----------------------------------------//

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setCurrentElectionPhase(data[4]);
  };

  const logoutHandler = () => {
    if (window.confirm("Are you sure want to logout ?")) {
      navigate("/");
    }
  };

  useEffect(() => {
    setIsAdminConnected(props.isAdmin);
    setUsername(props.username);
    getElectionDetails();
  }, [props.isAdmin, props.username, currentElectionPhase]);

  useEffect(() => {
    if($){
      $("a.list-group-item-action").on("click",function() {
              
        // Select all list items
        var listItems = $("a.list-group-item-action");
          
        // Remove 'active' tag for all list items
        for (let i = 0; i < listItems.length; i++) {
            listItems[i].classList.remove("active");
        }
          
        // Add 'active' tag for currently selected item
        this.classList.add("active");
        $(".active").attr("aria-current", true);
    });
     }
   },[$])

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

          {isAdminConnected ? (
            <>
              <Link
                to="/electionsetup"
                className="list-group-item list-group-item-action"
              >
                <i className="fa-solid fa-gears"></i> Election Setup
              </Link>
              {currentElectionPhase === "Voter Verification" && (
                <Link
                  to="/verification"
                  className="list-group-item list-group-item-action"
                >
                  <i className="fa-solid fa-user-check"></i> Verification
                </Link>
              )}
              {currentElectionPhase === "Apply as a Candidate" && (
                <Link
                  to="/candidateverification"
                  className="list-group-item list-group-item-action"
                >
                  <i className="fa-solid fa-user-check"></i> Candidate
                  Verification
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                to="/information"
                className="list-group-item list-group-item-action"
              >
                <i className="fa-solid fa-circle-info"></i> Information
              </Link>

              <Link
                to="/voterverification"
                className="list-group-item list-group-item-action"
              >
                <i className="fa-regular fa-id-card"></i> Voter Verification
              </Link>

              {currentElectionPhase === "Voting" && (
                <Link
                  to="/voting"
                  className="list-group-item list-group-item-action"
                >
                  <i className="fa-solid fa-box-archive"></i> Voting
                </Link>
              )}
            </>
          )}
          {currentElectionPhase === "Result" && (
            <Link
              to="/result"
              className="list-group-item list-group-item-action"
            >
              <i className="fa-solid fa-square-poll-vertical"></i> Result
            </Link>
          )}
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
