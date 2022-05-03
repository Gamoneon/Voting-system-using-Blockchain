import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequiredFieldStar from "../components/RequiredFieldStar.js";
import ElectionInitializeMsg from "../components/ElectionInitializeMsg.js";
import YourAccount from "../components/YourAccount.js";
import "./admin/css/VerificationScreen.css";
import {
  sol_getPendingVerificationRequests,
  sol_addVerificationRequest,
  sol_isAdminAddress,
  sol_getAllVoterDetails,
  sol_getUserDetails,
} from "../webaction/SolidityFunctionModules.js";

const VoterRegistrationScreen = () => {
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
    background: "#FFF8DC",
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
  const [account, setAccount] = useState(null);
  const [prn, setPrn] = useState("");
  const [mobile, setMobile] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  //------------------------------ Functions  -----------------------------------------//
  const submitHandler = (e) => {
    // prevent form loading
    e.preventDefault();

    applyForVerification(prn, mobile);
  };

  const getUserDetails = async () => {
    const data = await sol_getUserDetails();
    if (!data) {
      navigate("/login");
    }
    setIsVerified(data[4]);
  };

  const applyForVerification = async () => {
    const addVerificationReq = await sol_addVerificationRequest(prn, mobile);
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
    getUserDetails();
  });

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <YourAccount account={account} />
      <ElectionInitializeMsg isAdmin={isAdminConnected} />
      <div className="container-main">
        {!isVerified && (
          <>
            <h2>Voter Verification</h2>
            <div className="container-item">
              <form onSubmit={submitHandler}>
                <div className="container" style={divisionstyle}>
                  <div className="mb-2">
                    <label
                      htmlFor="studentPRNNO"
                      className="form-label"
                      style={ystyle}
                    >
                      PRN No. <RequiredFieldStar />
                      <input
                        type="text"
                        className="form-control"
                        id="studentPRNNo"
                        placeholder="e.g. 15562522"
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
                      Phone number <RequiredFieldStar />
                      <input
                        type="text"
                        className="form-control"
                        id="studentPhoneno"
                        placeholder="eg. 9841234567"
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <p className="note">
                    <span className="text-danger"> Note: </span>
                    <br /> Make sure your PRN is correct. <br /> Admin might not
                    approve your account if the provided PRN does not matches
                    the account registered in admin's catalogue.
                  </p>
                  <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-primary btn-lg" type="submit">
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>

      {isVerified && (
        <>
          <div className="container-main">
            <h2>Apply For Candidate</h2>
            <div className="container-item">
              <form onSubmit={submitHandler}>
                <div className="container" style={divisionstyle}>
                  <div className="mb-3">
                    <label
                      htmlFor="studentTagline"
                      className="form-label"
                      style={ystyle}
                    >
                      Enter Your Tagline <RequiredFieldStar />
                      <input
                        type="text"
                        className="form-control"
                        id="studentTagline"
                        placeholder="e.g. Vote me!!"
                        required
                      />
                    </label>
                  </div>
                  <p className="note">
                    <span style={{ color: "tomato" }}> Note: </span>
                    <br /> You can describe yourself in one line or two.
                  </p>
                  <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-primary btn-lg" type="button">
                      Apply
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
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
              <th>Account Address</th>
              <td>jjj55f45dfd5d5f5d55</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>Saurabh</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>555858585</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>555858585</td>
            </tr>
            <tr>
              <th>Voted</th>
              <td> "True"</td>
            </tr>
            <tr>
              <th>Verification</th>
              <td>"True"</td>
            </tr>
            <tr>
              <th>Registered</th>
              <td>"True"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VoterRegistrationScreen;
