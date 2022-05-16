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
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");

  //------------------------------ Functions -----------------------------------------//

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    console.log("Received data from Solidity.");
    setIsElectionStarted(data[0]);
    setStoredElectionTitle(data[2]);
    setCurrentElectionPhase(data[4]);
  };

  const isAdmin = async () => {
    const data = await sol_isAdminAddress();
    setIsAdminConnected(data);
  };

  useEffect(() => {
    isAdmin();
  }, []);
  

  useEffect(()=>{
    getElectionDetails();
  },[currentElectionPhase])

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
