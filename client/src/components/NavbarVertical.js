import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate , useLocation } from "react-router-dom";
import Logo from "./Logo.js";
import { sol_getElectionDetails } from "../webaction/SolidityFunctionModules.js";




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
   //assigning location variable
   const location = useLocation();

   //destructuring pathname from location
   const { pathname } = location;
    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");

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
    
  }, [props.isAdmin, props.username]);

  useEffect(() => {
    getElectionDetails();
  },[currentElectionPhase]);

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
                className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "electionsetup" ? "active" : ""}`} 
              >
                <i className="fa-solid fa-gears"></i> Election Setup
              </Link>
              {currentElectionPhase === "Voter Verification" && (
                <Link
                  to="/verification"
                  className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "verification" ? "active" : ""}`} 

                >
                  <i className="fa-solid fa-user-check"></i> Verification
                </Link>
              )}
              {currentElectionPhase === "Candidate Application" && (
                <Link
                  to="/candidateverification"
                  className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "candidateverification" ? "active" : ""}`} 

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
                className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "information" ? "active" : ""}`} 

              >
                <i className="fa-solid fa-circle-info"></i> Information
              </Link>

              <Link
                to="/voterverification"
                className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "voterverification" ? "active" : ""}`} 

              >
                <i className="fa-regular fa-id-card"></i> Voter Verification
              </Link>

              {currentElectionPhase === "Voting" && (
                <Link
                  to="/voting"
                  className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "voting" ? "active" : ""}`} 

                >
                  <i className="fa-solid fa-box-archive"></i> Voting
                </Link>
              )}
            </>
          )}
          {currentElectionPhase === "Result" && (
            <Link
              to="/result"
              className={`list-group-item list-group-item-action ${splitLocation[splitLocation.length-1] === "result" ? "active" : ""}`} 
          
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
