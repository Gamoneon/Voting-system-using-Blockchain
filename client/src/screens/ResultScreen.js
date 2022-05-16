import React, { useState, useEffect } from "react";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import Analysis from "../components/Analysis.js";
import { sol_getAllVoterDetails } from "../webaction/SolidityFunctionModules.js";

const ResultScreen = () => {
  const resultscreenstyle = {
    backgroundImage: `url("./Images/confetti-17.gif")`,
    height: "90vh",
    width: "100vw",
  };
  //------------------------------ style CSS -----------------------------------------//
  const tablestyle = {
    width: "60%",
    margin: "auto",
    marginleft: "0",
    padding: "1em",
    border: "1px solid #000000 !important",
    background: "#C2DAF7",
  };

  const winnerBoxStyle = {
    width: "60%",
    margin: "auto",
    marginleft: "0",
    padding: "1em",
  };

  //------------------------------ useState hooks -----------------------------------------//

  const [candidateData, setCandidateData] = useState([]);
  const [winnerCandidate, setWinnerCandidate] = useState({});

  /*----------------- WARNING ---------------*/
  /*  Check function for Continous Looping   */
  /*-----------------------------------------*/

  const getAllVoterDetails = async () => {
    let maxVotes = 0;
    let winner = {};
    const data = await sol_getAllVoterDetails();
    let allCandidateDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["username"] = data[i]["username"];
        temp["isCandidate"] = data[i]["voterElectionDetails"]["isCandidate"];
        temp["votesCount"] = data[i]["voterElectionDetails"]["votesCount"];

        if (temp["votesCount"] > maxVotes) {
          maxVotes = data[i]["voterElectionDetails"]["votesCount"];
          winner["winnerName"] = data[i]["username"];
          winner["maxVotes"] = data[i]["voterElectionDetails"]["votesCount"];
          setWinnerCandidate(winner);
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
  }, []);


  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <div className="container" style={resultscreenstyle}>
        <YourAccount/>
        <ElectionInitializeMsg/>
        <h2>Results</h2>
        <h3 className="bg-light" style={{display: "inline-block"}}>Total Candidates: {candidateData.length}</h3>
        <div
          className="row align-items-center bg-info text-light mt-4"
          style={winnerBoxStyle}
        >
          <div className="col-6">
            <h5 className="fs-1">Winner</h5>
          </div>
          <div className="col-6">
            <h5 className="fs-1">
              <img src="./Images/winner.png" height="40" width="40"></img>
              {winnerCandidate.winnerName}
            </h5>
          </div>
        </div>
        <div className="container-list ">
          <table className="table mt-5 " style={tablestyle}>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Candidate</th>
                <th> Votes</th>
              </tr>
              {candidateData.map((student, key) => {
                return (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{student.username}</td>
                    <td>{student.votesCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div>
            <h1>Analysis</h1>
            <Analysis/>
          </div>
      </div>
    </>
  );
};

export default ResultScreen;
