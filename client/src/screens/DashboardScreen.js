import React from "react";
import NavbarVertical from "../components/NavbarVertical.js";

const DashboardScreen = (props) => {
  const floatleftstyle = {
    float: "left",
  };

  return (
    <>
      <div style={floatleftstyle}>
        <NavbarVertical />
      </div>
      <div style={floatleftstyle}>{props.component}</div>
    </>
  );
};

export default DashboardScreen;
