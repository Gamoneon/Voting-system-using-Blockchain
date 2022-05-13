import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { sol_getAllVoterDetails } from "../webaction/SolidityFunctionModules.js";

const Analysis = () => {
  const [P1_candidateName, setP1_CandidateName] = useState([]);
  const [P1_candidateVotesCount, setP1_candidateVotesCount] = useState([]);
  const [P2_totalCount, setP2_TotalCount] = useState(0);
  const [P2_verifiedCount, setP2_VerifiedCount] = useState(0);
  const [P2_candidateCount, setP2_CandidateCount] = useState(0);
  const [P2_votedCount, setP2_VotedCount] = useState(0);

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    if (data) {
      setP2_TotalCount(data.length - 1);
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["username"] = data[i]["username"];
        temp["isCandidate"] = data[i]["isCandidate"];
        temp["isVerified"] = data[i]["isVerified"];
        temp["votesCount"] = data[i]["votesCount"];
        temp["hasVoted"] = data[i]["hasVoted"]
        // console.log(temp["votesCount"]);

        if (temp["isCandidate"]) {
          setP2_CandidateCount(P2_candidateCount=>P2_candidateCount+1);
          P1_candidateName.push(temp["username"]);
          P1_candidateVotesCount.push(temp["votesCount"]);
        }
        if (temp["isVerified"]) {
          setP2_VerifiedCount(P2_verifiedCount=>P2_verifiedCount+1);
        }
        if(temp["hasVoted"]) {
          setP2_VotedCount(P2_votedCount=>P2_votedCount+1);
        }
      }
    }
  };

  useEffect(() => {
    getAllVoterDetails();
  }, []);

  var P1_data = [
    {
      values: P1_candidateVotesCount,
      labels: P1_candidateName,
      type: "pie",
      textinfo: "label+value"
    },
  ];
  var P2_data = [
    {
      x: ["Total", "Verified","Voted", "Candidates"],
      y: [P2_totalCount,P2_verifiedCount,P2_votedCount,P2_candidateCount],
      type: "bar",
      marker: { color: ["#7C98AB","#F9968B","#8675A9","#98D4BB"] },
    },
  ];
  return (
    <div className="mt-3 p-2">
      <Plot
        data={P1_data}
        layout={{ width: 500, height: 500, title: "No of votes per Candidate" }}
      />
      <Plot
        data={P2_data}
        layout={{
          width: 500,
          height: 500,
          title: "Student's participation in the Election",
          yaxis: { title: "Count of Students" },
        }}
      />
    </div>
  );
};

export default Analysis;
