import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/VerificationScreen.css";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";
import {
  sol_getAllVoterDetails,
  sol_isAdminAddress,
} from "../../webaction/SolidityFunctionModules.js";

const VerificationScreen = () => {

  //------------------------------ useState Hooks -----------------------------------------//

  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const allVoterDetails = [];
  const [voterData, setVoterData] = useState([]);

  //------------------------------ Functions -----------------------------------------//
  const onApproveClick = (key) => {};

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (!data) {
      navigate("/dashboard");
    }
    setIsAdminConnected(data);
  };

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();

    for (let i = 0; i < data.length; i++) {
      let temp = {};

      temp["username"] = data[i]["username"];
      temp["prn"] = data[i]["prn"];
      temp["mobile"] = data[i]["mobile"];
      temp["isVerified"] = data[i]["isVerified"];
      temp["hasApplied"] = data[i]["hasApplied"];

      allVoterDetails.push(temp);
      //setAllVoterDetails((allVoterDetails) => [...allVoterDetails, temp]);
    }

    //setVoterData(allVoterDetails);
    console.log("Modified data: ", allVoterDetails);
    return allVoterDetails;
  };

  useEffect(() => {
    setVoterData(getAllVoterDetails());
    routeValidation();
  });

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount />
      <ElectionInitializeMsg isAdmin={isAdminConnected} />
      <div className="container">
        <div
          className="alert alert-primary text-center fw-bold mt-3"
          role="alert"
        >
          List of registered students
        </div>
        <h4>Total Candidates : {allVoterDetails.length}</h4>
        <h3>Pending Approvals : </h3>
        {voterData.map((student, key) => {
          return (
            <div className="container" key={key}>
              {student.hasApplied && (
                <>
                  <table
                    className="table table-striped mt-5 "
                    style={{ width: "75%", margin: "auto" }}
                  >
                    <tbody>
                      <tr>
                        <th>Student's Name </th>
                        <td>{student.username}</td>
                        <th>Mobile No </th>
                        <td>{student.mobile}</td>
                      </tr>
                      <tr>
                        <th>PRN No </th>
                        <td>{student.prn}</td>
                        <th>Verified</th>
                        <td> {student.isVerified ? "True" : "False"}</td>
                      </tr>
                      <tr>
                        <td colSpan="4">
                          <div className="d-grid p-1">
                            <button
                              className="btn btn-success text-light"
                              type="button"
                              onClick={() => {
                                onApproveClick(key);
                              }}
                            >
                              Approve
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          );
        })}

        <h3 className="mt-4">Approved Students : </h3>
        {voterData.map((student, key) => {
          return (
            <div className="container" key={key}>
              {student.isVerified && (
                <>
                  <table
                    className="table mt-5 "
                    style={{
                      width: "75%",
                      margin: "auto",
                      background: "#a3ffb4",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th>Student's Name </th>
                        <td>{student.username}</td>
                        <th>Mobile No </th>
                        <td>{student.mobile}</td>
                      </tr>
                      <tr>
                        <th>PRN No </th>
                        <td>{student.prn}</td>
                        <th>Verified</th>
                        <td> {student.isVerified ? "True" : "False"}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VerificationScreen;
