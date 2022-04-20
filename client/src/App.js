import React from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <main>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/register" element={<RegisterScreen />} />
              <Route exact path="/login" element={<LoginScreen />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
