import React, { useState, useEffect } from "react";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import { sol_getAllVoterDetails } from "../webaction/SolidityFunctionModules.js";

const ResultScreen = () => {
  //------------------------------ style CSS -----------------------------------------//
  const tablestyle = {
    width: "60%",
    margin: "auto",
    marginleft: "0",
    padding: "1em",
    border: "1px solid #000000 !important",
    backgroundcolor: "#90EE90",
  };

  const winnerBoxStyle = {
    width: "60%",
    margin: "auto",
    marginleft: "0",
    padding: "1em",
  };

  //------------------------------ useState hooks -----------------------------------------//

  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState(null);
  const [candidateData, setCandidateData] = useState([]);
  const [winnerCandidate, setWinnerCandidate] = useState({});
  let maxVotes = 0;
  let candidateID = 1;
  let winner = {};

  /*----------------- WARNING ---------------*/
  /*  Check function for Continous Looping   */
  /*-----------------------------------------*/

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    let allCandidateDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["username"] = data[i]["username"];
        temp["isCandidate"] = data[i]["isCandidate"];
        temp["votesCount"] = data[i]["votesCount"];

        if(temp["votesCount"]>maxVotes)
        {
          maxVotes = data[i]["votesCount"];
          winner["winnerName"] = data[i]["username"];
          winner["maxVotes"] = data[i]["votesCount"];
          setWinnerCandidate(winner)
        }

        if (temp["isCandidate"]) {
          allCandidateDetails.push(temp);
        }
      }

      setCandidateData([...allCandidateDetails]);
    }

  };

  useEffect(() => {
    getAllVoterDetails();
  });

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <div className="container">
        <YourAccount account={account} />
        <ElectionInitializeMsg isAdmin={isAdmin} />

        <h2>Results</h2>
        <h4>Total Candidates : {candidateData.length}</h4>
        <div
          className="row align-items-center bg-success mt-4"
          style={winnerBoxStyle}
        >
          <div className="col-4 ">
            <h5>Winner</h5>
          </div>
          <div className="col-4 ">
            <h5>{winnerCandidate.winnerName}</h5>
          </div>
          <div className="col-4">
            <h5>Total Votes : {winnerCandidate.maxVotes}</h5>
          </div>
        </div>
        <div className="container-list ">
          <table className="table table-striped mt-5 " style={tablestyle}>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th> Votes</th>
              </tr>
              {candidateData.map((student, key) => {
                return (
                  <tr key={key}>
                    <td>{candidateID++}</td>
                    <td>{student.username}</td>
                    <td>{student.votesCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ResultScreen;
