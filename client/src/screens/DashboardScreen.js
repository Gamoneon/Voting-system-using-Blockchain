import React from "react";
import NavbarVertical from "../components/NavbarVertical.js";

const DashboardScreen = (props) => {
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

  return (
    <>
      <div style={floatleftstyle}>
        <NavbarVertical />
      </div>

      <div style={rightScreenStyle}>{props.component}</div>
    </>
  );
};

export default DashboardScreen;
