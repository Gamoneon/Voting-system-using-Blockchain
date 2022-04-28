import React, { useState } from "react";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";

const ElectionSetupScreen = () => {
  //------------------------------ style CSS -----------------------------------------//
  const aboutelectionstyle = {
    width: "60%",
    background: "#FFF8DC",
    padding: "3%",
    margin: "2% auto",
  };

  //------------------------------ useState Hooks -----------------------------------------//
  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState(null);

  //------------------------------ Functions -----------------------------------------//
  const submitHandler = () => {
    // prevent form loading
    console.log("Submit form");
    // disable input and button
    // show values
  };
  return (
    <>
      <div className="container">
        <YourAccount account={account} />
        <ElectionInitializeMsg isAdmin={isAdmin} />
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