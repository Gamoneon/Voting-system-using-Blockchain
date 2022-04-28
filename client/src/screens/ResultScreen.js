import React from "react";
import ElectionInitializeMsg from "../../src/components/ElectionInitializeMsg.js";

const ResultScreen = () => {

  const tablestyle = {
    width: "60%",
    margin: "auto",
    marginleft: "0",
    padding: "1em",
    border: "1px solid #000000 !important",
    backgroundcolor: "#90EE90", 
  };
  return(
    <>

    <div className="container">
    <ElectionInitializeMsg />
    <div className="container-main" style={{ borderTop: "1px solid" }}>
         <h2>Results</h2>
         <small>Total candidates: 3</small>
         <div
    className={"container-list "}
  >
      <table  className="table table-striped mt-5 "
         style={tablestyle}
      >
      <tbody>
      <tr>
        <th>ID</th>
        <th>Candidate</th>
        <th> Votes</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Saurabh</td>
        <td>3</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Soumya</td>
        <td>3</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Sahil</td>
        <td>5</td>
      </tr>
      </tbody>
    </table>
  </div>
    </div> 
    </div>  
    </> 

);
};

export default ResultScreen;
