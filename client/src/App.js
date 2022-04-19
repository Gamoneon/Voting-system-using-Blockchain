import React, { Component } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import HomeScreen from "./screens/HomeScreen.js";
import Navbar from "./components/Navbar.js";

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <HomeScreen />
    </>
  );
};

export default App;
