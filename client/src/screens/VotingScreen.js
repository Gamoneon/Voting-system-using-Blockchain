import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import {
  sol_getAllVoterDetails,
  sol_isAdminAddress,
  sol_hasVoted,
  sol_addVote,
} from "../webaction/SolidityFunctionModules.js";

const VotingScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//
  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [candidateData, setCandidateData] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

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

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    let allCandidateDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["voterAddress"] = data[i]["voterAddress"];
        temp["username"] = data[i]["username"];
        temp["isCandidate"] = data[i]["isCandidate"];
        temp["tagLine"] = data[i]["tagLine"];
        temp["votesCount"] = data[i]["votesCount"];

        if (temp["isCandidate"]) {
          console.log(
            "Username: ",
            temp["username"],
            "Votes: ",
            temp["votesCount"]
          );
          allCandidateDetails.push(temp);
        }
      }

      setCandidateData([...allCandidateDetails]);
    }
  };

  useEffect(() => {
    routeValidation();
  },[]);

  useEffect(() => {
    hasCastedVote();
    getAllVoterDetails();
  }, [hasVoted]);

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount account={account} />
      <ElectionInitializeMsg isAdmin={isAdminConnected} />
      <div
        className="alert alert-success text-center fw-bold mt-2"
        role="alert"
      >
        {!hasVoted ? (
          <h5>Go ahead and cast your vote !</h5>
        ) : (
          <>
            <h5>You have successfully voted. </h5>
            <h5>Now wait for the results.</h5>
            <h5> Thank you !</h5>
          </>
        )}
      </div>

      <h4>Total Candidates : {candidateData.length}</h4>

      {candidateData.map((candidate, key) => {
        return (
          <div className="container bg-light p-4 mt-4" key={key}>
            {candidate.isCandidate && (
              <>
                <div className="row align-items-center">
                  <div className="col-9 ">
                    <h5>Candidate</h5>
                    <div>
                      <h5>Name : {candidate.username}</h5>
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
  );
};

export default VotingScreen;
