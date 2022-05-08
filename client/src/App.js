import React from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import DashboardScreen from "./screens/DashboardScreen.js";
import InformationScreen from "./screens/InformationScreen.js";
import VoterVerificationScreen from "./screens/VoterVerificationScreen.js";
import ElectionSetupScreen from "./screens/admin/ElectionSetupScreen.js";
import VerificationScreen from "./screens/admin/VerificationScreen.js";
import CandidateVerificationScreen from "./screens/admin/CandidateVerificationScreen.js";
import VotingScreen from "./screens/VotingScreen.js";
import ResultScreen from "./screens/ResultScreen.js";
import Footer from "./components/Footer.js";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <main>
          <div>
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/register" element={<RegisterScreen />} />
              <Route exact path="/login" element={<LoginScreen />} />
              <Route
                exact
                path="/dashboard"
                element={<DashboardScreen component={<InformationScreen />} />}
              />
              <Route
                exact
                path="/information"
                element={<DashboardScreen component={<InformationScreen />} />}
              />
              <Route
                exact
                path="/voterverification"
                element={
                  <DashboardScreen component={<VoterVerificationScreen />} />
                }
              />
              <Route
                exact
                path="/voting"
                element={<DashboardScreen component={<VotingScreen />} />}
              />

              <Route
                exact
                path="/electionsetup"
                element={
                  <DashboardScreen component={<ElectionSetupScreen />} />
                }
              />

              <Route
                exact
                path="/verification"
                element={<DashboardScreen component={<VerificationScreen />} />}
              />

              <Route
                exact
                path="/candidateverification"
                element={
                  <DashboardScreen
                    component={<CandidateVerificationScreen />}
                  />
                }
              />

              <Route
                exact
                path="/result"
                element={<DashboardScreen component={<ResultScreen />} />}
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </>
  );
};

export default App;
