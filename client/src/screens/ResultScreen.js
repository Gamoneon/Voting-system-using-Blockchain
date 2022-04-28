import React, { useState } from "react";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";

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

  const tabledata = [
    {
      name: "Sahil Kavitake",
      id: 1,
      votes: 5,
    },
    {
      name: "Saurabh Jadhav",
      id: 2,
      votes: 3,
    },
    {
      name: "Pooja Gadwe",
      id: 3,
      votes: 4,
    },
    {
      name: "Soumya Singh",
      id: 4,
      votes: 5,
    },
  ];

  const winnerCandidate = {
    id: 1,
    name: "Sahil Kavitake",
    votes: 5,
  };

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <div className="container">
        <YourAccount account={account} />
        <ElectionInitializeMsg isAdmin={isAdmin} />

        <h2>Results</h2>
        <h4>Total Candidates : {tabledata.length}</h4>
        <div
          className="row align-items-center bg-success mt-4"
          style={winnerBoxStyle}
        >
          <div className="col-4 ">
            <h5>Winner</h5>
          </div>
          <div className="col-4 ">
            <h5>{winnerCandidate.name}</h5>
          </div>
          <div className="col-4">
            <h5>Total Votes : {winnerCandidate.votes}</h5>
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
              {tabledata.map((student, key) => {
                return (
                  <tr key={key}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.votes}</td>
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
