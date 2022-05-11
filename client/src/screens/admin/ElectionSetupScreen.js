import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";
import AlertMessage from "../../components/AlertMessage.js";

import {
  sol_isAdminAddress,
  sol_startElection,
  sol_getElectionDetails,
  sol_changeElectionPhase,
} from "../../webaction/SolidityFunctionModules.js";

const ElectionSetupScreen = () => {
  //------------------------------ style CSS -----------------------------------------//
  const aboutelectionstyle = {
    width: "60%",
    background: "#FFF8DC",
    padding: "3%",
    margin: "2% auto",
  };

  //------------------------------ useState Hooks -----------------------------------------//
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [errorPendingRequests, setErrorPendingRequests] = useState("");
  const [electionTitle, setElectionTitle] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [storedElectionTitle, setStoredElectionTitle] = useState("");
  const [storedOrganizationName, setStoredOrganizationName] = useState("");
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [isElectionEnded, setIsElectionEnded] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");
  const [nextElectionPhase, setNextElectionPhase] = useState("");
  const navigate = useNavigate();
  //------------------------------ Functions -----------------------------------------//

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (!data) {
      navigate("/dashboard");
    }
    setIsAdminConnected(data);
  };

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setIsElectionStarted(data[0]);
    setIsElectionEnded(data[1]);
    setStoredElectionTitle(data[2]);
    setStoredOrganizationName(data[3]);
    setCurrentElectionPhase(data[4]);
    setNextElectionPhase(data[5]);
  };

  const changeElectionPhase = async () => {
    const data = await sol_changeElectionPhase();
    if(!data) setErrorPendingRequests("Please clear all pending requests first.")
    getElectionDetails();
    // window.location.reload(false);
  };

  const startElection = async (electionTitle, organizationName) => {
    const data = await sol_startElection(electionTitle, organizationName);
    if (data) {
      getElectionDetails();
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    startElection(electionTitle, organizationName);
  };

  useEffect(() => {
    routeValidation();
    getElectionDetails();
  },[]);

  // useEffect(() => {}, [errorPendingRequests]);

  return (
    <>
      <div className="container">
        <YourAccount />
        <ElectionInitializeMsg />
        {isElectionStarted && (
          <>
            {errorPendingRequests && (
              <AlertMessage type="danger" message={errorPendingRequests} />
            )}
            <h3>Change Phase</h3>
            <div className="container" style={aboutelectionstyle}>
              <h4>
                Current Phase :{" "}
                <span className="text-success">{currentElectionPhase}</span>
              </h4>
              <h4>
                Next Phase :{" "}
                <span className="text-danger">{nextElectionPhase}</span>
              </h4>
              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={changeElectionPhase}
                >
                  Change Phase
                </button>
              </div>
            </div>
          </>
        )}
        {!isElectionStarted && (
          <>
            <h3>About Election</h3>
            <form onSubmit={submitHandler}>
              <div className="container" style={aboutelectionstyle}>
                <div className="mb-3">
                  <label htmlFor="electionTitle" className="form-label">
                    Election Title
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    id="electionTitle"
                    onChange={(e) => setElectionTitle(e.target.value)}
                    required
                  >
                    <option defaultValue hidden>
                      Choose Title
                    </option>
                    <option value="Class Representative">
                      Class Representative
                    </option>
                    <option value="Placement Coordinator">
                      Placement Coordinator
                    </option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="organizationName" className="form-label">
                    Class Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="organizationName"
                    placeholder="e.g. S.Y.M.Sc. Computer Science"
                    // value={isElectionStarted && storedOrganizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="mb-3">
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-lg"
                      type="submit"
                      disabled={isElectionStarted}
                    >
                      Start Election
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default ElectionSetupScreen;
