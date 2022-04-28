import React from "react";
import "./admin/css/VerificationScreen.css";

const VoterRegistrationScreen = () => {

const tablestyle = {
  width: "60%",
  margin: "auto",
  marginleft: "0",
  padding: "1em",
  border: "1px solid #000000 !important",
  backgroundcolor: "#90EE90", 
};
const divisionstyle={
    width: "50%",
    background: "#FFF8DC",
    padding: "2%",
    margin: "3% auto",
};

const ystyle= {
  margin: "0.1em",
  padding: "0.5em",
  display: "block"
}; 
const submitHandler = () => {
  // prevent form loading
  console.log("Submit form");
  // disable input and button
  // show values
};

return (

      <>
        <div className="container-item info">
          <div
          className="alert alert-success text-center fw-bold mt-3"
          role="alert"
          >
            <p>Total studented voters: 9 </p>
          </div>   
        </div>
          <div className="container-main">
            <h2>Registration</h2>
            <div className="container-item"> 
              <form onSubmit={submitHandler}>
                <div className="container" style={divisionstyle}> 
                  <div className="mb-3">  
                  <label htmlFor="studentPRNNO" className="form-label" style={ystyle}>
                    PRN No.
                  <input
                    type="text"
                    className="form-control"
                    id="studentPRNNo"
                    placeholder="e.g. 15562522"
                    required
                  />
                  </label>
                  </div>
                <div className="mb-3">
                  <label htmlFor="studentName" className="form-label" style={ystyle}>
                  Name
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    placeholder="eg. Saurabh"
                    onChange=""
                  />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="studentPhoneno" className="form-label" style={ystyle}>
                  Phone number <span style={{ color: "tomato" }}>*</span>
                  <input
                    type="number"
                    className="form-control"
                    id="studentPhoneno"
                    placeholder="eg. 9841234567"
                    onChange=""
                  />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="studentEmail" className="form-label" style={ystyle}>
                   Email
                    <input
                  type="text"
                  className="form-control"
                  id="studentEmail"
                  placeholder="e.g. XYZ@gmail.com"
                  required
                    ></input>
                  </label>
                </div>
                <p className="note">
                  <span style={{ color: "tomato" }}> Note: </span>
                  <br /> Make sure your Phone number is
                    correct. <br /> Admin might not approve your account if the
                   provided Phone number does not matches the account
                   registered in admins catalogue.
                </p>
                <div className="d-grid gap-2 mt-3">
                <button className="btn btn-primary btn-lg" type="button">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div
          className="container-main"
          style={{
            borderTop: "2px solid",
          }}
        >
        </div>
      
          <div className="container-main">
            <h2>Apply For Candidate</h2>
            <div className="container-item"> 
              <form onSubmit={submitHandler}>
                <div className="container" style={divisionstyle}> 
                  <div className="mb-3">  
                    <label htmlFor="studentTagline" className="form-label" style={ystyle}>
                    Enter Your Tagline
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
                  <br /> Tagline should be in one line or two. 
                  <br /> You can describe yourself.
                  </p>
                  <div className="d-grid gap-2 mt-3">
                    <button className="btn btn-primary btn-lg" type="button">Apply</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="container-main"
            style={{ 
              borderTop: "2px solid"
             }}
          >
          </div>
  <div
    className={"container-item "}
  >
    <div
        className="alert alert-success text-center fw-bold mt-2"
        role="alert"
      >
        <h5>Your Registered Information</h5>
      </div>
  </div>
  <div
    className={"container-list "}
  >
      <table  className="table table-striped mt-5 "
         style={tablestyle}
      >
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
