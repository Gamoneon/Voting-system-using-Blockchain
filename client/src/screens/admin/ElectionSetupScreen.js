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
  sol_resetElection,
  sol_isPendingRequest,
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

  const [errorPendingRequests, setErrorPendingRequests] = useState("");
  const [electionTitle, setElectionTitle] = useState("");
  const [classes, setClasses] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [isElectionStarted, setIsElectionStarted] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");
  const [nextElectionPhase, setNextElectionPhase] = useState("");
  const navigate = useNavigate();
  //------------------------------ Functions -----------------------------------------//

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (!data) {
      navigate("/dashboard");
    }
  };

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setIsElectionStarted(data[0]);
    setCurrentElectionPhase(data[3]);
    setNextElectionPhase(data[4]);
  };

  const changeElectionPhase = async () => {
    const data = await sol_isPendingRequest();
    if (!data) {
      const data = await sol_changeElectionPhase();
      window.location.reload(false);
    } else {
      setErrorPendingRequests("Please clear all pending requests first.");
    }
  };

  const startElection = async (electionTitle) => {
    let organizationName = classes + " " + degree + " " + stream;
    const data = await sol_startElection(electionTitle, organizationName);
    if (data) {
      getElectionDetails();
    }
    window.location.reload(false);
  };

  const resetElection = async () => {
    await sol_resetElection();
    getElectionDetails();
    window.location.reload(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    startElection(electionTitle);
  };

  useEffect(() => {
    routeValidation();
    getElectionDetails();
  }, [currentElectionPhase]);

  return (
    <>
      <div className="container">
        <YourAccount />
        <ElectionInitializeMsg currentElectionPhase={currentElectionPhase} />
        {isElectionStarted && (
          <>
            {errorPendingRequests && (
              <AlertMessage type="danger" message={errorPendingRequests} />
            )}
            <h3>Change Phase</h3>
            <div className="container" style={aboutelectionstyle}>
              <h4>
                Current Phase:{" "}
                <span className="text-success">{currentElectionPhase}</span>
              </h4>
              {nextElectionPhase === "Setup Election" ? (
                <>
                  <h4>
                    <span className="text-danger">Election Ended.</span>
                  </h4>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      className="btn btn-primary btn-lg"
                      type="button"
                      onClick={resetElection}
                    >
                      Reset Election
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4>
                    Next Phase:{" "}
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
                </>
              )}
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
                    <option hidden>Choose Title</option>
                    <option value="Class Representative">
                      Class Representative
                    </option>
                    <option value="Placement Coordinator">
                      Placement Coordinator
                    </option>
                  </select>
                </div>

                <div className="row align-items-center">
                  <div className="col-4 ">
                    <label htmlFor="electionClassYear" className="form-label">
                      Class Year
                    </label>
                  </div>
                  <div className="col-4">
                    <label htmlFor="electionClassDegree" className="form-label">
                      Choose Degree
                    </label>
                  </div>
                  <div className="col-4">
                    <label htmlFor="electionStream" className="form-label">
                      Choose Stream
                    </label>
                  </div>
                </div>
                <div className="row align-items-center mb-3">
                  <div className="col-4 ">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="electionClassYear"
                      onChange={(e) => setClasses(e.target.value)}
                      required
                    >
                      <option hidden>Choose Class Year</option>
                      <option value="FY">FY</option>
                      <option value="SY">SY</option>
                      <option value="TY">TY</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="electionClassDegree"
                      onChange={(e) => setDegree(e.target.value)}
                      required
                    >
                      <option hidden>Choose Degree</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="M.Sc">M.Sc</option>
                    </select>
                  </div>
                  <div className="col-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      id="electionStream"
                      onChange={(e) => setStream(e.target.value)}
                      required
                    >
                      <option hidden>Choose Stream</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Computer Application">
                        Computer Application
                      </option>
                      <option value="IMCA">IMCA</option>
                    </select>
                  </div>
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
