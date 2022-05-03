import React from "react";
import Navbar from "../components/Navbar.js";
import { Link } from "react-router-dom";
const HomeScreen = () => {
  //------------------------------ Style CSS -----------------------------------------//
  const homescreenstyle = {
    minHeight: "100%",
    backgroundImage: `url("./Images/wallpaper4.png")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    width: "100vw",
    height: "84vh",
  };
  const headerstyle = {
    fontFamily: "Monserrat , sansserif",
    fontSize: "40px",
    color: "white",
    textalign: "center",
    position: "absolute",
    top: "40%",
    left: "40%",
    transform: "translate(-50%, -50%)",
  };
  const buttonstyle = {
    fontFamily: "Monserrat , sansserif",
    border: "none",
    fontSize: "1.5rem",
    borderRadius: "10px",
    opacity: "0.",
  };

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <Navbar />
      <div className="HomePageWallpaper" style={homescreenstyle}>
        <div className="content" style={headerstyle}>
          <h1>BLOCKCHAIN IN VOTING</h1>
          <h3>THE DIGITAL VOTING SYSTEM</h3>
          <Link to="/register">
            <button className="btn btn-light btn-lg" style={buttonstyle}>
              Register Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
