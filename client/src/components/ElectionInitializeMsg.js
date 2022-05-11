import React, { useState, useEffect } from "react";
import {
  sol_isAdminAddress,
  sol_getElectionDetails,
} from "../webaction/SolidityFunctionModules.js";

const ElectionInitializeMsg = () => {
  //------------------------------ style CSS -----------------------------------------//
  const bgstyle = {
    background: "#ffdd99",
  };

  //------------------------------ useState Hooks -----------------------------------------//
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [storedElectionTitle, setStoredElectionTitle] = useState("");
  const [storedOrganizationName, setStoredOrganizationName] = useState("");
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [isElectionEnded, setIsElectionEnded] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");
  const [nextElectionPhase, setNextElectionPhase] = useState("");
  //------------------------------ Functions -----------------------------------------//

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setIsElectionStarted(data[0]);
    setIsElectionEnded(data[1]);
    setStoredElectionTitle(data[2]);
    setStoredOrganizationName(data[3]);
    setCurrentElectionPhase(data[4]);
    setNextElectionPhase(data[5]);
  };

  const isAdmin = async () => {
    const data = await sol_isAdminAddress();
    setIsAdminConnected(data);
  };

  useEffect(() => {
    isAdmin();
    getElectionDetails();
    // console.log(isAdminConnected);
  },[]);
  //------------------------------ Render Content -----------------------------------------//
  return (
    <div
      className="alert alert-light text-center fw-bold mt-2"
      style={bgstyle}
      role="alert"
    >
      {isElectionStarted ? (
        <>
          <h3>
            The election for the role of {storedElectionTitle} has been started!
          </h3>
          <p>
            Current Election Phase is:{" "}
            <span className="text-success">{currentElectionPhase}</span>
          </p>
        </>
      ) : (
        <>
          <h3>The election has not been initialized yet!</h3>
          {isAdminConnected ? (
            <p>Set up the election.</p>
          ) : (
            <p>Please wait till the admin starts the election</p>
          )}
        </>
      )}
    </div>
  );
};

export default ElectionInitializeMsg;
