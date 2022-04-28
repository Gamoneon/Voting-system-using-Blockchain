import React, { useState, useEffect } from "react";
import ElectionInitializeMsg from "../../components/ElectionInitializeMsg.js";
import {startElection, isAdminAddress, connectwallet } from "../../webaction/SolidityFunctionModules";
import Election from "../../contracts/Election.json";

const ElectionSetupScreen = () => {
    const aboutelectionstyle = {
        width: "60%",
        background: "#FFF8DC",
        padding: "3%",
        margin: "2% auto",
    };

    const [acc, setAcc] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const getAccount = async () => {
        const data = await connectwallet();
        setAcc(data.acc[0])
    };


    useEffect( async () => {
        getAccount();
        setIsAdmin(await isAdminAddress());
        console.log("Admin connected: ",isAdmin);  
      }, [isAdmin]);

    return (
        <>
            <div className="container">
                <div
                    className="alert alert-success text-center fw-bold mt-3"
                    role="alert"
                >
                    Your Account: {acc}
                </div>

                <ElectionInitializeMsg />
                <h3>About Election</h3>
                <form>
                    <div className="container" style={aboutelectionstyle}>
                        <div className="mb-3">
                            <label htmlFor="electionTitle" className="form-label">
                                Election Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="electionTitle"
                                placeholder="e.g. Class Representative"
                                required
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="organizationName" className="form-label">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="organizationName"
                                placeholder="e.g. S.Y.M.Sc. Computer Science"
                                required
                            ></input>
                        </div>
                        <div className="mb-3">
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary btn-lg" onClick={startElection} type="button">
                                    Start Election
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <h3>Change Phase</h3>
                <div className="container" style={aboutelectionstyle}>
                    <h4>
                        Current Phase : <span className="text-success">Registration</span>
                    </h4>
                    <h4>
                        Next Phase :{" "}
                        <span className="text-danger">Apply for Candidate</span>
                    </h4>
                    <div className="d-grid gap-2 mt-3">
                        <button className="btn btn-primary btn-lg" type="button">
                            Change Phase
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ElectionSetupScreen;