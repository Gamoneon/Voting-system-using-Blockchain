import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarVertical from "../components/NavbarVertical.js";
import {
  sol_getUserDetails,
  sol_isAdminAddress,
} from "../webaction/SolidityFunctionModules.js";

const DashboardScreen = (props) => {
  //------------------------------ Style CSS -----------------------------------------//
  const floatleftstyle = {
    float: "left",
  };

  const rightScreenStyle = {
    float: "left",
    width: "80vw",
    height: "auto",
    margin: "auto",
    marginLeft: "16vw",
    marginBottom: "15vh",
    // backgroundImage: `url("./Images/wallpaper3.png")`,
  };

  //------------------------------ useState Hooks -----------------------------------------//
  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [username, setUsername] = useState("");

  //------------------------------ Functions -----------------------------------------//

  const isAdmin = async () => {
    const data = await sol_isAdminAddress();
    setIsAdminConnected(data);
  };

  const getUserDetails = async () => {
    const data = await sol_getUserDetails();
    if (!data) {
      navigate("/login");
    }
    setUsername(data[3]);
  };

  useEffect(() => {
    isAdmin();
    getUserDetails();
    // console.log(isAdminConnected);
  });

  return (
    <>
      <div style={floatleftstyle}>
        <NavbarVertical
          isAdmin={isAdminConnected ? true : false}
          username={username}
        />
      </div>

      <div style={rightScreenStyle}>{props.component}</div>
    </>
  );
};

export default DashboardScreen;
