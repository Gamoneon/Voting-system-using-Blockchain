import React from "react";
import Navbar from "../components/Navbar.js";

const HomeScreen = () => {
  const homescreenstyle = {
    minHeight: "100%",
    backgroundImage: `url("./Images/wallpaper4.png")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    width: "100vw",
    height: "84vh",
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
        <div></div>
        <h1 className="text-light">Blockchain in voting</h1>
      </div>
    </>
  );
};

export default HomeScreen;
