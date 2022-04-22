import React from "react";
import Navbar from "../components/Navbar.js";

const LoginScreen = () => {
  return (
    
    <>
     <Navbar />
      <div className="LoginPageWallpaper">
        <img
          src="./Images/wallpaper2.png"
          alt=""
          style={{
            position: "absolute",
            left: "0",
            width: "100%",
            height: "100%",
          }}
          cover
        />
      </div>
     

    </>
  );
};

export default LoginScreen;
