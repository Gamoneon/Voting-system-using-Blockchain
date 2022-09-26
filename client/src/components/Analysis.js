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
  const [P2_notVotedVerifiedCount, setP2_NotVotedVerifiedCount] = useState(0);
  const [P2_notVotedNotVerifiedCount, setP2_NotVotedNotVerifiedCount] =
    useState(-1);

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    if (data) {
      setP2_TotalCount(data.length - 1);
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["username"] = data[i]["username"];
        temp["isCandidate"] = data[i]["voterElectionDetails"]["isCandidate"];
        temp["isVerified"] = data[i]["voterElectionDetails"]["isVerified"];
        temp["votesCount"] = data[i]["voterElectionDetails"]["votesCount"];
        temp["hasVoted"] = data[i]["voterElectionDetails"]["hasVoted"];

        if (temp["isCandidate"]) {
          setP2_CandidateCount((P2_candidateCount) => P2_candidateCount + 1);
          P1_candidateName.push(temp["username"]);
          P1_candidateVotesCount.push(temp["votesCount"]);
        }
        if (temp["isVerified"]) {
          setP2_VerifiedCount((P2_verifiedCount) => P2_verifiedCount + 1);
        }
        if (temp["hasVoted"]) {
          setP2_VotedCount((P2_votedCount) => P2_votedCount + 1);
        }
        if (!temp["isVerified"]) {
          setP2_NotVotedNotVerifiedCount(
            (P2_notVotedNotVerifiedCount) => P2_notVotedNotVerifiedCount + 1
          );
        }
        if (temp["isVerified"] && !temp["hasVoted"]) {
          setP2_NotVotedVerifiedCount(
            (P2_notVotedVerifiedCount) => P2_notVotedVerifiedCount + 1
          );
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
      textinfo: "label+value",
    },
  ];

  var P2_data = [
    {
      type: "sunburst",
      labels: [
        "Total",
        "Verified",
        "Not Verified",
        "Voted",
        "Not Voted",
        "Not voted",
      ],
      parents: ["", "Total", "Total", "Verified", "Verified", "Not Verified"],
      values: [
        P2_totalCount,
        P2_verifiedCount,
        P2_totalCount - P2_verifiedCount,
        P2_votedCount,
        P2_notVotedVerifiedCount,
        P2_notVotedNotVerifiedCount,
      ],
      outsidetextfont: { size: 20, color: "#377eb8" },
      leaf: { opacity: 0.4 },
      marker: { line: { width: 2 } },
      branchvalues: "total",
      textinfo: "label+value",
    },
  ];

  return (
    <div className="mt-3 p-2">
      <Plot
        data={P1_data}
        layout={{
          width: 400,
          height: 500,
          title: "Number of votes per Candidate",
          margin: { l: 0, r: 0, b: 0, t: 50 },
        }}
      />
      <Plot
        data={P2_data}
        layout={{
          margin: { l: 0, r: 0, b: 0, t: 50 },
          width: 500,
          height: 500,
          title: "Student's participation in the Election",
        }}
      />
    </div>
  );
};

export default Analysis;
