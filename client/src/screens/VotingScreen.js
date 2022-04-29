import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import { sol_isAdminAddress } from "../webaction/SolidityFunctionModules.js";

const VotingScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//
  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const candidates = [
    {
      no: 1,
      name: "Sahil Kavitake",
      tagline: `I think no matter how hard the past is, you can always
  begin again and I believe every day is a chance to begin again.
  The only goal is to become better than yesterday...`,
    },
    {
      no: 2,
      name: "Soumya Singh",
      tagline: `A very talented lazy girl who can make everything possible...`,
    },
  ];

  //------------------------------ Functions -----------------------------------------//
  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (data) {
      navigate("/dashboard");
    }
    setIsAdminConnected(data);
  };

  useEffect(() => {
    routeValidation();
  });

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount account={account} />
      <ElectionInitializeMsg isAdmin={isAdminConnected} />
      <div
        className="alert alert-success text-center fw-bold mt-2"
        role="alert"
      >
        <h5>Go ahead and cast your vote !</h5>
      </div>

      <h4>Total Candidates : {candidates.length}</h4>

      {candidates.map((candidate, key) => {
        return (
          <div className="container bg-light p-4 mt-4">
            <div className="row align-items-center">
              <div className="col-9 ">
                <h5>Candiate {candidate.no}</h5>
                <div>
                  <h5>Name : {candidate.name}</h5>
                  <hr />
                  <p>{candidate.tagline}</p>
                </div>
              </div>
              <div className="col-3">
                <div class="d-grid gap-2 col-6 mx-auto">
                  <button type="button" className="btn btn-lg btn-success">
                    Vote
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default VotingScreen;
