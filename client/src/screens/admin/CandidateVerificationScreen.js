import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/VerificationScreen.css";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";
import {
  sol_getAllVoterDetails,
  sol_isAdminAddress,
  sol_approveCandidateRequests,
  sol_denyVerificationRequests,
  sol_getElectionDetails,
} from "../../webaction/SolidityFunctionModules.js";

const CandidateVerificationScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//

  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");
  const [atLeastOneCandidate, setAtLeastOneCandidate] = useState(false);

  //------------------------------ Functions -----------------------------------------//
  const onClickApprove = async (voterAddress) => {
    const data = await sol_approveCandidateRequests(voterAddress);
    setIsApproved(data);
  };

  const onClickDeny = async (voterAddress) => {
    const data = await sol_denyVerificationRequests(voterAddress);
    setIsApproved(data);
  };

  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setCurrentElectionPhase(data[3]);
  };

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (!data) {
      navigate("/dashboard");
    }
  };

  const getAllVoterDetails = async () => {
    const data = await sol_getAllVoterDetails();
    let allCandidateDetails = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let temp = {};

        temp["voterAddress"] = data[i]["voterAddress"];
        temp["username"] = data[i]["username"];
        temp["tagLine"] = data[i]["voterElectionDetails"]["tagLine"];
        temp["hasApplied"] = data[i]["voterElectionDetails"]["hasApplied"];
        temp["isCandidate"] = data[i]["voterElectionDetails"]["isCandidate"];
        if (!atLeastOneCandidate && temp["isCandidate"]) {
          setAtLeastOneCandidate(true);
        }

        allCandidateDetails.push(temp);
      }

      console.log(allCandidateDetails);
      setCandidateData([...allCandidateDetails]);
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
      {currentElectionPhase === "Candidate Application" && (
        <div className="container">
          <div
            className="alert alert-primary text-center fw-bold mt-3"
            role="alert"
          >
            List of registered Candidates
          </div>
          <h3>Pending Approvals: </h3>
          {candidateData.map((student, key) => {
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
                        </tr>
                        <tr>
                          <th>Tag Line </th>
                          <td>{student.tagLine}</td>
                        </tr>
                        <tr>
                          <td>
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
                          <td>
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

          <h3 className="mt-4">Approved Candidates: </h3>
          <table
            className="table mt-4"
            style={{
              width: "75%",
              margin: "auto",
              background: " #aaf0d1",
            }}
          >
            <tbody>
              {atLeastOneCandidate && (
                <tr>
                  <th>Student's Name </th>
                  <th>Tag Line </th>
                </tr>
              )}
            </tbody>
          </table>
          {candidateData.map((student, key) => {
            return (
              <div className="container" key={key}>
                {student.isCandidate && (
                  <>
                    <table
                      className="table"
                      style={{
                        width: "76.5%",
                        margin: "auto",
                        background: " #aaf0d1",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td>{student.username}</td>
                          <td>{student.tagLine}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CandidateVerificationScreen;
