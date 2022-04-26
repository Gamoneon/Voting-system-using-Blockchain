import React from "react";
import Navbar from "../components/Navbar.js";

const LoginScreen = () => {
  const Loginscreenstyle = {
    height: "max-content",
  };
  const wallpaperstyle = {
    position: "absolute",
    zIndex: "-1",
    left: "0",
    width: "100vw",
    height: "84vh",
  };
  const aboutloginstyle = {
    width: "25%",
    background: "#23263F",
    padding: "3%",
    float: "left",
    margin: "3%",
    borderRadius: "20px",
  };
  const submitHandler = () => {
    // prevent form loading
    console.log("Submit form");
    // disable input and button
    // show values
  };
  return (
    <>
      <Navbar />
      <div className="LoginPageWallpaper" style={Loginscreenstyle}>
        <img
          src="./Images/wallpaper2.png"
          alt=""
          style={wallpaperstyle}
          cover="true"
        ></img>

        <form onSubmit={submitHandler}>
          <div className="container text-light" style={aboutloginstyle}>
            <div className="mb-3">
              <center>
                <h3>Login</h3>
              </center>
            </div>
            <div className="mb-3">
              <label htmlFor="studentEmail" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="studentEmail"
                placeholder="e.g. XYZ@gmail.com"
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="studentPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="studentPassword"
              ></input>
            </div>
            <div className="mb-3">
              <div className="d-grid gap-2">
                <button className="btn btn-warning btn-lg mt-4" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginScreen;
