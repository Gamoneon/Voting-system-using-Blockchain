import React from "react";
import Navbar from "../components/Navbar.js";

const RegisterScreen = () => {
  const Registerscreenstyle = {
    height: "max-content",
  };
  const wallpaperstyle = {
    position: "absolute",
    zIndex:"-1",
    left: "0",
    width: "100vw",
    height: "84vh", 
  };
  const aboutregisterstyle = {
    width: "25%",
    background: "#696969",
    padding: "3%",
    float: "left",
    margin: "3%",
  };
  const submitHandler = () => {
    // prevent form loading
    console.log("Submit form");
    // disable input and button
    // show values
  };
    
  return(
    <>
   <Navbar />
   <div className="RegiterPageWallpaper" style={Registerscreenstyle}>
         <img
          src="./Images/wallpaper2.png"
          alt=""
          style={wallpaperstyle}
          cover="true"
        ></img> 
     
   <form onSubmit={submitHandler}>
          <div className="container text-light" style={aboutregisterstyle}>
            <div className="mb-3">
             <center><h3>Registration Form</h3></center>
              <label htmlFor="studentName" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="studentName"
                placeholder="Enter Your Name Here..."
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="studentEmail" className="form-label">
                Email
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
              <label htmlFor="studentPassword" className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control"
                   id="studentPassword">
                </input> 
            </div>
            <div className="mb-3">
              <div className="d-grid gap-2">
                <button className="btn btn-danger btn-lg" type="submit">
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

export default RegisterScreen;
