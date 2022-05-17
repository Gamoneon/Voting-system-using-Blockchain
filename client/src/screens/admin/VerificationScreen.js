import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/VerificationScreen.css";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";
import {
  sol_getAllVoterDetails,
  sol_isAdminAddress,
  sol_approveVerificationRequests,
  sol_denyVerificationRequests,
  sol_getElectionDetails
} from "../../webaction/SolidityFunctionModules.js";

const VerificationScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//

  const navigate = useNavigate();
  const [voterData, setVoterData] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [atLeastOneVerified, setAtLeastOneVerified] = useState(false)
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");

  //------------------------------ Functions -----------------------------------------//
  const onClickApprove = async (voterAddress) => {
    const data = await sol_approveVerificationRequests(voterAddress);
    setIsApproved(data);
  };

  const onClickDeny = async (voterAddress) => {
    const data = await sol_denyVerificationRequests(voterAddress);
    setIsApproved(data);
  };

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (!data) {
      navigate("/dashboard");
    }
  };

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setCurrentElectionPhase(data[3]);
  };

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    let allVoterDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["voterAddress"] = data[i]["voterAddress"];
        temp["username"] = data[i]["username"];
        temp["prn"] = data[i]["voterElectionDetails"]["prn"];
        temp["mobile"] = data[i]["voterElectionDetails"]["mobile"];
        temp["isVerified"] = data[i]["voterElectionDetails"]["isVerified"];
        temp["hasApplied"] = data[i]["voterElectionDetails"]["hasApplied"];
        if(!atLeastOneVerified && temp["isVerified"]) {
          setAtLeastOneVerified(true);
        }
        allVoterDetails.push(temp);
      }
      
      setVoterData([...allVoterDetails]);
    }
  };

  useEffect(() => {
    getElectionDetails();
    routeValidation();
  }, []);

  useEffect(() => {
    setIsApproved(false);
    getAllVoterDetails();
  }, [isApproved]);

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount />
      <ElectionInitializeMsg />
      {currentElectionPhase === "Voter Verification" &&
      <div className="container">
        <div
          className="alert alert-primary text-center fw-bold mt-3"
          role="alert"
        >
          List of registered students
        </div>
        <h3>Pending Approvals: </h3>
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
                        <th>PRN </th>
                        <td>{student.prn}</td>
                        <th>Verified</th>
                        <td> {student.isVerified ? "True" : "False"}</td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <div className="d-grid p-1">
                            <button
                              className="btn btn-danger text-light"
                              type="button"
                              onClick={() => {
                                onClickDeny(student.voterAddress);
                              }}
                            >
                              Deny
                            </button>
                          </div>
                        </td>
                        <td colSpan="2">
                          <div className="d-grid p-1">
                            <button
                              className="btn btn-success text-light"
                              type="button"
                              onClick={() => {
                                onClickApprove(student.voterAddress);
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

        <h3 className="mt-4">Approved Students: </h3>
        <table
          className="table mt-4"
          style={{
            width: "75%",
            margin: "auto",
            background: "#a3ffb4",
          }}
        >
          <tbody>
            {atLeastOneVerified &&
            <tr>
              <th>Sr no. </th>
              <th>Student's Name </th>
              <th>PRN </th>
            </tr>
            }
          </tbody>
        </table>
        {voterData.map((student, key) => {
          return (
            <div className="container" key={key}>
              {student.isVerified && (
                <>
                  <table
                    className="table"
                    style={{
                      width: "76.5%",
                      margin: "auto",
                      background: "#a3ffb4",
                    }}
                  >
                    <tbody>
                      <tr key={key}>
                        <td>{key++}</td>
                        <td>{student.username}</td>
                        <td>{student.prn}</td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}

              <div className="modal fade" id="denyModal" role="dialog">
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                      >
                        &times;
                      </button>
                      <h4 className="modal-title">Modal Header</h4>
                    </div>
                    <div className="modal-body">
                      <p>This is a small modal.</p>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-default"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      }
    </>
  );
};

export default VerificationScreen;
