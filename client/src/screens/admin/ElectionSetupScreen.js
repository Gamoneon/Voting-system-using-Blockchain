import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";
import {
  sol_isAdminAddress,
  sol_startElection,
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
  const [electionTitle, setElectionTitle] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const navigate = useNavigate();
  //------------------------------ Functions -----------------------------------------//

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (!data) {
      navigate("/dashboard");
    }
    setIsAdminConnected(data);
  };

  const startElection = async () => {
    const data = await sol_startElection();
    console.log("Election details on screen :", data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    startElection(electionTitle, organizationName);
    // disable input and button
    // show values
  };

  useEffect(() => {
    routeValidation();
  });

  return (
    <>
      <div className="container">
        <YourAccount />
        <ElectionInitializeMsg isAdmin={isAdminConnected} />
        <h3>About Election</h3>
        <form onSubmit={submitHandler}>
          <div className="container" style={aboutelectionstyle}>
            <div className="mb-3">
              <label htmlFor="electionTitle" className="form-label">
                Election Title
              </label>
              <input
                type="text"
                className="form-control"
                id="electionTitle"
                placeholder="e.g. Class Representative"
                value={electionTitle}
                onChange={(e) => setElectionTitle(e.target.value)}
                required
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="organizationName" className="form-label">
                Organization Name
              </label>
              <input
                type="text"
                className="form-control"
                id="organizationName"
                placeholder="e.g. S.Y.M.Sc. Computer Science"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
              ></input>
            </div>
            <div className="mb-3">
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg" type="submit">
                  Start Election
                </button>
              </div>
            </div>
          </div>
        </form>
        <h3>Change Phase</h3>
        <div className="container" style={aboutelectionstyle}>
          <h4>
            Current Phase : <span className="text-success">Registration</span>
          </h4>
          <h4>
            Next Phase :{" "}
            <span className="text-danger">Apply for Candidate</span>
          </h4>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary btn-lg" type="button">
              Change Phase
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionSetupScreen;
