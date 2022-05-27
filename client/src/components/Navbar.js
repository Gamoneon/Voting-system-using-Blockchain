import React from "react";
import { Link , useLocation} from "react-router-dom";
import Logo from "./Logo.js";

const Navbar = () => {
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const headerstyle = {
    fontSize: "1.3rem",
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <Logo />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="nav navbar-nav">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={headerstyle}>
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${splitLocation[splitLocation.length-1] === "" ? "active" : ""}`}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className={`nav-link ${splitLocation[splitLocation.length-1] === "register" ? "active" : ""}`}
                 >

                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/adminlogin" className={`nav-link ${splitLocation[splitLocation.length-1] === "adminlogin" ? "active" : ""}`}
                 >

                    Admin Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className={`nav-link ${splitLocation[splitLocation.length-1] === "login" ? "active" : ""}`}
                  >
                   Student Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
