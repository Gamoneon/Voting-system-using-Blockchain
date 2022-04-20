import React from "react";
import Navbar from "../components/Navbar.js";

const HomeScreen = () => {
  return (
    <>
      <Navbar />
      <div className="HomePageWallpaper">
        <img
          src="./Images/wallpaper1.png"
          alt=""
          style={{
            position: "absolute",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          cover="true"
        />
      </div>
    </>
  );
};

export default HomeScreen;
