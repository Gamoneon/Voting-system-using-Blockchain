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
  sol_isPendingRequest,
} from "../../webaction/SolidityFunctionModules.js";

const CandidateVerificationScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//

  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");
  const [atLeastOneCandidate, setAtLeastOneCandidate] = useState(false);
  const [atLeastOnePending, setAtLeastOnePending] = useState(false);

  //---------------------------------style----------------------------------------------//

  const buttonStyle = {
    width: "40%",
    marginRight: "10%",
  };

  //------------------------------ Functions -----------------------------------------//
  const onClickApprove = async (voterAddress) => {
    const data = await sol_approveCandidateRequests(voterAddress);
    setIsApproved(data);
    isPendingRequest();
  };

  const onClickDeny = async (voterAddress) => {
    const data = await sol_denyVerificationRequests(voterAddress);
    setIsApproved(data);
    isPendingRequest();
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

  const isPendingRequest = async () => {
    const data = await sol_isPendingRequest();
    if(!data)
    {
      setAtLeastOnePending(false);
    }
  }

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

        if (!atLeastOnePending && temp["hasApplied"]) {
          setAtLeastOnePending(true);
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
          <table
            className="table table-striped mt-5 "
            style={{ width: "75%", margin: "auto" }}
          >
            <tbody>
                <tr>
                  <th>Student's Name </th>
                  <th>Tag Line </th>
                  <th></th>
                  <th></th>
                </tr>
              {!atLeastOnePending && (
                <tr>
                  <th colSpan={4} className="text-center">No Pending Requests!</th>
                </tr>
              )}
              {candidateData.map((student, key) => {
                return (
                  <>
                    {student.hasApplied && (
                      <tr key={key}>
                        <td>{student.username}</td>
                        <td>{student.tagLine}</td>
                        <td colSpan={2}>
                          <div className="">
                          <button
                              className="btn btn-success text-light"
                              type="button"
                              style={buttonStyle}
                              onClick={() => {
                                onClickApprove(student.voterAddress);
                              }}
                            >
                              Approve
                            </button>

                            <button
                              className="btn btn-danger text-light"
                              type="button"
                              style={buttonStyle}
                              onClick={() => {
                                onClickDeny(student.voterAddress);
                              }}
                            >
                              Deny
                            </button>
                            
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>

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
              
                <tr>
                  <th>Student's Name </th>
                  <th>Tag Line </th>
                </tr>
                {!atLeastOneCandidate && (
                  <tr>
                  <th colSpan={4} className="text-center">No Approved Candidates!</th>
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
