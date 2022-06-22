import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequiredFieldStar from "../components/RequiredFieldStar.js";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import "./admin/css/VerificationScreen.css";
import {
  sol_addVerificationRequest,
  sol_isAdminAddress,
  sol_getUserDetails,
  sol_addCandidateRequest,
  sol_getElectionDetails,
} from "../webaction/SolidityFunctionModules.js";

const VoterVerificationScreen = () => {
  //------------------------------ style CSS -----------------------------------------//

  const tablestyle = {
    width: "60%",
    margin: "auto",
    marginleft: "0",
    padding: "1em",
    border: "1px solid #000000 !important",
    backgroundcolor: "#90EE90",
  };

  const divisionstyle = {
    width: "50%",
    background: "#C2DAF7",
    padding: "2%",
    margin: "3% auto",
  };

  const ystyle = {
    margin: "0.1em",
    padding: "0.5em",
    display: "block",
  };

  //------------------------------ userState Hooks  -----------------------------------------//
  const navigate = useNavigate();
  const [isAdminConnected, setIsAdminConnected] = useState(false);
  const [prn, setPrn] = useState("");
  const [mobile, setMobile] = useState("");
  const [username, setUsername] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const [tagLine, setTagLine] = useState("");
  const [currentElectionPhase, setCurrentElectionPhase] = useState("");
  const [hasApplied, setHasApplied] = useState(false);

  //------------------------------ Functions  -----------------------------------------//
  const submitHandler = (e) => {
    // prevent form loading
    e.preventDefault();
    applyForVerification();
  };

  const candidateHandler = (e) => {
    // prevent form loading
    e.preventDefault();

    applyForCandidate();
  };
  const getElectionDetails = async () => {
    const data = await sol_getElectionDetails();
    setCurrentElectionPhase(data[3]);
  };

  const getUserDetails = async () => {
    const data = await sol_getUserDetails();
    if (!data) {
      navigate("/login");
    }
    setUsername(data["username"]);
    setPrn(data["voterElectionDetails"]["prn"]);
    setMobile(data["voterElectionDetails"]["mobile"]);
    setIsVerified(data["voterElectionDetails"]["isVerified"]);
    setIsDenied(data["voterElectionDetails"]["isDenied"]);
    setIsCandidate(data["voterElectionDetails"]["isCandidate"]);
    setHasApplied(data["voterElectionDetails"]["hasApplied"]);
    console.log(isVerified);
  };

  const applyForVerification = async () => {
    const addVerificationReq = await sol_addVerificationRequest(prn, mobile);
    setHasApplied(true);
  };

  const applyForCandidate = async () => {
    const addCandidateReq = await sol_addCandidateRequest(tagLine);
    setHasApplied(true);
  };

  const routeValidation = async () => {
    const data = await sol_isAdminAddress();
    if (data) {
      navigate("/dashboard");
    }
    setIsAdminConnected(data);
  };

  useEffect(() => {
    routeValidation();

    getElectionDetails();
  }, []);

  useEffect(() => {
    getUserDetails();
  }, [hasApplied]);

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount />
      <ElectionInitializeMsg isAdmin={isAdminConnected} />
      <div className="container-main">
        {!isVerified && currentElectionPhase === "Voter Verification" && (
          <>
            {isDenied && !hasApplied && (
              <div
                className="text-center bg-danger text-light fw-bold fs-4"
                style={divisionstyle}
              >
                <div>Your application has been denied by the Admin!</div>
                <div>Please submit valid details to get verified as voter.</div>
              </div>
            )}
            <h2>Apply for Voter Verification</h2>
            {hasApplied ? (
              <div
                className="text-center bg-info text-light fw-bold fs-4"
                style={divisionstyle}
              >
                <div>Applied Successfully!</div>
                <div>Please wait for admin to verify your details.</div>
              </div>
            ) : (
              <div className="container-item">
                <form onSubmit={submitHandler}>
                  <div className="container" style={divisionstyle}>
                    <div className="mb-2">
                      <label
                        htmlFor="studentPRNNO"
                        className="form-label"
                        style={ystyle}
                      >
                        PRN (8 digit) <RequiredFieldStar />
                        <input
                          type="tel"
                          pattern="[0-9]{8}"
                          maxLength={8}
                          className="form-control"
                          id="studentPRNNo"
                          placeholder="Enter your permanent registration number"
                          value={prn}
                          onChange={(e) => setPrn(e.target.value)}
                          required
                        />
                      </label>
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="studentPhoneno"
                        className="form-label"
                        style={ystyle}
                      >
                        Mobile number <RequiredFieldStar />
                        <input
                          type="tel"
                          pattern="[0-9]{10}"
                          maxLength={10}
                          className="form-control"
                          id="studentPhoneno"
                          placeholder="Enter your mobile number"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          required
                        />
                      </label>
                    </div>
                    <p className="note">
                      <span className="text-danger"> Note: </span>
                      <br /> Make sure your 8 digit PRN is correct. <br /> Admin
                      might not approve your account if the provided PRN does
                      not matches the account registered in admin's catalogue.
                    </p>

                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-primary btn-lg" type="submit">
                        Apply
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
      {!hasApplied && !isCandidate && isVerified && !isDenied && (
        <div
          className="text-center bg-info text-light fw-bold fs-4"
          style={divisionstyle}
        >
          <div>You are verified successfully!</div>
          {currentElectionPhase === "Voter Verification" ? (
            <div>Please wait for the next phase of the election.</div>
          ) : (
            <div>Now you can apply as a candidate if interested!</div>
          )}
        </div>
      )}

      {isVerified &&
        !isCandidate &&
        currentElectionPhase === "Candidate Application" &&
        !isDenied && (
          <>
            <div className="container-main">
              {hasApplied ? (
                <div
                  className="text-center bg-info text-light fw-bold fs-4"
                  style={divisionstyle}
                >
                  <div>Applied Successfully!</div>
                  <div>Please wait for admin's approval.</div>
                </div>
              ) : (
                <>
                  <h2>Apply For Candidate</h2>
                  <div className="container-item">
                    <form onSubmit={candidateHandler}>
                      <div className="container" style={divisionstyle}>
                        <div className="mb-3">
                          <label
                            htmlFor="studentTagline"
                            className="form-label"
                            style={ystyle}
                          >
                            Enter Your Tagline <RequiredFieldStar />
                            <textarea
                              className="form-control"
                              placeholder="Write your tagline here"
                              id="studentTagline"
                              style={{ height: "100px" }}
                              onChange={(e) => setTagLine(e.target.value)}
                              maxLength="100"
                              required
                            ></textarea>
                          </label>
                        </div>
                        <p className="note">
                          <span className="text-danger"> Note: </span>
                          <br />
                          Please describe yourself in one or two lines.
                          <br />
                          Depending on your profile, admin will approve or deny
                          your request for candidate.
                        </p>
                        <div className="d-grid gap-2 mt-3">
                          <button
                            className="btn btn-primary btn-lg"
                            type="submit"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      {isDenied &&
        currentElectionPhase === "Candidate Application" &&
        isVerified && (
          <div
            className="text-center bg-danger text-light fw-bold fs-4"
            style={divisionstyle}
          >
            <div>Your Candidate application has been denied by the Admin!</div>
            <div>But you can still vote for other candidates.</div>
          </div>
        )}

      {isDenied &&
        !hasApplied &&
        !isVerified &&
        currentElectionPhase !== "Voter Verification" && (
          <div
            className="text-center bg-danger text-light fw-bold fs-4"
            style={divisionstyle}
          >
            <div>You are not verified as a voter.</div>
            <div>You can not participate in the Election.</div>
          </div>
        )}

      {isCandidate && currentElectionPhase === "Candidate Application" && (
        <div
          className="text-center bg-info text-light fw-bold fs-4"
          style={divisionstyle}
        >
          <div>Congratulations!!! </div>
          <div>Approved as a Candidate by Admin!</div>
          <div>Students can vote you now in the next voting phase!</div>
          <div>All the best.</div>
        </div>
      )}
      {isVerified && (
        <>
          <div className={"container-item "}>
            <div
              className="alert alert-primary text-center fw-bold mt-2"
              role="alert"
            >
              <h5>Your Registered Information</h5>
            </div>
          </div>
          <div className={"container-list "}>
            <table className="table table-striped mt-5 " style={tablestyle}>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{username}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{mobile}</td>
                </tr>
                <tr>
                  <th>PRN</th>
                  <td>{prn}</td>
                </tr>
                <tr>
                  <th>Verification Status</th>
                  <td>{isVerified ? "Verified" : "Not Verified"}</td>
                </tr>
                <tr>
                  <th>Candidate Status</th>
                  <td>{isCandidate ? "Candidate" : "Not Candidate"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default VoterVerificationScreen;
