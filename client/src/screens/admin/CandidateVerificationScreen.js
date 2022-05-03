import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/VerificationScreen.css";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import YourAccount from "../../components/YourAccount.js";
import {
  sol_getAllVoterDetails,
  sol_isAdminAddress,
  sol_approveCandidateRequests,
} from "../../webaction/SolidityFunctionModules.js";

const CandidateVerificationScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//

  const navigate = useNavigate();
  const [candidateData, setCandidateData] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  //------------------------------ Functions -----------------------------------------//
  const onClickApprove = async (voterAddress) => {
    const data = await sol_approveCandidateRequests(voterAddress);
    setIsApproved(data);
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
        temp["tagLine"] = data[i]["tagLine"];
        temp["hasApplied"] = data[i]["hasApplied"];
        temp["isCandidate"] = data[i]["isCandidate"]; 

        allCandidateDetails.push(temp);
      }

      console.log(allCandidateDetails);
      setCandidateData([...allCandidateDetails]);
    }
  };

  useEffect(() => {
    routeValidation();
  });

  useEffect(() => {
    getAllVoterDetails();
  }, [isApproved]);

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount />
      <ElectionInitializeMsg />
      <div className="container">
        <div
          className="alert alert-primary text-center fw-bold mt-3"
          role="alert"
        >
          List of registered Candidates
        </div>
        {/* <h4>Total Candidates : {candidateData.length - 1}</h4> */}
        <h3>Pending Approvals : </h3>
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
                        <td colSpan="4">
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

        <h3 className="mt-4">Approved Candidates : </h3>
        {candidateData.map((student, key) => {
          return (
            <div className="container" key={key}>
              {student.isCandidate && (
                <>
                  <table
                    className="table mt-5 "
                    style={{
                      width: "75%",
                      margin: "auto",
                      background: " #aaf0d1",
                    }}
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

export default CandidateVerificationScreen;