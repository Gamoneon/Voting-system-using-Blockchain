import React from "react";
import Navbar from "../components/Navbar.js";

const HomeScreen = () => {
  const homescreenstyle = {
    height: "max-content",
  };
  const wallpaperstyle = {
    position: "relative",
    left: "0",
    width: "100vw",
    height: "84vh",
  };
  return (
    <>
      <Navbar />
      <div className="HomePageWallpaper" style={homescreenstyle}>
        <img
          src="./Images/wallpaper1.png"
          alt=""
          style={wallpaperstyle}
          cover="true"
        ></img>
      </div>
    </>
  );
};

export default HomeScreen;
