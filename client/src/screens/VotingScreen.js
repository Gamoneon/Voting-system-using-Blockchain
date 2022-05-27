import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import {
  sol_getAllVoterDetails,
  sol_isAdminAddress,
  sol_getUserDetails,
  sol_hasVoted,
  sol_addVote,
  sol_getElectionDetails
} from "../webaction/SolidityFunctionModules.js";

const VotingScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//
  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [candidateData, setCandidateData] = useState([]);
  const [isVerified, setIsVerified] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");

 //------------------------------ style CSS -----------------------------------------//

  const divisionstyle = {
    width: "50%",
    background: "#C2DAF7",
    padding: "2%",
    margin: "3% auto",
  };

  //------------------------------ Functions -----------------------------------------//

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (data) {
      navigate("/dashboard");
    }
    setIsAdminConnected(data);
  };

  const hasCastedVote = async () => {
    setHasVoted(await sol_hasVoted());
  };
  const onClickVote = async (candidateAddress) => {
    const vote = await sol_addVote(candidateAddress);
    hasCastedVote();
  };

  const getUserDetails = async () => {
    const data = await sol_getUserDetails();
    if (!data) {
      navigate("/login");
    }
    setIsVerified(data["voterElectionDetails"]["isVerified"]);
  };

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    let allCandidateDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["voterAddress"] = data[i]["voterAddress"];
        temp["username"] = data[i]["username"];
        temp["isCandidate"] = data[i]["voterElectionDetails"]["isCandidate"];
        temp["tagLine"] = data[i]["voterElectionDetails"]["tagLine"];

        if (temp["isCandidate"]) {
          allCandidateDetails.push(temp);
        }
      }

      setCandidateData([...allCandidateDetails]);
    }
  };

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setCurrentElectionPhase(data[3]);
  };

  useEffect(() => {
    getUserDetails();
  },[]);

  useEffect(() => {
    getElectionDetails();
    routeValidation();
  },[]);

  useEffect(() => {
    hasCastedVote();
    getAllVoterDetails();
  }, [hasVoted]);

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount/>
      <ElectionInitializeMsg/>
      {!isVerified && (
              <div
                className="text-center bg-danger text-light fw-bold fs-4"
                style={divisionstyle}
              >
                <div>You are not verified as a voter.</div>
                <div>You can not cast vote.</div>
              </div>
            )}
      { currentElectionPhase === "Voting" && isVerified &&
      <>
      <div
        className="alert alert-success text-center fw-bold mt-2"
        role="alert"
      >
        {!hasVoted ? (
          <h5>Go ahead and cast your vote!</h5>
        ) : (
          <>
            <h5>You have successfully voted. </h5>
            <h5>Now wait for the results.</h5>
            <h5> Thank you!</h5>
          </>
        )}
      </div>
      
      <h4>Total Candidates: {candidateData.length}</h4>

      {candidateData.map((candidate, key) => {
        return (
          <div className="container bg-light p-4 mt-4" key={key}>
            {candidate.isCandidate && (
              <>
                <div className="row align-items-center">
                  <div className="col-9 ">
                    <h5>Candidate</h5>
                    <div>
                      <h5>Name: {candidate.username}</h5>
                      <hr />
                      <p>{candidate.tagLine}</p>
                    </div>
                  </div>
                  <div className="col-3">
                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        type="button"
                        className="btn btn-lg btn-success"
                        disabled={hasVoted ? true : false}
                        onClick={() => onClickVote(candidate.voterAddress)}
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
      </>
      }
    </>
  );
};

export default VotingScreen;
