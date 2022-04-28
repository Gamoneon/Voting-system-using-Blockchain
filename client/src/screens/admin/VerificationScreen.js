import React, { useState } from "react";
import "./css/VerificationScreen.css";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";

const VerificationScreen = () => {
  //------------------------------ useState Hooks -----------------------------------------//

  const [isAdmin, setIsAdmin] = useState(false);
  const tabledata = [
    {
      name: "Sahil Kavitake",
      mob: 8459225341,
      prn: 965878541236,
      voted: false,
      verified: true,
      registered: true,
    },
    {
      name: "Saurabh Jadhav",
      mob: 8459225341,
      prn: 965878541236,
      voted: false,
      verified: true,
      registered: true,
    },
    {
      name: "Pooja Gadwe",
      mob: 8459225341,
      prn: 965878541236,
      voted: false,
      verified: false,
      registered: true,
    },
    {
      name: "Soumya Singh",
      mob: 8459225341,
      prn: 965878541236,
      voted: false,
      verified: false,
      registered: true,
    },
  ];

  //------------------------------ Functions -----------------------------------------//
  const onApproveClick = (key) => {
    console.log(key);
    tabledata[key].verified = true;
    console.log(tabledata[key]);
    // update verfied = true
    // reload page using useeffect
  };

  //------------------------------ Render Content -----------------------------------------//
  return (
    <>
      <ElectionInitializeMsg isAdmin={isAdmin} />
      <div className="container">
        <div
          className="alert alert-primary text-center fw-bold mt-3"
          role="alert"
        >
          List of registered students
        </div>
        <h4>Total Candidates : {tabledata.length}</h4>
        <h3>Pending Approvals : </h3>
        {tabledata.map((student, key) => {
          return (
            <div className="container" key={key}>
              {!student.verified && (
                <>
                  <table
                    className="table table-striped mt-5 "
                    style={{ width: "75%", margin: "auto" }}
                  >
                    <tbody>
                      <tr>
                        <th>Student's Name </th>
                        <td>{student.name}</td>
                        <th>Mobile No </th>
                        <td>{student.mob}</td>
                      </tr>
                      <tr>
                        <th>PRN No </th>
                        <td>{student.prn}</td>
                        <th>Voted </th>
                        <td>{student.voted ? "True" : "False"}</td>
                      </tr>
                      <tr>
                        <th>Verified</th>
                        <td> {student.verified ? "True" : "False"}</td>
                        <th>Registered</th>
                        <td>{student.registered ? "True" : "False"}</td>
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
        {tabledata.map((student, key) => {
          return (
            <div className="container" key={key}>
              {student.verified && (
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
                        <td>{student.name}</td>
                        <th>PRN No </th>
                        <td>{student.prn}</td>
                      </tr>
                      <tr>
                        <th>Voted </th>
                        <td>{student.voted ? "True" : "False"}</td>
                        <th>Verified</th>
                        <td> {student.verified ? "True" : "False"}</td>
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
